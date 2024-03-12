export interface IObjective {
  objId: number;
  objTitle: string;
  objCategory: string;
  objProgress: number;
  objPeriod: string;
  objIdx?: number;
  isLast?: boolean;
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

export interface Group {
  year: number;
  objList: IObjective[];
}

export interface IObjectiveDataProps {
  historyCategories: string[];
  okrHistoryYearData: string[];
  selectedTheme: string;
  selectedYear: string;
  onSelectTheme: (selectedTheme: string) => void;
  onSelectYear: (selectedYear: string) => void;
}
