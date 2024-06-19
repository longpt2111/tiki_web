import { createAction, nanoid } from "@reduxjs/toolkit";

export interface Meta<Request> {
  request: Request;
  requestId: string;
}

export function createAsyncSagaActions<Returned = void, Request = void>(typePrefix: string) {
  const getMetaData = (request: Request, requestId: string): { meta: Meta<Request> } => ({
    meta: { request, requestId },
  });

  return {
    action: createAction(typePrefix, (request: Request) => ({
      payload: request,
      meta: {
        requestId: typePrefix + nanoid(),
      },
    })),
    pending: createAction(`${typePrefix}/pending`, (request: Request, requestId: string) => ({
      payload: request,
      ...getMetaData(request, requestId),
    })),
    fulfilled: createAction(
      `${typePrefix}/fulfilled`,
      (request: Request, requestId: string, result: Returned) => ({
        payload: result,
        ...getMetaData(request, requestId),
      })
    ),
    rejected: createAction(
      `${typePrefix}/rejected`,
      (request: Request, requestId: string, error: any) => {
        const metaData = getMetaData(request, requestId);
        const rejectedMetaData = {
          ...metaData,
          meta: {
            ...metaData.meta,
          },
        };
        return {
          payload: error,
          ...rejectedMetaData,
        };
      }
    ),
  };
}
