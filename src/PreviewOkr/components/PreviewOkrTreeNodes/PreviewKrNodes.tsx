import DynamicInput from '@components/input/DynamicInput';
import StraightLine from '@components/OkrTree/lines/StraightLine';
import styled from '@emotion/styled';
import {
  StKrBox,
  StKrBoxWrapper,
  StKrLabel,
  StNodesContainer,
} from '@styles/okrTree/CommonNodeStyle';
import { IKeyResultTypes } from '@type/OkrTree/KeyResultTypes';

export const PreviewKrNodes = ({
  idx,
  descriptionBefore,
  target,
  metric,
  descriptionAfter,
}: IKeyResultTypes) => {
  return (
    <StNodesContainer>
      <StKrLabel>KR {idx + 1}</StKrLabel>
      <StKrBoxWrapper>
        <StraightLine />
        <StPreviewKrBox>
          {descriptionBefore && <DynamicInput defaultValue={descriptionBefore} />}
          <StPreviewKrBoxValue>
            {target}
            {metric}
          </StPreviewKrBoxValue>
          {descriptionAfter && <DynamicInput defaultValue={descriptionAfter} />}
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
`;
