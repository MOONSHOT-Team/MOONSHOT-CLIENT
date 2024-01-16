import axios from 'axios';

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
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      window.location.href = '/sign-in';

      return config;
    }

    config.headers['Authorization'] = `${accessToken}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
