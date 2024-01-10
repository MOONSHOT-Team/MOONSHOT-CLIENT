import styled from '@emotion/styled';
import { useState } from 'react';

import { CheckIcon } from '../assets/icons';
interface IYearBtnProps {
  key: number;
  year: number;
  count: number;
}
const YearButton = ({ year, count }: IYearBtnProps) => {
  const [isCheckIc, setIsCheckIc] = useState(false);
  const handleSelectYearBtn = () => {
    setIsCheckIc(!isCheckIc);
  };
  return (
    <YearBtn
      onClick={() => {
        handleSelectYearBtn();
      }}
      isCheckIc={isCheckIc}
    >
      {isCheckIc && <CheckIcon />}
      {year}({count})
    </YearBtn>
  );
};

export default YearButton;

const YearBtn = styled.button<{ isCheckIc: boolean }>`
  display: flex;
  gap: 0.4rem;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 1rem;
  ${({ theme }) => theme.fonts.btn_11_medium};

  color: ${({ theme }) => theme.colors.gray_000};
  background-color: ${({ isCheckIc, theme }) => (isCheckIc ? theme.colors.gray_550 : '#1E1E20')};
  border: 1px solid ${({ theme }) => theme.colors.gray_350};
  border-radius: 6px;
`;
