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
