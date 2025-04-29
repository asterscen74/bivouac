import "../styles/Cancel.css";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { TextField, Button, Box, Alert } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import api_url from "../settings-server.js";

export default function Cancel() {
    const { uuid } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [email, setEmail] = useState("");
    const [alertSeverity, setAlertSeverity] = useState("");
    const [alertText, setAlertText] = useState("");
    const [cancelReservation, setCancelReservation] = useState(false);  // Etat pour gérer l'annulation
    const [displayCircularProgress, setDisplayCircularProgress] = useState(false);
    const homePage = "impacts-bivouac"

    const handleCancel = () => {
        setDisplayCircularProgress(true);
        setCancelReservation(true);
    };

    useEffect(() => {
        async function cancelBooking() {
            const bodyUuid = JSON.stringify({ uuid });
            const bodyEmail = JSON.stringify({ email });
            const body = JSON.stringify({ ...JSON.parse(bodyUuid), ...JSON.parse(bodyEmail) });
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            const response = await fetch(api_url + 'reservations/cancel', {
                method: 'POST',
                mode: 'cors',
                body: body,
                headers: headers,
            });

            if (response.status !== 200) {
                setAlertSeverity("error");
                if (response.status === 400) {
                    setAlertText(t("Cancellation error"))

                } else {
                    setAlertText(t("Reservation not found"))
                }
            }
            else {
                setAlertSeverity("success");
                setAlertText(t("Cancellation confirmed"))

                // Navigate to the bivouac impacts page once cancellation has been confirmed
                setTimeout(() => {
                    navigate(`/${homePage}`);
                  }, 3000);

            }
            setDisplayCircularProgress(false);
        }

        if (cancelReservation) {
            cancelBooking();
            setCancelReservation(false);
        }
    }, [cancelReservation, uuid, email, t]);


    return (
        <div>
            <h1>{t("Reservation cancelled")}</h1>

            {/* Alert */}
            {alertText && (
                <Alert severity={alertSeverity}>
                    {alertText}
                </Alert>
            )}

            <Box sx={{ display: 'flex', flexDirection: 'column', width: '330px', margin: '0 auto' }}>
                {/* UUID not modifiable */}
                <TextField
                    label="Id"
                    value={uuid}
                    InputProps={{
                        readOnly: true,
                    }}
                    margin="normal"
                />

                {/* Email to be entered */}
                <TextField
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    margin="normal"
                />

                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '16px', marginBottom: '20px' }}>
                     {/* Awaiting response from api */}
                    {displayCircularProgress && (
                        <Box sx={{ display: 'flex', marginRight: '10px' }}>
                            <CircularProgress sx={{ color: '#76B72A ' }} />
                        </Box>
                    )}
                    {/* Button to cancel the booking */}
                    <Button
                        variant="outlined"
                        onClick={handleCancel}
                        sx={{
                        marginLeft: displayCircularProgress ? '10px' : '0',
                        flexGrow: 1,
                        width: '100%'
                        }}
                    >
                        {t("Cancel reservation")}
                    </Button>
                </Box>
            </Box>
        </div>
    );
}
