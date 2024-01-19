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
import { ITaskNodesTypes } from '@type/OkrTree/TasksTypes';
import { useState } from 'react';

import { IPreviewTaskInfoTypes } from '../../../AddOkr/types/TaskInfoTypes';
import { IcPlusSmall } from '../../assets/icons';

interface IPreviewTasknodesProps extends ITaskNodesTypes {
  previewTaskListInfo: IPreviewTaskInfoTypes[];
  setPreviewTaskListInfo: React.Dispatch<React.SetStateAction<IPreviewTaskInfoTypes[]>>;
}

const MAX_TASK_LENGTH = 30;

export const PreviewTaskNodes = ({
  isFirstChild,
  krIdx,
  taskIdx,
  previewTaskListInfo,
  setPreviewTaskListInfo,
}: IPreviewTasknodesProps) => {
  const [isClikcedPlusBtn, setIsClickedPlusBtn] = useState(false);

  const title = previewTaskListInfo[krIdx].taskList[taskIdx].title;

  const handleChangeTaskValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    previewTaskListInfo[krIdx].taskList[taskIdx].title = e.target.value;
    setPreviewTaskListInfo([...previewTaskListInfo]);
  };

  return (
    <StNodesContainer>
      {isFirstChild && <StTaskLabel>Tasks</StTaskLabel>}
      <StTaskNodeContainer>
        <NodeLines />
        <StTaskBoxWrapper>
          <StraightLine />
          {isClikcedPlusBtn ? (
            <StPreviewTaskBox $idx={taskIdx}>
              <DynamicInput
                value={title}
                handleChangeValue={handleChangeTaskValue}
                isAutoFocus={true}
                maxLength={MAX_TASK_LENGTH}
              />
            </StPreviewTaskBox>
          ) : (
            <StPreviewPlusBtn type="button" onClick={() => setIsClickedPlusBtn(true)}>
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
  background-color: ${({ theme }) => theme.colors.gray_600};
  border-radius: 75px;
  outline: 1px solid ${({ theme }) => theme.colors.gray_500};

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray_550};
    outline: 1px solid ${({ theme }) => theme.colors.gray_500};
  }
`;
