import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { KeyResultCardStyle } from '../../styles/KeyResultCardStyle';

const GuideSecondKeyResultCard = ({ krSentence }: { krSentence: string }) => {
  const HINT_TARGET = 'ex) 10';
  const HINT_METRIC = 'ex) 회';

  return (
    <StGuideSecondKeyResultCardWrapper>
      <StSecondKrSenteceBox>
        목표를 달성하기 위해 필요한 성과는
        <StTargetKrSentence>{krSentence}</StTargetKrSentence>
        입니다.
      </StSecondKrSenteceBox>

      <StSecondKrTargetMetricBox>
        이 성과를 측정할 수 있는 수치값과 단위를 입력하세요.
        <div css={TargetMetricInputBox}>
          <StTargetMetricInput placeholder={HINT_TARGET} />
          <StTargetMetricInput placeholder={HINT_METRIC} />
        </div>
      </StSecondKrTargetMetricBox>
    </StGuideSecondKeyResultCardWrapper>
  );
};

export default GuideSecondKeyResultCard;

const StGuideSecondKeyResultCardWrapper = styled(KeyResultCardStyle)`
  gap: 4.4rem;
  justify-content: center;
  padding: 0 1.7rem;
`;

const StSecondKrSenteceBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.body_14_medium};
`;

const StTargetKrSentence = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 3.2rem;
  padding: 0.6rem 0;
  color: ${({ theme }) => theme.colors.gray_350};
`;

const StSecondKrTargetMetricBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  ${({ theme }) => theme.fonts.body_14_medium};
`;

const TargetMetricInputBox = css`
  display: flex;
  gap: 0.7rem;
`;

const StTargetMetricInput = styled.input`
  display: flex;
  align-items: center;
  width: 14.6rem;
  height: 3.2rem;
  padding: 1rem;
  color: ${({ theme }) => theme.colors.gray_350};
  background-color: ${({ theme }) => theme.colors.gray_600};
  border: 1px solid ${({ theme }) => theme.colors.gray_450};
  border-radius: 6px;

  &:focus,
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray_550};
  }

  ${({ theme }) => theme.fonts.body_14_medium};
`;
