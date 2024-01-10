import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useState } from 'react';

import { CheckIcon } from '../assets/icons';
import { THEME } from '../constants/theme';
import ThemeButton from './ThemeButton';

const HistoryDrawer = () => {
  const [isCheckIc, setIsCheckIc] = useState(false);
  const handleCheckIc = () => {
    setIsCheckIc(!isCheckIc);
  };
  return (
    <HistoryAside>
      <article css={themeContainer}>
        <StTheme>테마</StTheme>
        <ul css={themeWrapper}>
          {THEME.map(({ text, id }) => (
            <ThemeButton key={id} name={text} />
          ))}
        </ul>
      </article>
      <article css={yearContainer}>
        <StYear>연도</StYear>
        <ul css={yearWrapper}>
          <StYearButton
            onClick={() => {
              handleCheckIc();
            }}
          >
            {isCheckIc && <CheckIcon />}
            2023(5)
          </StYearButton>
          <StYearButton>2022(3)</StYearButton>
          <StYearButton>2021(1)</StYearButton>
        </ul>
      </article>
    </HistoryAside>
  );
};

export default HistoryDrawer;

const HistoryAside = styled.aside`
  position: absolute;
  top: 7.6rem;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding: 2.4rem 2.2rem 27.8rem;
  background-color: ${({ theme }) => theme.colors.gray_650};
`;

const themeContainer = css`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding-bottom: 3.8rem;
`;

const StTheme = styled.p`
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.body_12_regular};
`;

const themeWrapper = css`
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem 0.6rem;
`;

const yearContainer = css`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const StYear = styled.p`
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.body_12_regular};
`;
const yearWrapper = css`
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem 0.6rem;
`;
const StYearButton = styled.button`
  display: flex;
  gap: 0.4rem;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 1rem;
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.btn_11_medium};

  border: 1px solid ${({ theme }) => theme.colors.gray_350};
  border-radius: 6px;
`;
