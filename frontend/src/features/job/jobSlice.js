import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const addJobs = createAsyncThunk("jobs/addJobs", async (data) => {
  const response = await api.post("/jobs/create/", data);
  console.log(response.data);
  return response.data;
});

const initialState = {
  jobs: [],
  status: "idle",
  error: null,
};

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(addJobs.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addJobs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.jobs.unshift(action.payload);
      })
      .addCase(addJobs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default jobSlice.reducer;
