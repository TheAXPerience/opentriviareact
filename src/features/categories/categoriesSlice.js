import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    categoriesList: [],
    isLoading: true,
    errorMessage: ''
};

export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async () => {
        const response = await fetch('https://opentdb.com/api_category.php');
        if (!response.ok) {
            return Promise.reject('Unable to fetch, status: ' + response.status);
        }
        const data = await response.json();
        return [{id: 0, name: 'All Categories'}, ...data.trivia_categories];
    }
);

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchCategories.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchCategories.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.errorMessage = '';
            state.categoriesList = action.payload;
        },
        [fetchCategories.rejected]: (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.error ? action.error.message : 'Unable to fetch.';
        }
    }
});

export const categoriesReducer = categoriesSlice.reducer;
