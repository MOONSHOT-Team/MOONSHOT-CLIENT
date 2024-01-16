import { css } from '@emotion/react';
import styled from '@emotion/styled';

interface IStepBtnsProps {
  isActiveNext: boolean;
}

const StepBtns = ({ isActiveNext }: IStepBtnsProps) => {
  return (
    <div css={StepBtnsContainer}>
      <StStepPrevBtn>이전</StStepPrevBtn>
      <StStepNextBtn $isActiveNext={isActiveNext}>다음</StStepNextBtn>
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
