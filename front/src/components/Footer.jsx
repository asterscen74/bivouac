import "../styles/Home.css";
import "../styles/Footer.css";
import logoCen from '../assets/img/logo_cen.png'
import logoContamines from '../assets/img/logo_contamines.png'
import logoFrancenotionverte from '../assets/img/logo_francenationverte.png'
import logoRn74 from '../assets/img/logo_rn74.png'
import logoVcmb from '../assets/img/logo_vcmb.png'

import Container from '@mui/material/Container';

export default function Footer() {

    return (
        <>
            <Container >
                <img src={logoVcmb} className="logo" alt="VCMB logo" />
                <img src={logoContamines} className="logo" alt="Contamines logo" />
                <img src={logoFrancenotionverte} className="logo" alt="France Nation Verte logo" />
                <img src={logoRn74} className="logo" alt="RN74 logo" />
                <img src={logoCen} className="logo" alt="CEN logo" />
            </Container>
        </>
    );
}
