import createSagaMiddleware from "@redux-saga/core";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import rootSaga from "./rootSaga";
// @ts-expect-error unresolved import error
import { promiseMiddleware, ArgumentError } from "@adobe/redux-saga-promise";
import { rootReducer as reducers } from "src/redux-toolkit-saga";

const rootReducer = combineReducers(reducers);
const sagaMiddleware = createSagaMiddleware({
  onError: (error) => {
    if (error instanceof ArgumentError) {
      console.log("Oops, programmer error! I called redux-saga-promise incorrectly:", error);
    }
  },
});

export const setupStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
      })
        .concat(sagaMiddleware)
        .concat(promiseMiddleware),
  });
  const saga = sagaMiddleware.run(rootSaga);
  return {
    store,
    saga,
  };
};

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["store"]["dispatch"];
export type RootState = ReturnType<typeof rootReducer>;
