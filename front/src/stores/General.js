import { createSlice } from "@reduxjs/toolkit";

// const { config } = require("../settings");
import config from "../settings"

export const general = createSlice({
  name: "general",
  initialState: {
    currentLanguage: config.defaultLanguage,
  },
  reducers: {
    updateCurrentLanguage: (state, props) => {
      const language = props.payload;
      state.currentLanguage = language;
    },
  },
});

export const { updateCurrentLanguage } = general.actions;

export default general.reducer;
