import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

export const loadingSlice = createSlice({
  name: "loading",
  initialState,

  reducers: {
    setLoding(state, action: any) {
      state.loading = action.payload;
    },
  },
});

export const { setLoding } = loadingSlice.actions;

export default loadingSlice.reducer;
