import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addToLeaderboards, loadLeaderboards, saveLeaderboards } from "../../utils/localLeaderboards";

const HIGH_SCORE_LIMIT = 10;
const CATEGORY_LIMIT = 5;

const initialState = {
    highScores: {},
    isLoading: true,
    errorMessage: ''
};

export const fetchHighScores = createAsyncThunk(
    'highScores/fetchHighScores',
    async () => {
        // set up leaderboards using categories
        const response = await fetch('https://opentdb.com/api_category.php');
        if (!response.ok) {
            return Promise.reject('Unable to fetch, status: ' + response.status);
        }
        const data = await response.json();

        const categories = [{id: 0, name: 'All Categories'}, ...data.trivia_categories];
        const ret = {'High Scores': []};
        for (const category of categories) {
            ret[category.name] = []
        }

        // get leaderboards from local storage
        const leaderboards = loadLeaderboards();
        return {...ret, ...leaderboards};
    }
);

export const highScoresSlice = createSlice({
    name: 'highScores',
    initialState,
    reducers: {
        loadScores: (state, action) => {
            return {
                ...state,
                highScores: {
                    ...state.highScores,
                    ...action.payload
                }
            }
        },
        addScore: (state, action) => {
            const { name, category, score } = action.payload;
            const highScores = state.highScores['High Scores'].slice();
            const categoryScores = state.highScores[category].slice();

            addToLeaderboards(highScores, HIGH_SCORE_LIMIT, {name: name, score: score});
            addToLeaderboards(categoryScores, CATEGORY_LIMIT, {name: name, score: score});

            state = {
                ...state,
                highScores: {
                    ...state.highScores,
                    ['High Scores']: highScores,
                    [category]: categoryScores
                }
            }
            saveLeaderboards(state.highScores);
        }
    },
    extraReducers: {
        [fetchHighScores.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchHighScores.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errorMessage = '';
            state.highScores = action.payload;
        },
        [fetchHighScores.rejected]: (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.error ? action.error.message : 'Unable to fetch.';
        }
    }
});

export const highScoresReducer = highScoresSlice.reducer;

export const { loadScores, addScore } = highScoresSlice.actions;

export const getAllLeaderboards = (state) => {
    const ret = [
        {category: 'High Scores', scores: state['High Scores']},
        {category: 'All Categories', scores: state['All Categories']}
    ];
    for (const [cat, scores] of Object.entries(state.highScores)) {
        if (cat === 'All Categories' || cat === 'High Scores') {
            continue;
        }
        ret.push({category: cat, scores: scores});
    }
    return ret;
}
