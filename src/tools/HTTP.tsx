import axios from "axios";

export const HTTP = axios.create({
  baseURL: "https://instagram.f8team.dev",
});

HTTP.interceptors.request.use((config) => {
  return config;
});

HTTP.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);
