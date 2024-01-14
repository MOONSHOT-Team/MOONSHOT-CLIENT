import { css } from '@emotion/react';

import HistoryList from './components/dropDown/HistoryList';
import { DUMMYDATA } from './constants/dummydata';

const History = () => {
  const {
    data: { groups },
  } = DUMMYDATA;

  return (
    <section css={DropDownSection}>
      {groups.map(({ year, objList }) => (
        <HistoryList key={`${year}+${objList}`} year={year} objList={objList} />
      ))}
    </section>
  );
};

export default History;
const DropDownSection = css`
  padding: 0 3.6rem 0 4rem;
`;
