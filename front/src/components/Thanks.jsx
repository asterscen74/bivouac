import "../styles/Thanks.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import store from "../store";
import { useEffect } from "react";

export default function Thanks() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const reservationData = store.getState().results.reservation;

    const backToHome = (event) => {
        let nextPage = event.target.name;
        navigate("/" + nextPage);
    };

    useEffect(() => {
        const backToStartDeclaration = (name) => {
            navigate("/" + name);
        };

        const resultsData = store.getState().results;
        if (Object.keys(resultsData.infos).length === 0) {
            backToStartDeclaration("informations");
            return
        }
      }, [navigate]);

    return (
        <>
            {
                reservationData.confirmed === true ? (
                    <div>
                        <h1>{t("Reservation confirmed")}</h1>
                        <Alert severity="success">
                            <AlertTitle>{t("Step")} 4/4</AlertTitle>
                            {t("Summary sent")}
                        </Alert>
                    </div>
                ) : (
                    <div>
                        <h1>{t("Reservation not confirmed")}</h1>
                        <Alert severity="error">
                            <AlertTitle>{t("Step")} 4/4</AlertTitle>
                            {reservationData.output_message}
                        </Alert>
                    </div>
                )
            }


            <Box sx={{ display: 'flex', flexDirection: 'row-reverse', p: 2}}>
                <Button
                    variant="outlined"
                    onClick={backToHome}
                    name="home"
                >
                    {t("Home")}
                </Button>
            </Box>
        </>
    );
}