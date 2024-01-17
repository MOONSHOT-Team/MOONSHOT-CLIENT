export interface IKrDetailTypes {
  title: string;
  target: number;
  metric: string;
  progressBar: number;
  krState: string;
  startAt: string;
  expireAt: string;
  logList: ICheckInLogTypes[];
}

export interface ICheckInLogTypes {
  logState: string;
  dateTime: string;
  title: string;
  content: string;
}
