import { createEntityAdapter, EntityId, EntityState } from "@reduxjs/toolkit";

export type Params = any | void;

export type Response<T> = {
  data: T;
};

export type UpdatedResponse<T> = Response<Partial<T>[]> & {
  updatedCount?: number;
  insertedCount?: number;
};
export type DeletedResponse<T> = Response<Partial<T>[]> & {
  deletedCount?: number;
};
export type InsertedResponse<T> = Response<Partial<T>[]> & {
  insertedCount?: number;
};
export type Services<T> = {
  get: (params?: Params) => Promise<Response<T[]>>;
  create?: (params?: Params) => Promise<InsertedResponse<T>>;
  update?: (params?: Params) => Promise<UpdatedResponse<T>>;
  delete?: (params?: Params) => Promise<DeletedResponse<T>>;
};

export type Config<T, S extends Services<T> = Services<T>> = {
  services: S;
  autoSync?: boolean;
} & Parameters<typeof createEntityAdapter<T, EntityId>>[0];

export type AsyncState<T> = EntityState<T, EntityId> & {
  loading: boolean;
  updatedCount?: number;
  deletedCount?: number;
  insertedCount?: number;
  queries?: Params;
  requestId?: string;
  errorMessage?: string;
};
