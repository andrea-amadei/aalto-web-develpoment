import { createSlice } from '@reduxjs/toolkit';
import anecdotesService from '../services/anecdotesService';

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addVoteToAnecdote: (state, action) => {
      state.find(x => x.id === action.payload).votes += 1;
      state.sort((a, b) => b.votes - a.votes);
    },

    addAnecdote: (state, action) => {
      state.push(action.payload);
      state.sort((a, b) => b.votes - a.votes);
    },

    setAllAnecdotes: (state, action) => {
      state = action.payload;
      state.sort((a, b) => b.votes - a.votes);
      return state;
    }
  }
});

const { addVoteToAnecdote, addAnecdote, setAllAnecdotes } = anecdotesSlice.actions;

export const initializeAnecdotes = () => {
  return async dispatch => {
    const newAnecdotes = await anecdotesService.getAll();
    dispatch(setAllAnecdotes(newAnecdotes));
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.createNew(content);
    dispatch(addAnecdote(newAnecdote));
  }
}

export const voteAnecdote = anecdote => {
  return async dispatch => {
    await anecdotesService.addVote(anecdote);
    dispatch(addVoteToAnecdote(anecdote.id));
  }
}

export default anecdotesSlice.reducer;
