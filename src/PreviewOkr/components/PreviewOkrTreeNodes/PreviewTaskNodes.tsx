import NodeLines from '@components/OkrTree/Lines/NodeLines';
import StraightLine from '@components/OkrTree/Lines/StraightLine';
import {
  StNodesContainer,
  StTaskBox,
  StTaskBoxWrapper,
  StTaskLabel,
  StTaskNodeContainer,
} from '@styles/OkrTree/CommonNodeStyle';
import { ITaskNodesTypes } from '@type/OkrTree/TasksTypes';

export const PreviewTaskNodes = ({ isFirstChild, title, idx }: ITaskNodesTypes) => {
  return (
    <StNodesContainer>
      {isFirstChild && <StTaskLabel>Tasks</StTaskLabel>}
      <StTaskNodeContainer>
        <NodeLines />
        <StTaskBoxWrapper>
          <StraightLine />
          <StTaskBox $idx={idx}>{title}</StTaskBox>
        </StTaskBoxWrapper>
      </StTaskNodeContainer>
    </StNodesContainer>
  );
};
