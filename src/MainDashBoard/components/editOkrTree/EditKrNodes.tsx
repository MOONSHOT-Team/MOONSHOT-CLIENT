import StraightLine from '@components/okrTree/lines/StraightLine';
import styled from '@emotion/styled';
import {
  StKrBox,
  StKrBoxWrapper,
  StKrLabel,
  StNodesContainer,
} from '@styles/okrTree/CommonNodeStyle';
import { IKeyResultTypes } from '@type/okrTree/KeyResultTypes';
import { useEffect, useState } from 'react';

import { IcAdd, IcDrag } from '../../assets/icons';

interface IMainEditKrNodesProps {
  krIdx: number;
  krList: IKeyResultTypes;
  krId: number | undefined;
  handleAddTask: (krId: number | undefined) => void;
}

export const EditKrNodes = ({ krIdx, krList, krId, handleAddTask }: IMainEditKrNodesProps) => {
  const [isntFull, setIsntFull] = useState(false);
  useEffect(() => {
    if (krList.taskList.length >= 3) {
      setIsntFull(false);
      return;
    }
    if (krList.taskList.length < 3) {
      setIsntFull(true);
      return;
    }
  }, [krList]);

  if (!krList) return;
  const { krTitle } = krList;

  return (
    <StNodesContainer>
      <StKrLabel>KR {krIdx + 1}</StKrLabel>
      <StMainDashKrBoxWrapper>
        <StraightLine />
        <StyledIcDrag />
        <StMainDashBox>{krTitle}</StMainDashBox>
        <StraightLine />
        {isntFull && <StIcAdd onClick={() => handleAddTask(krId)} />}
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
