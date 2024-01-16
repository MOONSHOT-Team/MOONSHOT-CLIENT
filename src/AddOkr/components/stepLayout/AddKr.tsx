import styled from '@emotion/styled';
import React from 'react';

import { AddOkrCardWrapper } from '../../styles/KeyResultCardStyle';
import { IAddKrFlowProps } from '../../types/KrInfoTypes';
import KeyResultCard from '../addKr/KeyResultCard';
import KeyResultPlusCard from '../addKr/KeyResultPlusCard';

const MAX_KR_LENGTH = 3;

const AddKr = ({
  objTitle,
  clickedCard,
  handleClickPlusCard,
  handleClickCloseBtn,
  krListInfo,
  setKrListInfo,
}: IAddKrFlowProps) => {
  const renderKrCards = () => {
    const plusCardLength = Array.from({ length: MAX_KR_LENGTH - 1 }, (_, i) => i + 1);
    return (
      <>
        <KeyResultCard cardIdx={0} krListInfo={krListInfo} setKrListInfo={setKrListInfo} />
        {plusCardLength.map((item) => {
          return (
            <React.Fragment key={item}>
              {clickedCard.find((el) => el === item) ? (
                <KeyResultCard
                  key={item}
                  cardIdx={item}
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

  return (
    <StAddOkrLayoutContainer>
      <StAddOkrTitle>
        {
          '어떤 성과를 이루면 목표 달성에 가까워질 수 있을까요?\n목표를 측정할 수 있는 핵심 지표를 구체적으로 설정해주세요.'
        }
      </StAddOkrTitle>
      <StAddOkrObjectBox>
        <StAddOkrObjectTxt>{objTitle}</StAddOkrObjectTxt>
      </StAddOkrObjectBox>
      <AddOkrCardWrapper>{renderKrCards()}</AddOkrCardWrapper>
    </StAddOkrLayoutContainer>
  );
};

export default AddKr;

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
