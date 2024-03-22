export interface IPatchCheckInReqType {
  keyResultId: number;
  krTitle?: string;
  krStartAt?: string;
  krExpireAt?: string;
  krTarget?: number;
  krState?: string;
  logContent?: string;
  data?: {
    objId: number;
    nickname: string;
    progress: number;
  };
}
