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

import { IcDrag } from '../../assets/icons';

interface IMainTaskProps {
  isFirstChild?: boolean;
  taskIdx: number;
  taskList?: ITaskTypes[];
}

export const MainDashTaskNodes = ({ isFirstChild, taskIdx, taskList }: IMainTaskProps) => {
  if (!taskList) return;
  const task = taskList[taskIdx];

  return (
    <StNodesContainer>
      {isFirstChild && <StMainTaskLabel>Tasks</StMainTaskLabel>}
      <StTaskNodeContainer>
        <NodeLines />
        <StMainDashTaskBoxWrapper>
          <StraightLine />
          <StyledIcDrag />
          <StMainDashTaskBox>{task?.taskTitle}</StMainDashTaskBox>
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
