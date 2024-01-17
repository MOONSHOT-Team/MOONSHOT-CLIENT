export const addMonth = (date: Date, month: number) => {
  const firstDate = new Date(date.getFullYear(), date.getMonth() + month - 1, 1);

  const lastDate = new Date(firstDate.getFullYear(), firstDate.getMonth() + 1, 0);

  const result = firstDate;
  if (date.getDate() > lastDate.getDate()) {
    result.setDate(lastDate.getDate());
  } else {
    result.setDate(date.getDate());
  }

  return result;
};
