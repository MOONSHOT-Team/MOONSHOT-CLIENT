import instance from '@apis/instance';

export const getOKRHistory = async (
  url: string,
  year?: number,
  category?: string,
  criteria?: string,
) => {
  const response = await instance.get(url, {
    params: {
      year,
      category,
      criteria,
    },
  });

  return response;
};
