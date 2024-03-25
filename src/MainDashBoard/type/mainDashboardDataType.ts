import { IKeyResultTypes } from '@type/okrTree/KeyResultTypes';

import { IObjListTypes } from './goalItemTypes';

export interface IMainData {
  objId: number;
  idx: number;
  objTitle: string;
  objIsExpired: boolean;
  objListSize: number;
  krList: IKeyResultTypes[];
  objList: IObjListTypes[];
  objStartAt: string;
  objExpireAt: string;
}
