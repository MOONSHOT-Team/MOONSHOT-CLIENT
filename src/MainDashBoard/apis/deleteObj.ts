import instance from '@apis/instance';

export const deleteObj = async (url: string) => {
  const response = await instance.delete(url);

  return response;
};
