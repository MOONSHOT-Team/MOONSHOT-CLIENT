import NodeLines from '@components/okrTree/lines/NodeLines';
import StraightLine from '@components/okrTree/lines/StraightLine';
import {
  StNodesContainer,
  StTaskBox,
  StTaskBoxWrapper,
  StTaskLabel,
  StTaskNodeContainer,
} from '@styles/okrTree/CommonNodeStyle';
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
