import instance from '@apis/instance';

export const getDashBoardData = async (url: string) => {
  const response = await instance.get(url);

  return response;
};
