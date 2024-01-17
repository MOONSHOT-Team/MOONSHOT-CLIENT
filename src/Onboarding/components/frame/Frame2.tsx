import { css } from '@emotion/react';

import TextField from './TextField';

const Frame2 = () => {
  return (
    <section css={sectionStyle}>
      <TextField
        subTitle="OKR tree"
        subTitleColor="main_purple"
        title="흩어져 있는 할 일을 하나의 북극성 아래"
        description="파편화된 할일들을 단 3개의 우선순위로 정렬시켜 핵심 지표를 달성하는데 집중하세요"
      />
    </section>
  );
};

export default Frame2;

const sectionStyle = css`
  width: 100%;
  max-width: 136.6rem;
  height: 108.4rem;
`;
