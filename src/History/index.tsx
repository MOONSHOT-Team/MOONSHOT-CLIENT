import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

import { getOKRHistory } from './apis/fetcher';
import HistoryList from './components/dropDown/HistoryList';
import ListOrder from './components/dropDown/ListOrder';
import HistoryDrawer from './components/HistoryDrawer';
import { DUMMY_DATA } from './constants/dummy';
import { IObjective } from './type/okrTypes';

const History = () => {
  const { data } = useSWR('/v1/objective/history', getOKRHistory);
  console.log(data);
  const {
    data: { groups, categories },
  } = DUMMY_DATA;

  const [firstGroupYear, setFirstGroupYear] = useState<number | null>(null);

  useEffect(() => {
    if (groups.length > 0) {
      setFirstGroupYear(groups[0].year);
    }
  }, [groups]);

  return (
    <section css={historyUi}>
      <HistoryDrawer groups={groups} categories={categories} />
      <section css={DropDownSection}>
        <ListOrder />
        {groups.map(({ year, objList }) => (
          <div key={year} css={listMarginBottom}>
            <StListOrderContainer isFirst={year === firstGroupYear}>
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

const StListOrderContainer = styled.div<{ isFirst: boolean }>`
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
