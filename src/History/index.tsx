import Loading from '@components/Loading';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

import { getOKRHistory } from './apis/fetcher';
import HistoryList from './components/dropDown/HistoryList';
import ListOrder from './components/dropDown/ListOrder';
import HistoryDrawer from './components/HistoryDrawer';
import { Group, IObjective } from './type/okrTypes';

export type filterOptionTypes = '최신순' | '오래된 순' | '달성률 순';
// export type selectedThemeTypes =
//   | '성장'
//   | '건강'
//   | '생산성'
//   | '라이프스타일'
//   | '경제'
//   | '셀프케어'
//   | null;

const History = () => {
  const [selectedFilter, setSelectedFilter] = useState<filterOptionTypes>('최신순');
  const [selectedTheme, setSelectedTheme] = useState<string | undefined>(undefined);
  const [historyAllCategories, setHistoryAllCategories] = useState<string[]>([]);

  const { data, isLoading } = useSWR(
    ['/v1/objective/history', selectedTheme, selectedFilter],
    ([url, selectedTheme, selectedFilter]) => getOKRHistory(url, selectedTheme, selectedFilter),
  );

  useEffect(() => {
    if ((historyAllCategories && historyAllCategories.length === 0) || selectedTheme == undefined)
      setHistoryAllCategories(data?.data.data.categories);
  }, [data, selectedTheme, historyAllCategories]);

  if (isLoading) return <Loading />;

  const historyGroup = data?.data.data.groups;
  const handleSelectTheme = (selectedNewTheme: string) => {
    if (selectedNewTheme === selectedTheme) return setSelectedTheme(undefined);

    setSelectedTheme(selectedNewTheme);
  };

  const handleSelectFilter = (selectedFilter: filterOptionTypes) => {
    setSelectedFilter(selectedFilter);
  };

  return (
    <section css={historyUi}>
      <HistoryDrawer
        historyCategories={historyAllCategories}
        selectedTheme={selectedTheme}
        onSelectTheme={handleSelectTheme}
      />

      <section css={dropDownSection}>
        <ListOrder selectedFilter={selectedFilter} onFilterSelection={handleSelectFilter} />
        {historyGroup?.map(({ year, objList }: Group) => (
          <div key={`${year}*${year}`} css={listMarginBottom}>
            <StListOrderContainer>
              <StEachYear>{year}년</StEachYear>
            </StListOrderContainer>
            <ul>
              <li css={addGapBetweenObjective}>
                {objList.map((item: IObjective) => (
                  <HistoryList key={`${item.objId}-${item.objTitle}`} {...item} />
                ))}
              </li>
            </ul>
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

const StListOrderContainer = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
  width: 100%;
  min-width: 105.8rem;
  padding-bottom: 1.2rem;
`;

const StEachYear = styled.p`
  display: flex;
  justify-content: flex-start;
  height: 3.2rem;
  margin-bottom: 1.2rem;
  color: ${({ theme }) => theme.colors.gray_000} ${({ theme }) => theme.fonts.title_20_semibold};
`;
