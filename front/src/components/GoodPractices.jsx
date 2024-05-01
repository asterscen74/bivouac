import "../styles/GoodPractices.css";
import { useTranslation } from "react-i18next";

export default function GoodPractices() {
    const { t } = useTranslation();

    return (
        <>
            <h1>{t("Tab good practices")}</h1>
            TODO
            Bonnes pratiques
        </>
    );
}
