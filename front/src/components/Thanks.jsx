import "../styles/Thanks.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import store from "../store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetResults } from "../stores/Results";
import CircularProgress from '@mui/material/CircularProgress';
import { updateReservation } from "../stores/Results";
import api_url from "../settings-server.js";

export default function Thanks() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [displaySummaryBooking, setDisplaySummaryBooking] = useState(true);
    const [displayCircularProgress, setDisplayCircularProgress] = useState(false);
    const [saveReservation, setSaveReservation] = useState(
        false
    );
    const [confirmedBooking, setConfirmedBooking] = useState(false);
    const [alertSeverity, setAlertSeverity] = useState("");
    const [alertText, setAlertText] = useState("");

    const resultsInfosData = store.getState().results.infos;

    const capturedImages = useSelector((state) => state.results.localisation.capturedImages);

    const backToHome = (event) => {
        navigate("/" + event.target.name);
    };
    const backToInformations = (event) => {
        navigate("/" + event.target.name);
    };

    useEffect(() => {
        // Save survey data in the database and send the summary by e-mail
        async function submitSurvey(data) {
            const dataInfos = data.infos;
            const dataLocalisation = data.localisation;
            const dataQuizz = data.quizz;
            const dataQuizzLastQuestion = dataQuizz[t("Last question quiz")];
            const bodyInfos = JSON.stringify(dataInfos);
            const bodyLocalisation = JSON.stringify(dataLocalisation);
            const bodyQuizz = JSON.stringify({"quizz_note": dataQuizzLastQuestion});
            let body = JSON.stringify({ ...JSON.parse(bodyInfos), ...JSON.parse(bodyLocalisation), ...JSON.parse(bodyQuizz)});
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            const response = await fetch(api_url + 'reservations/?send_summary=true', {
                method: 'POST',
                mode: 'cors',
                body: body,
                headers: headers,
            })

            if (response.status !== 200) {
                dispatch(updateReservation({
                    status: false,
                    output_message: "Registration error"
                }))
                setConfirmedBooking(false);
                setAlertSeverity("error");
                setAlertText(t("Registration error"))
            }
            else {
                const responseData = await response.json()
                dispatch(updateReservation({
                    status: true,
                    output_message: responseData.content
                }))
                // Reset the results in the store
                dispatch(resetResults())
                setConfirmedBooking(true);
                setAlertSeverity("success");
                setAlertText(t("Summary sent"))
                setDisplaySummaryBooking(false);
            }
            setDisplayCircularProgress(false);

        }

        // Save the booking
        if (saveReservation === true) {
            const resultsData = store.getState().results;
            submitSurvey(resultsData);
        }

    }, [saveReservation, dispatch, navigate, t]);

    const SaveReservation = () => {
        setDisplayCircularProgress(true);
        setSaveReservation(true);
    };


    useEffect(() => {
        const backToStartDeclaration = (name) => {
            navigate("/" + name);
        };

        const resultsData = store.getState().results;
        if (Object.keys(resultsData.infos).length === 0) {
            backToStartDeclaration("informations");
            return
        }
      }, [navigate]);

    return (
        <>
            {/* Title */}
            {
                confirmedBooking === true ? (
                    <div>
                        <h1>{t("Reservation confirmed")}</h1>
                    </div>
                ) : (
                    <div>
                        <h1>{t("Reservation awaiting confirmation")}</h1>
                    </div>
                )
            }
            {/* Alert */}
            { alertText !== "" &&
            <div>
                <Alert severity={alertSeverity}>
                    <AlertTitle>{t("Step")} 4/4</AlertTitle>
                    {alertText}
                </Alert>
            </div>}

            <div className="summary-and-images">
                {/* Booking summary */}
                {displaySummaryBooking && (
                    <div className="reservation-summary">
                        <h2>{t("Summary of your booking")}</h2>
                        <div className="summary-item">
                            <span className="label">{t("Date")}</span> <span className="value">{resultsInfosData.date}</span>
                        </div>
                        <div className="summary-item">
                            <span className="label">{t("Number of people")}</span> <span className="value">{resultsInfosData.nb_people}</span>
                        </div>
                    </div>
                )}

                {/* Display captured images */}
                {capturedImages.length > 0 && (
                    <div className="captured-images">
                        <h2>{t("Reminder of reserved areas")}</h2>
                        <div className="images-container">
                            {capturedImages.map((image, index) => (
                                <img key={index} src={image} alt={`Captured ${index}`} className="captured-image" />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Buttons */}
            <Box sx={{ display: 'flex', flexDirection: 'row-reverse', p: 2}}>
                {/* Awaiting response from api */}
                {displayCircularProgress &&
                <Box sx={{ display: 'flex', marginLeft: '10px', alignItems: 'center' }}>
                    <CircularProgress sx={{ color: '#76B72A '}} />
                </Box>
                }

                {/* Reservation not confirmed */}
                {!confirmedBooking &&
                <div>
                    <Button
                        variant="outlined"
                        onClick={backToInformations}
                        name="informations"
                    >
                        {t("Modify reservation")}
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={SaveReservation}
                        name="thanks"
                    >
                        {t("Confirm reservation")}
                    </Button>
                    </div>
                }

                {/* Reservation confirmed */}
                {confirmedBooking &&
                    <Button
                    variant="outlined"
                    onClick={backToHome}
                    name="impacts-bivouac"
                >
                    {t("Home")}
                </Button>
                }
            </Box>
        </>
    );
}
