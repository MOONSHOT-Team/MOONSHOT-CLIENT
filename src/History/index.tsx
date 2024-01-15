import HistoryDrawer from './components/HistoryDrawer';
import { DUMMYDATA } from './constants/dummyData';

const History = () => {
  const {
    data: { groups, categories },
  } = DUMMYDATA;

  return <HistoryDrawer groups={groups} categories={categories} />;
};

export default History;
