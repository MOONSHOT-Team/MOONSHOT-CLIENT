import styled from '@emotion/styled';

interface ProgressBarProps {
  // 현재 단계 (전체 페이지에 비례하는 단계)
  currentProgress: number;
  // 전체 페이지 수
  maximumProgress: number;
}

const ProgressBar = ({ currentProgress, maximumProgress }: ProgressBarProps) => {
  return (
    <div>
      <StProgressBarWrapper>
        <progress value={currentProgress} max={maximumProgress}>
          {currentProgress}%
        </progress>
      </StProgressBarWrapper>
    </div>
  );
};

export default ProgressBar;

const StProgressBarWrapper = styled.div`
  width: 100%;

  & > progress {
    width: 100%;
    height: 0.4rem;
    color: ${({ theme }) => theme.colors.gray_250};
    appearance: none;
  }

  & > progress::-webkit-progress-bar {
    background-color: ${({ theme }) => theme.colors.gray_450};
  }

  & > progress::-webkit-progress-value {
    background-color: ${({ theme }) => theme.colors.gray_250};
  }
`;
