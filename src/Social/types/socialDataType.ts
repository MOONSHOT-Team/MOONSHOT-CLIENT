import { IKeyResultTypes } from '@type/okrTree/KeyResultTypes';

export interface IOkrTreeDataType {
  objTitle: string;
  objCategory: string;
  objContent: string;
  objStartAt: string;
  objExpireAt: string;
  krList: IKeyResultTypes[];
}
