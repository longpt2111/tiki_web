import {
  createPromiseAction,
  resolvePromiseAction,
  rejectPromiseAction,
  // @ts-expect-error unresolved import error
} from "@adobe/redux-saga-promise";
import { call } from "redux-saga/effects";

export type PayloadCreator<TResponse, TRequest = void> = (
  Request: TRequest
) => Generator<any, TResponse, any>;

export function createPromiseSaga<TResponse, TRequest = void>(
  typePrefix: string,
  payloadCreator: PayloadCreator<TResponse, TRequest>
) {
  const action = createPromiseAction(typePrefix);

  type TriggerAction = ReturnType<typeof action>;

  const promiseSaga = function* (action: TriggerAction) {
    try {
      const result = yield* payloadCreator(action.payload);
      yield call(resolvePromiseAction, action, result);
    } catch (error) {
      yield call(rejectPromiseAction, action, error);
    }
  };

  return {
    actionType: action.type,
    action,
    promiseSaga,
  };
}
