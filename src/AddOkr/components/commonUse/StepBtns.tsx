import { css } from '@emotion/react';
import styled from '@emotion/styled';

interface IStepBtnsProps {
  isInit: boolean;
  isActiveNext: boolean;
  handleClickPrev: () => void;
  handleClickNext: () => void;
}

const StepBtns = ({ isInit, isActiveNext, handleClickPrev, handleClickNext }: IStepBtnsProps) => {
  return (
    <div css={StepBtnsContainer}>
      <StStepPrevBtn onClick={handleClickPrev}>{isInit ? '처음으로' : '이전으로'}</StStepPrevBtn>
      <StStepNextBtn $isActiveNext={isActiveNext} onClick={handleClickNext}>
        다음
      </StStepNextBtn>
    </div>
  );
};

export default StepBtns;

const StepBtnsContainer = css`
  display: flex;
  gap: 1.2rem;
`;

const StStepBtnStyle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15.5rem;
  height: 4rem;
  color: ${({ theme }) => theme.colors.gray_000};
  border-radius: 6px;

  ${({ theme }) => theme.fonts.btn_14_semibold}
`;

const StStepPrevBtn = styled(StStepBtnStyle)`
  background-color: ${({ theme }) => theme.colors.gray_550};
`;

const StStepNextBtn = styled(StStepBtnStyle)<{ $isActiveNext: boolean }>`
  background-color: ${({ theme, $isActiveNext }) =>
    $isActiveNext ? theme.colors.main_darkpurple : theme.colors.gray_550};
`;
