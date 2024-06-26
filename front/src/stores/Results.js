import { createSlice } from "@reduxjs/toolkit";

export const general = createSlice({
  name: "general",
  initialState: {
    infos: {},
    nb_tents_zoning_date: {},
    localisation: {
        locations: []
    },
    quizz: {},
    reservation: {
        confirmed: false,
        output_message: ""
    }
  },
  reducers: {
    updateResults: (state, props) => {
        const part = props.payload.part;
        const data = props.payload.data;
        if (part === "infos") {
            state.infos = data;
        } else if (part === "nb_tents_zoning_date") {
            state.nb_tents_zoning_date = data;
        }
        else if (part === "localisation") {
            state.localisation = data;
        } else if (part === "quizz") {
            state.quizz = data;
        }
    },
    updateReservation: (state, props) => {
        const status = props.payload.status;
        const output_message = props.payload.output_message;
        state.reservation = {
            confirmed: status,
            output_message: output_message
        };
    },
    updateLocalisationPositions: (state, props) => {
        const data = props.payload.data;
        state.localisation.locations = data;
    },
    resetResults: (state) => {
        state.infos = {};
        state.nb_tents_zoning_date = {};
        state.localisation = {
            locations: []
        };
        state.quizz = {};
  },
}
});

export const { updateResults, updateReservation, updateLocalisationPositions, resetResults } = general.actions;

export default general.reducer;
