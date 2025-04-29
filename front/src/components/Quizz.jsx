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
import { updateQuizzCompleted } from "../stores/Results";
import { useDispatch } from "react-redux";

export default function Quizz() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const numberAnswersExpected = 6;
    const [displayAlert, setDisplayAlert] = useState(
        false
    );
    const nameNextPage = "thanks";
    let resultsData = store.getState().results;
    let resultsInfosData = resultsData.infos;
    const nameInformationsPage = "informations";

    // Redirect to the informations page if the page has not been completed
    useEffect(() => {
        if (Object.keys(resultsInfosData).length === 0) {
            navigate("/reservation-bivouac/" + nameInformationsPage);
        }

    }, [resultsInfosData, navigate]);

    useEffect(() => {
        // Alert is displayed for 7.5 seconds
        setTimeout(() => {
            setDisplayAlert(false);
        }, 7500);
      }, [displayAlert]);

    const previousStep = (event) => {
        let nextPage = event.target.name;
        navigate("/reservation-bivouac/" + nextPage);
    };

    const nextStep = () => {
        const quizzData = store.getState().results.quizz;
        if (Object.keys(quizzData).length < numberAnswersExpected) {
            setDisplayAlert(true);
        } else {
            setDisplayAlert(false);

            // Quizz completed store update
            dispatch(updateQuizzCompleted());
            navigate("/reservation-bivouac/" + nameNextPage)
        }
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
                    {t("Next step")}
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
