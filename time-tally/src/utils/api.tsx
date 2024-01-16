export const API_URL = "http://localhost:3500";

export const api = (url: string, method = "GET", body: {}) => {
  const options = {
    method: method,
    headers: {
      "content-type": "application/json",
    },
    ...(body && {
      body: JSON.stringify(body),
    }),
  };
  return fetch(API_URL + url, options);
};
