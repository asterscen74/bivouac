import "../styles/Localisation.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { MapContainer, GeoJSON, TileLayer, useMap, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef, useState } from 'react';
import store from "../store";
import api_url from "../settings-server.js";
import { useDispatch } from "react-redux";
import { updateLocalisationPositions } from "../stores/Results";
import logoZoneInterdite from '../assets/img/logo_zone_interdite.png';
import Select from "@mui/material/Select";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

export default function Localisation() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const mapRef = useRef();
    const [displayAlert, setDisplayAlert] = useState(
        false
    );

    let resultsData = store.getState().results;
    let resultsInfosData = resultsData.infos;
    const previousPage = "informations";
    let resultsLocalisationData = resultsData.localisation;
    const [maxLocations, setMaxLocations] = useState(undefined);

    let mapData = store.getState().map.initialDisplay;
    const mapDataDefaultLayers = mapData.defaultLayers;
    const mapDataDefaultSites = mapData.defaultSites;

    const [defaultSite, setDefaultSite] = useState("");
    const [enableAddLocation, setEnableAddLocation] = useState(false);
    const [geojsonData, setGeojsonData] = useState({});
    const [locationData, setLocationData] = useState(resultsLocalisationData.locations);
    const [displayMaximumLocationReached, setDisplayMaximumLocationReached] = useState(false);
    const [clickCoordinates, setClickCoordinates] = useState([]);

    // Redirect to the informations page if the first page has not been completed
    useEffect(() => {
        if (Object.keys(resultsInfosData).length === 0) {
            navigate("/declaration-bivouac/" + previousPage);
        }
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
            const newLocationData = [...locationData, clickCoordinates ];
            setLocationData(newLocationData);
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
        if (localisationData.locations.length === 0) {
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
            // Déconseillé
            if (featurePropertiesBivouac === "Déconseillé") {
                popupContent = `<div>
                <p><strong>Zone déconseillée - ${featurePropertiesNom}</strong></p>
                <i>En réserve naturelle le camping est interdit, le bivouac est déconseillé. Le bivouac est
                un campement éphémère avec ou sans abri de manière temporaire de 19h à 9h le
                lendemain. Le camping sauvage signifie plusieurs nuits au même endroit.
                </i>
                </div>`;
            // Toléré
            } else if (featurePropertiesBivouac === "Toléré") {
                popupContent = `<div>
                <p><strong>Zone tolérée - ${featurePropertiesNom}</strong></p>
                <p>TODO : récupérer nom et capacité. Ex : ${featurePropertiesNom}, places pour 30 tentes</p>
                <p>TODO : nb bivouacs déclarés à telle date. Ex : 18 bivouacs déclarés au 08/07/2024</p>
                <p>TODO : horaires tentes tolérées. Ex : <i>Tentes tolérées entre 19h et 9h le lendemain</i></p>
                <p>TODO : définition de la zone où le report est possible. Ex : Report possible à la zone de la Giettaz/Rollaz</p>
                </div>
                `;
            }
            // Interdite
            else if (featurePropertiesBivouac === "Interdit") {
                popupContent = `<div>
                <p><strong>Zone interdite - ${featurePropertiesNom}</strong></p>
                <div style="display: flex;">
                    <img src=${logoZoneInterdite} alt="logo zone interdite" />
                    <p style="margin-left: 15px">TODO : mettre le texte soulignant la zone interdite</p>
                </div>
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

    return (
        <>
            <h1>{t("Localisation")}</h1>
            <Alert severity="success">
                <AlertTitle>{t("Step")} 2/4</AlertTitle>
                Saisissez vos emplacements de bivouac
            </Alert>

            <div className="container-buttons-location">
                <AddLocation />
                <StopAddLocation />
                {(locationData.length === maxLocations || displayMaximumLocationReached === true) && <p className="p-maximum-locations-reached">{t("Maximum number location reached")}</p>}
                <DeleteLastLocation />
            </div>

            <div id="map">
                <MapContainer ref={mapRef} center={mapData.defaultCenter} zoom={mapData.defaultZoom} scrollWheelZoom={true}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors" />
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
                    <Marker key={index} position={location} />
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
