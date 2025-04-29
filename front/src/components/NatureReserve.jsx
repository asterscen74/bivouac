import "../styles/NatureReserve.css";
import { useTranslation } from "react-i18next";
import store from "../store";

export default function NatureReserve() {
    const {t, i18n } = useTranslation();

    let natureReserveData = store.getState().natureReserve[i18n.resolvedLanguage];

    return (
        <div>
            <h1>{t("Tab nature reserves")}</h1>
            <div dangerouslySetInnerHTML={{
            __html: natureReserveData,
        }}>
            </div>
        </div>
    );
}
