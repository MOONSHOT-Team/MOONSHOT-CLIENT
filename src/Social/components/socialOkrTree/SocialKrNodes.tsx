import StraightLine from '@components/OkrTree/lines/StraightLine';
import styled from '@emotion/styled';
import {
  StKrBox,
  StKrBoxWrapper,
  StKrLabel,
  StNodesContainer,
} from '@styles/OkrTree/CommonNodeStyle';
import { IKeyResultTypes } from '@type/OkrTree/KeyResultTypes';

interface ISocialKrNodesProps {
  krIdx: number;
  krList: IKeyResultTypes;
}

export const SocialKrNodes = ({ krIdx, krList }: ISocialKrNodesProps) => {
  const { title } = krList;

  return (
    <StNodesContainer>
      <StKrLabel>KR {krIdx + 1}</StKrLabel>
      <StMainDashKrBoxWrapper>
        <StraightLine />
        <StMainDashBox>{title}</StMainDashBox>
      </StMainDashKrBoxWrapper>
    </StNodesContainer>
  );
};

const StMainDashKrBoxWrapper = styled(StKrBoxWrapper)`
  display: flex;
  align-items: center;
`;

const StMainDashBox = styled(StKrBox)`
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.body_13_medium};
`;
