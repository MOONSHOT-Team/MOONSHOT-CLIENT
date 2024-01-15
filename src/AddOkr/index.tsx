import styled from '@emotion/styled';
import React, { useState } from 'react';

import KeyResultCard from './components/addKr/KeyResultCard';
import KeyResultPlusCard from './components/addKr/KeyResultPlusCard';

const AddOkr = () => {
  const MAX_KR_LENGTH = 3;
  const OBJECT = '통합 회원가입수 200,000건 돌파'; // 추후 이전 단계 값 가져올 값

  const [clickedCard, setClickedCard] = useState<number[]>([0]);

  // KR 카드 추가 취소 버튼 핸들러
  const handleClickCloseBtn = (cardIdx: number) => {
    const parsedArray = clickedCard.filter((item) => {
      return item !== cardIdx;
    });

    setClickedCard(parsedArray);
  };

  const renderKrCards = () => {
    const plusCardLength = Array.from({ length: MAX_KR_LENGTH - 1 }, (_, i) => i + 1);
    return (
      <>
        <KeyResultCard />
        {plusCardLength.map((item) => {
          return (
            <React.Fragment key={item}>
              {clickedCard.find((el) => el === item) ? (
                <KeyResultCard
                  key={item}
                  cardIdx={item}
                  handleClickCloseBtn={handleClickCloseBtn}
                />
              ) : (
                <div
                  key={item}
                  onClick={() => setClickedCard((prev) => [...prev, item])}
                  onKeyDown={() => setClickedCard((prev) => [...prev, item])}
                  role="presentation"
                >
                  <KeyResultPlusCard key={item} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </>
    );
  };

  return (
    <StAddOkrLayoutContainer>
      <StAddOkrTitle>
        {
          '어떤 성과를 이루면 목표 달성에 가까워질 수 있을까요?\n목표를 측정할 수 있는 핵심 지표를 구체적으로 설정해주세요.'
        }
      </StAddOkrTitle>
      <StAddOkrObjectBox>
        <StAddOkrObjectTxt>{OBJECT}</StAddOkrObjectTxt>
      </StAddOkrObjectBox>
      <AddOkrCardWrapper>{renderKrCards()}</AddOkrCardWrapper>
    </StAddOkrLayoutContainer>
  );
};

export default AddOkr;

const StAddOkrLayoutContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StAddOkrTitle = styled.h1`
  margin: 1rem 0 0.6rem;
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.title_20_semibold};

  white-space: pre-line;
`;

const AddOkrCardWrapper = styled.div`
  display: flex;
  gap: 2rem;
`;

const StAddOkrObjectBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem 0.5rem;
  width: fit-content;
  margin-bottom: 3rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.main_purple};
`;

const StAddOkrObjectTxt = styled.h2`
  color: ${({ theme }) => theme.colors.main_purple};
  ${({ theme }) => theme.fonts.title_16_semibold};
`;
