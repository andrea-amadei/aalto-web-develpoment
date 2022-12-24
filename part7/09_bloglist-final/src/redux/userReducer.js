import { createSlice } from '@reduxjs/toolkit';
import loginService from "../services/login";

const initialState = { id: '', token: '', username: '' }

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUserReducer: (state, action) => action.payload,

    removeUserReducer: {
      prepare: () => ({ payload: {} }),
      reducer: (state, action) => initialState
    }
  },
});

const { setUserReducer, removeUserReducer } = userSlice.actions;

export const setUser = (user) => {
  return async dispatch => {
    dispatch(setUserReducer(user));

    localStorage.setItem('id', user.id);
    localStorage.setItem('token', user.token);
    localStorage.setItem('username', user.username);
  }
}

export const removeUser = () => {
  return async dispatch => {
    dispatch(removeUserReducer());

    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }
}

export const initializeUser = () => {
  return async dispatch => {
    const id = localStorage.getItem('id') || '';
    const token = localStorage.getItem('token') || '';
    const username = localStorage.getItem('username') || '';

    dispatch(setUserReducer({ id, token, username }));
  }
}

export const loginUser = (username, password) => {
  return async dispatch => {
    const user = await loginService.login(username, password);
    delete user.name;

    dispatch(setUserReducer(user));

    localStorage.setItem('id', user.id);
    localStorage.setItem('token', user.token);
    localStorage.setItem('username', user.username);
  }
}

export default userSlice.reducer;
