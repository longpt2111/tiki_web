import { all } from "redux-saga/effects";
import { rootSaga as sagas } from "src/redux-toolkit-saga";

export default function* rootSaga() {
  yield all([sagas()]);
}
