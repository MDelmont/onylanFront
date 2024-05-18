import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import modeThemeSlice from "./modeThemeSlice";
import userSlice from "./userSlice";
import navStatusSlice from "./navStatusSlice";

const store = configureStore({
  reducer: {
    modeThemeSliceReducer : modeThemeSlice,
    userSliceReducer: userSlice,
    navStatusSliceReducer:navStatusSlice,
  },
});

export const GetProviderStore = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
