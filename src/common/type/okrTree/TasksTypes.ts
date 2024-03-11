export interface ITaskTypes {
  taskTitle: string;
  taskId?: number;
  taskIdx: number;
}

export interface ITaskNodesTypes {
  isFirstChild?: boolean;
  krIdx: number;
  taskIdx: number;
}
