import "../styles/Contacts.css";
import { useTranslation } from "react-i18next";

export default function Contacts() {
    const { t } = useTranslation();

    return (
        <>
            <h1>{t("Tab contacts")}</h1>
            TODO
            Contacts
        </>
    );
}
