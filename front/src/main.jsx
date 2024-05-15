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
import { Navigate } from "react-router-dom";
import './i18n';

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Footer from './components/Footer';
import Header from './components/Header';
import About from './components/About';
import GoodPractices from './components/GoodPractices';
import BivouacDeclaration from './components/BivouacDeclaration';
import Contacts from './components/Contacts';
import LegalNotices from './components/LegalNotices';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
      <Provider store={store}>
        <CssBaseline />
        <Header/>
        <Container fixed>
          <Routes>
              <Route path="/a-propos" exact element={<About />} />
              <Route path="/les-bonnes-pratiques" exact element={<GoodPractices />} />
              <Route path="/declaration-bivouac" element={<BivouacDeclaration />}>
                <Route path='informations' element={<Informations />}/>
                <Route path='localisation' element={<Localisation />}/>
                <Route path='quizz' element={<Quizz />}/>
                <Route path='thanks' element={<Thanks />}/>
                <Route path="*" element={<BivouacDeclaration />} />
              </Route>
              <Route path="/contacts" exact element={<Contacts />} />
              <Route path="/mentions-legales" exact element={<LegalNotices />} />
              <Route path="*" element={<Navigate replace to="/declaration-bivouac" />} />
          </Routes>
          <Divider variant="full" />
          <Footer/>
        </Container>
      </Provider>
    </BrowserRouter>
);
