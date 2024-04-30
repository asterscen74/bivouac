import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import { Provider } from "react-redux";
import store from "./store";

import Home from "./components/Home";
import Localisation from './components/Localisation';
import Informations from './components/Informations';
import Quizz from './components/Quizz';
import Thanks from './components/Thanks';

import { Route, Routes } from "react-router";
import { Navigate } from "react-router-dom";
import './i18n';

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Footer from './components/Footer';
import Header from './components/Header';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
      <Provider store={store}>
        <CssBaseline />
        <Header/>
        <Container fixed>
          <Routes>
              <Route path="/home" exact element={<Home />} />
              <Route path="/informations" element={<Informations />} />
              <Route path="/localisation" element={<Localisation />} />
              <Route path="/quizz" element={<Quizz />} />
              <Route path="/thanks" element={<Thanks />} />
              <Route path="*" element={<Navigate replace to="/home" />} />
          </Routes>
          <Divider variant="full" />
          <Footer/>
        </Container>
      </Provider>
    </BrowserRouter>
);
