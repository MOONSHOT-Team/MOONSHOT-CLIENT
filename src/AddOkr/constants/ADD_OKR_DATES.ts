import { returnParsedDate } from '../utils/returnParseDate';

// 날짜 생성에 사용할 오늘의 연도, 월, 일 값
export const TODAY = new Date();
export const TODAY_YEAR = TODAY.getFullYear();
export const TODAY_MONTH = ('0' + (TODAY.getMonth() + 1)).slice(-2);
export const TODAY_DAY = ('0' + TODAY.getDate()).slice(-2);

// objective 시작 날짜 === 오늘 (형태 : yyyy. mm. dd)
export const OBJ_START_AT = `${TODAY_YEAR}. ${TODAY_MONTH}. ${TODAY_DAY}`;

// 캘린더용 날짜 상수
export const CALE_START_DATE = returnParsedDate(TODAY, '-');
export const CALE_END_DATE = returnParsedDate(new Date(TODAY.setMonth(TODAY.getMonth() + 1)), '-');
