import styled from '@emotion/styled';

import { CheckIcon } from '../assets/icons';

interface IThemeBtnProps {
  name: string;
  onSelectTheme: () => void;
  isActive: boolean;
  isDisabled: boolean;
}

const ThemeButton = ({ name, onSelectTheme, isActive, isDisabled }: IThemeBtnProps) => {
  return (
    <StThemeBtn
      onClick={onSelectTheme}
      isActive={isActive}
      disabled={isDisabled}
      isDisabled={isDisabled}
    >
      {isActive && <CheckIcon />}
      {name}
    </StThemeBtn>
  );
};

const StThemeBtn = styled.button<{ isActive: boolean; isDisabled: boolean }>`
  display: flex;
  gap: 0.4rem;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 1rem;
  ${({ theme }) => theme.fonts.btn_11_medium};

  color: ${({ isDisabled, theme }) => (isDisabled ? theme.colors.gray_450 : theme.colors.gray_000)};
  background-color: ${({ isActive, isDisabled, theme }) =>
    isDisabled ? theme.colors.gray_550 : isActive ? theme.colors.gray_550 : '#1E1E20'};
  border: 1px solid
    ${({ isActive, isDisabled, theme }) =>
      isDisabled
        ? theme.colors.gray_450
        : isActive
          ? theme.colors.gray_300
          : theme.colors.gray_350};
  border-radius: 6px;
`;

export default ThemeButton;
