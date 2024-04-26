// import { useNavigate } from "react-router-dom";
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

export default function Informations() {

    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    let infosData = store.getState().infos[i18n.resolvedLanguage];

    const nextStep = (event) => {
        let nextPage = event.target.name;
        navigate("/" + nextPage);
    };

    const survey = new Model(infosData);
    survey.locale = i18n.resolvedLanguage;
    survey.applyTheme(SurveyTheme.PlainLightPanelless);
    survey.onComplete.add((sender) => {
        console.log(JSON.stringify(sender.data, null, 3));
        // TODO Enregistrer les informations
        // aller à la page suivante
        navigate("/localisation");
    });

    return (
        <>
            <h1>{t("Informations")}</h1>
            <Alert severity="success">
                <AlertTitle>{t("Step")} 1/4</AlertTitle>
                Saisissez vos informations
            </Alert>

            <Survey model={survey} />

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
