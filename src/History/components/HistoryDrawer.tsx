import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { THEME } from '../constants/theme';
import { YEAR } from '../constants/year';
import ThemeButton from './ThemeButton';
import YearButton from './YearButton';

const HistoryDrawer = () => {
  return (
    <HistoryAside>
      <article css={themeContainer}>
        <StDrawerContents>테마</StDrawerContents>
        <ul css={drawerWrapper}>
          {THEME.map(({ text, id }) => (
            <ThemeButton key={id} name={text} />
          ))}
        </ul>
      </article>
      <article css={yearContainer}>
        <StDrawerContents>연도</StDrawerContents>
        <ul css={drawerWrapper}>
          {YEAR.map(({ year, count }) => (
            <YearButton key={year} year={year} count={count} />
          ))}
        </ul>
      </article>
    </HistoryAside>
  );
};

export default HistoryDrawer;

const HistoryAside = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  width: 23.2rem;
  padding: 2.4rem 2.2rem;

  /* background-color: ${({ theme }) => theme.colors.gray_650}; */
`;

const themeContainer = css`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding-bottom: 3.8rem;
`;

const StDrawerContents = styled.p`
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.body_12_regular};
`;

const drawerWrapper = css`
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem 0.6rem;
`;

const yearContainer = css`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;
