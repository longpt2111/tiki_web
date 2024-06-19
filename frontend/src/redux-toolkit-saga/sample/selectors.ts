import { RootState } from "src/store/store";
import { createDeepEqualSelector } from "../utils/selector-utils";
import { sampleAdapter } from "./sub-slice/crud-slice";

const information = (state: RootState) => state.sample.information;

export const propSelector = createDeepEqualSelector([information], (state) => state.prop);

const sampleAdapterSelector = sampleAdapter.createSelectors<RootState>(
  (state) => state.sample.sampleAdapter
);

export const { getRequestId, selectAll, isUpdated } = sampleAdapterSelector;
