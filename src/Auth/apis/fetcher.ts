import axios from 'axios';

export const fetcherPost = async (url: string, code: string, platform: string) => {
  const response = await axios.post(
    url,
    {
      socialPlatform: platform,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: code,
      },
    },
  );

  return response;
};
