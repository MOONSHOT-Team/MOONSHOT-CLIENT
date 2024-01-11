import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useState } from 'react';

import { THEME } from '../constants/theme';
import { YEAR } from '../constants/year';
import ThemeButton from './ThemeButton';
import YearButton from './YearButton';

const HistoryDrawer = ({ themeData }: { themeData: { category: string }[] }) => {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const handleSelectTheme = (theme: string) => {
    setSelectedTheme(theme === selectedTheme ? null : theme);
  };

  const handleSelectYear = (year: number) => {
    setSelectedYear(year === selectedYear ? null : year);
  };

  return (
    <HistoryAside>
      <article css={themeContainer}>
        <StDrawerContents>테마</StDrawerContents>
        <ul css={drawerWrapper}>
          {THEME.map(({ text, category }) => {
            const isDisabled = !themeData.some((data) => data.category === category);
            return (
              <ThemeButton
                key={category}
                name={text}
                onSelectTheme={() => handleSelectTheme(category)}
                isActive={category === selectedTheme}
                isDisabled={isDisabled}
              />
            );
          })}
        </ul>
      </article>
      <article css={yearContainer}>
        <StDrawerContents>연도</StDrawerContents>
        <ul css={drawerWrapper}>
          {YEAR.map(({ year, count }) => (
            <YearButton
              key={year}
              year={year}
              count={count}
              onSelectYear={() => handleSelectYear(year)}
              isActive={year === selectedYear}
            />
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
