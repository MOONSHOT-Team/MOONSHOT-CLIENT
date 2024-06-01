import { IKeyResultTypes } from '@type/okrTree/KeyResultTypes';

export interface IOkrTreeDataType {
  objTitle: string;
  objCategory: string;
  objContent: string;
  objStartAt: string;
  objExpireAt: string;
  krList: IKeyResultTypes[];
}

export interface ISocialDataType {
  category: string;
  userName: string;
  userImg: string;
  like: number;
  userIntro: string;
  okrTreeData: IOkrTreeDataType;
}
