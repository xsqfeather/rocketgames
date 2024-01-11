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
  params?: {
    pagination?: {
      page: number;
      perPage?: number;
    };
    sort?: {
      field: string;
      order: string;
    };
    filter?: {
      [key: string]: string;
    };
  }
) {
  if (!params) {
    params = {
      pagination: {
        page: 1,
        perPage: 10,
      },
      sort: {
        field: "createdAt",
        order: "DESC",
      },
      filter: {},
    };
  }
  const { page, perPage } = params.pagination || {
    page: 1,
    perPage: 10,
  };
  const { field, order } = params.sort || {
    field: "createdAt",
    order: "DESC",
  };

  const rangeStart = (page - 1) * (perPage || 10);
  const rangeEnd = page * (perPage || 10) - 1;

  const query = {
    sort: JSON.stringify([field, order]),
    range: JSON.stringify([rangeStart, rangeEnd]),
    filter: JSON.stringify(params.filter || {}),
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
