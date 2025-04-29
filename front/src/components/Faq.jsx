import "../styles/Faq.css";
import { useTranslation } from "react-i18next";
import store from "../store";

export default function Faq() {
    const {t, i18n } = useTranslation();

    let faqData = store.getState().faq[i18n.resolvedLanguage];

    return (
        <div>
            <h1>{t("Tab faq")}</h1>
            <div dangerouslySetInnerHTML={{
            __html: faqData,
        }}>
            </div>
        </div>
    );
}
