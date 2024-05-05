import { createSlice } from "@reduxjs/toolkit";

export const contacts = createSlice({
    name: "contacts",
    initialState: {
        fr: `
        <p> TODO : Ecrire page contacts en français </p>
        `,
        en: `
        <p>TODO : Write contacts page in English </p>
        `,
        it: `
        <p>TODO : Scrivere la pagina dei contatti in italiano </p>
        `
    }
});

export default contacts.reducer;
