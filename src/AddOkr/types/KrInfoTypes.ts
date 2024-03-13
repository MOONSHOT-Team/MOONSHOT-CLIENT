import { IObjInfoTypes } from './ObjectInfoTypes';
import { ITaskInfoTypes } from './TaskInfoTypes';

export interface IKrListInfoTypes {
  krTitle?: string;
  krStartAt: string;
  krExpireAt: string;
  krIdx: number;
  krTarget: string | number;
  krMetric: string;
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
