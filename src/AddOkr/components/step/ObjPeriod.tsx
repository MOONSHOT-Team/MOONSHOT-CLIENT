import { css } from '@emotion/react';
import styled from '@emotion/styled';

import PeriodBtn from '../objPeriod/PeriodBtn';

const ObjPeriod = () => {
  const OBJ_PERIOD_LIST = ['1개월', '3개월', '6개월', 'SELECT_PERIOD'];

  // 오늘 날짜 'yyyy. mm. dd` 형태로 만드는 함수
  const today = new Date();
  const year = today.getFullYear();
  const month = ('0' + (today.getMonth() + 1)).slice(-2);
  const day = ('0' + today.getDate()).slice(-2);

  const OBJ_START_AT = `${year}. ${month}. ${day}`;

  return (
    <section css={ObjPeriodContainer}>
      <StPeriodBtnTitle>앞으로 몇 개월 동안 목표에 집중해볼까요?</StPeriodBtnTitle>
      <div css={PeriodDateBox}>
        <StPeriodDateTxt>{`${OBJ_START_AT} - 2024. 02. 15`}</StPeriodDateTxt>
        <StPeriodUnderLine />
      </div>
      <div css={PeriodBtnWrapper}>
        {OBJ_PERIOD_LIST.map((period) => {
          return (
            <>
              <PeriodBtn period={period} isClicked={false} isDate={period === 'SELECT_PERIOD'} />
            </>
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
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.title_20_semibold};
`;

const PeriodBtnWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
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
