import NodeLines from '@components/OkrTree/lines/NodeLines';
import StraightLine from '@components/OkrTree/lines/StraightLine';
import styled from '@emotion/styled';
import {
  StNodesContainer,
  StTaskBox,
  StTaskBoxWrapper,
  StTaskLabel,
  StTaskNodeContainer,
} from '@styles/okrTree/CommonNodeStyle';
import { ITaskTypes } from '@type/OkrTree/TasksTypes';

interface ISocialTaskProps {
  isFirstChild?: boolean;
  taskIdx: number;
  taskList?: ITaskTypes[];
}

export const SocialTaskNodes = ({ isFirstChild, taskIdx, taskList }: ISocialTaskProps) => {
  const task = taskList ? taskList[taskIdx] : undefined;

  if (!task) {
    return;
  }

  return (
    <StNodesContainer>
      {isFirstChild && <StTaskLabel>Tasks</StTaskLabel>}
      <StTaskNodeContainer>
        <NodeLines />
        <StSocialTaskBoxWrapper>
          <StraightLine />
          <StSocialTaskBox $idx={task?.idx}>{task?.title}</StSocialTaskBox>
        </StSocialTaskBoxWrapper>
      </StTaskNodeContainer>
    </StNodesContainer>
  );
};

const StSocialTaskBoxWrapper = styled(StTaskBoxWrapper)`
  display: flex;
  align-items: center;
`;

const StSocialTaskBox = styled(StTaskBox)<{ $idx: number }>`
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
