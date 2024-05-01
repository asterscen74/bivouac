import "../styles/About.css";
import { useTranslation } from "react-i18next";

export default function About() {
    const { t } = useTranslation();

    return (
        <>
            <h1>{t("Tab about")}</h1>
            TODO
            A propos
        </>
    );
}
