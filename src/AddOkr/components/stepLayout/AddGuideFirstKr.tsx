import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useEffect } from 'react';

import { AddOkrCardWrapper } from '../../styles/KeyResultCardStyle';
import { IAddKrFlowProps } from '../../types/KrInfoTypes';
import GuideFirstKeyResultCard from '../addKr/GuideFirstKeyResultCard';
import KeyResultPlusCard from '../addKr/KeyResultPlusCard';

const MAX_KR_LENGTH = 3;

const AddGuideFirstKr = ({
  objInfo,
  clickedCard,
  handleClickPlusCard,
  handleClickCloseBtn,
  krListInfo,
  setKrListInfo,
  onValidateNextStep,
}: IAddKrFlowProps) => {
  const { objTitle } = objInfo;

  const plusCardLength = Array.from({ length: MAX_KR_LENGTH - 1 }, (_, i) => i + 1);

  useEffect(() => {
    const isValid =
      krListInfo.filter((kr) => {
        return clickedCard.includes(kr.krIdx);
      }).length ===
      krListInfo.filter((kr) => {
        const { krTitle, krStartAt, krExpireAt } = kr;
        return krTitle && krStartAt && krExpireAt;
      }).length;

    onValidateNextStep(isValid);
  }, [krListInfo, clickedCard]);

  return (
    <section css={AddGuideKrContainer}>
      <StFirstAddGuideKrTxt>
        {
          '목표를 이루기 위한 측정 가능한 이정표를 설정해볼거예요\n먼저, 목표를 달성하기 위해 어떤 성과들이 필요할까요?'
        }
      </StFirstAddGuideKrTxt>

      <StObjTitleBox>
        <p>{objTitle}</p>
      </StObjTitleBox>

      <AddOkrCardWrapper>
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
      </AddOkrCardWrapper>
    </section>
  );
};

export default AddGuideFirstKr;

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
