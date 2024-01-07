import StraightLine from '@components/OkrTree/Lines/StraightLine';
import { jsx } from '@emotion/react';
import styled from '@emotion/styled';
import { IKeyResultTypes } from '@type/OkrTree/KeyResultTypes';
import { ITaskNodesTypes } from '@type/OkrTree/TasksTypes';

interface IKrTaskContainerProps {
  krProp: IKeyResultTypes;
  KrNodes: ({ idx, title }: IKeyResultTypes) => jsx.JSX.Element;
  TaskNodes: ({ idx, title, isFirstChild }: ITaskNodesTypes) => jsx.JSX.Element;
}

const KrTaskContainer = ({ krProp, KrNodes, TaskNodes }: IKrTaskContainerProps) => {
  const { title, idx, taskList } = krProp;
  return (
    <StKrTaskContainer>
      <KrNodes title={title} idx={idx} />
      {taskList?.length !== 0 && (
        <>
          <StraightLine />
          <StTaskNodesWrapper>
            {taskList?.map(({ title, idx }) => {
              return <TaskNodes key={idx} idx={idx} title={title} isFirstChild={idx === 0} />;
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
  height: fit-content;
`;

const StTaskNodesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2.6rem 0; /* 여기 값으로 KR 사이 조정 */

  & > div:first-child {
    > div {
      > div:first-child {
        > div:first-child {
          background-color: transparent;
        }
      }
    }
  }

  /* stylelint-disable */
  & > div:last-child {
    > div {
      > div:first-child {
        > div:last-child {
          background-color: transparent;
        }
      }
    }
  }
`;
