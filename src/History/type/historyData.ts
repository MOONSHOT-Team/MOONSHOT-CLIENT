export type filterOptionTypes = '최신순' | '오래된 순' | '달성률 순';
export type selectedThemeTypes =
  | '성장'
  | '건강'
  | '생산성'
  | '라이프스타일'
  | '경제'
  | '셀프케어'
  | undefined;

export type ObjectiveTypes = {
  objId: number;
  objTitle: string;
  objCategory: string;
  objProgress: number;
  objPeriod: string;
  objIdx?: number;
  isLast?: boolean;
  krList: IKeyResult[];
};

type IKeyResult = {
  krId: number;
  krIdx: number;
  krTitle: string;
  krProgress: number;
  taskList: ITask[];
};

type ITask = {
  taskId: number;
  taskIdx: number;
  taskTitle: string;
};

export type GroupTypes = {
  year: number;
  objList: ObjectiveTypes[];
};
