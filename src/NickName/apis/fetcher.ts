import instance from '@apis/instance';

export const getUserInfo = async (url: string) => {
  const response = await instance.get(url);

  return response;
};
