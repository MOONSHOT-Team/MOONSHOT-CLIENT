export interface IgoalItemTypes {
  objList: IObjListTypes[];
}

export interface IObjListTypes {
  id: number;
  title: string;
  content: string;
  category: string;
  date: string;
  progress: number;
  currentGoalId?: number;
  onClickGoal?: (id: number) => void;
  index?: number;
  moveGoal?: (dragIndex: number, hoverIndex: number) => void;
}

export interface IPatchGoalIdxReqType {
  id: number;
  target: string;
  idx: number;
}
