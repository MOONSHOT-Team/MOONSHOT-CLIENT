import { css } from '@emotion/react';

const AddOkr = () => {
  return (
    <section css={AddOkrContainer}>
      step1
      {/* <SelectMethod /> */}
      {/* {<ObjTitleCateg isGuide={true} />} */}
      {/* <ObjPeriod /> */}
      {/* <AddKr /> */}
      {/* <AddGuideKr /> */}
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
