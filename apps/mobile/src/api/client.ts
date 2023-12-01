import axios from "axios";
import * as SecureStore from "expo-secure-store";

const baseURL = "https://attendance.cparedesr.com";
const apiSufix = "/api/v1";

const client = axios.create({
  baseURL,
});

client.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync("userToken");
    const email = await SecureStore.getItemAsync("email");
    if (config.url?.includes("/users")) {
      config.baseURL = baseURL;
    } else {
      config.url = baseURL + apiSufix + config.url;
    }
    config.headers["Content-Type"] = "application/json";
    config.headers["Accept"] = "application/json";
    if (token) {
      config.headers["X-User-Email"] = email;
      config.headers["X-User-Token"] = token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default client;
