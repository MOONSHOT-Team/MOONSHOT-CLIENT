import instance from '@apis/instance';

export const fetcherPost = async (url: string, code: string, platform: string) => {
  const response = await instance.post(
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
