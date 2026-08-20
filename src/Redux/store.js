import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Redux/slices/userSlice";
import cartReducer from "../Redux/slices/cartSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer
  },
});