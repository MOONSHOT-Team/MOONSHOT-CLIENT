import instance from '@apis/instance';

import { IFinalOkrListInfoTypes } from '../../AddOkr/types/FinalKrListInfo';

export const postOkrInfo = async (url: string, reqData: IFinalOkrListInfoTypes) => {
  const response = await instance.post(url, reqData);

  return response;
};
