// import { useNavigate } from "react-router-dom";
import "../styles/Quizz.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export default function Quizz() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const nextStep = (event) => {
        let nextPage = event.target.name;
        navigate("/" + nextPage);
    };


    return (
        <>
            <h1>{t("Quizz")}</h1>
            <Alert severity="success">
                <AlertTitle>{t("Step")} 3/4</AlertTitle>
                Répondez à ce petit Quizz
            </Alert>
            TODO : Quizz

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
                    onClick={nextStep}
                    name="localisation"
                >
                    {t("Previous step")}
                </Button>
            </Box>
        </>
    );
}
