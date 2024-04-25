import AppBar from "@mui/material/AppBar";
import "../styles/Header.css";
import Container from "@mui/material/Container";
import Box from '@mui/material/Box';
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Select from "@mui/material/Select";
import { useTranslation } from "react-i18next";
import { updateCurrentLanguage } from "../stores/General";
import { useDispatch } from "react-redux";

const Header = () => {
    const dispatch = useDispatch();

    const { t, i18n } = useTranslation();
    // Available languages
    const listLanguages = {
        fr: t("languageFrench"),
        en: t("languageEnglish"),
        it: t("languageItalian"),
    };
    // availableLanguages
    const currentLanguage = listLanguages[i18n.resolvedLanguage];

    // Update of the language and of the url
    const handleLanguageChange = (event) => {
        let languageName = event.target.value;
        let lng = "";

        // Translation in the url
        if (languageName === t("languageFrench")) {
            lng = "fr";
        } else {
            if (languageName === t("languageEnglish")) {
                lng = "en";
            }
            else {
                lng = "it";
            }
        }
        i18n.changeLanguage(lng);
        dispatch(updateCurrentLanguage(lng));
    };

    return (
        <>
            <Box sx={{ bgcolor: 'rgb(171 211 110)', height: '360px'}} className="img-header">
            </Box>
            <AppBar
                sx={{
                    position: "static",
                    height: "68px",
                    background: "rgb(200 233 149)"
                }}
            >
                <Container maxWidth="">
                    <Toolbar sx={{ display: 'flex', flexDirection: 'row-reverse', boxShadow: 0}}
                    >
                        <div id="box-select-language">
                            <Select
                                id="appbar-select-language"
                                defaultValue={currentLanguage}
                                value={currentLanguage}
                                onChange={handleLanguageChange}
                            >
                                {Object.values(listLanguages).map(
                                    (languageName, i) => {
                                        return (
                                            <MenuItem value={languageName} key={i}>
                                                {languageName}
                                            </MenuItem>
                                        );
                                    }
                                )}
                            </Select>
                        </div>

                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
};

export default Header;
