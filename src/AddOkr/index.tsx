import { css } from '@emotion/react';

import SelectMethod from './components/step/SelectMethod';

const AddOkr = () => {
  return (
    <section css={AddOkrContainer}>
      {/* step1 */}
      <SelectMethod />
    </section>
  );
};

export default AddOkr;

const AddOkrContainer = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100%;
`;
