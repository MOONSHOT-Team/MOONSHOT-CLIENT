export interface IPatchCheckInReqType {
  keyResultId: number;
  title?: string;
  startAt?: string;
  expireAt?: string;
  target?: number;
  state?: string;
  logContent?: string;
}
