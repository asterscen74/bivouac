import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'rgb(237, 247, 237)',
  borderRadius: '4px',
  color: 'rgb(30, 70, 32)',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(true);

  const nextStep = (event) => {
    navigate("/les-bonnes-pratiques/");
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {t("Bivouac in Haute-Savoie's Nature Reserves :")}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <ul>
              <li><b>{t("From 1st June to 30th September")}</b> :<br />{t("reservation is required.")}</li>
              <li><b>{t("From 1st October to end of May")}</b> :<br />{t("no need to make a reservation.")}</li>
            </ul>
            <br />
            <a target="_blank" href="https://www.haute-savoie.gouv.fr/Actions-de-l-Etat/Vos-loisirs/Montagne-en-ete/Bivouac-et-baignade-dans-les-reserves-naturelles">{t("Regulations concerning natural areas in Haute-Savoie")}</a><br />
            <br />
            {t("We are currently outside of the booking period. Site will reopen in the spring of 2027 : https://reserve-bivouac74.fr/")}<br />
            <br />
            {t("Regardless of the time period, please respect the Nature Reserve (no litter, no fires, discretion...).")}<br />
            <br />
          </Typography>
          <Button
            style={{ backgroundColor: "#007854", color: "#ffffff", left: "10%"}}
            variant="contained"
            onClick={nextStep}
          >
            {t("Close window")}
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
