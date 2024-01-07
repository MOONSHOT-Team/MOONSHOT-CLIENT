import { ITaskTypes } from './TasksTypes';

export interface IKeyResultTypes {
  title: string;
  startAt: string;
  expireAt: string;
  idx: number;
  target: number;
  metric: string;
  descriptionBefore: string;
  descriptionAfter: string;
  taskList: ITaskTypes[];
}
