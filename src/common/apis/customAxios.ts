import axios from 'axios';

const customAxios = axios.create({
  baseURL: import.meta.env.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default customAxios;
