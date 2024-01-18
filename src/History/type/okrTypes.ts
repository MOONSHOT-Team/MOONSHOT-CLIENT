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
export interface Task {
  taskId: number;
  taskTitle: string;
  taskIdx: number;
}

export interface KeyResult {
  krId: number;
  krTitle: string;
  krProgress: number;
  krIdx: number;
  taskList: Task[];
}

export interface Objective {
  objId: number;
  title: string;
  objCategory: string;
  progress: number;
  objPeriod: string;
  objIdx: number;
  krList: KeyResult[];
}
export interface Group {
  year: number;
  objList: Objective[];
}

export interface ObjectiveData {
  groups: Group[];
  years: number[];
  categories: string[];
  onThemeSelect: (selectedTheme: string) => void;
  // onYearSelect: (selectedYear: number) => void;
}
