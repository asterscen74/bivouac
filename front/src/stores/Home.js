import { createSlice } from "@reduxjs/toolkit";

export const Home = createSlice({
    name: "Home",
    initialState: {
        fr: `
        <p>Véritables cœurs de nature, les réserves naturelles sont des espaces protégés par décret ministériel en vue de conserver un patrimoine naturel d’exception. Prenons le temps de contempler et de vivre leurs multiples facettes… mais soyons aussi acteur de leur préservation.</p>
        `,
        en: `
        <p>Nature reserves are areas protected by ministerial decree to preserve an exceptional natural heritage. Let's take the time to contemplate and experience their many facets... but let's also play a part in preserving them.</p>
        `,
        it: `
        <p>Le riserve naturali sono aree protette da un decreto ministeriale per preservare un patrimonio naturale eccezionale. Prendiamoci il tempo per contemplare e vivere le loro molteplici sfaccettature... ma facciamo anche la nostra parte per preservarle.</p>
        `
    }
});

export default Home.reducer;
