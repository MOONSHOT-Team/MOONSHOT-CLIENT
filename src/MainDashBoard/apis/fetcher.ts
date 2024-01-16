import instance from '@apis/instance';

import { IPatchGoalIdxReqType } from '../type/goalItemTypes';

export const getDashBoardData = async (url: string) => {
  const response = await instance.get(url);

  return response.data;
};

export const patchSwapGoalIndex = async (
  url: string,
  data: IPatchGoalIdxReqType,
): Promise<IPatchGoalIdxReqType> => {
  const response = await instance.patch(url, data);
  return response.data;
};
