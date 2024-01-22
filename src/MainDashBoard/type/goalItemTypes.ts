export interface IGoalItemTypes {
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
  index?: number;
  onClickGoal?: (id: number) => void;
  moveGoal?: (dragIndex: number, hoverIndex: number) => void;
}

export interface IPatchGoalIdxReqType {
  id: number;
  target: string;
  idx: number;
}
