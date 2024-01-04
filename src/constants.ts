export const ENDPOINT =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://games-api.8kas.com";
export const fetcher = (...args: [string, ...any]) =>
  fetch(...args).then((res) => res.json());
