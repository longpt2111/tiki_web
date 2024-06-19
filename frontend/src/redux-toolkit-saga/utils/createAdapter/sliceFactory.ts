import {
  ActionReducerMapBuilder,
  EntityAdapter,
  EntityId,
  EntityState,
  Update,
} from "@reduxjs/toolkit";
import { createSagaFactory } from "./sagaFactory";
import { AsyncState, Services } from "./types";
import { AnyAction } from "redux-saga";

export function createSliceFactory<T, S extends Services<T>>(
  prefix: string,
  adapter: EntityAdapter<T, EntityId>,
  sagas: ReturnType<typeof createSagaFactory<T, S>>,
  autoSync = false
) {
  return (builder: ActionReducerMapBuilder<AsyncState<T>>) => {
    builder.addCase(sagas.fetchAll.fulfilled, (state, action) => {
      (state as AsyncState<T>).queries = action.meta.request;
      adapter.setAll(state as EntityState<T, EntityId>, action.payload.data);
      if (state.updatedCount) {
        state.updatedCount = 0;
      }
      if (state.deletedCount) {
        state.deletedCount = 0;
      }
      if (state.insertedCount) {
        state.insertedCount = 0;
      }
    });
    builder.addCase(sagas.createRecords.fulfilled, (state, action) => {
      const params = action.payload.data as T[];
      state.insertedCount = action.payload.insertedCount || action.payload.data.length;
      if (autoSync) {
        adapter.addMany(state as EntityState<T, EntityId>, params);
      }
    });
    builder.addCase(sagas.updateRecords.fulfilled, (state, action) => {
      const params: Update<T, EntityId>[] = action.payload.data!.map((item) => ({
        id: adapter.selectId(item as T),
        changes: item,
      }));
      state.updatedCount = action.payload.updatedCount || action.payload.data.length;
      if (action.payload.insertedCount) state.insertedCount = action.payload.insertedCount;
      if (autoSync) {
        adapter.updateMany(state as EntityState<T, EntityId>, params);
      }
    });
    builder.addCase(sagas.deleteRecords.fulfilled, (state, action) => {
      state.deletedCount = action.payload.deletedCount || action.payload.data.length;
      if (autoSync) {
        adapter.removeMany(
          state as EntityState<T, EntityId>,
          action.payload.data!.map((item) => adapter.selectId(item as T))
        );
      }
    });
    builder.addMatcher(
      (action) => action.type.startsWith(prefix) && action.type.endsWith("/pending"),
      (state) => {
        state.loading = true;
        state.errorMessage = "";
      }
    );
    builder.addMatcher(
      (action) => action.type.startsWith(prefix) && action.type.endsWith("/fulfilled"),
      (state, action: AnyAction) => {
        state.loading = false;
        state.errorMessage = "";
        state.requestId = action?.meta?.requestId;
        if (action.type === sagas.updateRecords.actionType) {
          state.updatedCount = 0;
        }
        if (action.type === sagas.deleteRecords.actionType) {
          state.deletedCount = 0;
        }
        if (action.type === sagas.createRecords.actionType) {
          state.insertedCount = 0;
        }
      }
    );
    builder.addMatcher(
      (action) => action.type.startsWith(prefix) && action.type.endsWith("/rejected"),
      (state, action: AnyAction) => {
        state.loading = false;
        state.errorMessage = action.payload?.error;
        state.requestId = action?.meta?.requestId;
      }
    );
  };
}
