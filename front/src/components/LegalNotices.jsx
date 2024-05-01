import "../styles/LegalNotices.css";
import { useTranslation } from "react-i18next";

export default function LegalNotices() {
    const { t } = useTranslation();

    return (
        <>
            <h1>{t("Tab legal notices")}</h1>
            TODO
            Mentions Légales
        </>
    );
}
