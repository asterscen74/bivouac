import { createSlice } from "@reduxjs/toolkit";

export const general = createSlice({
  name: "general",
  initialState: {
    infos: {},
    nb_tents_zoning_date: {},
    localisation: {
        locations: [],
        capturedImages: [],
    },
    quizz: {},
    quizzCompleted: false,
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
        }
        else if (part === "nb_tents_zoning_date") {
            state.nb_tents_zoning_date = data;
        }
        else if (part === "two_next_available_dates_zoning") {
            state.two_next_available_dates_zoning = data;
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
    updateLocalisationCapturedImages: (state, props) => {
        const data = props.payload.data;
        state.localisation.capturedImages = data;
    },
    clearLocalisationCapturedImages: (state) => {
        state.localisation.capturedImages = [];
    },
    updateQuizzCompleted: (state) => {
        state.quizzCompleted = true;
    },
    resetResults: (state) => {
        state.infos = {};
        state.nb_tents_zoning_date = {};
        state.two_next_available_dates_zoning = {};
        state.localisation = {
            locations: [],
            capturedImages: []
        };
        state.quizz = {};
        state.quizzCompleted = false;
  },
}
});

export const { updateResults, updateReservation, updateLocalisationPositions, updateLocalisationCapturedImages, clearLocalisationCapturedImages, updateQuizzCompleted, resetResults } = general.actions;

export default general.reducer;
