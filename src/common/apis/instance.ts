import axios from 'axios';

import getNewAccessToken from './getNewAccessToken';

export const signInInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;

instance.interceptors.request.use(
  (config) => {
    const ACCESS_TOKEN = localStorage.getItem('ACCESS_TOKEN');

    if (!ACCESS_TOKEN) {
      window.location.href = '/sign-in';

      return config;
    }

    config.headers['Authorization'] = `${ACCESS_TOKEN}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    console.log('original request', originalRequest);

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const isRefreshSuccessful = await getNewAccessToken();

      if (isRefreshSuccessful) {
        return instance(originalRequest);
      }
    }

    return Promise.reject(error);
  },
);
