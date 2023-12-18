import axios from "axios";
import { getUserSessionStorage } from "@/components/contexts/user-session-storage";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

client.interceptors.request.use(
  async (config) => {
    const userSession = getUserSessionStorage();
    if (userSession.access_token !== "" && userSession.access_token !== null) {
      config.headers["X-User-Email"] = `${userSession.email}`;
      config.headers["X-User-Token"] = `${userSession.access_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default client;
