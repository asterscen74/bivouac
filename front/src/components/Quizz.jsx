import "../styles/Quizz.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import QuizzComponent from "./QuizzComponent";
import store from "../store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateReservation } from "../stores/Results";
import api_url from "../settings-server.js";
import CircularProgress from '@mui/material/CircularProgress';

export default function Quizz() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const numberAnswersExpected = 5;
    const [displayAlert, setDisplayAlert] = useState(
        false
    );
    const [saveReservation, setSaveReservation] = useState(
        false
    );
    const [displayCircularProgress, setDisplayCircularProgress] = useState(false);
    const nameNextPage = "thanks";
    let resultsData = store.getState().results;
    let resultsInfosData = resultsData.infos;
    const nameInformationsPage = "informations";

    // Redirect to the informations page if the page has not been completed
    useEffect(() => {
        if (Object.keys(resultsInfosData).length === 0) {
            navigate("/declaration-bivouac/" + nameInformationsPage);
        }

    }, [resultsInfosData, navigate]);

    useEffect(() => {
        // Alert is displayed for 7.5 seconds
        setTimeout(() => {
            setDisplayAlert(false);
        }, 7500);
      }, [displayAlert]);

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
            const responseData = await response.json()

            if (response.status !== 200) {
                dispatch(updateReservation({
                    status: false,
                    output_message: t("Registration error")
                }))
            }
            else {
                dispatch(updateReservation({
                    status: true,
                    output_message: responseData.content
                }))
            }
            navigate("/declaration-bivouac/" + nameNextPage)
            setDisplayCircularProgress(false);

        }

        // Save the booking
        if (saveReservation === true) {
            const resultsData = store.getState().results;
            submitSurvey(resultsData);
        }

    }, [saveReservation, dispatch, navigate, t]);

    const previousStep = (event) => {
        let nextPage = event.target.name;
        navigate("/declaration-bivouac/" + nextPage);
    };

    const nextStep = () => {
        const quizzData = store.getState().results.quizz;
        if (Object.keys(quizzData).length < numberAnswersExpected) {
            setDisplayAlert(true);
        } else {
            setDisplayAlert(false);
            setDisplayCircularProgress(true);
            setSaveReservation(true);
        }
        // // // comment above and uncomment below to move through the steps quickly without filling in the form or using routing
        // setSaveReservation(true);
    };

    return (
        <>
            <h1>{t("The good practices quiz")}</h1>
            <Alert severity="success">
                <AlertTitle>{t("Step")} 3/4</AlertTitle>
                {t("Please answer this little quiz")}
            </Alert>

            <QuizzComponent />

            {/* The quiz was not completed correctly */}
            {displayAlert &&
            <Alert severity="error">
                <AlertTitle>{t("Incomplete quiz")}</AlertTitle>
            </Alert>}

            <Box sx={{ display: 'flex', flexDirection: 'row-reverse', p: 2}}>
                {/* Awaiting response from api */}
                {displayCircularProgress &&
                <Box sx={{ display: 'flex', marginLeft: '10px', alignItems: 'center' }}>
                    <CircularProgress sx={{ color: '#76B72A '}} />
                </Box>
                }
                <Button
                    variant="outlined"
                    onClick={nextStep}
                    name="thanks"
                >
                    {t("Confirm reservation")}
                </Button>
                <Button
                    variant="outlined"
                    onClick={previousStep}
                    name="localisation"
                >
                    {t("Previous step")}
                </Button>
            </Box>
        </>
    );
}
