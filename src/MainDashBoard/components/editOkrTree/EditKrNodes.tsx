import StraightLine from '@components/okrTree/lines/StraightLine';
import styled from '@emotion/styled';
import useModal from '@hooks/useModal';
import {
  StKrBox,
  StKrBoxWrapper,
  StKrLabel,
  StNodesContainer,
} from '@styles/okrTree/CommonNodeStyle';
import { IKeyResultTypes } from '@type/okrTree/KeyResultTypes';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';

import { deletOkrInstance, getDashBoardData } from '../../apis/fetcher';
import { IcAdd, IcDrag, IcTrashPurple } from '../../assets/icons';
import DeleteKrModal from '../editModeModal/DeleteKrModal';

interface IMainEditKrNodesProps {
  krIdx: number;
  krList: IKeyResultTypes;
  krId: number | undefined;
  handleAddTask: (krId: number | undefined) => void;
  objId: number;
  state: string;
  setState: Dispatch<SetStateAction<string>>;
}

export const EditKrNodes = ({
  krIdx,
  krList,
  krId,
  handleAddTask,
  objId,
  state,
  setState,
}: IMainEditKrNodesProps) => {
  const navigate = useNavigate();

  const url = objId ? `/v1/objective?objectiveId=${objId}` : '/v1/objective';
  const { mutate } = useSWR(url, getDashBoardData);

  const { modalRef, handleShowModal } = useModal();

  const [isntFull, setIsntFull] = useState(false);

  //kr 삭제하는 handler (kr 삭제 확인 모달의 삭제 버튼 클릭시 동작)
  const handleConfirmDelKr = async () => {
    try {
      await deletOkrInstance(`/v1/key-result/${krId}`);
      mutate();
      setState(state);
    } catch {
      navigate('/error');
    }
  };

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
    <>
      {/* kr 삭제 모달 */}
      <DeleteKrModal
        modalRef={modalRef}
        modalConfirmHandler={{
          handleClickConfirm: handleConfirmDelKr,
        }}
      />

      <StNodesContainer>
        <StKrLabel>KR {krIdx + 1}</StKrLabel>
        <StEditKrKrBoxWrapper>
          <StraightLine />
          <StyledIcDrag />
          <StEditKrBox>
            <p>{krTitle}</p>
            <IcTrashPurple
              onClick={() => {
                //kr 삭제 모달 나타남
                handleShowModal();
              }}
            />
          </StEditKrBox>
          <StraightLine />
          {isntFull && <StIcAdd onClick={() => handleAddTask(krId)} />}
        </StEditKrKrBoxWrapper>
      </StNodesContainer>
    </>
  );
};

const StEditKrKrBoxWrapper = styled(StKrBoxWrapper)`
  display: flex;
  align-items: center;
`;

const StyledIcDrag = styled(IcDrag)`
  margin: 0 0.5rem 0.6rem;
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
