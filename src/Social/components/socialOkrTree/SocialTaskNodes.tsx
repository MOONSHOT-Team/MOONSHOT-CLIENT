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
      {isFirstChild && <StTaskLabel>Tasks</StTaskLabel>}
      <StTaskNodeContainer>
        <NodeLines />
        <StSocialTaskBoxWrapper>
          <StraightLine />
          <StSocialTaskBox>{task?.title}</StSocialTaskBox>
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
  min-width: 18rem;
  padding: 0.6rem 1.6rem;
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.body_12_medium};

  background-color: ${({ theme }) => theme.colors.background};

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
    outline: 1px solid ${({ theme }) => theme.colors.gray_500};
  }
`;
