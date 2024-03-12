import StraightLine from '@components/okrTree/lines/StraightLine';
import styled from '@emotion/styled';
import {
  StKrBox,
  StKrBoxWrapper,
  StKrLabel,
  StNodesContainer,
} from '@styles/okrTree/CommonNodeStyle';
import { IKeyResultTypes } from '@type/okrTree/KeyResultTypes';

import { IcAdd, IcDrag } from '../../assets/icons';

interface IMainDashKrNodesProps {
  krIdx: number;
  krList: IKeyResultTypes;
  handleAddTask?: (krId: number) => void;
}

export const EditKrNodes = ({ krIdx, krList }: IMainDashKrNodesProps) => {
  if (!krList) return;
  const { krTitle } = krList;
  console.log(krList);

  return (
    <StNodesContainer>
      <StKrLabel>KR {krIdx + 1}</StKrLabel>
      <StMainDashKrBoxWrapper>
        <StraightLine />
        <StyledIcDrag />
        <StMainDashBox>{krTitle}</StMainDashBox>
        <StraightLine />
        <StIcAdd />
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

const StIcAdd = styled(IcAdd)`
  position: absolute;
  right: -10px;
  z-index: 1;
`;
