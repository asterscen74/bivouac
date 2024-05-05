import { createSlice } from "@reduxjs/toolkit";

export const LegalNotices = createSlice({
    name: "LegalNotices",
    initialState: {
        fr: `
        <p> TODO : Ecrire page mentions légales en français </p>
        `,
        en: `
        <p>TODO : Write legal notices page in English </p>
        `,
        it: `
        <p>TODO : Scrivere la pagina Avvisi legali in italiano </p>
        `
    }
});

export default LegalNotices.reducer;
