import Loading from '@components/Loading';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useState } from 'react';
import useSWR from 'swr';

import { getOKRHistory } from './apis/fetcher';
import HistoryList from './components/dropDown/HistoryList';
import ListOrder from './components/dropDown/ListOrder';
import HistoryDrawer from './components/HistoryDrawer';
import { Group, IObjective } from './type/okrTypes';

export type filterOptionTypes = '최신순' | '오래된 순' | '달성률';
// export type selectedThemeTypes =
//   | '성장'
//   | '건강'
//   | '생산성'
//   | '라이프스타일'
//   | '경제'
//   | '셀프케어'
//   | null;

const History = () => {
  const { data, isLoading } = useSWR('/v1/objective/history', getOKRHistory);
  const [selectedFilter, setSelectedFilter] = useState<filterOptionTypes>('최신순');
  const [selectedTheme, setSelectedTheme] = useState('');
  const [selectedYear, setSelectedYear] = useState('0');

  if (isLoading) return <Loading />;

  const historyOriginGroup = data!.data.data.groups;
  const historyCategories = data!.data.data.categories;
  let historyYears = data!.data.data.years;
  let historyGroup = data!.data.data.groups;

  const handleSelectTheme = (selectedNewTheme: string) => {
    if (selectedNewTheme === selectedTheme) return setSelectedTheme('');

    if (selectedYear !== '0') setSelectedYear('0');

    setSelectedTheme(selectedNewTheme);
  };

  const handleSelectYear = (selectedNewYear: string) => {
    if (selectedNewYear === selectedYear) return setSelectedYear('0');

    setSelectedYear(selectedNewYear);
  };

  // 정렬 로직
  const handleFilterSelection = (selectedFilter: filterOptionTypes) => {
    setSelectedFilter(selectedFilter);

    const getFullDateFormat = (stringDate: string) => {
      const [yearA, monthA, dayA] = stringDate.split(' - ')[0].split('. ');

      return `20${yearA}-${monthA}-${dayA}`;
    };

    if (selectedFilter === '최신순') {
      const newHistoryGroup = [...historyGroup].sort((a, b) => b.year - a.year);
      newHistoryGroup.forEach(({ objList }: { objList: IObjective[] }) => {
        return objList.sort((a, b) => {
          const fullDateA = getFullDateFormat(a.objPeriod);
          const fullDateB = getFullDateFormat(b.objPeriod);

          return new Date(fullDateB).getTime() - new Date(fullDateA).getTime();
        });
      });

      return (historyGroup = newHistoryGroup);
    }

    if (selectedFilter === '오래된 순') {
      const newHistoryGroup = [...historyGroup].sort((a, b) => a.year - b.year);
      newHistoryGroup.forEach(({ objList }: { objList: IObjective[] }) => {
        return objList.sort((a, b) => {
          const fullDateA = getFullDateFormat(a.objPeriod);
          const fullDateB = getFullDateFormat(b.objPeriod);

          return new Date(fullDateA).getTime() - new Date(fullDateB).getTime();
        });
      });

      return (historyGroup = newHistoryGroup);
    }

    if (selectedFilter === '달성률') {
      const newHistoryGroup = [...historyGroup].sort((a, b) => b.year - a.year);
      newHistoryGroup.forEach(({ objList }: { objList: IObjective[] }) => {
        return objList.sort((a, b) => b.progress - a.progress);
      });

      return (historyGroup = newHistoryGroup);
    }
  };

  // 카테고리 선택 로직
  if (selectedTheme === '' && selectedYear !== '0') {
    const selectedHistoryGroupByYear = [...historyOriginGroup].filter(({ year }) =>
      selectedYear.includes(year),
    );

    historyGroup = selectedHistoryGroupByYear;
  } else if (selectedTheme !== '') {
    const newHistoryData = [...historyOriginGroup]
      .map(({ year, objList }) => {
        const filteredObjList = objList.filter(
          ({ objCategory }: { objCategory: string }) => objCategory === selectedTheme,
        );

        return { year, objList: filteredObjList };
      })
      .filter(({ objList }) => objList.length !== 0);

    historyGroup = newHistoryData;

    historyYears = historyGroup.map(
      ({ year, objList }: { year: string; objList: IObjective[] }) => ({
        year,
        count: objList.length,
      }),
    );

    if (selectedYear !== '0') {
      const selectedHistoryGroupByYear = [...historyOriginGroup].filter(({ year }) =>
        selectedYear.includes(year),
      );
      const newHistoryData = selectedHistoryGroupByYear[0].objList.filter(
        ({ objCategory }: { objCategory: string }) => objCategory === selectedTheme,
      );

      historyGroup = [
        {
          year: Number(selectedYear.slice(0, 4)),
          objList: newHistoryData,
        },
      ];
    }
  }

  const yearData = historyYears?.map(
    ({ year, count }: { year: string; count: number }) => `${year}(${count})`,
  );

  return (
    <section css={historyUi}>
      <HistoryDrawer
        historyCategories={historyCategories}
        okrHistoryYearData={yearData}
        selectedTheme={selectedTheme}
        selectedYear={selectedYear}
        onSelectTheme={handleSelectTheme}
        onSelectYear={handleSelectYear}
      />

      <section css={dropDownSection}>
        <ListOrder selectedFilter={selectedFilter} onFilterSelection={handleFilterSelection} />
        {historyGroup?.map(({ year, objList }: Group) => (
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
