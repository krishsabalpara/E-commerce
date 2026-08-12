import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Redux/slices/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});