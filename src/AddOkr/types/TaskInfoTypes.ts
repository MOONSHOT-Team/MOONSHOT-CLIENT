export interface ITaskInfoTypes {
  title: string;
  idx: number;
}

export interface IPreviewTaskInfoTypes {
  krIdx: number;
  taskList: ITaskInfoTypes[];
}
