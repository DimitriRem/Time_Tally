export const API_URL = "https://tt-json-server.vercel.app";

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
