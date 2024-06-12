import "../styles/Impacts.css";
import { useTranslation } from "react-i18next";
import store from "../store";

export default function About() {
    const {t, i18n } = useTranslation();

    let impactsData = store.getState().impacts[i18n.resolvedLanguage];

    return (
        <div>
            <h1>{t("Tab impact bivouacs")}</h1>
            <div dangerouslySetInnerHTML={{
            __html: impactsData,
        }}>
            </div>
        </div>
    );
}
