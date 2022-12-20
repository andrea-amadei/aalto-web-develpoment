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

export const { displayNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
