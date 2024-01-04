export const ENDPOINT = import.meta.env.VITE_ENDPOINT as string;
export const fetcher = (...args: [string, ...any]) =>
  fetch(...args).then((res) => res.json());
