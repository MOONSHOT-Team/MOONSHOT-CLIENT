import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useState } from 'react';

import { THEME } from '../constants/theme';
import { IObjectiveDataProps } from '../type/okrTypes';
import ThemeButton from './ThemeButton';
import YearButton from './YearButton';

const HistoryDrawer = ({
  categories,
  years,
  onThemeSelect,
  fixedYears,
  fixedCategories,
  onYearSelect,
}: IObjectiveDataProps) => {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const handleSelectTheme = (selectedTheme: string) => {
    setSelectedTheme((prevTheme) => {
      const newTheme = prevTheme === selectedTheme ? null : selectedTheme;
      onThemeSelect(newTheme as string);
      return newTheme;
    });
  };

  const handleSelectYear = (selectedYear: number) => {
    setSelectedYear((prevYear) => {
      const newYear = prevYear === selectedYear ? null : selectedYear;
      onYearSelect(newYear as number);
      return newYear;
    });
  };

  return (
    <HistoryAside>
      <article css={themeContainer}>
        <StDrawerContents>테마</StDrawerContents>
        <ul css={drawerWrapper}>
          {THEME?.map(({ category }) => {
            const isDisabled = selectedYear
              ? !fixedCategories?.includes(category) || !categories?.includes(category)
              : !fixedCategories?.includes(category);
            return (
              <ThemeButton
                key={category}
                name={category}
                onSelectTheme={() => handleSelectTheme(category)}
                isActive={category === selectedTheme}
                isDisabled={isDisabled || false}
              />
            );
          })}
        </ul>
      </article>

      <article css={yearContainer}>
        <StDrawerContents>연도</StDrawerContents>
        <ul css={drawerWrapper}>
          {fixedYears?.map(({ year, count }) => {
            const isDisabled = selectedTheme ? !years?.some((item) => item.year === year) : false;
            return (
              <YearButton
                key={year}
                year={year}
                count={count}
                onSelectYear={() => handleSelectYear(year)}
                isActive={year === selectedYear}
                isDisabled={isDisabled}
              />
            );
          })}
        </ul>
      </article>
    </HistoryAside>
  );
};

export default HistoryDrawer;

const HistoryAside = styled.aside`
  position: fixed;
  top: 7.6rem;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: 4rem;
  width: 23.2rem;
  height: 100%;
  padding: 2.4rem 2.2rem;
  background-color: ${({ theme }) => theme.colors.gray_650};
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
