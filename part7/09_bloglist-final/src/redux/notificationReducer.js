import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: '', type: 'success' },
  reducers: {
    displayNotification: {
      prepare: (message, type) => ({ payload: { message, type } }),
      reducer: (state, action) => action.payload
    },

    hideNotification: {
      prepare: () => ({ payload: {} }),
      reducer: (state, payload) => ({ message: '', type: 'success' })
    }
  }
});

const { displayNotification, hideNotification } = notificationSlice.actions;

let oldTimeout;

export const setNotification = (message, type, timeout) => {
  return async dispatch => {
    dispatch(displayNotification(message, type));

    clearTimeout(oldTimeout);
    oldTimeout = setTimeout(() => dispatch(hideNotification()), timeout);
  }
}

export default notificationSlice.reducer;
