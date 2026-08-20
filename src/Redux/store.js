import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import cartReducer from "./slices/cartSlice";

/**
 * Redux store configuration.
 * Combines the following slices:
 *  - user: manages authenticated user state (id, name, email)
 *  - cart: manages shopping cart state (items, quantities)
 */
export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});