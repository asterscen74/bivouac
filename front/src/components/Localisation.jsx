// import { useNavigate } from "react-router-dom";
import "../styles/Localisation.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export default function Localisation() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const nextStep = (event) => {
        let nextPage = event.target.name;
        navigate("/" + nextPage);
    };

    return (
        <>
            <h1>{t("Localisation")}</h1>
            <Alert severity="success">
                <AlertTitle>{t("Step")} 2/4</AlertTitle>
                Saisissez vos emplacements de bivouac
            </Alert>
            TODO
            Map

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
                    onClick={nextStep}
                    name="informations"
                >
                    {t("Previous step")}
                </Button>
            </Box>
        </>
    );
}
