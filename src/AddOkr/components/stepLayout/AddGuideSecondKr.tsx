import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect } from 'react';

import { AddOkrCardWrapper, EmptyKeyResultCard } from '../../styles/KeyResultCardStyle';
import { IAddKrFlowProps } from '../../types/KrInfoTypes';
import GuideSecondKeyResultCard from '../addKr/GuideSecondKeyResultCard';

const AddGuideSecondKr = ({
  objInfo,
  clickedCard,
  krListInfo,
  setKrListInfo,
  onValidateNextStep,
}: IAddKrFlowProps) => {
  const { objTitle } = objInfo;
  const secondKrList = [0, 1, 2];

  useEffect(() => {
    const isValid =
      krListInfo.filter((kr) => {
        return clickedCard.includes(kr.krIdx);
      }).length ===
      krListInfo.filter((kr) => {
        const { krTarget, krMetric } = kr;
        return krTarget && krMetric;
      }).length;

    onValidateNextStep(isValid);
  }, [krListInfo, clickedCard]);

  return (
    <section css={AddGuideKrContainer}>
      <StSecondAddGuideKrTxt>
        {'달에 탐사선을 쏘아올릴 마음으로, 목표를 측정할 수 있는 핵심 지표를 설정해주세요'}
      </StSecondAddGuideKrTxt>
      <StSubGuideTxt>
        moonshot에서 설정되는 목표 값은 70%에 도달할 시 완료로 간주되어요
      </StSubGuideTxt>

      <StObjTitleBox>
        <p>{objTitle}</p>
      </StObjTitleBox>

      <AddOkrCardWrapper>
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
      </AddOkrCardWrapper>
    </section>
  );
};

export default AddGuideSecondKr;

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
