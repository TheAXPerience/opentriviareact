import { configureStore } from '@reduxjs/toolkit';
import { categoriesReducer } from '../features/categories/categoriesSlice';
import { quizGameReducer } from '../features/quizGame/quizGameSlice';
import { highScoresReducer } from '../features/highScores/highScoresSlice';

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    quizGame: quizGameReducer,
    highScores: highScoresReducer
  },
});
