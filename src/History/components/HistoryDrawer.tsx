import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useState } from 'react';

import { HISTORY_THEME } from '../constants/HISTORY_THEME';
import { IObjectiveDataProps } from '../type/historyData';
import ThemeButton from './ThemeButton';
import YearButton from './YearButton';

const CURR_YEAR = new Date().getFullYear();

const HistoryDrawer = ({
  // categories,
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
    <StHistoryAside>
      <article css={themeContainer}>
        <StDrawerContents>테마</StDrawerContents>
        <ul css={drawerWrapper}>
          {HISTORY_THEME?.map(({ category }) => {
            // const isDisabled = selectedYear
            //   ? !fixedCategories?.includes(category) || !categories?.includes(category)
            //   : !fixedCategories?.includes(category);
            return (
              <ThemeButton
                key={category}
                name={category}
                onSelectTheme={() => handleSelectTheme(category)}
                isActive={category === selectedTheme}
                isDisabled={!fixedCategories?.includes(category)}
              />
            );
          })}
        </ul>
      </article>

      <article css={yearContainer}>
        <StDrawerContents>연도</StDrawerContents>
        <ul css={drawerWrapper}>
          {/* 올해 연도 태그 */}
          {(!fixedYears || !fixedYears.some((item) => item.year === CURR_YEAR)) && (
            <YearButton
              key={0}
              year={CURR_YEAR}
              count={0}
              onSelectYear={() => handleSelectYear(0)}
              isActive={false}
              isDisabled={!years?.some((item) => item.year === CURR_YEAR)}
            />
          )}
          {fixedYears?.map(({ year, count }) => {
            // const isDisabled = selectedTheme ? !years?.some((item) => item.year === year) : false;
            return (
              <YearButton
                key={year}
                year={year}
                count={count}
                onSelectYear={() => handleSelectYear(year)}
                isActive={year === selectedYear}
                isDisabled={!years?.some((item) => item.year === year)}
              />
            );
          })}
        </ul>
      </article>
    </StHistoryAside>
  );
};

export default HistoryDrawer;

const StHistoryAside = styled.aside`
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
