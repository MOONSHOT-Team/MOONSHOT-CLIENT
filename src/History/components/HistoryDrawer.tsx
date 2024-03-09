import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { IcCheck } from '../assets/icons';
import { HISTORY_THEME } from '../constants/HISTORY_THEME';
import { IObjectiveDataProps } from '../type/okrTypes';

interface ICategoriesProps {
  label: string;
  categories: string[];
  selectedCategory: string;
  onClick: (category: string) => void;
}

const Categories = ({ label, categories, selectedCategory, onClick }: ICategoriesProps) => {
  return (
    <div css={categoriesWrapper}>
      <CategoryTitle>{label}</CategoryTitle>
      <div css={sortCategories}>
        {categories?.map((category) => (
          <StCategoryButton
            key={category}
            onClick={() => {
              onClick(category);
            }}
          >
            {category === selectedCategory ? <IcCheck /> : null}
            <span>{category}</span>
          </StCategoryButton>
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
  gap: 0.4rem;
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
  okrHistoryYearData,
  selectedTheme,
  selectedYear,
  onSelectTheme,
  onSelectYear,
}: IObjectiveDataProps) => {
  return (
    <StHistoryAside>
      <Categories
        label="테마"
        categories={HISTORY_THEME}
        selectedCategory={selectedTheme}
        onClick={onSelectTheme}
      />
      <Categories
        label="연도"
        categories={okrHistoryYearData}
        selectedCategory={selectedYear}
        onClick={onSelectYear}
      />
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
