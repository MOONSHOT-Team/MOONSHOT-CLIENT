import styled from '@emotion/styled';

interface ProgressBarProps {
  currentProgress: number;
  maximumProgress?: number;
  progressBarColor?: string;
  progressValueColor?: string;
  textColor?: string;
  isCurrentProgress?: boolean;
}

const MainDashProgressBar = ({
  currentProgress,
  maximumProgress = 100,
  progressBarColor = '#5B5B5B',
  progressValueColor = '#C2C2C2',
  textColor = '#A7A7A7',
  isCurrentProgress = false,
}: ProgressBarProps) => {
  const percentValue = (currentProgress / maximumProgress) * 100;
  return (
    <div>
      <StProgressBarWrapper
        progressBarColor={progressBarColor}
        progressValueColor={progressValueColor}
      >
        <progress value={currentProgress} max={maximumProgress} />
        {isCurrentProgress && (
          <StCurrentProgressBox textColor={textColor}>{percentValue}%</StCurrentProgressBox>
        )}
      </StProgressBarWrapper>
    </div>
  );
};

export default MainDashProgressBar;

export const StProgressBarWrapper = styled.div<{
  progressBarColor: string;
  progressValueColor: string;
}>`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  align-items: end;

  & > progress {
    width: 100%;
    height: 0.4rem;
    color: ${({ progressValueColor }) => progressValueColor};
    appearance: none;
  }

  & > progress::-webkit-progress-bar {
    background-color: ${({ progressBarColor }) => progressBarColor};
  }

  & > progress::-webkit-progress-value {
    background-color: ${({ progressValueColor }) => progressValueColor};
  }
`;
const StCurrentProgressBox = styled.p<{ textColor: string }>`
  ${({ theme }) => theme.fonts.btn_11_medium};

  color: ${({ textColor }) => textColor};
`;
