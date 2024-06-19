import { put } from "redux-saga/effects";
import { createAsyncSagaActions } from "./utils";

export type PayloadCreator<TResponse, TRequest = void> = (
  request: TRequest
) => Generator<any, TResponse, any>;

export function createAsyncSaga<TResponse, TRequest = void>(
  typePrefix: string,
  payloadCreator: PayloadCreator<TResponse, TRequest>
) {
  const { action, pending, fulfilled, rejected } = createAsyncSagaActions<TResponse, TRequest>(
    typePrefix
  );
  type TriggerAction = ReturnType<typeof action>;

  const asyncSaga = function* ({ payload, meta }: TriggerAction) {
    const requestId = meta.requestId;

    yield put(pending(payload, requestId));
    try {
      const result = yield* payloadCreator(payload);
      yield put(fulfilled(payload, requestId, result));
      return result;
    } catch (error) {
      yield put(rejected(payload, requestId, error));
      return error;
    }
  };

  return {
    actionType: action.type,
    action,
    pending,
    fulfilled,
    rejected,
    asyncSaga,
  };
}
