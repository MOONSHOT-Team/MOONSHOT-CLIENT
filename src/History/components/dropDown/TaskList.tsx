import styled from '@emotion/styled';

interface ITaskResultListProps {
  taskId: number;
  taskTitle: string;
  taskIdx: number;
}

const TaskList = ({ taskId, taskTitle, taskIdx }: ITaskResultListProps) => {
  return (
    <>
      <StTaskContainer key={`${taskId}+${taskTitle}`}>
        {taskIdx === 0 ? <div /> : null}
        {taskIdx === 0 || taskIdx === 1 ? <div /> : null}

        <StTaskWrapper>
          <StOKRIndex>Task {taskIdx + 1}</StOKRIndex>
          <StOKRContent>{taskTitle}</StOKRContent>
        </StTaskWrapper>
      </StTaskContainer>
    </>
  );
};

export default TaskList;

const StOKRIndex = styled.p`
  display: flex;
  align-items: center;
  ${({ theme }) => theme.fonts.btn_11_medium};

  color: ${({ theme }) => theme.colors.gray_000};
`;

const StOKRContent = styled.p`
  ${({ theme }) => theme.fonts.body_14_regular};

  color: ${({ theme }) => theme.colors.gray_000};
`;

const StTaskContainer = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%/3;
  min-width: 34rem;
  height: 4rem;
  padding-left: 1.6rem;
  list-style-type: none;
  background: ${({ theme }) => theme.colors.gray_600};
  border-radius: 6px;
`;

const StTaskWrapper = styled.div`
  display: flex;
  gap: 1.6rem;
  align-items: center;
`;
