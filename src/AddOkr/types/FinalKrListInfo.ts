import { IKrListInfoTypes } from './KrInfoTypes';

export interface IFinalOkrListInfoTypes {
  objTitle: string;
  objCategory: string;
  objContent: string;
  objStartAt: string;
  objExpireAte: string;
  krLsit: IKrListInfoTypes[];
}
