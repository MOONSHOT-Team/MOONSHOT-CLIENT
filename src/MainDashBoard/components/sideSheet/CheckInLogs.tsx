import { css } from '@emotion/react';

import { ICheckInLogTypes } from '../../type/CheckInLogTypes';

const CheckInLogItem = ({ state, date, title, content }: ICheckInLogTypes) => {
  return (
    <div>
      <p>
        <span>{state}</span>
        <span>[{date}]</span>
      </p>
      <p>{title}</p>
      <p>{content}</p>
    </div>
  );
};

const CheckInLogs = ({ data }: { data: ICheckInLogTypes[] }) => {
  console.log(data);
  return (
    <section css={checkInLogStyles}>
      <p>체크인 로그</p>
      {data.map((item, idx) => {
        return <CheckInLogItem key={idx} {...item} />;
      })}
    </section>
  );
};

export default CheckInLogs;

const checkInLogStyles = css`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
