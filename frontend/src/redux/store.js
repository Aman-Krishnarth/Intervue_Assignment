import { configureStore } from "@reduxjs/toolkit";
import questionSlice from "./questionSlice/questionSlice";

export const store = configureStore({
    reducer: {
        question: questionSlice,
    },
});
