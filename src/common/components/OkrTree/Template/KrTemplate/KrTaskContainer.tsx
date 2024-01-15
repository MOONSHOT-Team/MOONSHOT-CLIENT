import StraightLine from '@components/OkrTree/lines/StraightLine';
import { jsx } from '@emotion/react';
import styled from '@emotion/styled';
import { IKeyResultTypes } from '@type/OkrTree/KeyResultTypes';
import React from 'react';

interface IKrTaskContainerProps {
  krProp: IKeyResultTypes;
  KrNodes: (krIdx: number) => jsx.JSX.Element;
  TaskNodes: (isFirstChild: boolean, krIdx: number, taskIdx: number) => jsx.JSX.Element;
}

const KrTaskContainer = ({ krProp, KrNodes, TaskNodes }: IKrTaskContainerProps) => {
  const { taskList, idx: krIdx } = krProp;
  return (
    <StKrTaskContainer>
      {KrNodes(krIdx)}
      {taskList?.length !== 0 && (
        <>
          <StraightLine />
          <StTaskNodesWrapper>
            {taskList?.map(({ title, idx: taskIdx }) => {
              return (
                <React.Fragment key={`${title}-${taskIdx}`}>
                  {TaskNodes(taskIdx === 0, krIdx, taskIdx)}
                </React.Fragment>
              );
            })}
          </StTaskNodesWrapper>
        </>
      )}
    </StKrTaskContainer>
  );
};

export default KrTaskContainer;

const StKrTaskContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 18.8rem;
`;

const StTaskNodesWrapper = styled.div`
  display: flex;
  flex-direction: column;

  & > div:first-of-type {
    > div {
      > div:first-of-type {
        > div:first-of-type {
          background-color: transparent;
        }
      }
    }
  }

  /* stylelint-disable */
  & > div:last-child {
    > div {
      > div:first-of-type {
        > div:last-child {
          background-color: transparent;
        }
      }
    }
  }
`;
