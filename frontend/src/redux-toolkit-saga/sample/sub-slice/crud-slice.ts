import { createSlice } from "@reduxjs/toolkit";
import { FIX_ID, prefix } from "../constants";
import { getSampleData } from "src/service/sample-api";
import { createAdapder } from "src/redux-toolkit-saga/utils/createAdapter";
import { SampleResponse } from "src/types/api/sample.model";

const services = {
  get: getSampleData,
};

export const sampleAdapter = createAdapder<SampleResponse, typeof services>(
  `${prefix}-sample-adapter`,
  {
    services,
    selectId: () => FIX_ID,
  }
);

const sampleAdapterSlice = createSlice({
  name: `${prefix}-sample-adapter`,
  initialState: sampleAdapter.getInitialState(),
  reducers: {
    reset: () => sampleAdapter.getInitialState(),
  },
  extraReducers: (builder) => {
    sampleAdapter.addAsyncMapBuilder(builder);
  },
});

export default sampleAdapterSlice.reducer;

export const { reset: resetPastYearAccountBalances } = sampleAdapterSlice.actions;
