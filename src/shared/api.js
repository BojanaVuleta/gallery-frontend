import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:8000/api",
});

API.interceptors.request.use(function (request) {
  const token = localStorage.getItem("access_token");
  if (token) {
    request.headers["Authorization"] = `Bearer ${token}`;
  }
  return request;
});

API.interceptors.response.use(
  async function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      originalRequest.url !== "/login" &&
      originalRequest.url !== "/refresh"
    ) {
      const token = localStorage.getItem("access_token");
      if (token) {
        const { data } = await API.post("/refresh");
        localStorage.setItem("access_token", data.authorization.token);
        return API(originalRequest);
      }
    }
    return Promise.reject(error?.response || error);
  }
);