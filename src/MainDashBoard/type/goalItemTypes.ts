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
}
