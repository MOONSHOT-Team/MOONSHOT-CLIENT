import styled from '@emotion/styled';

interface IHistoryTaskProps {
  index: number;
  task: string;
}

export const HistoryTask = ({ index, task }: IHistoryTaskProps) => {
  return (
    <StTaskWrapper>
      <StTaskIndex>Task {index + 1}</StTaskIndex>
      <StTask>{task}</StTask>
    </StTaskWrapper>
  );
};

const StTaskWrapper = styled.div`
  display: flex;
  gap: 1.6rem;
  align-items: center;
  width: calc(100% / 3);
  min-width: 34rem;
  height: 4rem;
  padding-left: 1.6rem;
  color: ${({ theme }) => theme.colors.gray_000};
  background-color: ${({ theme }) => theme.colors.gray_600};
  border-radius: 6px;
`;

const StTaskIndex = styled.span`
  ${({ theme }) => theme.fonts.btn_11_medium};
`;

const StTask = styled.span`
  ${({ theme }) => theme.fonts.body_14_regular};
`;
