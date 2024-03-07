const FIRSTREFVALUE = 30;
const SECONDREFVALUE = 60;
const THIRDREFVALUE = 100;

export const handleProcessBarColor = (progressBar: number) => {
  if (progressBar <= FIRSTREFVALUE) return '#F4B5FA';
  if (progressBar <= SECONDREFVALUE) return '#FFF9C6';
  if (progressBar <= THIRDREFVALUE) return '#A6EEF6';
  return '#A6EEF6';
};
