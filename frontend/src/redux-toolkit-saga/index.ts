import { all, fork } from "redux-saga/effects";
import { reducer as sample, saga as sampleSaga } from "./sample";

export const rootReducer = { sample };

export function* rootSaga() {
  yield all([fork(sampleSaga)]);
}
