import { createSlice } from "@reduxjs/toolkit";

export const questionSlice = createSlice({
    name: "question",
    initialState: {
        currentQuestion: {},
        questionSent: false,
        selectedIndex: null,
    },
    reducers: {
        setCurrentQuestion: (state, action) => {
            console.log("SET CURRENT QUESTION CALL HUA HAI");
            state.currentQuestion = action.payload;
        },
        isCurrentQuestionSent: (state, action) => {
            state.questionSent = action.payload;
        },
        setTime: (state, action) => {
            state.currentQuestion.time = action.payload;
        },
        setSelectedIndex: (state, action) => {
            console.log("SELECTED INDEX MEIN HU");
            console.log(action.payload);
            state.selectedIndex = action.payload;
        },
        setVotes: (state, action) => {
            console.log("SET VOTES");
            console.log(action.payload);
            state.currentQuestion.totalVotes = action.payload.totalVotes;
            state.currentQuestion.options = action.payload.options;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    isCurrentQuestionSent,
    setCurrentQuestion,
    setTime,
    setSelectedIndex,
    setVotes,
} = questionSlice.actions;

export default questionSlice.reducer;
