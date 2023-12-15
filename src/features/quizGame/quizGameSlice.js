import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: '',
    categoryId: 0,
    categoryName: '',
    questions: [],
    answers: []
};

export const quizGameSlice = createSlice({
    name: 'quizGame',
    initialState,
    reducers: {
        startGame: (state, action) => {
            return {
                ...state,
                name: action.payload.name,
                categoryId: action.payload.categoryId,
                categoryName: action.payload.categoryName,
                questions: action.payload.questions,
                answers: []
            }
        },
        addAnswer: (state, action) => {
            state.answers.push(action.payload);
            return state;
        },
        reset: () => {
            return initialState;
        }
    }
});

export const quizGameReducer = quizGameSlice.reducer;

export const { startGame, addAnswer, reset } = quizGameSlice.actions;

export const getName = (state) => {
    return state.quizGame.name;
}

export const getCategoryId = (state) => {
    return state.quizGame.categoryId;
}

export const getCategoryName = (state) => {
    return state.quizGame.categoryName;
}

export const getCurrentQuestionIndex = (state) => {
    return state.quizGame.answers.length;
}

export const nextQuestion = (questionId) => (state) => {
    if (questionId === undefined || questionId >= state.quizGame.questions.length) {
        return null;
    }
    return state.quizGame.questions[questionId];
}

export const getAnswers = (state) => {
    return state.quizGame.answers;
}
