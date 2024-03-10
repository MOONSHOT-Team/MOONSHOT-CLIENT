import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useState } from 'react';

import { MAX_KR_METRIC, MAX_KR_TARGET } from '../../constants/OKR_MAX_LENGTH';
import { EmptyKeyResultCard } from '../../styles/KeyResultCardStyle';
import { IKrListInfoTypes } from '../../types/KrInfoTypes';

interface IGuideSecondKeyResultCardProps {
  krListInfo: IKrListInfoTypes[];
  setKrListInfo: React.Dispatch<React.SetStateAction<IKrListInfoTypes[]>>;
  cardIdx: number;
}

const HINT_TARGET = 'ex) 10';
const HINT_METRIC = 'ex) 회';

const GuideSecondKeyResultCard = ({
  krListInfo,
  setKrListInfo,
  cardIdx,
}: IGuideSecondKeyResultCardProps) => {
  const { krTitle, krTarget, krMetric } = krListInfo[cardIdx];
  const [isValidMax, setIsValidMax] = useState({
    target: false,
    metric: false,
  });

  const handleGuidTargetInput = (e: React.ChangeEvent<HTMLInputElement>, maxLength: number) => {
    const parsedValue = e.target.value.replace(/[^-0-9]/g, '');

    if (e.target.value.length > maxLength) {
      setIsValidMax({ ...isValidMax, target: true });
    }

    if (e.target.value.length <= maxLength) {
      setIsValidMax({ ...isValidMax, target: false });
      krListInfo[cardIdx].krTarget = parsedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      setKrListInfo([...krListInfo]);
    }
  };

  const handleGuideMetricInput = (e: React.ChangeEvent<HTMLInputElement>, maxLength: number) => {
    if (e.target.value.length > maxLength) {
      setIsValidMax({ ...isValidMax, metric: true });
    }

    if (e.target.value.length <= maxLength) {
      setIsValidMax({ ...isValidMax, metric: false });
      krListInfo[cardIdx].krMetric = e.target.value;
      setKrListInfo([...krListInfo]);
    }
  };

  return (
    <StGuideSecondKeyResultCardWrapper>
      <StSecondKrTitleBox>
        <p>목표를 달성하기 위해 필요한 성과는 다음과 같아요.</p>
        <StTargetKrTitle>{krTitle}</StTargetKrTitle>
      </StSecondKrTitleBox>

      <StSecondKrTargetMetricBox>
        <p>이 성과를 측정할 수 있는 수치값과 단위를 입력하세요.</p>
        <div css={TargetMetricInputBox}>
          <StTargetMetricInput
            value={krTarget}
            onChange={(e) => handleGuidTargetInput(e, MAX_KR_TARGET)}
            placeholder={HINT_TARGET}
            $isMax={isValidMax.target}
            autoComplete="off"
          />
          <StTargetMetricInput
            value={krMetric}
            onChange={(e) => handleGuideMetricInput(e, MAX_KR_METRIC)}
            placeholder={HINT_METRIC}
            $isMax={isValidMax.metric}
            autoComplete="off"
          />
        </div>
      </StSecondKrTargetMetricBox>
    </StGuideSecondKeyResultCardWrapper>
  );
};

export default GuideSecondKeyResultCard;

const StGuideSecondKeyResultCardWrapper = styled(EmptyKeyResultCard)`
  gap: 4.4rem;
  justify-content: center;
  padding: 0 1.7rem;
`;

const StSecondKrTitleBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.body_14_medium};
`;

const StTargetKrTitle = styled.p`
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

const StTargetMetricInput = styled.input<{ $isMax: boolean }>`
  display: flex;
  align-items: center;
  width: 14.6rem;
  height: 3.2rem;
  padding: 1rem;
  color: ${({ theme, $isMax }) => ($isMax ? '#ff6969' : theme.colors.gray_000)};
  background-color: ${({ theme }) => theme.colors.gray_600};
  border: 1px solid ${({ theme }) => theme.colors.gray_450};
  border-radius: 6px;

  &:focus,
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray_550};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray_350};
  }

  ${({ theme }) => theme.fonts.body_14_medium};
`;
