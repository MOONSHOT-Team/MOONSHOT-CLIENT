import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import StepBtns from './components/commonUse/StepBtns';
import AddGuideKr from './components/stepLayout/AddGuideKr';
import AddKr from './components/stepLayout/AddKr';
import ObjContent from './components/stepLayout/ObjContent';
import ObjPeriod from './components/stepLayout/ObjPeriod';
import ObjTitleCateg from './components/stepLayout/ObjTitleCateg';
import SelectMethod from './components/stepLayout/SelectMethod';
import { OBJ_START_AT } from './constants/ADD_OKR_DATES';

// const ADD_OKR_STPES = ['SELECT_METHOD', 'OBJ_TITLE_CATEG', 'OBGJ_PERIOD', 'OBJ_CONTENT', 'ADD_KR'];

const IS_GUIDE = '가이드에 따라 설정하기';
const AddOkr = () => {
  const [step, setStep] = useState(0);
  const [isActiveNext, setIsActiveNext] = useState(false);

  //2 Step 0 - SELECT METHOD 관련 State
  const [selectedMethod, setSelectedMethod] = useState('');

  const [objInfo, setObjInfo] = useState({
    objTitle: '',
    objCategory: '',
    objContent: '',
    objStartAt: OBJ_START_AT,
    objExpireAt: '',
  });

  const [selectedPeriod, setSelectedPeriod] = useState('');

  // 이전, 다음 버튼 관련 handler
  const hanldeClickPrevBtn = () => {
    setStep((prev) => prev - 1);
  };

  const handleClickNextBtn = () => {
    isActiveNext && setStep((prev) => prev + 1);
  };

  // stpe 0 - SELECT METHOD 관련 handler
  const handleClickMethodBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedMethod(e.currentTarget.id);
    setStep((prev) => prev + 1);
  };

  const renderStepLayout = () => {
    switch (step) {
      case 0:
        return (
          <SelectMethod
            selectedMethod={selectedMethod}
            handleClickMethodBtn={handleClickMethodBtn}
          />
        );
      case 1:
        return (
          <ObjTitleCateg
            isGuide={selectedMethod === IS_GUIDE}
            objInfo={objInfo}
            setObjInfo={setObjInfo}
          />
        );
      case 2:
        return (
          <ObjPeriod
            objInfo={objInfo}
            setObjInfo={setObjInfo}
            selectedPeriod={selectedPeriod}
            setSelectedPeriod={setSelectedPeriod}
          />
        );

      case 3:
        return <ObjContent objInfo={objInfo} setObjInfo={setObjInfo} />;

      case 4:
        return selectedMethod === IS_GUIDE ? <AddKr /> : <AddGuideKr />;
    }
  };

  const validNextStep = () => {
    switch (step) {
      case 1:
        objInfo.objCategory && objInfo.objTitle ? setIsActiveNext(true) : setIsActiveNext(false);
        break;
      case 2:
        objInfo.objStartAt && objInfo.objExpireAt && selectedPeriod
          ? setIsActiveNext(true)
          : setIsActiveNext(false);
        break;
      case 3:
        objInfo.objContent ? setIsActiveNext(true) : setIsActiveNext(false);
        break;
    }
  };

  useEffect(() => {
    validNextStep();
    console.log(objInfo);
    console.log(isActiveNext);
  }, [step, objInfo]);

  return (
    <section css={AddOkrContainer}>
      {step > 0 && <SelectedMethodTxt>{selectedMethod}</SelectedMethodTxt>}
      {renderStepLayout()}
      {step > 0 && step < 5 && (
        <StepBtns
          isActiveNext={isActiveNext}
          handleClickPrev={hanldeClickPrevBtn}
          handleClickNext={handleClickNextBtn}
        />
      )}
    </section>
  );
};

export default AddOkr;

const AddOkrContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const SelectedMethodTxt = styled.p`
  color: ${({ theme }) => theme.colors.gray_300};
  ${({ theme }) => theme.fonts.body_12_medium};
`;
