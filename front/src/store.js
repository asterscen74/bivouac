import { configureStore } from "@reduxjs/toolkit";
import General from "./stores/General";
import Quizz from "./stores/Quizz";

export default configureStore({
    reducer: {
        general: General,
        quizz: Quizz
    },
});
