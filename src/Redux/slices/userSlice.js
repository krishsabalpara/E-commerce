import { createSlice } from "@reduxjs/toolkit";

/**
 * User Redux slice.
 * Manages the currently authenticated user's state.
 * Empty string values indicate no user is logged in.
 */
const initialState = {
  id: "",
  name: "",
  email: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    /**
     * Set the logged-in user's data.
     * Also used for logout by dispatching with empty string values.
     */
    loginUser: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
  },
});

export const { loginUser } = userSlice.actions;

export default userSlice.reducer;