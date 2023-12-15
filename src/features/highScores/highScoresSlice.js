import { createSlice } from "@reduxjs/toolkit";

const HIGH_SCORE_LIMIT = 5;
const CATEGORY_LIMIT = 3;
const initialState = {};

export const highScoresSlice = createSlice({
    name: 'highScores',
    initialState,
    reducers: {
        loadScores: (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        },
        addScore: (state, action) => {
            const { name, category, score } = action.payload;

            // add to end
            state[category].push(action.payload);

            // push down while score is higher
            let i = state[category].length - 1;
            while (i > 0) {
                if (state[category][i].score <= state[category][i-1].score) {
                    break;
                }
                const tmp = state[category][i-1];
                state[category][i-1] = state[category][i];
                state[category][i] = tmp;
            }

            // remove if over the limits
            while (state[category].length > (category === 'High Scores' ? HIGH_SCORE_LIMIT : CATEGORY_LIMIT)) {
                state[category].pop();
            }

            // TODO: save to local storage
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
    for (const [cat, scores] of Object.entries(state)) {
        if (cat === 'All Categories' || cat === 'High Scores') {
            continue;
        }
        ret.push({category: cat, scores: scores});
    }
    return ret;
}
