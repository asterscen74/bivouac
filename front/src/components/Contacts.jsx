import "../styles/Contacts.css";
import { useTranslation } from "react-i18next";
import store from "../store";

export default function Contacts() {
    const {t, i18n } = useTranslation();

    let contactsData = store.getState().contacts[i18n.resolvedLanguage];

    return (
        <div>
            <h1>{t("Tab contacts")}</h1>
            <div dangerouslySetInnerHTML={{
            __html: contactsData,
        }}>
            </div>
        </div>
    );
}
