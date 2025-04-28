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
import { updateLocalisationPositions, updateResults, updateLocalisationCapturedImages, clearLocalisationCapturedImages } from "../stores/Results";
import markerLocation from '../assets/img/marker_location.svg'
import Select from "@mui/material/Select";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import moment from 'moment';
import * as turf from '@turf/turf';
import { ListSubheader } from '@mui/material';
import zoomLocation from '../assets/img/zoom_location.svg';
import { Dialog, DialogContent, DialogActions } from "@mui/material";
import html2canvas from "html2canvas";
import ReactDOM from 'react-dom/client';
import PropTypes from 'prop-types';

export default function Localisation() {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const mapRef = useRef();
    const [key, setKey] = useState(0);
    const [displayAlert, setDisplayAlert] = useState(
        false
    );
    const [disableButtonNextStep, setDisableButtonNextStep] = useState(false);
    // Overlay to prevent interaction with the map during the capture
    const [displayOverlayCaptureImages, setDisplayOverlayCaptureImages] = useState(false);

    let resultsData = store.getState().results;
    let resultsInfosData = resultsData.infos
    const infoDate = resultsInfosData.date;
    const momentInfoDate = moment(infoDate);
    const previousPage = "informations";
    let resultsLocalisationData = resultsData.localisation;
    let resultsNbTentsZoningDate = resultsData.nb_tents_zoning_date;
    let resultsTwoNextAvailableDatesZoning = resultsData.two_next_available_dates_zoning;
    let resultsQuizzCompleted = resultsData.quizzCompleted
    const maxLocations = 1;
    const [nbTentsZoningDate, setNbTentsZoningDate] = useState(resultsNbTentsZoningDate);
    const [nameCurrentAreaSelected, setNameCurrentAreaSelected] = useState("");
    const [twoNextAvailableDatesZoning, setTwoNextAvailableDatesZoning] = useState(resultsTwoNextAvailableDatesZoning);
    const [popupFullBookingNextAvailableDateShow, setPopupFullBookingNextAvailableDateShow] = useState(false);
    const minTentsReserved = 10;

    let mapData = store.getState().map.initialDisplay;
    const mapDataDefaultLayers = mapData.defaultLayers;
    const mapDataDefaultBaseLayers = mapData.defaultBaseLayers;
    const mapDataDefaultSitesZones = mapData.defaultSitesZones;
    var completeArea = false;

    const [defaultSiteZone, setDefaultSiteZone] = useState("");
    const [geojsonData, setGeojsonData] = useState({});
    const [locationData, setLocationData] = useState(resultsLocalisationData.locations);
    const [clickCoordinates, setClickCoordinates] = useState([]);
    const popupClickCoordsRef = useRef(null);


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
            navigate("/reservation-bivouac/" + previousPage);
        }

        const fetchNbTentsZoningDate = async (start_date) => {
            try {
                let urlSource = `${api_url}reservations/?start_date=${start_date}`;
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
              console.error("Error fetching endpoint to retrieve the number of tents per bivouac zone:", error);
            }
        };

        const fetchTwoNextAvailableDatesZoning = async (start_date) => {
            try {
                let urlSource = `${api_url}reservations/next-availability/?start_date=${start_date}`;
                const response = await fetch(urlSource);
                if (response.status === 200) {
                    const data = await response.json();
                    const dataContent = data.content;
                    dispatch(
                        updateResults({
                            part: "two_next_available_dates_zoning",
                            data: dataContent,
                        })
                    );
                    setTwoNextAvailableDatesZoning(dataContent);
                }
            } catch (error) {
              console.error("Error fetching endpoint to retrieve the next two dates available by zoning:", error);
            }
        };

        if (infoDate) {
            fetchNbTentsZoningDate(infoDate);
            fetchTwoNextAvailableDatesZoning(infoDate);
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
        dispatch(updateLocalisationPositions({ data: locationData }));
    }, [locationData, dispatch]);


    // Save the coordinates of the click
    useEffect(() => {
        if (clickCoordinates.length > 0 ) {
                // Check if the location is in a reservable zone
                // Check if the quota for the number of tents has been reached
                let locationReservable = true;
                let countFalseIntersection = 0;
                const turfPoint = turf.point([clickCoordinates[1], clickCoordinates[0]]);
                const featuresZonageBivouac = geojsonData["zonage_bivouac"].features;
                let nameAreaNewLocation = "";
                for (const feature of featuresZonageBivouac) {
                    const featureReservable = feature.properties.reservable;
                    const featureQuotas = feature.properties.quotas;
                    const featurePropertiesNom = feature.properties.nom;
                    const turfPolygon = turf.multiPolygon(feature.geometry.coordinates);
                    const resultIntersectionPointInPolygon = turf.booleanPointInPolygon(turfPoint, turfPolygon);
                    if (resultIntersectionPointInPolygon === true) {
                        nameAreaNewLocation = featurePropertiesNom;
                        setNameCurrentAreaSelected(nameAreaNewLocation);
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
                                        setPopupFullBookingNextAvailableDateShow(true);
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
            if (locationReservable) {
                let updatedLocationData = [...locationData];

                if (maxLocations && updatedLocationData.length >= maxLocations) {
                    updatedLocationData = updatedLocationData.slice(0, maxLocations - 1);
                }

                updatedLocationData.push(clickCoordinates);
                setLocationData(updatedLocationData);

            }
            }
        }, [clickCoordinates]);

    // Navigate to informations page
    const previousStep = () => {
        navigate("/reservation-bivouac/" + previousPage);
    };

    // Capture the locations and navigate to quizz or summary page
    const nextStep = (event) => {
        let nextPage = event.target.name;
        const localisationData = store.getState().results.localisation;
        const nbLocations = localisationData.locations.length;

        if (nbLocations === 0) {
            setDisplayAlert(true);
        } else {
            setDisplayAlert(false);

            // Fix a freeze bug on export
            mapRef.current.setView([45.86, 6.79], 10);

            // Set the overlay to prevent interaction with the map during the capture
            setDisplayOverlayCaptureImages(true)
            setDisableButtonNextStep(true);


            // Delete previous captured images from the Redux store
            dispatch(clearLocalisationCapturedImages());

            // Temporary array to store captured images before dispatching
            let capturedImagesArray = [];

            // Capture the map using html2canvas
            const captureMapImage = () => {
                return new Promise((resolve) => {
                    if (mapRef.current) {
                        const mapElement = document.getElementById("map");
                        if (mapElement) {
                            // Force the redrawing of the map
                            mapRef.current.invalidateSize();

                            setTimeout(async () => {
                                const canvas = await html2canvas(mapElement, {
                                    useCORS: true,
                                    allowTaint: true,
                                });
                                const imageUrl = canvas.toDataURL("image/png");

                                capturedImagesArray.push(imageUrl);
                                resolve();
                            }, 750);
                        }
                    }
                });
            };

            if (nbLocations > 0 && mapRef.current) {
                const map = mapRef.current;

                mapRef.current.dragging.disable();
                mapRef.current.scrollWheelZoom.disable();
                mapRef.current.doubleClickZoom.disable();
                mapRef.current.boxZoom.disable();
                mapRef.current.keyboard.disable();
                mapRef.current.touchZoom.disable();

                // Create an array of promises to capture each location
                const capturePromises = localisationData.locations.map((location, index) => {
                    return new Promise((resolve) => {
                        setTimeout(() => {
                            map.setView(location, 12, {
                                animate: true,
                                pan: { animate: true },
                            });

                            // Wait until the map movement is finished
                            map.once('moveend', async () => {
                                // Capture the map image
                                await captureMapImage();
                                resolve();
                            });
                        }, index * 1500); // Delay between captures
                    });
                });

                // Once all captures are done, dispatch the images in one batch
                Promise.all(capturePromises).then(() => {
                    dispatch(updateLocalisationCapturedImages({
                        data: capturedImagesArray,
                    }));

                    setDisableButtonNextStep(false);
                    setDisplayOverlayCaptureImages(false);
                    mapRef.current.dragging.enable();
                    mapRef.current.scrollWheelZoom.enable();
                    mapRef.current.doubleClickZoom.enable();
                    mapRef.current.boxZoom.enable();
                    mapRef.current.keyboard.enable();
                    mapRef.current.touchZoom.enable();

                    // Navigate to the quiz or summary page once captures are completed
                    navigate("/reservation-bivouac/" + nextPage);
                });
            }
        }
    };

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
        const featurePropertiesBivouac = featureProperties["bivouac"];
        const featurePropertiesNom = featureProperties["nom"];
        const featurePropertiesQuotas = featureProperties["quotas"];
        if (featurePropertiesBivouac === "Toléré") {
            let datesReserved = [momentInfoDate.format('YYYY-MM-DD')];
            for (const dateReserved of datesReserved) {
                if (featurePropertiesNom in nbTentsZoningDate) {
                    let datesNbTentsZoningDate = Object.keys(nbTentsZoningDate[featurePropertiesNom]);
                    if (datesNbTentsZoningDate.includes(dateReserved)) {
                        let finalNbTents = nbTentsZoningDate[featurePropertiesNom][dateReserved];
                        if (finalNbTents >= featurePropertiesQuotas) {
                            completeArea = true;
                            return {
                                fillColor: "rgba(255, 165, 0, 1)",
                                color: "rgba(255, 165, 0, 1)",
                                fillOpacity: styleFeature.fillOpacity,
                                weight: styleFeature.weight
                            };
                        }
                        else {
                                return {
                                fillColor: styleFeature.attributeFillColor !== "" ? featureProperties[styleFeature.attributeFillColor] : styleFeature.fillColor,
                                color: styleFeature.attributeColor !== "" ? featureProperties[styleFeature.attributeColor] : styleFeature.color,
                                fillOpacity: styleFeature.fillOpacity,
                                weight: styleFeature.weight
                            };
                        }
                    } else {
                        return {
                        fillColor: styleFeature.attributeFillColor !== "" ? featureProperties[styleFeature.attributeFillColor] : styleFeature.fillColor,
                        color: styleFeature.attributeColor !== "" ? featureProperties[styleFeature.attributeColor] : styleFeature.color,
                        fillOpacity: styleFeature.fillOpacity,
                        weight: styleFeature.weight
                    };
                }
                } else {
                    return {
                    fillColor: styleFeature.attributeFillColor !== "" ? featureProperties[styleFeature.attributeFillColor] : styleFeature.fillColor,
                    color: styleFeature.attributeColor !== "" ? featureProperties[styleFeature.attributeColor] : styleFeature.color,
                    fillOpacity: styleFeature.fillOpacity,
                    weight: styleFeature.weight
                };
            }
            }
        }
        else {
            return {
            fillColor: styleFeature.attributeFillColor !== "" ? featureProperties[styleFeature.attributeFillColor] : styleFeature.fillColor,
            color: styleFeature.attributeColor !== "" ? featureProperties[styleFeature.attributeColor] : styleFeature.color,
            fillOpacity: styleFeature.fillOpacity,
            weight: styleFeature.weight
        };
    }

    };


    const LocationPopupNoLocation = ({ zoneType, nom, reglementation, report }) => {
        return (
            <div>
              <p><strong>{zoneType} - {nom}</strong></p>
              <p>{reglementation}</p>
              {report && (
                <div
                className="report"
                dangerouslySetInnerHTML={{ __html: report }}
                />
            )}
          </div>
        );
      };

    LocationPopupNoLocation.propTypes = {
        zoneType: PropTypes.string.isRequired,
        nom: PropTypes.string.isRequired,
        reglementation: PropTypes.string.isRequired,
        report: PropTypes.string.isRequired,
      };

    const LocationPopupAddLocation = ({ reservable, zoneType, nom, reglementation, capacity, reservation, nextDate, firstDate, secondDate, report, onAddLocation, buttonText }) => {
        return (
          <div>
            <p><strong>{zoneType} - {nom}</strong></p>
            <p>{reglementation}</p>
            {reservable === true &&(
                <p>{capacity}</p>
            )}
            <div>
                <p className="paragraph-nb-tents-reserved">
                {reservable === true &&(
                <div>
                {reservation}
                </div>
                )}
                {nextDate && (
                    <strong>
                    {nextDate}
                    <ul>
                        <li>{firstDate}</li>
                        <li>{secondDate}</li>
                    </ul>
                    </strong>
                )}
                </p>
            </div>

            {report && (
                <div
                className="report"
                dangerouslySetInnerHTML={{ __html: report }}
                />
            )}
            {reservable === true &&(
                <div className="container-buttons-location">
                    <Button onClick={onAddLocation} variant="contained">
                    {buttonText}
                    </Button>
                </div>
            )}
          </div>
        );
      };

    LocationPopupAddLocation.propTypes = {
        reservable: PropTypes.bool.isRequired,
        zoneType: PropTypes.string.isRequired,
        nom: PropTypes.string.isRequired,
        reglementation: PropTypes.string.isRequired,
        capacity: PropTypes.string.isRequired,
        reservation: PropTypes.string.isRequired,
        nextDate: PropTypes.string.isRequired,
        firstDate: PropTypes.string.isRequired,
        secondDate: PropTypes.string.isRequired,
        report: PropTypes.string.isRequired,
        onAddLocation: PropTypes.func.isRequired,
        buttonText: PropTypes.string.isRequired,
      };

    // Customize the popup
    const popupGeoJSON = (feature, layer) => {
        const featureLayerName = feature.layername;
        const featureProperties = feature.properties;

        layer.on('click', (e) => {
            const { lat, lng } = e.latlng;
            popupClickCoordsRef.current = [lat, lng];
          });

        const onAddLocation = () => {
            const coords = popupClickCoordsRef.current;
            if (!coords) return;
            setClickCoordinates(coords);
            layer.closePopup();
        };

        // Layer zonage_bivouac
        if (featureLayerName === "zonage_bivouac") {

            const featurePropertiesBivouac = featureProperties["bivouac"];
            const featurePropertiesNom = featureProperties["nom"];
            const featurePropertiesReglementation = featureProperties["reglementation"];
            const featurePropertiesQuotas = featureProperties["quotas"];
            const featurePropertiesReservable = featureProperties["reservable"];
            const featurePropertiesReport = featureProperties["report"];
            // Déconseillé
            if (featurePropertiesBivouac === "Déconseillé") {
                const popupContainer = document.createElement('div');
                const root = ReactDOM.createRoot(popupContainer);

                layer.bindPopup(popupContainer);

                layer.on('popupopen', () => {
                    root.render(
                    <LocationPopupAddLocation
                        reservable={featurePropertiesReservable}
                        zoneType={t("Localisation Content.Not recommended area")}
                        nom={featurePropertiesNom}
                        reglementation={t("Localisation Content.Reglementation." + featurePropertiesReglementation)}
                        capacity=''
                        reservation=''
                        nextDate=''
                        firstDate=''
                        secondDate=''
                        report=''
                        onAddLocation={onAddLocation}
                        buttonText={t("Add location")}
                    />
                    );
                });
            // Toléré
            } else if (featurePropertiesBivouac === "Toléré") {
                // Number of tents reserved
                let featurePropertiesNbTentsReserved = "";
                let textNbTentsReserved = "";
                let textNextAvailableDate = "";
                let textFirstAvailableDate = "";
                let textSecondAvailableDate = "";

                let datesReserved = [momentInfoDate.format('YYYY-MM-DD')];
                for (const dateReserved of datesReserved) {
                    let dateReservedFormatted = moment(dateReserved).format('DD/MM/YYYY');
                    if (featurePropertiesNom in nbTentsZoningDate) {
                        let datesNbTentsZoningDate = Object.keys(nbTentsZoningDate[featurePropertiesNom]);
                        if (datesNbTentsZoningDate.includes(dateReserved)) {
                            let finalNbTents = nbTentsZoningDate[featurePropertiesNom][dateReserved];
                            let estimatedTents = Math.ceil(parseFloat(finalNbTents) / 5) * 5;

                            // Quota reached
                            if (finalNbTents >= featurePropertiesQuotas) {
                                let firstDateAvailable = moment(twoNextAvailableDatesZoning[featurePropertiesNom][0]).format('DD/MM/YYYY');
                                let secondDateAvailable = moment(twoNextAvailableDatesZoning[featurePropertiesNom][1]).format('DD/MM/YYYY');

                                textNbTentsReserved += `${t("Localisation Content.Full booking at")} ${dateReservedFormatted}, ${t("Localisation Content.Postpone your visit")}`;
                                textNextAvailableDate += `${t("Localisation Content.Next available date")}`;
                                textFirstAvailableDate += `${firstDateAvailable}`;
                                textSecondAvailableDate += `${secondDateAvailable}`;
                            }
                            else {
                                textNbTentsReserved += `${t("Localisation Content.Less than")} ${estimatedTents} ${t("Localisation Content.Bivouacs reserved")} ${dateReservedFormatted}`;
                            }
                        } else {
                            textNbTentsReserved += `${t("Localisation Content.Less than")} ${minTentsReserved} ${t("Localisation Content.Bivouacs reserved")} ${dateReservedFormatted}`;
                        }
                    } else {
                        textNbTentsReserved += `${t("Localisation Content.Less than")} ${minTentsReserved} ${t("Localisation Content.Bivouacs reserved")} ${dateReservedFormatted}`;
                    }
                }
                featurePropertiesNbTentsReserved = `${textNbTentsReserved}`;

                // Report
                let textZoneReport = "";
                if (featurePropertiesReport !== "") {
                    textZoneReport = `${t("Localisation Content.Possible transfer zone")} : ${featurePropertiesReport}`
                }

                const featurePropertiesCapacite = featureProperties["capacite"];

                const popupContainer = document.createElement('div');
                const root = ReactDOM.createRoot(popupContainer);

                layer.bindPopup(popupContainer);

                layer.on('popupopen', () => {
                    root.render(
                    <LocationPopupAddLocation
                        reservable={featurePropertiesReservable}
                        zoneType={t("Localisation Content.Tolerated area")}
                        nom={featurePropertiesNom}
                        reglementation={t("Localisation Content.Reglementation." + featurePropertiesReglementation)}
                        capacity={t("Localisation Content.Maximum capacity") + " : " + featurePropertiesCapacite + " " + t("Localisation Content.Tents")}
                        reservation={featurePropertiesNbTentsReserved}
                        nextDate={textNextAvailableDate}
                        firstDate={textFirstAvailableDate}
                        secondDate={textSecondAvailableDate}
                        report={textZoneReport}
                        onAddLocation={onAddLocation}
                        buttonText={t("Add location")}
                    />
                    );
                });
            }
            // Interdite
            else if (featurePropertiesBivouac === "Interdit") {
                let textZoneReport = "";
                if (featurePropertiesReport !== "") {
                    textZoneReport = `${t("Localisation Content.Possible transfer zone")} : ${featurePropertiesReport}`
                }

                const popupContainer = document.createElement('div');
                const root = ReactDOM.createRoot(popupContainer);

                layer.bindPopup(popupContainer);

                layer.on('popupopen', () => {
                    root.render(
                    <LocationPopupNoLocation
                        zoneType={t("Localisation Content.Forbidden area")}
                        nom={featurePropertiesNom}
                        reglementation={t("Localisation Content.Reglementation." + featurePropertiesReglementation)}
                        report={textZoneReport}
                    />
                    );
                });
            }
            else if (featurePropertiesBivouac === "Spécifique") {

                const popupContainer = document.createElement('div');
                const root = ReactDOM.createRoot(popupContainer);

                layer.bindPopup(popupContainer);

                layer.on('popupopen', () => {
                    root.render(
                    <LocationPopupAddLocation
                        reservable={featurePropertiesReservable}
                        zoneType={t("Localisation Content.Not recommended area")}
                        nom={featurePropertiesNom}
                        reglementation=''
                        capacity=''
                        reservation=''
                        nextDate=''
                        firstDate=''
                        secondDate=''
                        report=''
                        onAddLocation={onAddLocation}
                        buttonText={t("Add location")}
                    />
                    );
                });
                }

        }
    }

    // Zoom to a site or zone
    const ZoomToSiteZone = () => {
        const map = useMap();

        const handleLocationChange = (e) => {
            const locationName = e.target.value;
            const locationAttributes = Object.values(mapDataDefaultSitesZones).find(loc => loc.name === locationName);
            if (locationAttributes) {
                map.setView(locationAttributes.center, locationAttributes.zoom);
                setDefaultSiteZone(locationName);
            }
        };

        return (
            <FormControl fullWidth sx={{ zIndex: 1000 }}>
                <Select
                    id="site-zone-select"
                    value={defaultSiteZone}
                    displayEmpty
                    onChange={handleLocationChange}
                    sx={{
                        backgroundColor: "white",
                        height: 30,
                        top: 10,
                    }}
                    MenuProps={{
                    PaperProps: {
                        style: {
                            maxHeight: 200,
                            overflowY: 'auto',
                            width: '250px',
                        },
                    },
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                    transformOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                }}
                >
                    <MenuItem value="">
                        <em>{t("Select site/zone")}</em>
                    </MenuItem>

                    <ListSubheader>{t("Sites")}</ListSubheader>
                    {Object.keys(mapDataDefaultSitesZones)
                        .filter((location) => mapDataDefaultSitesZones[location].type === "site")
                        .map((locationName, index) => (
                            <MenuItem key={index} value={mapDataDefaultSitesZones[locationName].name}
                                                        sx={{
                                whiteSpace: 'normal',
                                wordWrap: 'break-word',
                                overflow: 'hidden',
                            }}>
                                {mapDataDefaultSitesZones[locationName].name}
                            </MenuItem>
                        ))}


                    <ListSubheader>{t("Zones")}</ListSubheader>
                    {Object.keys(mapDataDefaultSitesZones)
                        .filter((location) => mapDataDefaultSitesZones[location].type === "zone")
                        .map((locationName, index) => (
                            <MenuItem key={index} value={mapDataDefaultSitesZones[locationName].name} sx={{
                                whiteSpace: 'normal',
                                wordWrap: 'break-word',
                                overflow: 'hidden',
                            }} >
                                {mapDataDefaultSitesZones[locationName].name}
                            </MenuItem>
                        ))}
                </Select>
            </FormControl>
        );
    };

    // Map properties
    function SetMapProperties() {
        const map = useMap();
        map.setMaxBounds([
            [45.6466786057007141, 6.31042310515216265],
            [46.50312762856985, 7.29443215087411545],
          ]);
        map.setMinZoom(10);
        map.setMaxZoom(18);
    }


    // Legend map
    const MapLegend = () => {
        const map = useMap();
        const [zoom, setZoom] = useState(map.getZoom());

        useEffect(() => {
            const handleZoom = () => {
                setZoom(map.getZoom());
            };

            map.on('zoomend', handleZoom);

            return () => {
                map.off('zoomend', handleZoom);
            };
        }, [map]);

        const legendItems = [
            {
                className: "legend-row-symbol-limite-reserve-naturelle",
                text: t("Localisation Content.Legend.row1")
            },
            {
                className: "legend-row-symbol-non-reservable",
                text: t("Localisation Content.Legend.row2")
            },
            {
                className: "legend-row-symbol-tolere-reservable",
                text: t("Localisation Content.Legend.row3")
            }
        ];

        // Additional elements added if completeArea is true
        if (completeArea) {
            legendItems.push({
                className: "legend-row-symbol-tolere-complet",
                text: t("Localisation Content.Legend.row4")
            });
        }

        //  Display only if zoom is lower or greater than 16
        if (zoom <= 16) {
            legendItems.push({
                className: "legend-row-symbol-small-area",
                text: t("Localisation Content.Legend.row5")
            });
        }

        return (
            <div className="legend-container">
                {legendItems.map((item, index) => (
                    <div key={index} className="legend-row-container">
                        <p className={`legend-row-symbol ${item.className}`}></p>
                        <p className="legend-row-text">{item.text}</p>
                    </div>
                ))}
            </div>
        );
    };

    // Centroids on areas tolerated in the Contamines area (not very visible)
    const centroidesContaminesZonesTolerees = mapData.centroidesContaminesZonesTolerees;
    const DynamicIconMarkersCentroidsContaminesZonesTolerees = (points) => {
        const map = useMap();
        const [zoom, setZoom] = useState(map.getZoom());

        useEffect(() => {
            const handleZoom = () => {
                setZoom(map.getZoom());
            };
            map.on('zoomend', handleZoom);

            return () => {
                map.off('zoomend', handleZoom);
            };
        }, [map]);


        const calculateIconSizeAndAnchor = (zoomLevel) => {
            const iconSize = 15 + zoomLevel * 2;
            const iconAnchor = [iconSize / 2, iconSize * 0.88];
            return { iconSize, iconAnchor };
        };

        return (
            <>
            {points.points.map((point, index) => {
                // Display only if the zoom is lower or equal to 16
                if (zoom <= 16) {
                    const { iconSize, iconAnchor } = calculateIconSizeAndAnchor(zoom);

                    return (
                        <Marker
                            key={index}
                            position={[point.lat, point.lon]}
                            icon={L.icon({
                                iconUrl: zoomLocation,
                                iconSize: [iconSize, iconSize],
                                iconAnchor: iconAnchor,
                            })}
                            eventHandlers={{
                                click: () => {
                                    map.flyTo([point.lat, point.lon], 18, {duration: 1.2});
                                },
                            }}
                        />
                    );
                }

                // If the zoom is greater than 16, display nothing
                return null;
            })}
            </>
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

            <div id="map">
                <MapContainer key={key} ref={mapRef} center={mapData.defaultCenter} zoom={mapData.defaultZoom} scrollWheelZoom={true} renderer={L.canvas()}>

                    <DynamicIconMarkersCentroidsContaminesZonesTolerees points={centroidesContaminesZonesTolerees} />

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
                    {Object.values(geojsonData).map((data, index) => (
                        <GeoJSON key={index}
                        data={data}
                        style={styleGeoJSON}
                        onEachFeature={popupGeoJSON}
                        renderer={L.canvas()}
                        />
                    ))}
                    {/* Layer with the bivouac locations */}
                    {locationData.map((location, index) => (
                        <Marker key={index} position={location} icon={iconLocation} renderer={L.canvas()} />
                    ))}
                    <div className="container-site-zone-location">
                        {/* Hide site zone drop-down during the capture phase */}
                        {!displayOverlayCaptureImages && <ZoomToSiteZone />}
                    </div>

                    {/* Popup when quota reached, suggestion of next available date */}
                    <Dialog
                        open={popupFullBookingNextAvailableDateShow}
                        onClose={() => setPopupFullBookingNextAvailableDateShow(false)}
                        maxWidth="xs"
                        fullWidth={false}
                        PaperProps={{
                        style: {
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            maxWidth: '250px'
                        },
            }}
                    >
                        <DialogContent style={{ padding: "0px 15px" }}>
                            <p>{t("Invalid location next date available")}</p>
                            <p>{twoNextAvailableDatesZoning && nameCurrentAreaSelected !== "" && moment(twoNextAvailableDatesZoning[nameCurrentAreaSelected][locationData.length === 0 ? 0 : 1]).format('DD/MM/YYYY')}</p>
                        </DialogContent>
                        <DialogActions style={{ justifyContent: "center" }}>
                            <Button
                                onClick={() => setPopupFullBookingNextAvailableDateShow(false)}
                                style={{ backgroundColor: "#007854", color: "#ffffff" }}
                                variant="contained"
                            >
                                OK
                            </Button>
                        </DialogActions>
                    </Dialog>

                    {/* Hide legend during the capture phase */}
                    {!displayOverlayCaptureImages && <MapLegend />}
                    <SetMapProperties />

                    {/* Overlay to prevent interaction with the map during the capture */}
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            zIndex: 9999,
                            display: displayOverlayCaptureImages ? 'block' : 'none',
                        }}
                        onClick={(e) => e.stopPropagation()}
                    />
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
                    disabled={disableButtonNextStep}
                    name={resultsQuizzCompleted ? "thanks" : "quizz"}
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
