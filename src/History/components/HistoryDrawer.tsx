import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useState } from 'react';

import { HISTORY_THEME } from '../constants/HISTORY_THEME';
import { IObjectiveDataProps } from '../type/okrTypes';
import ThemeButton from './ThemeButton';
import YearButton from './YearButton';

interface ICategoriesProps {
  label: string;
  categories: (string | number)[];
}

const Categories = ({ label, categories }: ICategoriesProps) => {
  return (
    <div css={categoriesWrapper}>
      <CategoryTitle>{label}</CategoryTitle>
      <div css={sortCategories}>
        {categories.map((category) => (
          <StCategoryButton key={category}>{category}</StCategoryButton>
        ))}
      </div>
    </div>
  );
};

const categoriesWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 18.8rem;
  height: 17.4rem;
`;

const sortCategories = css`
  display: flex;
  flex-wrap: wrap;
  gap: 1.1rem 0.6rem;
`;

const CategoryTitle = styled.label`
  color: ${({ theme }) => theme.colors.gray_000};

  ${({ theme }) => theme.fonts.body_12_regular};
`;

const StCategoryButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: 2.7rem;
  padding: 0.8rem 1rem;
  color: ${({ theme }) => theme.colors.gray_000};
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.gray_350};
  border-radius: 6px;

  ${({ theme }) => theme.fonts.btn_11_medium};
`;

const HistoryDrawer = ({
  categories,
  years,
  fixedYears,
  fixedCategories,
  onSelectTheme,
  onSelectYear,
}: IObjectiveDataProps) => {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const handleSelectTheme = (selectedTheme: string) => {
    setSelectedTheme((prevTheme) => {
      const newTheme = prevTheme === selectedTheme ? null : selectedTheme;
      onSelectTheme(newTheme);
      return newTheme;
    });
  };

  const handleSelectYear = (selectedYear: number) => {
    setSelectedYear((prevYear) => {
      const newYear = prevYear === selectedYear ? null : selectedYear;
      onSelectYear(newYear as number);
      return newYear;
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <StHistoryAside>
      <Categories label="테마" categories={HISTORY_THEME} />
      <Categories label="테마" categories={HISTORY_THEME} />
      <article css={themeContainer}>
        <StDrawerContents>테마</StDrawerContents>
        <ul css={drawerWrapper}>
          {HISTORY_THEME?.map(({ category }) => {
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
          {(!fixedYears || !fixedYears.some((item) => item.year === currentYear)) && (
            <YearButton
              key={0}
              year={currentYear}
              count={0}
              onSelectYear={() => handleSelectYear(0)}
              isActive={false}
              isDisabled={selectedTheme ? !years?.some((item) => item.year === currentYear) : false}
            />
          )}
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
    </StHistoryAside>
  );
};

export default HistoryDrawer;

const StHistoryAside = styled.aside`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
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
