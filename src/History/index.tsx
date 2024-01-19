import instance from '@apis/instance';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

import { getOKRHistory } from './apis/fetcher';
import HistoryList from './components/dropDown/HistoryList';
import ListOrder from './components/dropDown/ListOrder';
import HistoryDrawer from './components/HistoryDrawer';
import { Group, IObjective } from './type/okrTypes';

const History = () => {
  const [historyData, setHistoryData] = useState<{ groups: Group[]; categories: string[] } | null>(
    null,
  );

  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);

  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const [years, setYears] = useState<{ year: number; count: number }[]>([{ year: 2024, count: 0 }]);

  const [categories, setCategories] = useState<string[]>([]);

  const [fixedYears, setFixedYears] = useState<{ year: number; count: number }[] | null>(null);

  const [fixedCategories, setFixedCategories] = useState<string[]>([]);

  const { data: OKRHistoryData, isLoading } = useSWR('/v1/objective/history', getOKRHistory);

  useEffect(() => {
    if (!isLoading && OKRHistoryData) {
      setHistoryData(OKRHistoryData?.data.data);
      setFixedYears(OKRHistoryData?.data.data.years || []);
      setFixedCategories(OKRHistoryData?.data.data.categories || []);
    }
  }, [OKRHistoryData, isLoading]);

  useEffect(() => {
    const fetchData = async () => {
      try {
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
      } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
      }
    };

    fetchData();
  }, [selectedTheme, selectedYear, selectedFilter]);

  const handleThemeSelect = async (selectedTheme: string) => {
    setSelectedTheme(selectedTheme);
  };

  const handleFilterSelection = (selectedFilter: string) => {
    setSelectedFilter(selectedFilter);
  };

  const handleYearSelect = async (selectedYear: number) => {
    setSelectedYear(selectedYear);
  };

  if (!OKRHistoryData) return <>데이터를 가져오는 중입니다...</>;

  const listOrderComponent = OKRHistoryData?.data?.data?.groups &&
    OKRHistoryData.data.data.groups.length > 0 &&
    !selectedYear &&
    !selectedTheme &&
    !selectedFilter && <ListOrder onFilterSelection={handleFilterSelection} />;

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
        {listOrderComponent}
        {(selectedTheme || selectedYear || selectedFilter
          ? historyData?.groups
          : OKRHistoryData?.data?.data?.groups
        )?.map(({ year, objList }: Group) => (
          <div key={`${year}*${year}`} css={listMarginBottom}>
            <StListOrderContainer>
              <StEachYear>{year}년</StEachYear>
            </StListOrderContainer>
            <ul>
              <li>
                {objList.map(
                  ({ objId, title, objCategory, progress, objPeriod, krList }: IObjective) => (
                    <HistoryList
                      key={`${title}+${objId}`}
                      objId={objId}
                      title={title}
                      objCategory={objCategory}
                      progress={progress}
                      objPeriod={objPeriod}
                      krList={krList}
                    />
                  ),
                )}
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

  &::-webkit-scrollbar-thumb {
    background-color: #444;
  }
`;

const listMarginBottom = css`
  &:not(:last-child) {
    margin-bottom: 3.4rem;
  }
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
