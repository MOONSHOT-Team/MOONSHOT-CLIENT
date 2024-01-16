import styled from '@emotion/styled';

interface ITaskResultListProps {
  taskId: number;
  taskTitle: string;
  taskIdx: number;
}

const TaskResultList = ({ taskId, taskTitle, taskIdx }: ITaskResultListProps) => {
  return (
    <>
      <StTaskContainer key={`${taskId}+${taskTitle}`}>
        <StTaskWrapper>
          <StOKRIndex>Task {taskIdx + 1}</StOKRIndex>
          <StOKRContent>{taskTitle}</StOKRContent>
        </StTaskWrapper>
      </StTaskContainer>
    </>
  );
};

export default TaskResultList;

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
  align-items: center;
  width: 100%;
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
