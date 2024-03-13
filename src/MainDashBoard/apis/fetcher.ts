import instance from '@apis/instance';

import { IPostAddTaskType } from '../type/addTaskType';
import { IPatchGoalIdxReqType } from '../type/goalItemTypes';
import { IPatchCheckInReqType } from '../type/mainReqTypes';
import { IPostLogResType } from '../type/mainResTypes';

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
): Promise<IPostLogResType> => {
  const response = await instance.post(url, data);
  return response.data;
};

// o 삭제 api

export const deleteObj = async (url: string) => {
  const response = await instance.delete(url);

  return response.data;
};

// task 추가 api
export const postAddTask = async (url: string, reqData: IPostAddTaskType) => {
  const response = await instance.post(url, reqData);

  return response.data;
};
