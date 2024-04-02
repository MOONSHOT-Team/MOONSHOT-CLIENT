import Loading from '@components/Loading';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

import { getOKRHistory } from './apis/fetcher';
import Filters from './components/Filters';
import HistoryDrawer from './components/HistoryDrawer';
import HistoryList from './components/HistoryList';
import {
  filterOptionTypes,
  GroupTypes,
  ObjectiveTypes,
  selectedThemeTypes,
} from './type/historyData';

const History = () => {
  const [selectedFilter, setSelectedFilter] = useState<filterOptionTypes>('최신순');
  const [selectedTheme, setSelectedTheme] = useState<selectedThemeTypes>(undefined);
  const [historyCategories, setHistoryAllCategories] = useState<selectedThemeTypes[]>([]);

  const { data, isLoading } = useSWR(
    ['/v1/objective/history', selectedTheme, selectedFilter],
    ([url, selectedTheme, selectedFilter]) => getOKRHistory(url, selectedTheme, selectedFilter),
  );

  const historyGroup = data?.data.data.groups;
  const handleSelectTheme = (selectedNewTheme: selectedThemeTypes) => {
    if (selectedNewTheme === selectedTheme) return setSelectedTheme(undefined);

    setSelectedTheme(selectedNewTheme);
  };

  const handleSelectFilter = (selectedFilter: filterOptionTypes) => {
    setSelectedFilter(selectedFilter);
  };

  useEffect(() => {
    if (data && historyCategories.length === 0) setHistoryAllCategories(data.data.data.categories);
  }, [data, historyCategories]);

  if (isLoading) return <Loading />;

  return (
    <section css={historyUi}>
      <HistoryDrawer
        historyCategories={historyCategories}
        selectedTheme={selectedTheme}
        onSelectTheme={handleSelectTheme}
      />
      <section css={dropDownSection}>
        <Filters selectedFilter={selectedFilter} onFilterSelection={handleSelectFilter} />
        {historyGroup?.map(({ year, objList }: GroupTypes) => (
          <div key={`${year}*${year}`} css={listMarginBottom}>
            <StYear>{year}년</StYear>
            <ol>
              <li css={addGapBetweenObjective}>
                {objList.map((item: ObjectiveTypes) => (
                  <HistoryList key={`${item.objId}-${item.objTitle}`} {...item} />
                ))}
              </li>
            </ol>
          </div>
        ))}
      </section>
    </section>
  );
};

export default History;

const historyUi = css`
  display: flex;
  height: 100%;
`;

const dropDownSection = css`
  position: relative;
  width: 100%;
  min-width: 105.8rem;
  padding: 3rem 3.6rem 3rem 4rem;
  overflow-y: auto;
`;

const listMarginBottom = css`
  &:not(:last-child) {
    margin-bottom: 3.4rem;
  }
`;

const addGapBetweenObjective = css`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  justify-content: center;
`;

const StYear = styled.p`
  display: flex;
  align-items: end;
  justify-content: space-between;
  justify-content: flex-start;
  width: 100%;
  min-width: 105.8rem;
  padding-bottom: 1.2rem;
  margin-bottom: 1.2rem;
  color: ${({ theme }) => theme.colors.gray_000} ${({ theme }) => theme.fonts.title_20_semibold};
`;
