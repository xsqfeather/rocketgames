export const ENDPOINT = import.meta.env.VITE_ENDPOINT as string;
export const fetcher = (...args: [string, ...any]) =>
  fetch(...args, {
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    }),
  })
    .then((res) =>
      res.status < 400
        ? res.json()
        : res.json().then((err) => Promise.reject(err))
    )
    .catch((err) => {
      console.log(err);
      return Promise.reject(err);
    });
