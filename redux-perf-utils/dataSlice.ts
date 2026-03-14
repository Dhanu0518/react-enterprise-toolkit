import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface DataState {
  items: any[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: DataState = {
  items: [],
  status: "idle",
  error: null,
};

// Professional Async Thunk with Error Handling
export const fetchEnterpriseData = createAsyncThunk(
  "data/fetchData",
  async (endpoint: string, { rejectWithValue }) => {
    try {
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error("Network response was not ok");
      return await response.json();
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to fetch data");
    }
  }
);

export const dataSlice = createSlice({
  name: "enterpriseData",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEnterpriseData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchEnterpriseData.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.status = "succeeded";
          state.items = action.payload;
        }
      )
      .addCase(fetchEnterpriseData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = dataSlice.actions;
export default dataSlice.reducer;
