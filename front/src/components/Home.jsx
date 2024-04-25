import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import { useTranslation } from "react-i18next";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function Home() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const nextStep = (event) => {
        let nextPage = event.target.name;
        navigate("/" + nextPage);
    };

    return (
        <>
            <h1>{t("Welcome")}</h1>
            <p>
                Bienvenue sur le site de déclaration de bivouac
            </p>
            <Box sx={{ display: 'flex', flexDirection: 'row-reverse', p: 2}}>
                <Button
                    variant="outlined"
                    onClick={nextStep}
                    name="informations"
                >
                    {t("Start")}
                </Button>
            </Box>
        </>
    );
}
