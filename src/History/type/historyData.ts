interface Task {
  taskId: number;
  taskTitle: string;
  taskIdx: number;
}

interface KeyResult {
  krId: number;
  krTitle: string;
  krProgress: number;
  krIdx: number;
  taskList: Task[];
}

interface Objective {
  objId: number;
  title: string;
  objCategory: string;
  progress: number;
  objPeriod: string;
  objIdx: number;
  krList: KeyResult[];
}

interface Group {
  year: number;
  count: number;
  objList: Objective[];
}

interface DummyData {
  data: {
    groups: Group[];
    years: number[];
    categories: string[];
  };
}

export default DummyData;
