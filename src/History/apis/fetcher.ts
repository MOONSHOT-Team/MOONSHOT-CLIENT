import instance from '@apis/instance';

export const getOKRHistory = async (url: string) => {
  const response = await instance.get(url);

  return response;
};
