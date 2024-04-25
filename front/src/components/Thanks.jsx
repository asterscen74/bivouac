// import { useNavigate } from "react-router-dom";
import "../styles/Thanks.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export default function Thanks() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const nextStep = (event) => {
        let nextPage = event.target.name;
        navigate("/" + nextPage);
    };

    return (
        <>
            <h1>{t("Thanks")}</h1>
            <Alert severity="success">
                <AlertTitle>{t("Step")} 4/4</AlertTitle>
                Vous avez terminé ! Téléchargez le PDF.
            </Alert>
            TODO : Téléchargement PDF

            <Box sx={{ display: 'flex', flexDirection: 'row-reverse', p: 2}}>
                <Button
                    variant="outlined"
                    onClick={nextStep}
                    name="home"
                >
                    {t("Home")}
                </Button>
            </Box>
        </>
    );
}
