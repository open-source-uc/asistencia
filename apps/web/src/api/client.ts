import axios from "axios";
import { getUserSessionStorage } from "@/components/contexts/user-session-storage";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
});

client.interceptors.request.use(
  async (config) => {
    const userSession = getUserSessionStorage();
    config.headers["Accept"] = "application/json";
    if (userSession.access_token !== "" && userSession.access_token !== null) {
      config.headers["Content-Type"] = "application/json";
      config.headers["Authorization"] = `Bearer ${userSession.access_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default client;
