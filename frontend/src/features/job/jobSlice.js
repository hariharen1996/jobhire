import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const addJobs = createAsyncThunk("jobs/addJobs", async (data) => {
  const response = await api.post("/jobs/create/", data);
  console.log(response.data);
  return response.data;
});

export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async () => {
  const response = await api.get("/jobs/dashboard-api/");
  console.log(response.data);
  return response.data.jobs || [];
});

export const editJobs = createAsyncThunk(
  "jobs/editJobs",
  async ({ id, ...data }) => {
    const response = await api.put(`/jobs/update/${id}/`, data);
    return response.data;
  }
);

export const deleteJobs = createAsyncThunk("jobs/deleteJobs", async (id) => {
  await api.delete(`/jobs/delete/${id}/`);
  return id;
});

const initialState = {
  jobs: [],
  status: "idle",
  error: null,
  editJob: null,
  currentPage: 1,
  jobsPerPage: 6
};

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setCurrentPage: (state,action) => {
      state.currentPage = action.payload
    },
    setEditJob: (state, action) => {
      state.editJob = action.payload;
    },
    clearEditJob: (state) => {
      state.editJob = null;
    },
  },
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
      })
      .addCase(fetchJobs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(editJobs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editJobs.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.jobs.findIndex(
          (job) => job.id == action.payload.id
        );
        if (index !== -1) {
          state.jobs[index] = action.payload;
        }
      })
      .addCase(editJobs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteJobs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteJobs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.jobs = state.jobs.filter((job) => job.id !== action.payload);
      })
      .addCase(deleteJobs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setEditJob, clearEditJob,setCurrentPage } = jobSlice.actions;
export default jobSlice.reducer;