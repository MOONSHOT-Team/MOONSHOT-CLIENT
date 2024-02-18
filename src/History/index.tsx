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

  const handleThemeSelect = async (selectedTheme: string) => {
    setSelectedTheme(selectedTheme);
  };

  const handleFilterSelection = (selectedFilter: string) => {
    setSelectedFilter(selectedFilter);
  };

  const handleYearSelect = async (selectedYear: number) => {
    setSelectedYear(selectedYear);
  };

  useEffect(() => {
    if (!isLoading && OKRHistoryData) {
      setHistoryData(OKRHistoryData?.data.data);
      setFixedYears(OKRHistoryData?.data.data.years || []);
      setFixedCategories(OKRHistoryData?.data.data.categories || []);
    }
  }, [OKRHistoryData, isLoading]);

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

  if (!OKRHistoryData) return <Loading />;

  const listOrderComponent = OKRHistoryData.data.data.groups.length !== 0 && (
    <ListOrder onFilterSelection={handleFilterSelection} />
  );

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
        )?.map(({ year, objList }: Group, idx: number) => (
          <div key={`${year}*${year}`} css={listMarginBottom}>
            <StListOrderContainer>
              <StEachYear>{year}년</StEachYear>
            </StListOrderContainer>
            <ul>
              <li css={addGapBetweenObjective}>
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
                      isLast={idx === objList.length - 1}
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
