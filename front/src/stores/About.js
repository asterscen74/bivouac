import { createSlice } from "@reduxjs/toolkit";

export const about = createSlice({
    name: "about",
    initialState: {
        fr: `
        <p> TODO : Ecrire page à propos en français </p>
        `,
        en: `
        <p>TODO : Write about page in English </p>
        `,
        it: `
        <p>TODO : Scrivere la pagina A proposito in italiano </p>
        `
    }
});

export default about.reducer;
