import { EntityId, createEntityAdapter } from "@reduxjs/toolkit";
import { createSagaFactory } from "./sagaFactory";
import { createSelectorFactory } from "./selectorFactory";
import { createSliceFactory } from "./sliceFactory";
import { AsyncState, Config, Services } from "./types";

export function createAdapder<E, S extends Services<E> = Services<E>>(
  prefix: string,
  config: Config<E, S>
) {
  const adapter = createEntityAdapter<E, EntityId>({
    selectId: config.selectId,
  });

  const sagas = createSagaFactory<E, S>(prefix, config.services);

  const addAsyncMapBuilder = createSliceFactory<E, S>(prefix, adapter, sagas, config.autoSync);

  const getInitialState: () => AsyncState<E> = () => {
    return adapter.getInitialState({
      loading: false,
      errorMessage: "",
    });
  };

  const createSelectors = function <V>(selectState: (state: V) => AsyncState<E>) {
    return createSelectorFactory(selectState, adapter);
  };

  return {
    sagas,
    ...adapter,
    addAsyncMapBuilder,
    getInitialState,
    createSelectors,
  };
}
