import { jsx } from '@emotion/react';
import styled from '@emotion/styled';
import { IKeyResultTypes } from '@type/OkrTree/KeyResultTypes';
import { ITaskNodesTypes } from '@type/OkrTree/TasksTypes';

import { ObjectiveNodes } from '../nodes/CommonOkrNodes';
import KrContainer from './krTemplate/KrContainer';

interface IOkrTreeProps {
  objTitle: string;
  objStroke?: undefined | string;
  keyResultList: IKeyResultTypes[];
  KrNodes: ({
    idx,
    title,
    descriptionBefore,
    target,
    metric,
    descriptionAfter,
  }: IKeyResultTypes) => jsx.JSX.Element;
  TaskNodes: ({ idx, title, isFirstChild }: ITaskNodesTypes) => jsx.JSX.Element;
}

const OkrTreeTemplate = ({
  objTitle,
  objStroke,

  keyResultList,
  KrNodes,
  TaskNodes,
}: IOkrTreeProps) => {
  return (
    <StOkrTreeContainer>
      <ObjectiveNodes title={objTitle} objStroke={objStroke} />
      <StKrTreeWrapper>
        <KrContainer keyResultList={keyResultList} KrNodes={KrNodes} TaskNodes={TaskNodes} />
      </StKrTreeWrapper>
    </StOkrTreeContainer>
  );
};

export default OkrTreeTemplate;

const StOkrTreeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-top: 1.2rem;
`;

const StKrTreeWrapper = styled.div`
  display: flex;
`;
