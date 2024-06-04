import instance from '@apis/instance';

export const getSocialInfo = async (url: string) => {
  const response = await instance.get(url);

  return response.data.data;
};
