// export const ENDPOINT = "http://localhost:3000";
export const ENDPOINT = "https://games-api.8kas.com";
export const fetcher = (...args: [string, ...any]) =>
  fetch(...args).then((res) => res.json());
