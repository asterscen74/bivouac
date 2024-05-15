import "../styles/Home.css";
import "../styles/Footer.css";
import logoCen from '../assets/img/logo_cen.png'
import logoContamines from '../assets/img/logo_contamines.png'
import logoFrancenotionverte from '../assets/img/logo_francenationverte.png'
import logoRn74 from '../assets/img/logo_rn74.png'
import logoVcmb from '../assets/img/logo_vcmb.png'
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

export default function Footer() {
    const { t } = useTranslation();
    const pages = [
        { label: t("Tab contacts"), id: "contacts" },
        { label: t("Tab legal notices"), id: "mentions-legales" },
    ];

    return (
        <div style={{ width: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
                <img src={logoVcmb} className="logo" alt="VCMB logo" />
                <img src={logoContamines} className="logo" alt="Contamines logo" />
                <img src={logoFrancenotionverte} className="logo" alt="France Nation Verte logo" />
                <img src={logoRn74} className="logo" alt="RN74 logo" />
                <img src={logoCen} className="logo" alt="CEN logo" />
            </Box>
            <Divider variant="full" />
            <Box sx={{ display: 'flex', justifyContent: 'center' }} className="menu-footer">
                {pages.map((page) => (
                    <span className="menu-footer-item" key={page.id}>
                        <Link
                            style={{
                                textDecoration: "none",
                                color: "#76B72A",
                            }}
                            to={`/${page.id}`}
                        >
                            {page.label}
                        </Link>
                    </span>
                ))}
            </Box>
        </div>
    );
}
