import axios from 'axios';

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
      return config;
    }

    instance.defaults.headers.common['Authorization'] = accessToken;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
