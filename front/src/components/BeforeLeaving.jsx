import "../styles/BeforeLeaving.css";
import { useTranslation } from "react-i18next";
import store from "../store";

export default function BeforeLeaving() {
    const {t, i18n } = useTranslation();

    let beforeLeavingData = store.getState().beforeLeaving[i18n.resolvedLanguage];

    return (
        <div>
            <h1>{t("Tab before leaving")}</h1>
            <div dangerouslySetInnerHTML={{
            __html: beforeLeavingData,
        }}>
            </div>
        </div>
    );
}
