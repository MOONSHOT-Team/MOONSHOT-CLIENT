import styled from '@emotion/styled';

import { CheckIcon } from '../assets/icons';

interface IYearBtnProps {
  year: number;
  count: number;
  onSelectYear: () => void;
  isActive: boolean;
}

const YearButton = ({ year, count, onSelectYear, isActive }: IYearBtnProps) => {
  return (
    <StYearBtn onClick={onSelectYear} isActive={isActive}>
      {isActive && <CheckIcon />}
      {year}({count})
    </StYearBtn>
  );
};

export default YearButton;

const StYearBtn = styled.button<{ isActive: boolean }>`
  display: flex;
  gap: 0.4rem;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 1rem;
  ${({ theme }) => theme.fonts.btn_11_medium};

  color: ${({ theme }) => theme.colors.gray_000};
  background-color: ${({ isActive, theme }) =>
    isActive ? theme.colors.gray_550 : theme.colors.background};
  border: 1px solid
    ${({ isActive, theme }) => (isActive ? theme.colors.gray_300 : theme.colors.gray_350)};
  border-radius: 6px;
`;
