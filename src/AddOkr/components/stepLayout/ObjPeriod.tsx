import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Dayjs } from 'dayjs';
import React, { useState } from 'react';

import { CALE_END_DATE, CALE_START_DATE, TODAY } from '../../constants/ADD_OKR_DATES';
import { OBJ_PERIOD_LIST } from '../../constants/OBJ_PERIOD_LIST';
import { IAddObjFlowProps } from '../../types/ObjectInfoTypes';
import { addMonth } from '../../utils/addMonth';
import { returnParsedDate } from '../../utils/returnParseDate';
import PeriodBtn from '../objPeriod/PeriodBtn';

interface IObjPeriodProps extends IAddObjFlowProps {
  selectedPeriod: string;
  setSelectedPeriod: React.Dispatch<React.SetStateAction<string>>;
}

const DEFAULT_SELECT_PERIOD = '1';

const ObjPeriod = ({ objInfo, setObjInfo, selectedPeriod, setSelectedPeriod }: IObjPeriodProps) => {
  const { objStartAt, objExpireAt } = objInfo;

  // dayjs 캘린더에서 사용하는 선택된 기간 값
  const [period, setPeriod] = useState([
    objInfo.objStartAt ? objInfo.objStartAt.split('. ').join('-') : CALE_START_DATE,
    objInfo.objExpireAt ? objInfo.objExpireAt.split('. ').join('-') : CALE_END_DATE,
  ]);

  const handleClickPeriodBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    let currPeriod = e.currentTarget.id;

    // SELECT_PERIOD 버튼 클릭 후 -> 날짜 선택 시 이벤트 전파 되는 것을 막고자 같은 버튼 id면 early return
    if (selectedPeriod === currPeriod) return;

    setSelectedPeriod(currPeriod);

    // 날짜 선택 버튼 클릭시, 기본 값이 1개월이 되도록 설정
    if (e.currentTarget.id === 'SELECT_PERIOD') currPeriod = DEFAULT_SELECT_PERIOD;

    // expireDate 범위에 따라 추가 (stateDate은 오늘, 오늘 기준 + month)
    const calcDate = addMonth(TODAY, Number(currPeriod));
    const dotParsedDate = returnParsedDate(calcDate, '. ');
    setObjInfo({
      ...objInfo,
      objExpireAt: dotParsedDate,
    });
  };

  const handleClickSelectDate = (
    _values: [Dayjs | null, Dayjs | null] | null,
    formatString: [string, string],
  ) => {
    event?.stopPropagation;
    if (formatString[0] && formatString[1]) {
      setPeriod(formatString);
      setObjInfo({ ...objInfo, objStartAt: formatString[0], objExpireAt: formatString[1] });
    }
  };

  return (
    <section css={ObjPeriodContainer}>
      <StPeriodBtnTitle>앞으로 몇 개월 동안 목표에 집중해볼까요?</StPeriodBtnTitle>
      <div css={PeriodDateBox}>
        <StPeriodDateTxt
          $isSelected={selectedPeriod !== ''}
        >{`${objStartAt} - ${objExpireAt}`}</StPeriodDateTxt>
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
              handleClickPeriodBtn={handleClickPeriodBtn}
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
  margin: 1rem 0 2.6rem;
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
  width: fit-content;
  min-width: 19.6rem;
  margin-bottom: 3.7rem;
`;

const StPeriodDateTxt = styled.p<{ $isSelected: boolean }>`
  padding: 0 1.2rem 1.2rem;
  ${({ theme }) => theme.fonts.body_14_regular};

  color: ${({ theme, $isSelected }) =>
    $isSelected ? theme.colors.gray_200 : theme.colors.gray_400};
  cursor: default;
  border-bottom: 1px solid
    ${({ theme, $isSelected }) => ($isSelected ? theme.colors.gray_200 : theme.colors.gray_400)};
`;
