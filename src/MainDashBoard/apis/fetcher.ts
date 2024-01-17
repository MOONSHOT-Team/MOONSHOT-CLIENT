import instance from '@apis/instance';

import { IPatchGoalIdxReqType } from '../type/goalItemTypes';
import { IPatchCheckInReqType } from '../type/mainReqTypes';
import { IpostLogResType } from '../type/mainResTypes';

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

export const patchCheckIn = async (
  url: string,
  data: IPatchCheckInReqType,
): Promise<IPatchCheckInReqType> => {
  const response = await instance.patch(url, data);
  return response.data;
};

export const postCheckIn = async (
  url: string,
  data: IPatchCheckInReqType,
): Promise<IpostLogResType> => {
  const response = await instance.post(url, data);
  return response.data;
};