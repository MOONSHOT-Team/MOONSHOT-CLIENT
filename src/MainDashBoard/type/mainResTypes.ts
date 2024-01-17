import { IPatchCheckInReqType } from './mainReqTypes';

export interface IpostLogResType {
  status: number;
  message: string;
  data: IPatchCheckInReqType | null;
}
