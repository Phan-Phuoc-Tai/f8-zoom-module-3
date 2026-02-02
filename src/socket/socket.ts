import io from "socket.io-client";
const baseUrl = import.meta.env.VITE_BASE_URL;
const accessToken = localStorage.getItem("access_token");

export const socket = io(`${baseUrl}`, {
  auth: {
    token: accessToken,
  },
});
