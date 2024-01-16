import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import StepBtns from './components/commonUse/StepBtns';
import AddGuideKr from './components/stepLayout/AddGuideKr';
import AddKr from './components/stepLayout/AddKr';
import ObjContent from './components/stepLayout/ObjContent';
import ObjPeriod from './components/stepLayout/ObjPeriod';
import ObjTitleCateg from './components/stepLayout/ObjTitleCateg';
import SelectMethod from './components/stepLayout/SelectMethod';
import { OBJ_START_AT } from './constants/ADD_OKR_DATES';
import { IKrListInfoTypes } from './types/KrInfoTypes';

// const ADD_OKR_STPES = ['SELECT_METHOD', 'OBJ_TITLE_CATEG', 'OBGJ_PERIOD', 'OBJ_CONTENT', 'ADD_KR'];

const IS_GUIDE = '가이드에 따라 설정하기';
const AddOkr = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [isActiveNext, setIsActiveNext] = useState(false);

  //Step 0 - SELECT METHOD 관련 State
  const [selectedMethod, setSelectedMethod] = useState('');
  // Step 2 ObjPeriod- 선택된 기간 버튼 관리 값
  const [selectedPeriod, setSelectedPeriod] = useState('');

  const [isActiveSecondKrCard, setIsActiveSecondKrCard] = useState(false);

  const [clickedCard, setClickedCard] = useState<number[]>([0]);

  // kr 카드 추가 버튼 핸들러
  const handleClickPlusCard = (item: number) => {
    //순서 보장 조건 -> 앞에서부터 추가
    if (clickedCard.toString() === [0].toString() && item === 2) return;
    setClickedCard((prev) => [...prev, item]);
  };

  // KR 카드 추가 취소 버튼 핸들러
  const handleClickCloseBtn = (cardIdx: number) => {
    //순서 보장 조건 -> 앞에서부터 추가
    if (clickedCard.toString() === [0, 1, 2].toString() && cardIdx === 1) return;
    const parsedArray = clickedCard.filter((item) => {
      return item !== cardIdx;
    });

    setClickedCard(parsedArray);
  };

  const [objInfo, setObjInfo] = useState({
    objTitle: '',
    objCategory: '',
    objContent: '',
    objStartAt: OBJ_START_AT,
    objExpireAt: '',
  });

  const { objTitle, objCategory, objContent, objStartAt, objExpireAt } = objInfo;

  const [krListInfo, setKrListInfo] = useState<IKrListInfoTypes[]>([
    {
      idx: 0,
      title: '',
      startAt: '',
      expireAt: '',
      target: '',
      metric: '',
      taskList: [],
    },
    {
      idx: 1,
      title: '',
      startAt: '',
      expireAt: '',
      target: '',
      metric: '',
      taskList: [],
    },
    {
      idx: 2,
      title: '',
      startAt: '',
      expireAt: '',
      target: '',
      metric: '',
      taskList: [],
    },
  ]);

  // 이전, 다음 버튼 관련 handler
  const hanldeClickPrevBtn = () => {
    setStep((prev) => prev - 1);
  };

  const handleClickNextBtn = () => {
    if (step === 4 && selectedMethod === IS_GUIDE && isActiveSecondKrCard === false) {
      isActiveNext && setIsActiveSecondKrCard(true);
      return;
    }
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
        return selectedMethod === IS_GUIDE ? (
          <AddGuideKr
            objTitle={objTitle}
            clickedCard={clickedCard}
            handleClickPlusCard={handleClickPlusCard}
            handleClickCloseBtn={handleClickCloseBtn}
            krListInfo={krListInfo}
            setKrListInfo={setKrListInfo}
            isActiveSecondKrCard={isActiveSecondKrCard}
          />
        ) : (
          <AddKr
            objTitle={objTitle}
            clickedCard={clickedCard}
            handleClickPlusCard={handleClickPlusCard}
            handleClickCloseBtn={handleClickCloseBtn}
            krListInfo={krListInfo}
            setKrListInfo={setKrListInfo}
          />
        );
      case 5:
        navigate('/preview-okr', {
          state: { objInfo: objInfo, krListInfo: krListInfo.filter((kr) => kr.title !== '') },
        });
        break;
      default:
      //에러페이지
    }
  };

  const validNextStep = () => {
    switch (step) {
      case 1:
        objCategory && objTitle ? setIsActiveNext(true) : setIsActiveNext(false);
        break;
      case 2:
        objStartAt && objExpireAt && selectedPeriod
          ? setIsActiveNext(true)
          : setIsActiveNext(false);
        break;
      case 3:
        objContent ? setIsActiveNext(true) : setIsActiveNext(false);
        break;
      case 4:
        krListInfo.filter((kr) => {
          return clickedCard.includes(kr.idx);
        }).length ===
        krListInfo.filter((kr) => {
          const { title, target, metric, startAt, expireAt } = kr;
          return title !== '' && target !== '' && metric !== '' && startAt != '' && expireAt !== '';
        }).length
          ? setIsActiveNext(true)
          : setIsActiveNext(false);
        break;
    }
  };

  useEffect(() => {
    validNextStep();
  }, [step, objInfo, krListInfo, clickedCard]);

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
