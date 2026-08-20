import { createSlice } from "@reduxjs/toolkit";

/**
 * Cart Redux slice.
 * Manages the shopping cart state including items, quantities,
 * and user association. Cart is persisted per-user via localStorage
 * in the Homepage and Cart page components.
 */
const cartSlice = createSlice({
  name: "cart",

  initialState: {
    userId: "",
    items: [],
    subTotal: 0,
    shipping: 0,
    total: 0,
  },

  reducers: {
    /** Replace the entire cart state (used when loading from localStorage) */
    setCart: (state, action) => {
      state.userId = action.payload.userId;
      state.items = action.payload.items || [];
    },

    /** Add a product to cart; increments quantity if the product already exists */
    addToCart: (state, action) => {
      const { userId, product } = action.payload;

      // If the user changed, reset the cart for the new user
      if (state.userId !== userId) {
        state.userId = userId;
        state.items = [];
      }

      const existing = state.items.find(
        (item) => item.id === product.id
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({
          ...product,
          quantity: 1,
        });
      }
    },

    /** Remove a product entirely from the cart by its id */
    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
    },

    /** Increase the quantity of a cart item by 1 */
    increaseQuantity: (state, action) => {
      const item = state.items.find(
        (item) => item.id === action.payload
      );

      if (item) {
        item.quantity += 1;
      }
    },

    /** Decrease the quantity of a cart item by 1 (minimum quantity is 1) */
    decreaseQuantity: (state, action) => {
      const item = state.items.find(
        (item) => item.id === action.payload
      );

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    /** Remove all items from the cart */
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  setCart,
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;