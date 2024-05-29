import AppBar from "@mui/material/AppBar";
import "../styles/Header.css";
import Container from "@mui/material/Container";
import Box from '@mui/material/Box';
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import { useTranslation } from "react-i18next";
import { updateCurrentLanguage } from "../stores/General";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import React from "react";

const Header = () => {
    const dispatch = useDispatch();
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const { t, i18n } = useTranslation();
    // Available languages
    const listLanguages = {
        fr: t("languageFrench"),
        en: t("languageEnglish"),
        it: t("languageItalian"),
    };
    // availableLanguages
    const currentLanguage = listLanguages[i18n.resolvedLanguage];

    const pages = [
        { label: t("Tab impact bivouacs"), id: "impacts-bivouac" },
        { label: t("Tab good practices"), id: "les-bonnes-pratiques" },
        { label: t("Tab bivouac declaration"), id: "declaration-bivouac" },
    ];

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

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
        <Box sx={{ bgcolor: '#007854', height: 'auto'}} >
            <img src="/src/assets/img/header.jpg" alt="img_header" className="img-header"/>
        </Box>
        <AppBar
            className="main-menu"
            sx={{
                position: "static",
                height: "68px",
                background: "#007854"
            }}
            >
        <Container maxWidth="">
          <Toolbar disableGutters>
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="#34515E"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.id} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                        <Link
                            style={{
                                textDecoration: "none",
                                color: "#ffffff",
                            }}
                            to={`/${page.id}`}
                        >
                            {page.label}
                        </Link>
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (

                <MenuItem key={page.id} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                        <Link
                            style={{
                                textDecoration: "none",
                                color: "#ffffff",
                            }}
                            to={`/${page.id}`}
                        >
                            {page.label}
                        </Link>
                    </Typography>
                </MenuItem>
              ))}
            </Box>
            <Box>
            <div id="box-select-language">
                        <Select
                            id="appbar-select-language"
                            className="combo-i18n"
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

            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>

    );
};

export default Header;
