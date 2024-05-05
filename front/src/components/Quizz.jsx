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
import api_url from "../settings-server.js"

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
    const nameNextPage = "thanks";

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
            const bodyInfos = JSON.stringify(dataInfos);
            const bodyLocalisation = JSON.stringify(dataLocalisation);
            let body = JSON.stringify({ ...JSON.parse(bodyInfos), ...JSON.parse(bodyLocalisation)});
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

        }

        // Save the booking
        if (saveReservation === true) {
            const resultsData = store.getState().results;
            submitSurvey(resultsData)
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
