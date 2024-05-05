import { configureStore } from "@reduxjs/toolkit";
import General from "./stores/General";
import Quizz from "./stores/Quizz";
import Infos from "./stores/Infos";
import Results from "./stores/Results";
import Map from "./stores/Map";

export default configureStore({
    reducer: {
        general: General,
        quizz: Quizz,
        infos: Infos,
        results: Results,
        map: Map
    },
});
