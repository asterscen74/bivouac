// import { useNavigate } from "react-router-dom";
import "../styles/Informations.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export default function Informations() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const nextStep = (event) => {
        let nextPage = event.target.name;
        navigate("/" + nextPage);
    };

    return (
        <>
            <h1>{t("Informations")}</h1>
            <Alert severity="success">
                <AlertTitle>{t("Step")} 1/4</AlertTitle>
                Saisissez vos informations
            </Alert>

            TODO
            - Date du bivouac
            - Nombre de tentes
            - Nombre de personnes dans la tente
            - Mail du déclarant
            - France ou étranger
            - Département de résidence (liste déroulante des départements français)
            - Option en itinérance (attention besoin de remplir les différentes localisations de bivouac sans refaire la partie renseignements et quizz)

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
