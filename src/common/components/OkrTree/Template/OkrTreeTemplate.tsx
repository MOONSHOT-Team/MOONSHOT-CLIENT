import { jsx } from '@emotion/react';
import styled from '@emotion/styled';
import { IKeyResultTypes } from '@type/OkrTree/KeyResultTypes';
import { ITaskNodesTypes } from '@type/OkrTree/TasksTypes';

import { ObjectiveNodes } from '../Nodes/CommonOkrNodes';
import KrContainer from './KrTemplate/KrContainer';

interface IOkrTreeProps {
  objTitle: string;
  keyResultList: IKeyResultTypes[];
  KrNodes: ({ idx, title }: IKeyResultTypes) => jsx.JSX.Element;
  TaskNodes: ({ idx, title, isFirstChild }: ITaskNodesTypes) => jsx.JSX.Element;
}

const OkrTreeTemplate = ({ objTitle, keyResultList, KrNodes, TaskNodes }: IOkrTreeProps) => {
  return (
    <StOkrTreeContainer>
      <ObjectiveNodes title={objTitle} />
      <StKrTreeWrapper>
        <KrContainer keyResultsProps={keyResultList} KrNodes={KrNodes} TaskNodes={TaskNodes} />
      </StKrTreeWrapper>
    </StOkrTreeContainer>
  );
};

export default OkrTreeTemplate;

const StOkrTreeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StKrTreeWrapper = styled.div`
  display: flex;
`;
