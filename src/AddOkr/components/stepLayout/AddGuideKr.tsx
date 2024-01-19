import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

import { AddOkrCardWrapper, EmptyKeyResultCard } from '../../styles/KeyResultCardStyle';
import { IAddKrFlowProps } from '../../types/KrInfoTypes';
import GuideFirstKeyResultCard from '../addKr/GuideFirstKeyResultCard';
import GuideSecondKeyResultCard from '../addKr/GuideSecondKeyResultCard';
import KeyResultPlusCard from '../addKr/KeyResultPlusCard';

interface IAddGuideKrProps extends IAddKrFlowProps {
  isActiveSecondKrCard: boolean;
}

const MAX_KR_LENGTH = 3;

const AddGuideKr = ({
  objInfo,
  clickedCard,
  handleClickPlusCard,
  handleClickCloseBtn,
  krListInfo,
  setKrListInfo,
  isActiveSecondKrCard,
}: IAddGuideKrProps) => {
  const { objTitle } = objInfo;

  const renderFirstKrCards = () => {
    const plusCardLength = Array.from({ length: MAX_KR_LENGTH - 1 }, (_, i) => i + 1);

    return (
      <>
        <GuideFirstKeyResultCard
          cardIdx={0}
          objInfo={objInfo}
          krListInfo={krListInfo}
          setKrListInfo={setKrListInfo}
        />
        {plusCardLength.map((item) => {
          return (
            <React.Fragment key={item}>
              {clickedCard.find((el) => el === item) ? (
                <GuideFirstKeyResultCard
                  key={item}
                  cardIdx={item}
                  objInfo={objInfo}
                  krListInfo={krListInfo}
                  setKrListInfo={setKrListInfo}
                  handleClickCloseBtn={handleClickCloseBtn}
                />
              ) : (
                <div
                  key={item}
                  onClick={() => handleClickPlusCard(item)}
                  onKeyDown={() => handleClickPlusCard(item)}
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

  const renderSecondKrCards = () => {
    const secondKrList = [0, 1, 2];

    return (
      <>
        {secondKrList.map((indexOfCard) => {
          return clickedCard.includes(indexOfCard) ? (
            <GuideSecondKeyResultCard
              key={indexOfCard}
              cardIdx={indexOfCard}
              krListInfo={krListInfo}
              setKrListInfo={setKrListInfo}
            />
          ) : (
            <EmptyKeyResultCard key={indexOfCard} />
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
            {'달에 탐사선을 쏘아올릴 마음으로, 목표를 측정할 수 있는 핵심 지표를 설정해주세요'}
          </StSecondAddGuideKrTxt>
          <StSubGuideTxt>
            moonshot에서 설정되는 목표 값은 70%에 도달할 시 완료로 간주되어요
          </StSubGuideTxt>
        </>
      ) : (
        <StFirstAddGuideKrTxt>
          {
            '목표를 이루기 위한 측정 가능한 이정표를 설정해볼거예요\n먼저, 목표를 달성하기 위해 어떤 성과들이 필요할까요?'
          }
        </StFirstAddGuideKrTxt>
      )}

      <StObjTitleBox>
        <p>{objTitle}</p>
      </StObjTitleBox>

      <AddOkrCardWrapper>
        {isActiveSecondKrCard ? renderSecondKrCards() : renderFirstKrCards()}
      </AddOkrCardWrapper>
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
  text-align: center;
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
