import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useState } from 'react';

import { THEME } from '../constants/theme';
import { ObjectiveData } from '../type/okrTypes';
import ThemeButton from './ThemeButton';
import YearButton from './YearButton';

const HistoryDrawer = ({
  categories,
  years,
  onThemeSelect,
  // , onYearSelect
}: ObjectiveData) => {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const handleSelectTheme = (selectedTheme: string) => {
    setSelectedTheme((prevTheme) => (prevTheme === selectedTheme ? null : selectedTheme));
    onThemeSelect(selectedTheme);
    console.log(selectedTheme);
  };

  const handleSelectYear = (selectedYear: number) => {
    setSelectedYear((prevYear) => (prevYear === selectedYear ? null : selectedYear));
    // onYearSelect(selectedYear);
  };

  // const currentYear = new Date().getFullYear();

  return (
    <HistoryAside>
      <article css={themeContainer}>
        <StDrawerContents>테마</StDrawerContents>
        <ul css={drawerWrapper}>
          {THEME?.map(({ category }) => {
            const isDisabled = !categories?.includes(category);

            return (
              <ThemeButton
                key={category}
                name={category}
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
          {/* {!groups.some((group) => group.year === currentYear) && (
            <YearButton
            currentYear={currentYear}
              count={0} // 더미 값
              onSelectYear={() => handleSelectYear(currentYear)}
              isActive={currentYear === selectedYear}
            />
          )} */}

          {Object?.entries(years)?.map(([year, count]) => (
            <YearButton
              key={year}
              year={year}
              count={count}
              onSelectYear={() => handleSelectYear(parseInt(year, 10))}
              isActive={parseInt(year, 10) === selectedYear}
            />
          ))}
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
