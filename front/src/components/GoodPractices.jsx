import "../styles/GoodPractices.css";
import { useTranslation } from "react-i18next";
import store from "../store";

export default function GoodPractices() {
    const {t, i18n } = useTranslation();

    let goodPracticesData = store.getState().legalNotices[i18n.resolvedLanguage];

    return (
        <div>
            <h1>{t("Tab good practices")}</h1>
            <div dangerouslySetInnerHTML={{
            __html: goodPracticesData,
        }}>
            </div>
        </div>
    );
}
