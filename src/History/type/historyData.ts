export interface IObjective {
  objId: number;
  objTitle: string;
  objCategory: string;
  objProgress: number;
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

export interface Group {
  year: number;
  objList: IObjective[];
}

export interface IObjectiveDataProps {
  groups: Group[];
  years: {
    [year: string]: number;
  };
  categories: string[];
  onThemeSelect: (selectedTheme: string) => void;
}
