import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  mode:"dark"
};





const modeThemeSlice = createSlice({
  name: "modeTheme",
  initialState,
  reducers: {
    updateMode: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const { updateMode } = modeThemeSlice.actions;

export default modeThemeSlice.reducer;
