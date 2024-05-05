import "../styles/About.css";
import { useTranslation } from "react-i18next";
import store from "../store";

export default function About() {
    const {t, i18n } = useTranslation();

    let aboutData = store.getState().about[i18n.resolvedLanguage];

    return (
        <div>
            <h1>{t("Tab about")}</h1>
            <div dangerouslySetInnerHTML={{
            __html: aboutData,
        }}>
            </div>
        </div>
    );
}
