import { createSlice } from "@reduxjs/toolkit";

export const general = createSlice({
  name: "general",
  initialState: {
    infos: {},
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
        } else if (part === "localisation") {
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
  },
});

export const { updateResults, updateReservation, updateLocalisationPositions } = general.actions;

export default general.reducer;
