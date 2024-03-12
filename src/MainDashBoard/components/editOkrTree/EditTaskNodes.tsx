import DynamicInput from '@components/input/DynamicInput';
import NodeLines from '@components/okrTree/lines/NodeLines';
import StraightLine from '@components/okrTree/lines/StraightLine';
import styled from '@emotion/styled';
import {
  StNodesContainer,
  StTaskBox,
  StTaskBoxWrapper,
  StTaskLabel,
  StTaskNodeContainer,
} from '@styles/okrTree/CommonNodeStyle';
import { ITaskTypes } from '@type/okrTree/TasksTypes';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';

import { MAX_TASK_TITLE } from '../../../AddOkr/constants/OKR_MAX_LENGTH';
import { IcPlusSmall } from '../../../PreviewOkr/assets/icons';
import {
  StPreviewPlusBtn,
  StPreviewTaskBox,
} from '../../../PreviewOkr/components/PreviewOkrTreeNodes/PreviewTaskNodes';
import { getDashBoardData, postAddTask } from '../../apis/fetcher';
import { IcDrag } from '../../assets/icons';

interface IEditTaskProps {
  isFirstChild?: boolean;
  taskIdx: number;
  taskList: ITaskTypes[];
  editKrId?: number | number;
  objId: number;
}

export const EditTaskNodes = ({
  isFirstChild,
  taskIdx,
  taskList,
  editKrId,
  objId,
}: IEditTaskProps) => {
  const { mutate } = useSWR(`v1/objective?objectiveId=${objId}`, getDashBoardData);
  const [isClickedPlusBtn, setIsClickedPlusBtn] = useState(false);
  const [taskValue, setTaskValue] = useState('');
  const navigate = useNavigate();
  if (!taskList) return;
  const task = taskList[taskIdx];

  const handleClickPlusBtn = () => {
    setIsClickedPlusBtn(true);
  };
  const handleChangeTaskValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskValue(e.target.value);
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.stopPropagation();
      console.log('엔터!');
      postData();
      return;
    }
  };

  const postData = async () => {
    try {
      await postAddTask('/v1/task', {
        keyResultId: editKrId,
        title: taskValue,
        idx: taskIdx,
      });
      mutate(`v1/objective?objectiveId=${objId}`);
    } catch {
      navigate('error');
    }
  };

  return (
    <StNodesContainer>
      {isFirstChild && <StMainTaskLabel>Tasks</StMainTaskLabel>}
      <StTaskNodeContainer>
        <NodeLines />
        <StMainDashTaskBoxWrapper>
          <StraightLine />
          <StyledIcDrag />

          {task?.taskTitle !== '' ? (
            <StMainDashTaskBox>{task?.taskTitle}</StMainDashTaskBox>
          ) : (
            <>
              {isClickedPlusBtn ? (
                <StPreviewTaskBox $idx={taskIdx}>
                  <DynamicInput
                    value={taskValue}
                    handleChangeValue={handleChangeTaskValue}
                    isAutoFocus={true}
                    maxLength={MAX_TASK_TITLE}
                    onKeyDown={handleKeyPress}
                  />
                </StPreviewTaskBox>
              ) : (
                <StPreviewPlusBtn type="button" onClick={handleClickPlusBtn}>
                  <IcPlusSmall />
                </StPreviewPlusBtn>
              )}
            </>
          )}
        </StMainDashTaskBoxWrapper>
      </StTaskNodeContainer>
    </StNodesContainer>
  );
};

const StMainTaskLabel = styled(StTaskLabel)`
  top: -1.6rem;
`;

const StMainDashTaskBoxWrapper = styled(StTaskBoxWrapper)`
  display: flex;
  align-items: center;
`;

const StMainDashTaskBox = styled(StTaskBox)`
  width: fit-content;
  padding: 0.6rem 1.6rem;
  color: ${({ theme }) => theme.colors.gray_000};
  background-color: ${({ theme }) => theme.colors.background};

  ${({ theme }) => theme.fonts.body_12_medium};

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
    outline: 1px solid ${({ theme }) => theme.colors.gray_500};
  }
`;

const StyledIcDrag = styled(IcDrag)`
  margin: 0 0.5rem 0 0.6rem;
`;
