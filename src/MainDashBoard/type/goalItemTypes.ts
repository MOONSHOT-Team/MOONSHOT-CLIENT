export interface IgoalItemTypes {
  objList: IobjListTypes[];
}

export interface IobjListTypes {
  id: number;
  title: string;
  content: string;
  category: string;
  date: string;
  progress: number;
  currentGoalId?: number;
  onClickGoal?: (id: number) => void;
  index: number;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
}
