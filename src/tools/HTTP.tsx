import axios, {
  type AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";

export const HTTP: AxiosInstance = axios.create({
  baseURL: "https://instagram.f8team.dev",
});

HTTP.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let refreshTokenPromise: Promise<{
  accessToken: string;
  refreshToken: string;
}> | null = null;
const getNewToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refresh_token");
    const response = await HTTP.post(`/api/auth/refresh-token`, {
      refreshToken,
    }).catch((error) => {
      throw error;
    });
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return false;
    }
  }
};
HTTP.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) {
      return Promise.reject(error);
    }
    const requestMissed = error.config as InternalAxiosRequestConfig;
    if (error?.status === 401) {
      if (!refreshTokenPromise) {
        refreshTokenPromise = await getNewToken();
      }
      const newToken = await refreshTokenPromise;

      if (newToken) {
        localStorage.setItem("access_token", newToken.accessToken);
        localStorage.setItem("refresh_token", newToken.refreshToken);
        requestMissed.headers.Authorization = `Bearer ${newToken.accessToken}`;
        return HTTP(requestMissed);
      } else {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
      }
    }
  },
);
