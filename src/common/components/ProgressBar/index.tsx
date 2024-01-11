import styled from '@emotion/styled';

interface ProgressBarProps {
  currentProgress: number;
  maximumProgress: number;
}

const ProgressBar = ({ currentProgress, maximumProgress }: ProgressBarProps) => {
  return (
    <div>
      <StProgressBarWrapper>
        <progress value={currentProgress} max={maximumProgress}></progress>
        <StCurrentProgressBox>{currentProgress}%</StCurrentProgressBox>
      </StProgressBarWrapper>
    </div>
  );
};

export default ProgressBar;

const StProgressBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  align-items: end;

  & > progress {
    width: 38rem;
    height: 0.4rem;
    color: ${({ theme }) => theme.colors.gray_450};
    appearance: none;
  }

  & > progress::-webkit-progress-bar {
    background-color: ${({ theme }) => theme.colors.gray_450};
    border-radius: 5px;
  }

  & > progress::-webkit-progress-value {
    background-color: ${({ theme }) => theme.colors.gray_200};
    border-radius: 5px;
  }
`;
const StCurrentProgressBox = styled.p`
  ${({ theme }) => theme.fonts.btn_11_medium};

  color: ${({ theme }) => theme.colors.gray_300};
`;
