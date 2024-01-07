import StraightLine from '@components/OkrTree/Lines/StraightLine';
import { KeyResultNodes, TaskNodes } from '@components/OkrTree/Nodes/CommonOkrNodes';
import styled from '@emotion/styled';
import { IKeyResultTypes } from '@type/OkrTree/KeyResultTypes';

interface IKrTaskContainerProps {
  //   //   KrBox: () => React.ReactNode;
  //   title: string;
  //   tasks: ITaskTypes[];
  krProp: IKeyResultTypes;
}

const KrTaskContainer = ({ krProp }: IKrTaskContainerProps) => {
  const { title, idx, taskList } = krProp;
  return (
    <StKrTaskContainer>
      <KeyResultNodes title={title} idx={idx} />
      {taskList?.length !== 0 && (
        <>
          <StraightLine />
          <StTaskNodesWrapper>
            {taskList?.map(({ title, idx }) => {
              return <TaskNodes key={idx} title={title} isFirstChild={idx === 0} />;
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
