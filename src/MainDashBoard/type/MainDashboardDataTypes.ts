import { IKeyResultTypes } from '@type/OkrTree/KeyResultTypes';

export interface IMainData {
  objId: number;
  idx?: number;
  objTitle: string;
  objIsExpired: boolean;
  objListSize: number;
  krList: IKeyResultTypes[];
}
