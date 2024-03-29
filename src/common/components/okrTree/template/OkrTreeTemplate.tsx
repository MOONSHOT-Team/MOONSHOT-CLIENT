import { jsx } from '@emotion/react';
import styled from '@emotion/styled';
import { IKeyResultTypes } from '@type/okrTree/KeyResultTypes';

import KrContainer from './krTemplate/KrContainer';

interface IOkrTreeProps {
  ObjNode: () => jsx.JSX.Element;
  keyResultList: IKeyResultTypes[];
  KrNodes: (krIdx: number) => jsx.JSX.Element;
  TaskNodes: (isFirstChild: boolean, krIdx: number, taskIdx: number) => jsx.JSX.Element;
}

const OkrTreeTemplate = ({ ObjNode, keyResultList, KrNodes, TaskNodes }: IOkrTreeProps) => {
  return (
    <StOkrTreeContainer>
      {ObjNode()}
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
