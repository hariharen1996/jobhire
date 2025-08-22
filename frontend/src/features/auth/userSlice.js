import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    role: null,
    email: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.role = action.payload.role;
      state.email = action.payload.email;
    },
    clearUser: (state) => {
      state.role = null;
      state.email = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
