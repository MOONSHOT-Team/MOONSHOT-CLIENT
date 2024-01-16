import { css } from '@emotion/react';
import styled from '@emotion/styled';

import HistoryList from './components/dropDown/HistoryList';
import ListOrder from './components/dropDown/ListOrder';
import HistoryDrawer from './components/HistoryDrawer';
import { DUMMY_DATA } from './constants/dummyData';
import { IObjective } from './type/okrTypes';

const History = () => {
  const {
    data: { groups, categories },
  } = DUMMY_DATA;

  return (
    <>
      <HistoryDrawer groups={groups} categories={categories} />;
      <section css={DropDownSection}>
        {groups.map(({ year, objList }) => (
          <div key={year} css={listMarginBottom}>
            <StListOrderContainer>
              <StEachYear>{year}년</StEachYear>
              <ListOrder />
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
    </>
  );
};

const listMarginBottom = css`
  &:not(:last-child) {
    margin-bottom: 3.4rem;
  }
`;

export default History;

const DropDownSection = css`
  padding: 3rem 3.6rem 3rem 4rem;
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
  color: ${({ theme }) => theme.colors.gray_000} ${({ theme }) => theme.fonts.title_20_semibold};
`;
