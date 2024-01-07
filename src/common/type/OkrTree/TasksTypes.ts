export interface ITaskTypes {
  title: string;
  idx: number;
}

export interface ITaskNodesTypes extends ITaskTypes {
  isFirstChild?: boolean;
}
