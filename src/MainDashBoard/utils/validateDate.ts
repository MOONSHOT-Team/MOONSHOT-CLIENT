export const validateDate = (year: string, month: string, day: string) => {
  const inputDate = new Date(`${year}-${month}-${day}`);
  const todayDate = new Date();

  // 오늘 날짜 전 날짜 입력 금지
  if (inputDate < todayDate) return false;

  // 입력값 길이 제한
  if (year.length !== 4 || month.length !== 2 || day.length !== 2) return false;

  // 입력값 범위 제한
  if (
    Number(year) > 2100 ||
    Number(month) < 1 ||
    Number(month) > 12 ||
    Number(day) < 1 ||
    Number(day) > 31
  )
    return false;

  // 입력 달에 따른 일 수 제한
  const maxDay = ['04', '06', '09', '11'].includes(month!) // 30일
    ? 30
    : ['01', '03', '05', '07', '08', '10', '12'].includes(month!) // 31일
      ? 31
      : (Number(year) % 4 == 0 && Number(year) % 100 != 0) || Number(year) % 400 == 0 // 윤년
        ? 29
        : 28; // 윤년 아닌 2월

  if (day && Number(day) > maxDay) return false;

  return true;
};
