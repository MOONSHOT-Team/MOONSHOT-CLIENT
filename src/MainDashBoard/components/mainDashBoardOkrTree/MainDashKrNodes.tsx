import StraightLine from '@components/OkrTree/lines/StraightLine';
import styled from '@emotion/styled';
import {
  StKrBox,
  StKrBoxWrapper,
  StKrLabel,
  StNodesContainer,
} from '@styles/OkrTree/CommonNodeStyle';

import { IcDrag } from '../../assets/icons';
import { MOCK_MAIN_OKR_DATA } from '../../constants/MOCK_MAIN_OKR_DATA';

interface IMainDashKrNodesProps {
  krIdx: number;
  onShowSideSheet: () => void;
}

export const MainDashKrNodes = ({ krIdx, onShowSideSheet }: IMainDashKrNodesProps) => {
  const { keyResultTitle } = MOCK_MAIN_OKR_DATA.krList[krIdx];

  return (
    <StNodesContainer>
      <StKrLabel>KR {krIdx + 1}</StKrLabel>
      <StMainDashKrBoxWrapper onClick={onShowSideSheet}>
        <StraightLine />
        <StyledIcDrag />
        <StMainDashBox>{keyResultTitle}</StMainDashBox>
      </StMainDashKrBoxWrapper>
    </StNodesContainer>
  );
};

const StMainDashKrBoxWrapper = styled(StKrBoxWrapper)`
  display: flex;
  align-items: center;
`;

const StyledIcDrag = styled(IcDrag)`
  margin: 0 0.5rem 0 0.6rem;
`;

const StMainDashBox = styled(StKrBox)`
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.body_13_medium};
`;
