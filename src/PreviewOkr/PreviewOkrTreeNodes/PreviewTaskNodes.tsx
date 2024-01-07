import NodeLines from '@components/OkrTree/Lines/NodeLines';
import StraightLine from '@components/OkrTree/Lines/StraightLine';
import {
  StNodesContainer,
  StTaskBox,
  StTaskBoxWrapper,
  StTaskLabel,
  StTaskNodeContainer,
} from '@styles/OkrTree/CommonNodeStyle';

interface ITaskNodesProps {
  isFirstChild?: boolean;
  title: string;
}

export const PreviewTaskNodes = ({ isFirstChild, title }: ITaskNodesProps) => {
  return (
    <StNodesContainer>
      {isFirstChild && <StTaskLabel>Task</StTaskLabel>}
      <StTaskNodeContainer>
        <NodeLines />
        <StTaskBoxWrapper>
          <StraightLine />
          <StTaskBox>{title}</StTaskBox>
        </StTaskBoxWrapper>
      </StTaskNodeContainer>
    </StNodesContainer>
  );
};
