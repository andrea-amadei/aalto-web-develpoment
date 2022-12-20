import { configureStore } from '@reduxjs/toolkit';
import anecdotesReducer from './anecdotesReducer';
import notificationReducer from './notificationReducer';
import filterReducer from './filterReducer';

const store = configureStore({
  reducer: {
    anecdotes: anecdotesReducer,
    notification: notificationReducer,
    filter: filterReducer
  }
});

export default store;
