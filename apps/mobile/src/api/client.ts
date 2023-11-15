import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const API_HOST = 'https://attendance.cparedesr.com/api';

const client = axios.create({
  baseURL: API_HOST,
});

client.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync('userToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      config.headers['Content-Type'] = 'application/json';
      config.headers['Accept'] = 'application/json';
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default client;
