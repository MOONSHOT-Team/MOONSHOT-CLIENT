export interface IObjective {
  objId: number;
  title: string;
  objCategory: string;
  progress: number;
  objPeriod: string;
  objIdx?: number;
  krList: IKeyResult[];
}
export interface IKeyResult {
  krId: number;
  krIdx: number;
  krTitle: string;
  krProgress: number;
  taskList: ITask[];
}

export interface ITask {
  taskId: number;
  taskIdx: number;
  taskTitle: string;
}