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

interface ISocialTaskProps {
  isFirstChild?: boolean;
  taskIdx: number;
  taskList?: ITaskTypes[];
}

export const SocialTaskNodes = ({ isFirstChild, taskIdx, taskList }: ISocialTaskProps) => {
  if (!taskList) return;
  const task = taskList[taskIdx];

  return (
    <StNodesContainer>
      {isFirstChild && <StSocialTaskLabel>Tasks</StSocialTaskLabel>}
      <StTaskNodeContainer>
        <NodeLines />
        <StSocialTaskBoxWrapper>
          <StraightLine />
          <StSocialTaskBox>{task?.taskTitle}</StSocialTaskBox>
        </StSocialTaskBoxWrapper>
      </StTaskNodeContainer>
    </StNodesContainer>
  );
};

const StSocialTaskBoxWrapper = styled(StTaskBoxWrapper)`
  display: flex;
  align-items: center;
`;

const StSocialTaskBox = styled(StTaskBox)`
  display: flex;
  align-items: center;
  justify-content: center;
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

const StSocialTaskLabel = styled(StTaskLabel)`
  top: -1.4rem;
`;
