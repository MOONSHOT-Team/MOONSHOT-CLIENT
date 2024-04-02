import styled from '@emotion/styled';

import { HISTORY_THEME } from '../constants/HISTORY_THEME';
import { selectedThemeTypes } from '../type/historyData';
import CategoryContainer from './CategoryContainer';

interface IHistoryDrawerProps {
  historyCategories: selectedThemeTypes[];
  selectedTheme: string | undefined;
  onSelectTheme: (selectedTheme: selectedThemeTypes) => void;
}

const HistoryDrawer = ({
  historyCategories,
  selectedTheme,
  onSelectTheme,
}: IHistoryDrawerProps) => {
  return (
    <StHistoryAside>
      <CategoryContainer
        label="테마"
        allCategories={HISTORY_THEME}
        historyCategories={historyCategories}
        selectedCategory={selectedTheme}
        onCategorySelect={onSelectTheme}
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
