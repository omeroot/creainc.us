import axios, { InternalAxiosRequestConfig } from "axios";
import { Cookies } from "react-cookie";

import authConfig from "src/configs/auth";

const cookie = new Cookies();

const api = axios.create({
  baseURL: process.env.REACT_APP_PUBLIC_AXIOS_BASE_URL,
});

const requestHandler = (
  config: InternalAxiosRequestConfig<any>
): InternalAxiosRequestConfig<any> => {
  const storedToken = cookie.get(authConfig.storageTokenKeyName);

  if (config.headers) {
    config.headers["Authorization"] = `Bearer ${storedToken}`;
  }

  return config;
};

const errorHandler = (error: any) => Promise.reject(error);

export const axiosConfig = () => {
  api.interceptors.request.use(requestHandler);

  api.interceptors.response.use(
    (response) => response,
    (error) => errorHandler(error)
  );
};

export default api;
