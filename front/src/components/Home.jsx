import { useTranslation } from "react-i18next";
import "../styles/Home.css";
import store from "../store";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";

export default function Home() {
    const {t, i18n } = useTranslation();
    const navigate = useNavigate();

    const nextStep = () => {
        navigate("/reservation-bivouac/informations");
    };

    let homeData = store.getState().home[i18n.resolvedLanguage];
    return (
        <div>
            <h1>{t("Tab homepage")}</h1>
            <div dangerouslySetInnerHTML={{
            __html: homeData,
        }}>
            </div>
            <Box sx={{ display: 'flex', flexDirection: 'row-reverse', p: 2}}>
                <Button
                        variant="outlined"
                        onClick={nextStep}
                        name="localisation"
                    >
                        {t("Tab bivouac declaration")}
                </Button>
            </Box>
        </div>

    );
    }
