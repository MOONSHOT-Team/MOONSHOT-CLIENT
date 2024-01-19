import StraightLine from '@components/okrTree/lines/StraightLine';
import styled from '@emotion/styled';
import { StKrBoxWrapper, StKrLabel, StNodesContainer } from '@styles/okrTree/CommonNodeStyle';
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

const StSocialBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 1.4rem 2.4rem;
  color: ${({ theme }) => theme.colors.gray_000};
  background-color: ${({ theme }) => theme.colors.gray_600};
  border-radius: 75px;
  outline: 1px solid ${({ theme }) => theme.colors.gray_500};
  ${({ theme }) => theme.fonts.body_13_medium};
`;
