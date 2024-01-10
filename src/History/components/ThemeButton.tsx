import styled from '@emotion/styled';
import { useState } from 'react';

import { CheckIcon } from '../assets/icons';
interface IThemeBtnProps {
  name: string;
}
const ThemeButton = ({ name }: IThemeBtnProps) => {
  // const [selectedBtn, setSelectedBtn] = useState(false);
  const [isCheckIc, setIsCheckIc] = useState(false);
  // const handleOnClick = () => {
  //   setSelectedBtn(!selectedBtn);
  // };
  const handleCheckIc = () => {
    setIsCheckIc(!isCheckIc);
  };
  return (
    <ThemeBtn
      onClick={() => {
        // handleOnClick();
        handleCheckIc();
      }}
      // selected={!isCheckIc}
    >
      {isCheckIc && <CheckIcon />}
      {name}
    </ThemeBtn>
  );
};

export default ThemeButton;

const ThemeBtn = styled.button`
  display: flex;
  gap: 0.4rem;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 1rem;
  ${({ theme }) => theme.fonts.btn_11_medium};

  color: ${({ theme }) => theme.colors.gray_000};

  /* color: ${({ theme }) => theme.colors.gray_000}; */
  border: 1px solid ${({ theme }) => theme.colors.gray_350};
  border-radius: 6px;
`;
