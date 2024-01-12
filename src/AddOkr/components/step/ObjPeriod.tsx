import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Dayjs } from 'dayjs';
import { useState } from 'react';

import { addMonth } from '../../utils/addMonth';
import { returnParsedDate } from '../../utils/returnParseDate';
import PeriodBtn from '../objPeriod/PeriodBtn';

const ObjPeriod = () => {
  const OBJ_PERIOD_LIST = [
    { length: '1', periodName: '1개월' },
    { length: '3', periodName: '3개월' },
    { length: '6', periodName: '6개월' },
    { length: 'null', periodName: 'SELECT_PERIOD' },
  ];

  // 오늘 날짜 'yyyy. mm. dd` 형태로 만드는 함수
  const today = new Date();
  const year = today.getFullYear();
  const month = ('0' + (today.getMonth() + 1)).slice(-2);
  const day = ('0' + today.getDate()).slice(-2);

  // 목표 기간 시작 날짜 상수
  const CALE_START_DATE = returnParsedDate(today, '-');
  const CALE_END_DATE = returnParsedDate(new Date(today.setMonth(today.getMonth() + 1)), '-');

  const [period, setPeriod] = useState([CALE_START_DATE, CALE_END_DATE]);

  const OBJ_START_AT = `${year}. ${month}. ${day}`;

  const [startDate, setStartDate] = useState(OBJ_START_AT);
  const [exipreDate, setExpireDate] = useState<string>('');

  const [selectedPeriod, setSelectedPeriod] = useState('');

  const hanldeClickPeriodBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedPeriod(e.currentTarget.id);

    if (e.currentTarget.id === 'null') return;
    const calcDate = addMonth(today, Number(e.currentTarget.id));
    const parsedDate = returnParsedDate(calcDate, '. ');
    setExpireDate(parsedDate);
  };

  const handleClickSelectDate = (
    _values: [Dayjs | null, Dayjs | null] | null,
    formatString: [string, string],
  ) => {
    if (formatString[0] && formatString[1]) {
      setPeriod(formatString);
      setStartDate(formatString[0]);
      setExpireDate(formatString[1]);
    }
  };

  return (
    <section css={ObjPeriodContainer}>
      <StPeriodBtnTitle>앞으로 몇 개월 동안 목표에 집중해볼까요?</StPeriodBtnTitle>
      <div css={PeriodDateBox}>
        <StPeriodDateTxt>{`${startDate} - ${exipreDate}`}</StPeriodDateTxt>
        <StPeriodUnderLine />
      </div>
      <div css={PeriodBtnWrapper}>
        {OBJ_PERIOD_LIST.map(({ length, periodName }) => {
          return (
            <PeriodBtn
              key={periodName}
              length={length}
              periodName={periodName}
              isClicked={selectedPeriod === length}
              isDate={periodName === 'SELECT_PERIOD'}
              handleClickPeriodBtn={hanldeClickPeriodBtn}
              handleClickSelectDate={handleClickSelectDate}
              period={period}
            />
          );
        })}
      </div>
    </section>
  );
};

export default ObjPeriod;

const ObjPeriodContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
`;

const StPeriodBtnTitle = styled.h1`
  margin-bottom: 2.6rem;
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.title_20_semibold};
`;

const PeriodBtnWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  margin-bottom: 4.2rem;
`;

const PeriodDateBox = css`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  width: 19.6rem;
  margin-bottom: 3.7rem;
`;

const StPeriodDateTxt = styled.p`
  padding: 0 1.2rem;
  ${({ theme }) => theme.fonts.body_14_regular};

  color: ${({ theme }) => theme.colors.gray_400};
`;

const StPeriodUnderLine = styled.div`
  width: 19.6rem;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.gray_200};
`;
