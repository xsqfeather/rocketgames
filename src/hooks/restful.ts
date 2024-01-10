import useSWR from "swr";
import { stringify } from "query-string";

import { ENDPOINT, fetcher } from "../constants";

export function useOne<T>(resource: string, id: string) {
  const { data, error, isLoading } = useSWR(
    id ? `${ENDPOINT}/${resource}/${id}` : null,
    fetcher
  );
  return { data: data as T, error, isLoading };
}

export function useList<T>(
  resource: string,
  filter?: {
    [key: string]: string;
  },
  pagination?: {
    page: number;
    perPage: number;
  },
  sort?: {
    field: keyof T;
    order: string;
  }
) {
  const { page, perPage } = pagination || { page: 1, perPage: 10 };
  const { field, order } = sort || { field: "id", order: "ASC" };
  const query = {
    sort: JSON.stringify({ field, order }),
    range: JSON.stringify({ page, perPage }),
    filter: JSON.stringify(filter),
  };
  const url = `${ENDPOINT}/${resource}?${stringify(query)}`;
  const { data, error, isLoading } = useSWR(url, fetcher);
  return {
    data: data as {
      list: T[];
      total: number;
    },
    error,
    isLoading,
  };
}
