import StraightLine from '@components/OkrTree/lines/StraightLine';
import styled from '@emotion/styled';
import {
  StKrBox,
  StKrBoxWrapper,
  StKrLabel,
  StNodesContainer,
} from '@styles/OkrTree/CommonNodeStyle';
import { IKeyResultTypes } from '@type/OkrTree/KeyResultTypes';

import { IcDrag } from '../../assets/icons';

interface IMainDashKrNodesProps {
  krIdx: number;
  krList: IKeyResultTypes;
  onShowSideSheet: (keyResultId: number) => void;
}

export const MainDashKrNodes = ({ krIdx, krList, onShowSideSheet }: IMainDashKrNodesProps) => {
  if (!krList) return;
  const { keyResultTitle, keyResultId } = krList;

  return (
    <StNodesContainer>
      <StKrLabel>KR {krIdx + 1}</StKrLabel>
      <StMainDashKrBoxWrapper onClick={() => onShowSideSheet(keyResultId)}>
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