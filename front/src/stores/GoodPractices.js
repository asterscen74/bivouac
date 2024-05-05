import { createSlice } from "@reduxjs/toolkit";

export const GoodPractices = createSlice({
    name: "GoodPractices",
    initialState: {
        fr: `
        <p> TODO : Ecrire page bonnes pratiques en français </p>
        `,
        en: `
        <p>TODO : Write good pratices page in English </p>
        `,
        it: `
        <p>TODO : Scrivere la pagina buena pratica in italiano </p>
        `
    }
});

export default GoodPractices.reducer;
