import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import { Provider } from "react-redux";
import store from "./store";

import Localisation from './components/Localisation';
import Informations from './components/Informations';
import Quizz from './components/Quizz';
import Thanks from './components/Thanks';

import { Route, Routes } from "react-router";
import './i18n';

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/Impacts';
import GoodPractices from './components/GoodPractices';
import BivouacDeclaration from './components/BivouacDeclaration';
import LegalNotices from './components/LegalNotices';
import NatureReserve from './components/NatureReserve';
import BeforeLeaving from './components/BeforeLeaving';
import Faq from './components/Faq';
import Cancel from './components/Cancel';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
      <Provider store={store}>
        <CssBaseline />
        <Header/>
        <Container fixed>
          <Routes>
              <Route path="/impacts-bivouac" exact element={<About />} />
              <Route path="/les-bonnes-pratiques" exact element={<GoodPractices />} />
              <Route path="/reservation-bivouac" element={<BivouacDeclaration />}>
                <Route path='informations' element={<Informations />}/>
                <Route path='localisation' element={<Localisation />}/>
                <Route path='quizz' element={<Quizz />}/>
                <Route path='thanks' element={<Thanks />}/>
                <Route path="cancel/:uuid" element={<Cancel />} />
              </Route>
              <Route path="/reserve-naturelle-haute-savoie" exact element={<NatureReserve />} />
              <Route path="/avant-de-partir" exact element={<BeforeLeaving />} />
              <Route path="/faq" exact element={<Faq />} />
              <Route path="/mentions-legales" exact element={<LegalNotices />} />
              <Route path="*" element={<Home />} />
          </Routes>
          <Divider variant="full" />
          <Footer/>
        </Container>
      </Provider>
    </BrowserRouter>
);
