import "../styles/Localisation.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { MapContainer, GeoJSON, TileLayer, useMap, Marker, LayersControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef, useState } from 'react';
import store from "../store";
import api_url from "../settings-server.js";
import { useDispatch } from "react-redux";
import { updateLocalisationPositions, updateResults } from "../stores/Results";
import markerLocation from '../assets/img/marker_location.svg'
import Select from "@mui/material/Select";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import moment from 'moment';
import * as turf from '@turf/turf';

export default function Localisation() {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const mapRef = useRef();
    const [key, setKey] = useState(0);
    const [displayAlert, setDisplayAlert] = useState(
        false
    );

    let resultsData = store.getState().results;
    let resultsInfosData = resultsData.infos
    const infoDate = resultsInfosData.date;
    const momentInfoDate = moment(infoDate);
    const infoItinerance = resultsInfosData.itinerance === "Yes" ? "true" : "false";
    const previousPage = "informations";
    let resultsLocalisationData = resultsData.localisation;
    let resultsNbTentsZoningDate = resultsData.nb_tents_zoning_date;
    const [maxLocations, setMaxLocations] = useState(undefined);
    const [nbTentsZoningDate, setNbTentsZoningDate] = useState(resultsNbTentsZoningDate);
    const minTentsReserved = 10;

    let mapData = store.getState().map.initialDisplay;
    const mapDataDefaultLayers = mapData.defaultLayers;
    const mapDataDefaultBaseLayers = mapData.defaultBaseLayers;
    const mapDataDefaultSites = mapData.defaultSites;

    const [defaultSite, setDefaultSite] = useState("");
    const [enableAddLocation, setEnableAddLocation] = useState(false);
    const [geojsonData, setGeojsonData] = useState({});
    const [locationData, setLocationData] = useState(resultsLocalisationData.locations);
    const [displayMaximumLocationReached, setDisplayMaximumLocationReached] = useState(false);
    const [clickCoordinates, setClickCoordinates] = useState([]);

    // Listen for language changes
    useEffect(() => {
        const handleLanguageChanged = () => {
          // Update the key to force rendering
          setKey(prevKey => prevKey + 1);
        };
        i18n.on('languageChanged', handleLanguageChanged);

        return () => {
          i18n.off('languageChanged', handleLanguageChanged);
        };
      }, [i18n]);

    // Redirect to the informations page if the first page has not been completed
    useEffect(() => {
        if (Object.keys(resultsInfosData).length === 0) {
            navigate("/declaration-bivouac/" + previousPage);
        }

        const fetchNbTentsZoningDate = async (start_date, itinerance) => {
            try {
                let urlSource = `${api_url}reservations/?start_date=${start_date}&itinerance=${itinerance}`;
                const response = await fetch(urlSource);
                if (response.status === 200) {
                    const data = await response.json();
                    const dataContent = data.content;
                    dispatch(
                        updateResults({
                            part: "nb_tents_zoning_date",
                            data: dataContent,
                        })
                    );
                    setNbTentsZoningDate(dataContent);
                }
            } catch (error) {
              console.error("Error fetching endpoint to retrieve the number of points:", error);
            }
        };

        fetchNbTentsZoningDate(infoDate, infoItinerance);

    }, [resultsInfosData]);

    // Bivouac site undefined
    useEffect(() => {
        // Alert is displayed for 7.5 seconds
        setTimeout(() => {
            setDisplayAlert(false);
        }, 7500);
      }, [displayAlert]);

    // Save positions in the store
    useEffect(() => {
        dispatch(updateLocalisationPositions({
                data: locationData,
            }))

        if (maxLocations) {
            if (locationData.length < maxLocations) {
                setDisplayMaximumLocationReached(false);
                setEnableAddLocation(true);
            } else {
                setDisplayMaximumLocationReached(true);
                setEnableAddLocation(false);
            }
        }
    }, [locationData, dispatch]);

    // Save the coordinates of the click
    useEffect(() => {
        if (clickCoordinates.length > 0 ) {
            if (enableAddLocation === true) {
                // Check if the location is in a reservable zone
                // Check if the quota for the number of tents has been reached
                let locationReservable = true;
                let countFalseIntersection = 0;
                const turfPoint = turf.point([clickCoordinates[1], clickCoordinates[0]]);
                const featuresZonageBivouac = geojsonData["zonage_bivouac"].features;
                for (const feature of featuresZonageBivouac) {
                    const featureReservable = feature.properties.reservable;
                    const featureQuotas = feature.properties.quotas;
                    const featurePropertiesNom = feature.properties.nom;
                    const turfPolygon = turf.multiPolygon(feature.geometry.coordinates);
                    const resultIntersectionPointInPolygon = turf.booleanPointInPolygon(turfPoint, turfPolygon);
                    if (resultIntersectionPointInPolygon === true) {
                        // Feature not reservable
                        if (featureReservable === false) {
                            locationReservable = false;
                            break;
                        }
                        // Feature reservable : check the quota
                        else {
                            if (featurePropertiesNom in nbTentsZoningDate) {
                                let dateReserved = "";""
                                if ( locationData.length === 0 ) {
                                    dateReserved = momentInfoDate.format('YYYY-MM-DD');
                                } else if ( locationData.length === 1) {
                                    dateReserved = momentInfoDate.clone().add(1, 'days').format('YYYY-MM-DD');
                                } else {
                                    dateReserved = momentInfoDate.clone().add(2, 'days').format('YYYY-MM-DD');
                                }

                                // At least one reservation at this date in this bivouac zoning
                                if (Object.keys(nbTentsZoningDate[featurePropertiesNom]).includes(dateReserved)) {
                                    let nbTents = nbTentsZoningDate[featurePropertiesNom][dateReserved];
                                    // Quota reached
                                    if (nbTents >= featureQuotas) {
                                        locationReservable = false;
                                    }
                                }
                            }
                        }

                    } else {
                        countFalseIntersection += 1
                    }
                }

            // The location is not located in a bivouac zone
            if (countFalseIntersection === featuresZonageBivouac.length) {
                locationReservable = false;
            }

            // Location in a reservable zone
            if (locationReservable === true) {
                const newLocationData = [...locationData, clickCoordinates ];
                setLocationData(newLocationData);
            }
        }
        }
    }, [clickCoordinates, dispatch]);

    // Navigate to informations page
    const previousStep = () => {
        navigate("/declaration-bivouac/" + previousPage);
    };

    // Navigate to quizz page
    const nextStep = (event) => {
        let nextPage = event.target.name;
        const localisationData = store.getState().results.localisation;
        const nbLocations = localisationData.locations.length
        if (nbLocations === 0 || (nbLocations === 1 && infoItinerance === "true")) {
            setDisplayAlert(true);
        } else {
            setDisplayAlert(false);
            navigate("/declaration-bivouac/" + nextPage);
        }
        // // // comment above and uncomment below to move through the steps quickly without filling in the form or using routing
        // let nextPage = event.target.name;
        // navigate("/declaration-bivouac/" + nextPage)
    };


    // Define the maximum number of locations based on the roaming (itinerance) entry
    useEffect(() => {
        if (resultsInfosData.itinerance === "Yes") {
            setMaxLocations(3);
        } else {
            setMaxLocations(1);
        }
    }, [maxLocations, resultsInfosData])

    // Add the default layers
    useEffect(() => {
        const fetchDefaultMapLayers = async () => {
          try {
            let newGeoJSONData = { ...geojsonData };

            for (const [key, layer] of Object.entries(mapDataDefaultLayers)) {
                let urlFields =layer.fields.map(field => `&fields=${field}`).join("");
                let urlSource = `${api_url}map/?map_layer=${layer.name}${urlFields}`;
                const response = await fetch(urlSource);
                const data = await response.json();
                newGeoJSONData[key] = {"type": "FeatureCollection",
                                "features": data.content};
            }

            setGeojsonData(newGeoJSONData);
          } catch (error) {
            console.error("Error fetching GeoJSON data:", error);
          }
        };

        if (Object.keys(geojsonData).length === 0) {
            fetchDefaultMapLayers();
        }
      }, [geojsonData, mapData]);

    // Customize the style
    const styleGeoJSON = (feature) => {
        const featureLayerName = feature.layername;
        const featureProperties = feature.properties;
        const styleFeature = mapDataDefaultLayers[featureLayerName].style;
        return {
            fillColor: styleFeature.attributeFillColor !== "" ? featureProperties[styleFeature.attributeFillColor] : styleFeature.fillColor,
            color: styleFeature.attributeColor !== "" ? featureProperties[styleFeature.attributeColor] : styleFeature.color,
            fillOpacity: styleFeature.fillOpacity,
            weight: styleFeature.weight
        };
    };

    // Customize the popup
    const popupGeoJSON = (feature, layer) => {
        const featureLayerName = feature.layername;
        const featureProperties = feature.properties;

        let popupContent = "";
        // Layer zonage_bivouac
        if (featureLayerName === "zonage_bivouac") {

            const featurePropertiesBivouac = featureProperties["bivouac"];
            const featurePropertiesNom = featureProperties["nom"];
            const featurePropertiesReglementation = featureProperties["reglementation"];
            const featurePropertiesQuotas = featureProperties["quotas"];
            // Déconseillé
            if (featurePropertiesBivouac === "Déconseillé") {
                popupContent = `<div>
                <p><strong>${t("Localisation Content.Not recommended area")} - ${featurePropertiesNom}</strong></p>
                <p>${t("Localisation Content.Reglementation." + featurePropertiesReglementation)}</p>
                </div>`;
            // Toléré
            } else if (featurePropertiesBivouac === "Toléré") {
                // Number of tents reserved
                let featurePropertiesNbTentsReserved = "";
                let textNbTentsReserved = "";
                let datesReserved = [momentInfoDate.format('YYYY-MM-DD')];
                if (infoItinerance === "true") {
                    datesReserved.push(momentInfoDate.clone().add(1, 'days').format('YYYY-MM-DD'));
                    datesReserved.push(momentInfoDate.clone().add(2, 'days').format('YYYY-MM-DD'));
                }
                for (const dateReserved of datesReserved) {
                    let dateReservedFormatted = moment(dateReserved).format('DD/MM/YYYY');
                    if (featurePropertiesNom in nbTentsZoningDate) {
                        let datesNbTentsZoningDate = Object.keys(nbTentsZoningDate[featurePropertiesNom]);
                        if (datesNbTentsZoningDate.includes(dateReserved)) {
                            let finalNbTents = nbTentsZoningDate[featurePropertiesNom][dateReserved];
                            if (finalNbTents < minTentsReserved) {
                                finalNbTents = minTentsReserved
                            }
                            // Round to the next 5
                            else {
                                finalNbTents = Math.ceil(parseFloat(finalNbTents) / 5) * 5;
                            }

                            // Quota reached
                            if (finalNbTents >= featurePropertiesQuotas) {
                                textNbTentsReserved += `<p class="paragraph-nb-tents-reserved">${t("Localisation Content.Full booking at")} ${dateReservedFormatted}, ${t("Localisation Content.Postpone your visit")}</p>`;
                            }
                            else {
                                textNbTentsReserved += `<p class="paragraph-nb-tents-reserved">${t("Localisation Content.Less than")} ${finalNbTents} ${t("Localisation Content.Bivouacs reserved")} ${dateReservedFormatted}</p>`;
                            }
                        } else {
                            textNbTentsReserved += `<p class="paragraph-nb-tents-reserved">${t("Localisation Content.Less than")} ${minTentsReserved} ${t("Localisation Content.Bivouacs reserved")} ${dateReservedFormatted}</p>`;
                        }
                    } else {
                        textNbTentsReserved += `<p class="paragraph-nb-tents-reserved">${t("Localisation Content.Less than")} ${minTentsReserved} ${t("Localisation Content.Bivouacs reserved")} ${dateReservedFormatted}</p>`;
                    }
                }
                featurePropertiesNbTentsReserved = `<div>${textNbTentsReserved}</div>`;

                // Report
                const featurePropertiesReport = featureProperties["report"];
                let textZoneReport = "";
                if (featurePropertiesReport !== "") {
                    textZoneReport = `<p>${t("Localisation Content.Possible transfer zone")} : ${featurePropertiesReport}</p>`
                }

                const featurePropertiesCapacite = featureProperties["capacite"];
                popupContent = `<div>
                <p><strong>${t("Localisation Content.Tolerated area")} - ${featurePropertiesNom}</strong></p>
                <p>${t("Localisation Content.Reglementation." + featurePropertiesReglementation)}</p>
                <p>${t("Localisation Content.Maximum capacity")} : ${featurePropertiesCapacite} ${t("Localisation Content.Tents")}</p>
                ${featurePropertiesNbTentsReserved}
                ${textZoneReport}
                </div>
                `;
            }
            // Interdite
            else if (featurePropertiesBivouac === "Interdit") {
                popupContent = `<div>
                <p><strong>${t("Localisation Content.Forbidden area")} - ${featurePropertiesNom}</strong></p>
                <p>${t("Localisation Content.Reglementation." + featurePropertiesReglementation)}</p>
                </div>
                `;
            }

            layer.bindPopup(popupContent);
        }
    }

    // Zoom to a site
    const ZoomToSite = () => {
        const map = useMap();

        const handleSiteChange = (e) => {
            const siteName = e.target.value;
            const siteAttributes = Object.values(mapDataDefaultSites).find(site => site.name === siteName);
            if (siteAttributes) {
                map.setView(siteAttributes.center, siteAttributes.zoom);
                setDefaultSite(siteName);
            }
        };

        return (
            <FormControl fullWidth sx={{
                zIndex: 1000
            }}>
              <Select
                id="demo-simple-select"
                value={defaultSite}
                displayEmpty
                onChange={handleSiteChange}
                sx={{
                    backgroundColor: "white",
                    height: 30,
                    top: 10
                }}
              >
                <MenuItem value="">
                <em>{t("Select site")}</em>
                </MenuItem>
                {Object.keys(mapDataDefaultSites).map((siteName, index) => (
                    <MenuItem key={index} value={mapDataDefaultSites[siteName].name}>{mapDataDefaultSites[siteName].name}</MenuItem>)
                )}
              </Select>
            </FormControl>

        );
      };

    // Add a location
    const AddLocation = () => {
        const updateAddLocationStatus = () => {
            setEnableAddLocation(true);
        }

        return (
            displayMaximumLocationReached === false && locationData.length !== maxLocations && enableAddLocation === false &&
            <Button
            variant="contained"
            size="small"
            className="button-add-location"
            onClick={updateAddLocationStatus}
            >
                {t("Add location")}
            </Button>
        );
      };

    // Stop adding a location
    const StopAddLocation = () => {
        const disableAddLocation = () => {
            setEnableAddLocation(false);
        }

        return (
            displayMaximumLocationReached === false && enableAddLocation === true &&
            <Button
            variant="contained"
            size="small"
            className="button-stop-add-location"
            onClick={disableAddLocation}
            >
                {t("Stop Add location")}
            </Button>
        );
      };

    // Add event when the user clicks on the map
    const AddClickEvent = () => {
        const map = useMap();
        map.on('click', (e) => {
            const clickCoordinates = e.latlng;
            setClickCoordinates([clickCoordinates.lat, clickCoordinates.lng])
        })
        return null
      };


    // Delete the last location
    const DeleteLastLocation = () => {
        const removeLastLocation = () => {
            const newLocationData = locationData.slice(0, -1);
            setLocationData(newLocationData);
        }

        return (
            locationData.length > 0 &&
            <Button
                variant="outlined"
                size="small"
                className="button-delete-last-location"
                onClick={removeLastLocation}
                >
                    {t("Delete last location")}
            </Button>
        );
      };

    // Custom icon for locations
    const iconLocation = new L.Icon({
        iconUrl: markerLocation,
        iconSize: [40, 40]
    });

    return (
        <>
            <h1>{t("Localisation")}</h1>
            <Alert severity="success">
                <AlertTitle>{t("Step")} 2/4</AlertTitle>
                {t("Point bivouac locations")}
            </Alert>

            <div className="container-buttons-location">
                <AddLocation />
                <StopAddLocation />
                {(locationData.length === maxLocations || displayMaximumLocationReached === true) && <p className="p-maximum-locations-reached">{t("Maximum number location reached")}</p>}
                <DeleteLastLocation />
            </div>

            <div id="map">
                <MapContainer key={key} ref={mapRef} center={mapData.defaultCenter} zoom={mapData.defaultZoom} scrollWheelZoom={true}>

                    {/* Basemaps */}
                    <LayersControl position="bottomright">
                        {mapDataDefaultBaseLayers.map((baseLayer, index) => {
                        return (
                            <LayersControl.BaseLayer
                            key={index}
                            checked={index === 0 ? true : false}
                            name={baseLayer.name}
                            >
                            <TileLayer
                                attribution={baseLayer.attribution}
                                url={baseLayer.url}
                            />
                            </LayersControl.BaseLayer>
                        )
                        })}
                    </LayersControl>

                    {/* Disable popup when the user is adding a location. Ternary operator does not work */}
                    {enableAddLocation === false && Object.values(geojsonData).map((data, index) => (
                        <GeoJSON key={index}
                        data={data}
                        style={styleGeoJSON}
                        onEachFeature={popupGeoJSON}
                        />
                    ))}
                    {enableAddLocation === true && Object.values(geojsonData).map((data, index) => (
                        <GeoJSON key={index}
                        data={data}
                        style={styleGeoJSON}
                        />
                    ))}
                    {/* Layer with the bivouac locations */}
                    {locationData.map((location, index) => (
                        <Marker key={index} position={location} icon={iconLocation} />
                    ))}
                    <div className="container-site-location">
                        <ZoomToSite />
                        <AddClickEvent />
                    </div>
                </MapContainer>
            </div>

            {/* Bivouac site are undefined */}
            {displayAlert &&
            <Alert severity="error">
                <AlertTitle>{t("Incomplete location")}</AlertTitle>
            </Alert>}

            <Box sx={{ display: 'flex', flexDirection: 'row-reverse', p: 2}}>
                <Button
                    variant="outlined"
                    onClick={nextStep}
                    name="quizz"
                >
                    {t("Next step")}
                </Button>
                <Button
                    variant="outlined"
                    onClick={previousStep}
                >
                    {t("Previous step")}
                </Button>
            </Box>
        </>
    );
}
