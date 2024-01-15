import { css } from '@emotion/react';

import ObjPeriod from './components/step/ObjPeriod';
import ObjTitleCateg from './components/step/ObjTitleCateg';
import SelectMethod from './components/step/SelectMethod';

const AddOkr = () => {
  return (
    <section css={AddOkrContainer}>
      {/* step1 */}
      <SelectMethod />
      {<ObjTitleCateg isGuide={true} />}
      <ObjPeriod />
    </section>
  );
};

export default AddOkr;

const AddOkrContainer = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;
