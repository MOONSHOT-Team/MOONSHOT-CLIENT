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
      {isFirstChild && <StTaskLabel>Tasks</StTaskLabel>}
      <StTaskNodeContainer>
        <NodeLines />
        <StMainDashTaskBoxWrapper>
          <StraightLine />
          <StyledIcDrag />
          <StMainDashTaskBox>{task?.title}</StMainDashTaskBox>
        </StMainDashTaskBoxWrapper>
      </StTaskNodeContainer>
    </StNodesContainer>
  );
};

const StMainDashTaskBoxWrapper = styled(StTaskBoxWrapper)`
  display: flex;
  align-items: center;
`;

const StMainDashTaskBox = styled(StTaskBox)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  min-width: 18rem;
  padding: 0.6rem 1.6rem;
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.body_12_medium};

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray_600};
    outline: 1px solid ${({ theme }) => theme.colors.gray_500};
  }
`;

const StyledIcDrag = styled(IcDrag)`
  margin: 0 0.5rem 0 0.6rem;
`;
