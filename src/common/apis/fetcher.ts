import axios from 'axios';

//기본 get fetcher
export const fetcher = (url: string) => axios.get(url).then((res) => res.data);
