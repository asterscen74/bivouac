import { configureStore } from "@reduxjs/toolkit";
import General from "./stores/General";

export default configureStore({
    reducer: {
        general: General,
    },
});
