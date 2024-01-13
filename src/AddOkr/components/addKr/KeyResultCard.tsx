import DynamicInput from '@components/input/DynamicInput';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useState } from 'react';

const KeyResultCard = () => {
  const [metric, setMetric] = useState('');
  const [isClickMetric, setIsClickMetric] = useState(false);

  const handleChangeMetric = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMetric(e.target.value);
  };

  return (
    <article css={KeyResultCardWrapper}>
      <div css={KrDescriptionBox}>
        <StKrDescripText>핵심 지표의 수치 값은</StKrDescripText>

        <StKrMetricBox>
          {isClickMetric ? (
            <DynamicInput
              value={metric}
              handleChangeValue={handleChangeMetric}
              isAutoFocus={true}
            />
          ) : (
            <StKrMetricTxt onClick={() => setIsClickMetric(true)}>수치</StKrMetricTxt>
          )}
        </StKrMetricBox>
      </div>
    </article>
  );
};

export default KeyResultCard;

const KeyResultCardWrapper = css`
  display: flex;
  flex-direction: column;
`;

const KrDescriptionBox = css`
  display: flex;
  gap: 1.2rem;
  align-items: center;
`;
const StKrDescripText = styled.span`
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.body_14_medium};
`;

const StKrMetricBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  min-width: 6.5rem;
  height: 3.2rem;
  padding: 1.4rem 1rem;
  color: ${({ theme }) => theme.colors.gray_000};
  border: 1px solid ${({ theme }) => theme.colors.gray_450};
  border-radius: 6px;

  ${({ theme }) => theme.fonts.body_14_medium};
`;

const StKrMetricTxt = styled.p`
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.body_14_medium};
`;
