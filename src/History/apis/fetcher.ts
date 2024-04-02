import instance from '@apis/instance';

export const getOKRHistory = async (url: string, category?: string, criteria?: string) => {
  const response = await instance.get(url, {
    params: {
      category,
      criteria,
    },
  });

  return response;
};
