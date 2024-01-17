import { IPatchCheckInReqType } from './mainReqTypes';

export interface IPostLogResType {
  status: number;
  message: string;
  data: IPatchCheckInReqType | null;
}
