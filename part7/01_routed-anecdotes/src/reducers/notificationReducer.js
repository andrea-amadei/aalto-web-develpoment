import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    displayNotification: (state, action) => action.payload,

    hideNotification: {
      prepare: () => ({ payload: {} }),
      reducer: (state, payload) => null
    }
  }
});

const { displayNotification, hideNotification } = notificationSlice.actions;

let oldTimeout;

export const setNotification = (content, timeout) => {
  return async dispatch => {
    dispatch(displayNotification(content));

    clearTimeout(oldTimeout);
    oldTimeout = setTimeout(() => dispatch(hideNotification()), timeout);
  }
}

export default notificationSlice.reducer;
