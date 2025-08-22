import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    role: null,
    email: null,
    loading: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.role = action.payload.role;
      state.email = action.payload.email;
      state.loading = false;
    },
    clearUser: (state) => {
      state.role = null;
      state.email = null;
      state.loading = false;
    },
  },
});

export const { setUser, clearUser, setLoading } = userSlice.actions;
export default userSlice.reducer;
