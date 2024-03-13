import { IKrListInfoTypes } from './KrInfoTypes';

export interface IFinalOkrListInfoTypes {
  objTitle: string;
  objCategory: string;
  objContent: string;
  objStartAt: string;
  objExpireAt: string;
  krList: IKrListInfoTypes[];
}
