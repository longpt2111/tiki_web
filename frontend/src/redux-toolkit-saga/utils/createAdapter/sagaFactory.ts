import { call } from "redux-saga/effects";
import {
  DeletedResponse,
  InsertedResponse,
  Params,
  Response,
  Services,
  UpdatedResponse,
} from "./types";
import { createAsyncSaga } from "../createAsyncSaga";

export function createSagaFactory<T, S extends Services<T>>(prefix: string, services: S) {
  const fetchAll = createAsyncSaga<Response<T[]>, Parameters<S["get"]>[0]>(
    `${prefix}/fetchAll`,
    function* (request) {
      return yield call(services.get, request);
    }
  );

  const createRecords = createAsyncSaga<
    InsertedResponse<T>,
    S["create"] extends Function ? Parameters<S["create"]>[0] : Params
  >(`${prefix}/createRecords`, function* (params) {
    return yield call(services.create!, params);
  });

  const updateRecords = createAsyncSaga<
    UpdatedResponse<T>,
    S["update"] extends Function ? Parameters<S["update"]>[0] : Params
  >(`${prefix}/updateRecords`, function* (data) {
    return yield call(services.update!, data);
  });
  const deleteRecords = createAsyncSaga<
    DeletedResponse<T>,
    S["delete"] extends Function ? Parameters<S["delete"]>[0] : Params
  >(`${prefix}/deleteRecords`, function* (params) {
    return yield call(services.delete!, params);
  });

  return {
    fetchAll,
    createRecords,
    updateRecords,
    deleteRecords,
  };
}
