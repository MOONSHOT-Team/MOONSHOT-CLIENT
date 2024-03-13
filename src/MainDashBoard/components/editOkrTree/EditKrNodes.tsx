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

import { IcAdd, IcDrag, IcTrashPurple } from '../../assets/icons';

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
      <StEditKrKrBoxWrapper>
        <StraightLine />
        <StyledIcDrag />
        <StEditKrBox>
          <p>{krTitle}</p>
          <IcTrashPurple
            onClick={() => {
              //kr삭제 api연동
              console.log(krId);
            }}
          />
        </StEditKrBox>
        <StraightLine />
        {isntFull && <StIcAdd onClick={() => handleAddTask(krId)} />}
      </StEditKrKrBoxWrapper>
    </StNodesContainer>
  );
};

const StEditKrKrBoxWrapper = styled(StKrBoxWrapper)`
  display: flex;
  align-items: center;
`;

const StyledIcDrag = styled(IcDrag)`
  margin: 0 0.5rem 0 0.6rem;
`;

const StEditKrBox = styled(StKrBox)`
  display: flex;
  gap: 0.4rem;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray_350};
  ${({ theme }) => theme.fonts.body_13_medium};

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray_600};
    outline: 1px solid ${({ theme }) => theme.colors.gray_500};
  }
`;

const StIcAdd = styled(IcAdd)`
  position: absolute;
  right: -10px;
  z-index: 1;
`;
