import { EntityAdapter, EntityId } from "@reduxjs/toolkit";
import { createDeepEqualSelector } from "../selector-utils";
import { AsyncState } from "./types";

export function createSelectorFactory<T, V>(
  selectState: (state: V) => AsyncState<T>,
  adapter: EntityAdapter<T, EntityId>
) {
  const selectors = adapter.getSelectors<V>(selectState);
  const isLoading = createDeepEqualSelector(selectState, (items) => items.loading);

  const errorMessage = createDeepEqualSelector(selectState, (items) => items.errorMessage);

  const getQueries = createDeepEqualSelector(selectState, (items) => items.queries);

  const getRequestId = createDeepEqualSelector(selectState, (items) => items.requestId);

  const selectUpdatedCount = createDeepEqualSelector(
    [selectState],
    (state) => state?.updatedCount || 0
  );

  const isUpdated = createDeepEqualSelector(
    [selectUpdatedCount],
    (updatedCount) => updatedCount > 0
  );

  const selectDeletedCount = createDeepEqualSelector(
    [selectState],
    (state) => state?.deletedCount || 0
  );

  const isDeleted = createDeepEqualSelector(
    [selectDeletedCount],
    (deletedCount) => deletedCount > 0
  );

  const selectInsertedCount = createDeepEqualSelector(
    [selectState],
    (state) => state?.insertedCount || 0
  );

  const isInserted = createDeepEqualSelector(
    [selectInsertedCount],
    (insertedCount) => insertedCount > 0
  );

  return {
    ...selectors,
    isLoading,
    getQueries,
    getRequestId,
    selectUpdatedCount,
    selectDeletedCount,
    selectInsertedCount,
    isUpdated,
    isDeleted,
    isInserted,
    errorMessage,
  };
}
