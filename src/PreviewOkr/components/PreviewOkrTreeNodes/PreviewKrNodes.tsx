import DynamicInput from '@components/input/DynamicInput';
import StraightLine from '@components/okrTree/lines/StraightLine';
import { MOCK_OKR_DATA } from '@constants/MOCK_OKR_DATA';
import styled from '@emotion/styled';
import {
  StKrBox,
  StKrBoxWrapper,
  StKrLabel,
  StNodesContainer,
} from '@styles/okrTree/CommonNodeStyle';
import { useState } from 'react';

export const PreviewKrNodes = ({ krIdx }: { krIdx: number }) => {
  const { descriptionBefore, descriptionAfter, target, metric } = MOCK_OKR_DATA.krList[krIdx];
  const [beforeValue, setBeforeValue] = useState(descriptionBefore);
  const [afterValue, setAfterValue] = useState(descriptionAfter);

  return (
    <StNodesContainer>
      <StKrLabel>KR {krIdx + 1}</StKrLabel>
      <StKrBoxWrapper>
        <StraightLine />
        <StPreviewKrBox>
          {/*수치 값 앞 문장*/}
          {beforeValue && (
            <DynamicInput
              value={beforeValue}
              handleChangeValue={(e) => setBeforeValue(e.target.value)}
            />
          )}

          {/*수치 값*/}
          <StPreviewKrBoxValue>
            {target}
            {metric}
          </StPreviewKrBoxValue>

          {/*수치 값 뒤 문장*/}
          {afterValue && (
            <DynamicInput
              value={afterValue}
              handleChangeValue={(e) => setAfterValue(e.target.value)}
            />
          )}
        </StPreviewKrBox>
      </StKrBoxWrapper>
    </StNodesContainer>
  );
};

const StPreviewKrBox = styled(StKrBox)`
  display: flex;
  gap: 0.3rem;
`;

const StPreviewKrBoxValue = styled.p`
  margin-right: 0.1rem;
  color: ${({ theme }) => theme.colors.gray_400};

  ${({ theme }) => theme.fonts.body_13_medium};

  cursor: default;
`;
