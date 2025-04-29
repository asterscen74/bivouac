import "../styles/LegalNotices.css";
import { useTranslation } from "react-i18next";
import store from "../store";

export default function LegalNotices() {
    const {t, i18n } = useTranslation();

    let legalNoticesData = store.getState().legalNotices[i18n.resolvedLanguage];

    return (
        <div>
            <h1>{t("Tab legal notices")}</h1>
            <div dangerouslySetInnerHTML={{
            __html: legalNoticesData,
        }}>
            </div>
        </div>
    );
}
