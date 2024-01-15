import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import HistoryList from './components/dropDown/HistoryList';
import ListOrder from './components/dropDown/ListOrder';
import { DUMMYDATA } from './constants/dummydata';
import { IObjective } from './type/okrTypes';

const History = () => {
  const {
    data: { groups },
  } = DUMMYDATA;

  const [firstGroupYear, setFirstGroupYear] = useState<number | null>(null);

  useEffect(() => {
    if (groups.length > 0) {
      setFirstGroupYear(groups[0].year);
    }
  }, [groups]);

  return (
    <section css={DropDownSection}>
      {groups.map(({ year, objList }) => (
        <div key={year}>
          <StListOrderContainer isFirst={year === firstGroupYear}>
            <StEachYear>{year}년</StEachYear>
            <ListOrder />
          </StListOrderContainer>
          {objList.map(
            ({ objIdx, objId, title, objCategory, progress, objPeriod, krList }: IObjective) => (
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
        </div>
      ))}
    </section>
  );
};

export default History;
const DropDownSection = css`
  padding: 0 3.6rem 0 4rem;
`;

const StListOrderContainer = styled.div<{ isFirst: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 105.8rem;
  margin-top: ${({ isFirst }) => (isFirst ? '3.0rem' : '3.4rem')};
`;

const StEachYear = styled.p`
  display: flex;
  justify-content: flex-start;
  padding-left: 0.2rem;
  margin-bottom: 1.2rem;
  color: ${({ theme }) => theme.colors.gray_000} ${({ theme }) => theme.fonts.title_20_semibold};
`;
