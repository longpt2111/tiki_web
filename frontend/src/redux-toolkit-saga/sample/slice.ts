import { PayloadAction, combineReducers, createSlice } from "@reduxjs/toolkit";
import sampleAdapterReducer from "./sub-slice/crud-slice";

type SampleState = {
  prop: string;
};

export const initialState: SampleState = {
  prop: "",
};

const sampleSlice = createSlice({
  name: "@sample-component",
  initialState,
  reducers: {
    setProp: (state, action: PayloadAction<SampleState["prop"]>) => {
      state.prop = action.payload;
    },
    resetMockState: () => initialState,
  },
});

export const { setProp, resetMockState } = sampleSlice.actions;

export default combineReducers({
  information: sampleSlice.reducer,
  sampleAdapter: sampleAdapterReducer,
});
