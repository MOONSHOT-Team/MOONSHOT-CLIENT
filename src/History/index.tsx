import { css } from '@emotion/react';
import styled from '@emotion/styled';
import axios from 'axios';
import { useEffect, useState } from 'react';
import useSWR, { mutate } from 'swr';

import { getOKRHistory } from './apis/fetcher';
import HistoryList from './components/dropDown/HistoryList';
import ListOrder from './components/dropDown/ListOrder';
import HistoryDrawer from './components/HistoryDrawer';
import { Group, IObjective } from './type/okrTypes';

const History = () => {
  const [historyData, setHistoryData] = useState<{ groups: Group[]; categories: string[] } | null>(
    null,
  );
  const { data: HistoryData, isLoading } = useSWR('/v1/objective/history', getOKRHistory);

  useEffect(() => {
    if (!isLoading && HistoryData) {
      setHistoryData(HistoryData?.data.data);
    }
  }, [HistoryData, isLoading]);

  if (isLoading) return <>로딩중 ...</>;
  if (!HistoryData) return <>데이터를 가져오는 중입니다...</>;
  console.log(HistoryData.data.data, isLoading);

  const handleThemeSelect = async (selectedTheme: string) => {
    try {
      console.log('Params:', { category: selectedTheme });
      const response = await axios.get('/v1/objective/history', {
        params: {
          category: selectedTheme,
        },
      });

      mutate(() => '/v1/objective/history');

      setHistoryData(response.data);
      console.log(historyData, isLoading);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  // const handleYearSelect = (selectedYear: number) => {
  //   console.log('선택된 연도:', selectedYear);
  // };

  // const [firstGroupYear, setFirstGroupYear] = useState<number | null>(null);

  // useEffect(() => {
  //   if (HistoryData.data.data.years.length > 0) {
  //     setFirstGroupYear(HistoryData.data.data.years[0].year);
  //   }
  // }, [HistoryData.data.data.years]);

  // const { groups, categories, years } = ObjectiveData;
  return (
    <section css={historyUi}>
      <HistoryDrawer
        groups={historyData ? historyData.groups : []}
        categories={historyData ? historyData.categories : []}
        years={HistoryData?.data.data.years}
        onThemeSelect={handleThemeSelect}
        // onYearSelect={handleYearSelect}
      />
      <section css={DropDownSection}>
        <ListOrder />
        {HistoryData.data.data.groups.map(({ year, objList }: Group) => (
          <div key={year} css={listMarginBottom}>
            <StListOrderContainer
            //  isFirst={year === firstGroupYear}
            >
              <StEachYear>{year}년</StEachYear>
            </StListOrderContainer>
            <ul>
              <li>
                {objList.map(
                  ({
                    objIdx,
                    objId,
                    title,
                    objCategory,
                    progress,
                    objPeriod,
                    krList,
                  }: IObjective) => (
                    <HistoryList
                      key={`${objIdx}+${objId}`}
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

const StListOrderContainer = styled.div // <{ isFirst: boolean }>
`
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
