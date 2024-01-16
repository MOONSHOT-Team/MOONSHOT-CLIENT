import { css } from '@emotion/react';

import ObjPeriod from './components/step/ObjPeriod';
import ObjTitleCateg from './components/step/ObjTitleCateg';
import SelectMethod from './components/step/SelectMethod';
import AddGuideKr from './step/AddGuideKr';
import ObjContent from './step/ObjContent';

const AddOkr = () => {
  return (
    <section css={AddOkrContainer}>
      {/* step1 */}
      <SelectMethod />
      {<ObjTitleCateg isGuide={true} />}
      <ObjPeriod />
      {/* <AddKr /> */}
      <ObjContent />
      <AddGuideKr />
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
