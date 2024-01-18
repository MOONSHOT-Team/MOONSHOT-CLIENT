import StraightLine from '@components/okrTree/lines/StraightLine';
import styled from '@emotion/styled';
import {
  StKrBox,
  StKrBoxWrapper,
  StKrLabel,
  StNodesContainer,
} from '@styles/okrTree/CommonNodeStyle';
import { IKeyResultTypes } from '@type/okrTree/KeyResultTypes';

interface ISocialKrNodesProps {
  krIdx: number;
  krList: IKeyResultTypes;
}

export const SocialKrNodes = ({ krIdx, krList }: ISocialKrNodesProps) => {
  const { keyResultTitle } = krList;

  return (
    <StNodesContainer>
      <StKrLabel>KR {krIdx + 1}</StKrLabel>
      <StSocialKrBoxWrapper>
        <StraightLine />
        <StSocialBox>{keyResultTitle}</StSocialBox>
      </StSocialKrBoxWrapper>
    </StNodesContainer>
  );
};

const StSocialKrBoxWrapper = styled(StKrBoxWrapper)`
  display: flex;
  align-items: center;
`;

const StSocialBox = styled(StKrBox)`
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.body_13_medium};
`;
