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
import { ITaskNodesTypes } from '@type/okrTree/TasksTypes';
import { useState } from 'react';

import { MAX_TASK_TITLE } from '../../../AddOkr/constants/OKR_MAX_LENGTH';
import { IPreviewTaskInfoTypes } from '../../../AddOkr/types/TaskInfoTypes';
import { IcPlusSmall } from '../../assets/icons';

interface IPreviewTaskNodesProps extends ITaskNodesTypes {
  previewTaskListInfo: IPreviewTaskInfoTypes[];
  setPreviewTaskListInfo: React.Dispatch<React.SetStateAction<IPreviewTaskInfoTypes[]>>;
}

export const PreviewTaskNodes = ({
  isFirstChild,
  krIdx,
  taskIdx,
  previewTaskListInfo,
  setPreviewTaskListInfo,
}: IPreviewTaskNodesProps) => {
  const [isClickedPlusBtn, setIsClickedPlusBtn] = useState(false);

  const taskTitle = previewTaskListInfo[krIdx].taskList[taskIdx].taskTitle;

  const handleChangeTaskValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > MAX_TASK_TITLE)
      e.target.value = e.target.value.slice(0, MAX_TASK_TITLE);

    previewTaskListInfo[krIdx].taskList[taskIdx].taskTitle = e.target.value;
    setPreviewTaskListInfo([...previewTaskListInfo]);
  };

  const handleClickPlusBtn = () => {
    previewTaskListInfo[krIdx].taskList.filter(
      (task) => task.taskIdx < taskIdx && task.taskTitle === '',
    ).length === 0 && setIsClickedPlusBtn(true);
  };

  return (
    <StNodesContainer>
      {isFirstChild && <StTaskLabel>Tasks</StTaskLabel>}
      <StTaskNodeContainer>
        <NodeLines />
        <StTaskBoxWrapper>
          <StraightLine />
          {isClickedPlusBtn ? (
            <StPreviewTaskBox $idx={taskIdx}>
              <DynamicInput
                value={taskTitle}
                handleChangeValue={handleChangeTaskValue}
                isAutoFocus={true}
                maxLength={MAX_TASK_TITLE}
              />
            </StPreviewTaskBox>
          ) : (
            <StPreviewPlusBtn type="button" onClick={handleClickPlusBtn}>
              <IcPlusSmall />
            </StPreviewPlusBtn>
          )}
        </StTaskBoxWrapper>
      </StTaskNodeContainer>
    </StNodesContainer>
  );
};

const StPreviewTaskBox = styled(StTaskBox)<{ $idx: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  min-width: 18rem;
  padding: 0.6rem 1.6rem;
`;

const StPreviewPlusBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18rem;
  height: 3rem;
  margin: calc(1.2rem / 2) 0; /* task와 task 사이 간격 */
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 75px;
  outline: 1px solid ${({ theme }) => theme.colors.gray_500};

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray_550};
    outline: 1px solid ${({ theme }) => theme.colors.gray_500};
  }
`;
