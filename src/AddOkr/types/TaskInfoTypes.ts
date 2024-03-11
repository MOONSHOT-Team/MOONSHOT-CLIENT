export interface ITaskInfoTypes {
  taskTitle: string;
  taskIdx: number;
}

export interface IPreviewTaskInfoTypes {
  krIdx: number;
  taskList: ITaskInfoTypes[];
}
