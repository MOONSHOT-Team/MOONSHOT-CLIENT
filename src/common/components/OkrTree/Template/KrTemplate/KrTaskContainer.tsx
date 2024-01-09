import StraightLine from '@components/OkrTree/lines/StraightLine';
import { jsx } from '@emotion/react';
import styled from '@emotion/styled';
import { IKeyResultTypes } from '@type/OkrTree/KeyResultTypes';
import { ITaskNodesTypes } from '@type/OkrTree/TasksTypes';

interface IKrTaskContainerProps {
  krProp: IKeyResultTypes;
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

const KrTaskContainer = ({ krProp, KrNodes, TaskNodes }: IKrTaskContainerProps) => {
  const { title, idx, taskList, descriptionBefore, target, metric, descriptionAfter } = krProp;
  return (
    <StKrTaskContainer>
      <KrNodes
        title={title}
        idx={idx}
        descriptionBefore={descriptionBefore}
        target={target}
        metric={metric}
        descriptionAfter={descriptionAfter}
      />
      {taskList?.length !== 0 && (
        <>
          <StraightLine />
          <StTaskNodesWrapper>
            {taskList?.map(({ title, idx }) => {
              return <TaskNodes key={title} idx={idx} title={title} isFirstChild={idx === 0} />;
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
