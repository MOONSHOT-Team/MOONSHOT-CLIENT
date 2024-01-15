import { css } from '@emotion/react';

import ObjTitleCateg from './components/step/ObjTitleCateg';

const AddOkr = () => {
  return <section css={AddOkrContainer}>{<ObjTitleCateg isGuide={true} />}</section>;
};

export default AddOkr;

const AddOkrContainer = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  /* 추후 확인 */
`;
