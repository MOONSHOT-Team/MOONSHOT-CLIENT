import NodeLines from '@components/okrTree/lines/NodeLines';
import { jsx } from '@emotion/react';
import styled from '@emotion/styled';
import { IKeyResultTypes } from '@type/okrTree/KeyResultTypes';

import KrTaskContainer from './KrTaskContainer';

interface IKrContainerProps {
  keyResultList: IKeyResultTypes[];
  KrNodes: (krIdx: number) => jsx.JSX.Element;
  TaskNodes: (isFirstChild: boolean, krIdx: number, taskIdx: number) => jsx.JSX.Element;
}

const KrContainer = ({ keyResultList, KrNodes, TaskNodes }: IKrContainerProps) => {
  return (
    <StKrContainer>
      {keyResultList.map((kr) => {
        return (
          <StKrWrapper key={`$ya{kr.keyResultTitle}-${kr.krIdx}`}>
            <NodeLines />
            <KrTaskContainer krProp={kr} KrNodes={KrNodes} TaskNodes={TaskNodes} />
          </StKrWrapper>
        );
      })}
    </StKrContainer>
  );
};

export default KrContainer;

const StKrContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  & > div:first-of-type {
    > div:first-of-type {
      div:first-of-type {
        background-color: transparent;
      }
    }
  }

  /* stylelint-disable */
  & > div:last-child {
    > div:first-of-type {
      div:last-child {
        background-color: transparent;
      }
    }
  }
`;

const StKrWrapper = styled.div`
  display: flex;
`;
