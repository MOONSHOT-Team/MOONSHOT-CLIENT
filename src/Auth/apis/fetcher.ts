import { signInInstance } from '@apis/instance';

export const fetcherPost = async (url: string, code: string, platform: string) => {
  const response = await signInInstance.post(
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
