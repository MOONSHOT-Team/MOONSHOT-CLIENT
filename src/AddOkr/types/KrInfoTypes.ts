import { IObjInfoTypes } from './ObjectInfoTypes';
import { ITaskInfoTypes } from './TaskInfoTypes';

export interface IKrListInfoTypes {
  title: string;
  startAt: string;
  expireAt: string;
  idx: number;
  target: string;
  metric: string;
  taskList: ITaskInfoTypes[];
}

export interface IAddKrFlowProps {
  objInfo: IObjInfoTypes;
  clickedCard: number[];
  handleClickPlusCard: (item: number) => void;
  handleClickCloseBtn: (cardIdx: number) => void;
  krListInfo: IKrListInfoTypes[];
  setKrListInfo: React.Dispatch<React.SetStateAction<IKrListInfoTypes[]>>;
}
