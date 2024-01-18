export interface ITaskTypes {
  title: string;
  id?: number;
  idx: number;
}

export interface ITaskNodesTypes {
  isFirstChild?: boolean;
  krIdx: number;
  taskIdx: number;
}
