import HistoryDrawer from './components/HistoryDrawer';

const History = () => {
  const themeData = [{ category: 'GROWTH' }, { category: 'HEALTH' }, { category: 'ECONOMY' }];
  return <HistoryDrawer themeData={themeData} />;
};

export default History;
