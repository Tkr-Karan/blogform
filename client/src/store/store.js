import { configureStore } from "@reduxjs/toolkit";
import surveySlice from "./surveySlice";

const store = configureStore({
  reducer: {
    survey: surveySlice.reducer,
  },
});

export default store;
