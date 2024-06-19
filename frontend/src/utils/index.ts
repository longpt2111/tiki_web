import { isEmpty } from "lodash";

const appendQueryParams = (path: string, queries: { [key: string]: string | number }): string => {
  const params = new URLSearchParams();

  Object.keys(queries).forEach((key) => {
    if (queries[key] !== undefined && queries[key] !== null) {
      params.set(key, queries[key].toString());
    }
  });

  const newParams = params.toString();
  return newParams ? `${path}?${newParams}` : path;
};

export function generateApiUrl(
  url: string,
  data?: { [key: string]: string | number },
  queries?: { [key: string]: string | number }
) {
  let result = url;

  if (data) {
    Object.keys(data).forEach((key) => {
      result = result.replace(new RegExp(`:${key}`, "g"), encodeURIComponent(data[key].toString()));
    });
  }

  return !isEmpty(queries) ? appendQueryParams(result, queries) : result;
}
