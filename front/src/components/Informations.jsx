import "../styles/Informations.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import store from "../store";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
import * as SurveyTheme from "survey-core/themes";
import { useDispatch } from "react-redux";
import { updateResults } from "../stores/Results";

export default function Informations() {

    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();

    let infosData = store.getState().infos[i18n.resolvedLanguage];

    const nextStep = (event) => {
        const result = survey.completeLastPage();
        if (result === true) {
            window.scrollTo(500, 500);
            let nextPage = event.target.name;
            navigate("/reservation-bivouac/" + nextPage);
        }
        // // comment above and uncomment below to move through the steps quickly without filling in the form or using routing
        // let nextPage = event.target.name;
        // navigate("/reservation-bivouac/" + nextPage);
    };

    const survey = new Model(infosData);
    survey.locale = i18n.resolvedLanguage;
    survey.applyTheme(SurveyTheme.PlainLightPanelless);

    // Save results until reservation is confirmed
    function saveSurveyData (survey) {
        const data = survey.data;
        dispatch(
            updateResults({
                part: "infos",
                data: data,
            })
        );
    }
    survey.onValueChanged.add(saveSurveyData);

    // Restore survey results
    const prevData = store.getState().results.infos;
    if (Object.keys(prevData).length > 0) {
        survey.data = prevData;
    }

    return (
        <>
            <h1>{t("Informations")}</h1>
            <Alert severity="success">
                <AlertTitle>{t("Step")} 1/4</AlertTitle>
                {t("Enter your informations")}
            </Alert>

            <div className="survey-container">
                <Survey
                model={survey}
                />
            </div>


            <Box sx={{ display: 'flex', flexDirection: 'row-reverse', p: 2}}>
                <Button
                    variant="outlined"
                    onClick={nextStep}
                    name="localisation"
                >
                    {t("Next step")}
                </Button>
            </Box>
        </>
    );
}