import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: "",
  name: "",
  email: "",
}

export const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    loginUser: (state, action) => {
      state.id = action.payload.id
      state.name = action.payload.name
      state.email = action.payload.email
    },
  },
})

export const { loginUser } = userSlice.actions

export default userSlice.reducer