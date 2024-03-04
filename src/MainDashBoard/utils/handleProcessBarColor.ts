export const handleProcessBarColor = (progressBar: number) => {
  if (progressBar <= 30) return '#F4B5FA';
  if (progressBar <= 60) return '#FFF9C6';
  if (progressBar <= 100) return '#A6EEF6';
  return '#A6EEF6';
};
