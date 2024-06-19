import { all, call, put, takeLatest } from "redux-saga/effects";
import { getSampleData } from "src/service/sample-api";
import { SampleRequest, SampleResponse } from "src/types/api/sample.model";
import { createAsyncSaga } from "../utils/createAsyncSaga";
import { PREFIX } from "./constants";
import { setProp } from "./slice";

export const getSampleDataSaga = createAsyncSaga<void, SampleRequest>(PREFIX, function* (params) {
  try {
    const res = yield call(getSampleData, params);
    yield put(setProp((res as SampleResponse).response));
  } catch (error) {
    yield put(setProp(""));
    throw new Error(error as string);
  }
});

export default function* SampleSaga() {
  yield all([takeLatest(getSampleDataSaga.action, getSampleDataSaga.asyncSaga)]);
}
