import axios from 'axios';

import instance from './instance';

// 기본 get fetcher
export const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const fetcherPost = async (url: string, code: string, platform: string) => {
  const response = await instance.post(
    url,
    {
      socialPlatform: platform,
    },
    {
      headers: {
        Authorization: code,
      },
    },
  );
  return response;
};
