import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { IcCheck } from '../assets/icons';
import { selectedThemeTypes } from '../type/historyData';

interface ICategoriesProps {
  label: string;
  allCategories: selectedThemeTypes[];
  selectedCategory: string | undefined;
  historyCategories: selectedThemeTypes[];
  onCategorySelect: (category: selectedThemeTypes) => void;
}

const CategoryContainer = ({
  label,
  allCategories,
  selectedCategory,
  historyCategories,
  onCategorySelect,
}: ICategoriesProps) => {
  return (
    <div css={categoriesWrapper}>
      <StTitle>{label}</StTitle>
      <div css={sortCategories}>
        {allCategories?.map((category) => {
          const isHavingCategoryData = historyCategories
            ? historyCategories.includes(category)
            : true;

          return (
            <StCategory
              key={category}
              isHavingCategoryData={isHavingCategoryData}
              disabled={!isHavingCategoryData}
              onClick={() => {
                onCategorySelect(category);
              }}
            >
              {category === selectedCategory ? <IcCheck /> : null}
              <span>{category}</span>
            </StCategory>
          );
        })}
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

const StTitle = styled.label`
  color: ${({ theme }) => theme.colors.gray_000};

  ${({ theme }) => theme.fonts.body_12_regular};
`;

interface IStCategoryProps {
  isHavingCategoryData?: boolean;
}

const StCategory = styled.button<IStCategoryProps>`
  display: flex;
  gap: 0.4rem;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: 2.7rem;
  padding: 0.8rem 1rem;
  color: ${({ theme, isHavingCategoryData }) =>
    isHavingCategoryData ? theme.colors.gray_000 : theme.colors.gray_450};
  cursor: ${({ isHavingCategoryData }) => (isHavingCategoryData ? 'pointer' : 'default')};
  background-color: ${({ theme, isHavingCategoryData }) =>
    isHavingCategoryData ? theme.colors.background : theme.colors.gray_550};
  border: 1px solid
    ${({ theme, isHavingCategoryData }) =>
      isHavingCategoryData ? theme.colors.gray_350 : theme.colors.gray_450};
  border-radius: 6px;

  ${({ theme }) => theme.fonts.btn_11_medium};
`;

export default CategoryContainer;
