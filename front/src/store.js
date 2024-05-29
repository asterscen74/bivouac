import { configureStore } from "@reduxjs/toolkit";
import General from "./stores/General";
import Quizz from "./stores/Quizz";
import Infos from "./stores/Infos";
import Results from "./stores/Results";
import Map from "./stores/Map";
import Impacts from "./stores/Impacts";
import LegalNotices from "./stores/LegalNotices";
import GoodPractices from "./stores/GoodPractices";

export default configureStore({
    reducer: {
        general: General,
        quizz: Quizz,
        infos: Infos,
        results: Results,
        map: Map,
        impacts: Impacts,
        legalNotices: LegalNotices,
        goodPractices: GoodPractices
    },
});
