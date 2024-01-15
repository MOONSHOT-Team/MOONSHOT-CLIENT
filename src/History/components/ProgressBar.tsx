import styled from '@emotion/styled';
interface ProgressBarProps {
  currentProgress: number;
  maximumProgress: number;
}

// history_progressbar 현재 진행 마크용
interface MarkerProps {
  value: number;
}

const ProgressBar = ({ currentProgress, maximumProgress }: ProgressBarProps) => {
  const leftValue = (currentProgress / maximumProgress) * 20.0 - 0.6;

  return (
    <ProgressBarContainer>
      <StProgressBarWrapper>
        <Progress value={currentProgress} max={maximumProgress} />
        <StMarker value={leftValue} />
      </StProgressBarWrapper>

      <StCurrentProgressBox>{currentProgress}% 달성</StCurrentProgressBox>
    </ProgressBarContainer>
  );
};

export default ProgressBar;

const ProgressBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.6rem;
  color: ${({ theme }) => theme.colors.sub_yellow};
`;

const StProgressBarWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Progress = styled.progress`
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
    background-color: ${({ theme }) => theme.colors.sub_yellow};
    border-radius: 5px;
  }
`;

// history_progressbar 현재 진행 마크용
const StMarker = styled.div<MarkerProps>`
  position: absolute;
  left: ${({ value }) => value}rem; /* 프로그래스 바의 현재 값에 따라 위치 동적으로 조정 */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.1rem;
  height: 1.1rem;
  background-color: ${({ theme }) => theme.colors.gray_000};
  border: 2px solid currentcolor;
  border-radius: 10px;
`;

// 프로그래스 바 주위 현재 진행률 표기에 대한 색, 폰트 조정 (현재는 (1)AddOkr_Progressbar, (2)SideSheet_progressbar, (3)history_progressbar)
const StCurrentProgressBox = styled.p`
  ${({ theme }) => theme.fonts.body_14_semibold};
`;
