import { ITaskTypes } from './TasksTypes';

export interface IKeyResultTypes {
  keyResultTitle: string;
  keyResultId: number;
  startAt?: string;
  expireAt?: string;
  idx: number;
  target?: number;
  metric?: string;
  descriptionBefore?: string;
  descriptionAfter?: string;
  taskList?: ITaskTypes[];
}
