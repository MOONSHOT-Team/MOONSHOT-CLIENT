export interface IKrDetailTypes {
  title: string;
  progressBar: number;
  KrState: string;
  startDate: string;
  expireDate: string;
  Log: ICheckInLogTypes[];
}

export interface ICheckInLogTypes {
  state: string;
  date: string;
  title: string;
  content: string;
}
