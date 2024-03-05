import { ITaskTypes } from './TasksTypes';

export interface IKeyResultTypes {
  keyResultId?: number;
  // FIXME: 보낼 땐 title, 받을 땐 KeyResultTitle이라고 와 type 에러 발생 해 이를 방지하고자 둘 다 추가 추후 수정 예정
  keyResultTitle?: string;
  title?: string;
  startAt?: string;
  expireAt?: string;
  idx: number;
  target?: number | string;
  metric?: string;
  taskList?: ITaskTypes[];
}
