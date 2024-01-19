import styled from '@emotion/styled';
interface ProgressBarProps {
  currentProgress: number;
  maximumProgress?: number;
}

// history_progressbar 현재 진행 마크용
interface MarkerProps {
  value: number;
}

const HistoryProgressBar = ({ currentProgress, maximumProgress = 100 }: ProgressBarProps) => {
  const leftValue = (currentProgress / maximumProgress) * 20.0 - 0.6;
  const percentValue = (currentProgress / maximumProgress) * 100;

  return (
    <StProgressBarContainer isComplete={percentValue}>
      <StProgressBarWrapper>
        <Progress isComplete={percentValue} value={currentProgress} max={maximumProgress} />
        <StMarker value={leftValue} />
      </StProgressBarWrapper>

      <StCurrentProgressBox>{percentValue}% 달성</StCurrentProgressBox>
    </StProgressBarContainer>
  );
};

export default HistoryProgressBar;

const StProgressBarContainer = styled.div<{ isComplete: number }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 29.8rem;
  color: ${({ theme, isComplete }) =>
    isComplete < 40
      ? theme.colors.sub_pink
      : isComplete < 70
        ? theme.colors.sub_yellow
        : theme.colors.sub_mint};
`;

const StProgressBarWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Progress = styled('progress')<{ isComplete: number }>`
  width: 20rem;
  height: 0.4rem;
  color: ${({ theme }) => theme.colors.gray_450};
  appearance: none;

  /* 전체 진행률에 대한 색 조정  */
  &::-webkit-progress-bar {
    background-color: ${({ theme }) => theme.colors.gray_450};
    border-radius: 5px;
  }

  /* 현재 진행률에 대한 색 조정  */
  &::-webkit-progress-value {
    background-color: ${({ theme, isComplete }) =>
      isComplete < 40
        ? theme.colors.sub_pink
        : isComplete < 70
          ? theme.colors.sub_yellow
          : theme.colors.sub_mint};
    border-radius: 5px;
  }
`;

const StMarker = styled.div<MarkerProps>`
  position: absolute;
  left: ${({ value }) => value}rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.1rem;
  height: 1.1rem;
  background-color: ${({ theme }) => theme.colors.gray_000};
  border: 2px solid currentcolor;
  border-radius: 10px;
`;

const StCurrentProgressBox = styled.p`
  ${({ theme }) => theme.fonts.body_14_semibold};
`;
