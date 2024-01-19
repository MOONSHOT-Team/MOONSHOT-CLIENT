import { IKeyResultTypes } from '@type/OkrTree/KeyResultTypes';

export interface IOkrTreeDataType {
  objTitle: string;
  objCategory: string;
  objContent: string;
  objStartAt: string;
  objExpireAt: string;
  krList: IKeyResultTypes[];
}
