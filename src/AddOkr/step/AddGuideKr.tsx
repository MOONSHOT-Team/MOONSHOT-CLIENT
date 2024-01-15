import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useState } from 'react';

import GuideFirstKeyResultCard from '../components/addKr/GuideFirstKeyResultCard';
import GuideSecondKeyResultCard from '../components/addKr/GuideSecondKeyResultCard';
import KeyResultPlusCard from '../components/addKr/KeyResultPlusCard';
import { EmptyKeyResultCard } from '../styles/KeyResultCardStyle';

const MAX_KR_LENGTH = 3;

const AddGuideKr = () => {
  const [isActiveSecondKrCard, setIsActiveSecondKrCard] = useState(false);
  const [clickedCard, setClickedCard] = useState<number[]>([0]);

  // KR 카드 추가 취소 버튼 핸들러
  const handleClickCloseBtn = (cardIdx: number) => {
    const parsedArray = clickedCard.filter((item) => {
      return item !== cardIdx;
    });

    setClickedCard(parsedArray);
  };

  const renderFirstKrCards = () => {
    const plusCardLength = Array.from({ length: MAX_KR_LENGTH - 1 }, (_, i) => i + 1);
    return (
      <>
        <GuideFirstKeyResultCard />
        {plusCardLength.map((item) => {
          return (
            <React.Fragment key={item}>
              {clickedCard.find((el) => el === item) ? (
                <GuideFirstKeyResultCard
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
        <button onClick={() => setIsActiveSecondKrCard(true)}>버튼</button>
      </>
    );
  };

  const renderSecondKrCards = () => {
    const secondKrList = [0, 1, 2];

    return (
      <>
        {secondKrList.map((lenth) => {
          return clickedCard.includes(lenth) ? (
            <GuideSecondKeyResultCard krSentence={'첫번째'} />
          ) : (
            <EmptyKeyResultCard />
          );
        })}
      </>
    );
  };

  return (
    <section css={AddGuideKrContainer}>
      {isActiveSecondKrCard ? (
        <>
          <StSecondAddGuideKrTxt>
            {'달에 탐사선을 쏘아올릴 마음으로, 목표를 측정할 수 있는 핵심 지표를 설정해주세요.'}
          </StSecondAddGuideKrTxt>
          <StSubGuideTxt>
            moonshot에서 설정되는 목표 수치는 70-80%에 도달할 시 완료된 것으로 간주되어요.
          </StSubGuideTxt>
        </>
      ) : (
        <StFirstAddGuideKrTxt>
          {
            '목표를 이루기 위한 측정 가능한 이정표를 설정해볼거예요.\n먼저, 목표를 달성하기 위해 어떤 성과들이 필요할까요?'
          }
        </StFirstAddGuideKrTxt>
      )}

      <StObjTitleBox>
        <p>대체 불가능한 인재가 되기 위해 영향력 있는 개발자 되기</p>
      </StObjTitleBox>

      <section css={KrGuideCardWrapper}>
        {isActiveSecondKrCard ? renderSecondKrCards() : renderFirstKrCards()}
      </section>
    </section>
  );
};

export default AddGuideKr;

const AddGuideKrContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StAddGuideKrTxt = styled.h1`
  color: ${({ theme }) => theme.colors.gray_000};
  white-space: pre-line;

  ${({ theme }) => theme.fonts.title_20_semibold};
`;

const StFirstAddGuideKrTxt = styled(StAddGuideKrTxt)`
  margin: 1rem 0 0.6rem;
`;
const StSecondAddGuideKrTxt = styled(StAddGuideKrTxt)`
  margin: 1rem 0 0.4rem;
`;

const StSubGuideTxt = styled.p`
  margin-bottom: 1.6rem;
  color: ${({ theme }) => theme.colors.sub_mint};

  ${({ theme }) => theme.fonts.body_12_medium};
`;

const StObjTitleBox = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  height: 4.2rem;
  padding: 0.7rem 0.5rem ${({ theme }) => theme.fonts.title_16_semibold};
  margin-bottom: 3rem;
  color: ${({ theme }) => theme.colors.main_purple};
  border-bottom: 1px solid ${({ theme }) => theme.colors.main_purple};

  ${({ theme }) => theme.fonts.title_16_semibold};
`;

const KrGuideCardWrapper = css`
  display: flex;
  gap: 2rem;
  align-items: center;
  width: 100%;
`;
