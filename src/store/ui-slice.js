import { createSlice } from "@reduxjs/toolkit";

const ui = createSlice({
  name: "ui",
  initialState: { isVisible: false, notification: null },
  reducers: {
    toggle(state) {
      state.isVisible = !state.isVisible;
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

export const uiActions = ui.actions;
export default ui;
