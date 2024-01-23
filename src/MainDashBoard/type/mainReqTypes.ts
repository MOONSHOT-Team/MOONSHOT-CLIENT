export interface IPatchCheckInReqType {
  keyResultId: number;
  title?: string;
  startAt?: string;
  expireAt?: string;
  target?: number;
  state?: string;
  logContent?: string;
  data?: {
    objId: number;
    nickname: string;
    progress: number;
  };
}
