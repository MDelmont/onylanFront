import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activePage:'home',
};

const navStatusSlice = createSlice({
  name: "navStatus",
  initialState,
  reducers: {
    updateActivePage: (state, action) => {
      state.activePage = action.payload;
    },
  },
});

export const { updateActivePage } = navStatusSlice.actions;

export default navStatusSlice.reducer;
