import ProgressBar from '@components/ProgressBar';
import { css } from '@emotion/react';
import { default as emotionStyled, default as styled } from '@emotion/styled';
import { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';

import { IS_GUIDE, MAX_BASIC_STEP, MAX_GUIDE_STEP } from '../constants/ADD_OKR_METHOD_N_STEP';
import StepBtns from './commonUse/StepBtns';

interface AddOkrPageLayoutProps extends PropsWithChildren {
  isActiveNext: boolean;
  selectedMethod: string;
  step: number;
  onMoveStep: (targetStep: (prev: number) => number) => void;
}

const AddOkrPageLayout = ({
  isActiveNext,
  selectedMethod,
  step,
  onMoveStep,
  children,
}: AddOkrPageLayoutProps) => {
  const navigate = useNavigate();

  // 이전, 다음 버튼 관련 handler
  const handleClickPrevBtn = () => {
    // step 1 -> 0으로 이동시 정보 초기화
    if (step === 1) {
      navigate('/dashboard', { state: { selectedMethod: selectedMethod } });
    }

    // default function
    onMoveStep((prev) => prev - 1);
  };

  const handleClickNextBtn = () => {
    // 가이드에 따라 설정하기 vs 직접 설정하기 구분 조건 : 직접 설정하기일 때는 step 4 -> step 6로 preview okr로 이동
    if (step === 4 && selectedMethod !== IS_GUIDE) {
      isActiveNext && onMoveStep((prev) => prev + 2);
      return;
    }

    // default function
    isActiveNext && onMoveStep((prev) => prev + 1);
  };

  return (
    <>
      {step <= 5 ? (
        <section css={AddOkrContainer}>
          <StSelectedMethodTxt>{selectedMethod}</StSelectedMethodTxt>
          {children}
          <>
            <StepBtns
              isInit={step === 1}
              isActiveNext={isActiveNext}
              handleClickPrev={handleClickPrevBtn}
              handleClickNext={handleClickNextBtn}
            />
            <StProgressBarBox $step={step} $selectedMethod={selectedMethod}>
              <ProgressBar
                currentProgress={step}
                maximumProgress={selectedMethod === IS_GUIDE ? MAX_GUIDE_STEP : MAX_BASIC_STEP}
              />
              <div css={ProgressTxtBox}>
                <StProgressTxt>{`${step}/${
                  selectedMethod === IS_GUIDE ? MAX_GUIDE_STEP : MAX_BASIC_STEP
                }`}</StProgressTxt>
              </div>
            </StProgressBarBox>
          </>
        </section>
      ) : (
        // step > 6, 즉 preview-okr에서는 페이지 정렬 다르게
        <>{children}</>
      )}
    </>
  );
};

export default AddOkrPageLayout;

const AddOkrContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const StSelectedMethodTxt = emotionStyled.p`
  color: ${({ theme }) => theme.colors.gray_300};
  ${({ theme }) => theme.fonts.body_12_medium};
`;

const marginTopState = (step: number, selectedMethod: string) => {
  switch (step) {
    case 1:
      return selectedMethod === IS_GUIDE ? '6.8rem' : '14.8rem';
    case 2:
      return '5rem';
    case 3:
      return '7.3rem';
    case 4:
    case 5:
      return '3.4rem';
  }
};
const StProgressBarBox = styled.div<{ $step: number; $selectedMethod: string }>`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  width: 38rem;
  height: 2.7rem;
  margin-top: ${({ $step, $selectedMethod }) => marginTopState($step, $selectedMethod)};

  & progress {
    height: 0.8rem !important;
  }
`;

const ProgressTxtBox = css`
  position: absolute;
  right: 0;
  bottom: 0;
  width: fit-content;
`;

const StProgressTxt = styled.span`
  color: ${({ theme }) => theme.colors.gray_300};
  ${({ theme }) => theme.fonts.btn_11_medium};
`;
