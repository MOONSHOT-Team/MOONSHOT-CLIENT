import instance from '@apis/instance';
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

export type filterOptionTypes = '최신순' | '오래된 순' | '달성률';

const History = () => {
  const [historyData, setHistoryData] = useState<{ groups: Group[]; categories: string[] } | null>(
    null,
  );
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [years, setYears] = useState<{ year: number; count: number }[]>([{ year: 2024, count: 0 }]);
  const [categories, setCategories] = useState<string[]>([]);
  const [fixedYears, setFixedYears] = useState<{ year: number; count: number }[] | null>(null);
  const [fixedCategories, setFixedCategories] = useState<string[]>([]);

  // 시작
  const [okrHistoryData, setOkrHistoryData] = useState<Group[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<filterOptionTypes>('최신순');

  const { data, isLoading } = useSWR('/v1/objective/history', getOKRHistory);

  const handleFilterSelection = (selectedFilter: filterOptionTypes) => {
    setSelectedFilter(selectedFilter);

    const getFullDateFormat = (stringDate: string) => {
      const [yearA, monthA, dayA] = stringDate.split(' - ')[0].split('. ');

      return `20${yearA}-${monthA}-${dayA}`;
    };

    if (selectedFilter === '최신순') {
      const newHistoryData = [...okrHistoryData].sort((a, b) => b.year - a.year);
      newHistoryData.forEach(({ objList }) => {
        return objList.sort((a, b) => {
          const fullDateA = getFullDateFormat(a.objPeriod);
          const fullDateB = getFullDateFormat(b.objPeriod);

          return new Date(fullDateB).getTime() - new Date(fullDateA).getTime();
        });
      });

      return setOkrHistoryData(newHistoryData);
    }

    if (selectedFilter === '오래된 순') {
      const newHistoryData = [...okrHistoryData].sort((a, b) => a.year - b.year);
      newHistoryData.forEach(({ objList }) => {
        return objList.sort((a, b) => {
          const fullDateA = getFullDateFormat(a.objPeriod);
          const fullDateB = getFullDateFormat(b.objPeriod);

          return new Date(fullDateA).getTime() - new Date(fullDateB).getTime();
        });
      });

      return setOkrHistoryData(newHistoryData);
    }

    if (selectedFilter === '달성률') {
      const newHistoryData = [...okrHistoryData].sort((a, b) => b.year - a.year);
      newHistoryData.forEach(({ objList }) => {
        return objList.sort((a, b) => b.progress - a.progress);
      });

      return setOkrHistoryData(newHistoryData);
    }
  };

  useEffect(() => {
    setOkrHistoryData(data?.data.data.groups);
  }, [data]);

  // 끝

  const handleThemeSelect = async (selectedTheme: string) => {
    setSelectedTheme(selectedTheme);
  };

  const handleYearSelect = async (selectedYear: number) => {
    setSelectedYear(selectedYear);
  };

  useEffect(() => {
    if (!isLoading && data) {
      setHistoryData(data?.data.data);
      setFixedYears(data?.data.data.years || []);
      setFixedCategories(data?.data.data.categories || []);
    }
  }, [data, isLoading]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await instance.get('/v1/objective/history', {
        params: {
          year: selectedYear,
          category: selectedTheme,
          criteria: selectedFilter,
        },
      });
      if (response) setYears(response.data.data.years || []);
      setCategories(response.data.data.categories);
      setHistoryData(response.data.data);
    };

    fetchData();
  }, [selectedTheme, selectedYear, selectedFilter]);

  if (!data) return <Loading />;

  return (
    <section css={historyUi}>
      <HistoryDrawer
        groups={historyData ? historyData.groups : []}
        categories={categories}
        years={years}
        fixedYears={fixedYears}
        fixedCategories={fixedCategories}
        onThemeSelect={handleThemeSelect}
        onYearSelect={handleYearSelect}
      />

      <section css={DropDownSection}>
        <select>
          <option>최신순</option>
          <option>오래된 순</option>
          <option>달성률</option>
        </select>
        <ListOrder selectedFilter={selectedFilter} onFilterSelection={handleFilterSelection} />
        {/* {(selectedTheme || selectedYear || selectedFilter
          ? historyData?.groups
          : data?.data?.data?.groups
        )?.map(({ year, objList }: Group, idx: number) => () */}
        {okrHistoryData?.map(({ year, objList }: Group) => (
          <div key={`${year}*${year}`} css={listMarginBottom}>
            <StListOrderContainer>
              <StEachYear>{year}년</StEachYear>
            </StListOrderContainer>
            <ul>
              <li css={addGapBetweenObjective}>
                {objList.map((item: IObjective) => (
                  <HistoryList key={`${item.objId}-${item.title}`} {...item} />
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

const DropDownSection = css`
  position: relative;
  width: 100%;
  padding: 3rem 3.6rem 3rem 4rem;
  margin-left: 23.2rem;
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
