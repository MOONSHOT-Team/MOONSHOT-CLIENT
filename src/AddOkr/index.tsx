import Error from '@components/Error';
import ProgressBar from '@components/ProgressBar';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import StepBtns from './components/commonUse/StepBtns';
import AddGuideKr from './components/stepLayout/AddGuideKr';
import AddKr from './components/stepLayout/AddKr';
import ObjContent from './components/stepLayout/ObjContent';
import ObjPeriod from './components/stepLayout/ObjPeriod';
import ObjTitleCateg from './components/stepLayout/ObjTitleCateg';
import { OBJ_START_AT } from './constants/ADD_OKR_DATES';
import { IKrListInfoTypes } from './types/KrInfoTypes';

const IS_GUIDE = '가이드에 따라 설정하기';
const MAX_BASIC_STEP = 5;
const MAX_GUIDE_STEP = 6;

const AddOkr = () => {
  const location = useLocation();
  const navigate = useNavigate();

  console.log(location.state && location.state);

  const resetObjInfoState = {
    objTitle: '',
    objCategory: '',
    objContent: '',
    objStartAt: OBJ_START_AT,
    objExpireAt: '',
  };

  const resetKrListInfo = [
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
  ];

  // step 관리 값
  const [step, setStep] = useState(0);
  //이전, 다음 버튼 관리 값
  const [isActiveNext, setIsActiveNext] = useState(false);

  const [objInfo, setObjInfo] = useState(resetObjInfoState);
  const { objTitle, objCategory, objContent, objStartAt, objExpireAt } = objInfo;

  const [krListInfo, setKrListInfo] = useState<IKrListInfoTypes[]>(resetKrListInfo);

  // Step 0 - SELECT METHOD 관련 State
  const [selectedMethod, setSelectedMethod] = useState('');
  // Step 2 ObjPeriod- 선택된 기간 버튼 관리 값
  const [selectedPeriod, setSelectedPeriod] = useState('');

  // step 4 (guide) - 가이드에 따라 설정하기 플로우에서 두번째 kr 카드 보여지는지 여부 관리
  const [isActiveSecondKrCard, setIsActiveSecondKrCard] = useState(false);
  // step 4 - kr 카드 선택 여부 관리
  const [clickedCard, setClickedCard] = useState<number[]>([0]);

  // 이전, 다음 버튼 관련 handler
  const hanldeClickPrevBtn = () => {
    // 가이드에 따라 설정시 두 번째 kr 카드 -> 첫번째 kr 카드 다시 보여지도록 관리
    if (step === 4 && selectedMethod === IS_GUIDE && isActiveSecondKrCard === true) {
      setIsActiveSecondKrCard(false);
      return;
    }

    // step 1 -> 0으로 이동시 정보 초기화
    if (step === 1) {
      navigate('/dashboard', { state: { selectedMethod: selectedMethod } });
    }

    setStep((prev) => prev - 1);
  };

  const handleClickNextBtn = () => {
    // 가이드에 따라 설정시 두 번째 kr 카드 보여지는지 관리
    if (step === 4 && selectedMethod === IS_GUIDE && isActiveSecondKrCard === false) {
      isActiveNext && setIsActiveSecondKrCard(true);
      return;
    }
    isActiveNext && setStep((prev) => prev + 1);
  };

  // // stpe 0 - SELECT METHOD 관련 handler
  // const handleClickMethodBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   setSelectedMethod(e.currentTarget.id);
  //   setStep((prev) => prev + 1);
  // };

  // step 4 -  kr 카드 추가 버튼 핸들러
  const handleClickPlusCard = (item: number) => {
    //순서 보장 조건 -> 앞에서부터 추가
    if (clickedCard.toString() === [0].toString() && item === 2) return;
    setClickedCard((prev) => [...prev, item]);
  };

  // setp 4- KR 카드 추가 취소 버튼 핸들러
  const handleClickCloseBtn = (cardIdx: number) => {
    //순서 보장 조건 -> 앞에서부터 추가
    if (clickedCard.toString() === [0, 1, 2].toString() && cardIdx === 1) return;
    const parsedArray = clickedCard.filter((item) => {
      return item !== cardIdx;
    });

    setClickedCard(parsedArray);
    // x버튼 누르면 kr 리스트 정보 초기화
    krListInfo[cardIdx] = resetKrListInfo[cardIdx];
    setKrListInfo([...krListInfo]);
  };

  // 이전, 다음 버튼 활성화 / 비활성화 관리 함수
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
        //가이드에 따라 설정 - 첫번째 kr 카드일 떄
        if (selectedMethod === IS_GUIDE && isActiveSecondKrCard) {
          krListInfo.filter((kr) => {
            return clickedCard.includes(kr.idx);
          }).length ===
          krListInfo.filter((kr) => {
            const { target, metric } = kr;
            return target && metric;
          }).length
            ? setIsActiveNext(true)
            : setIsActiveNext(false);
        }

        // 가이드에 따라 설정 - 두 번째 kr 카드일 때
        if (selectedMethod === IS_GUIDE && !isActiveSecondKrCard) {
          krListInfo.filter((kr) => {
            return clickedCard.includes(kr.idx);
          }).length ===
          krListInfo.filter((kr) => {
            const { title, startAt, expireAt } = kr;
            return title && startAt && expireAt;
          }).length
            ? setIsActiveNext(true)
            : setIsActiveNext(false);
        }

        // 직접 설정하기 플로우일 때
        if (selectedMethod !== IS_GUIDE) {
          krListInfo.filter((kr) => {
            return clickedCard.includes(kr.idx);
          }).length ===
          krListInfo.filter((kr) => {
            const { title, target, metric, startAt, expireAt } = kr;
            return title && target && metric && startAt && expireAt;
          }).length
            ? setIsActiveNext(true)
            : setIsActiveNext(false);
        }
        break;
    }
  };

  // step에 따라 다른 layout 렌더링하는 함수
  const renderStepLayout = () => {
    switch (step) {
      case 0:
        // // stpe 0 - 방식 선택 (가이드 vs 직접)
        // return (
        //   <SelectMethod
        //     selectedMethod={selectedMethod}
        //     handleClickMethodBtn={handleClickMethodBtn}
        //   />
        // );
        if (location.state.selectedMethod) {
          setSelectedMethod(location.state.selectedMethod);
          setStep((prev) => prev + 1);
          return;
        }
        if (!location.state.selectedMethod) {
          return <Error />;
        }
        break;
      case 1:
        // step 1 - O 카데고리, 제목 설정
        return (
          <ObjTitleCateg
            isGuide={selectedMethod === IS_GUIDE}
            objInfo={objInfo}
            setObjInfo={setObjInfo}
          />
        );
      case 2:
        // stpe 2 - O 기간 설정
        return (
          <ObjPeriod
            objInfo={objInfo}
            setObjInfo={setObjInfo}
            selectedPeriod={selectedPeriod}
            setSelectedPeriod={setSelectedPeriod}
          />
        );

      case 3:
        // stpe 3 - O 내용 설정
        return <ObjContent objInfo={objInfo} setObjInfo={setObjInfo} />;

      case 4:
        // step 4 - KR 추가
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
        // step 5 - previewOkr로 add-okr에서 생성된 정보들 보내주고 redirect, 이때 krList 중 값이 있는 것만 보낼수 있도록 필터한다.
        navigate('/preview-okr', {
          state: { objInfo: objInfo, krListInfo: krListInfo.filter((kr) => kr.title) },
        });
        break;
      default:
        return <Error />;
    }
  };

  // 스텝에 따라 검증
  useEffect(() => {
    validNextStep();
  }, [step, objInfo, krListInfo, clickedCard]);

  return (
    <section css={AddOkrContainer}>
      {selectedMethod && <SelectedMethodTxt>{selectedMethod}</SelectedMethodTxt>}
      {renderStepLayout()}
      {selectedMethod && step < 5 && (
        <>
          <StepBtns
            isInit={step === 1}
            isActiveNext={isActiveNext}
            handleClickPrev={hanldeClickPrevBtn}
            handleClickNext={handleClickNextBtn}
          />
          <StProgressBarBox $step={step} $selectedMethod={selectedMethod}>
            <ProgressBar
              currentProgress={
                selectedMethod === IS_GUIDE && isActiveSecondKrCard ? step + 1 : step
              }
              maximumProgress={selectedMethod === IS_GUIDE ? MAX_GUIDE_STEP : MAX_BASIC_STEP}
            />
            <div css={ProgressTxtBox}>
              <StProgressTxt>{`${
                selectedMethod === IS_GUIDE && isActiveSecondKrCard ? step + 1 : step
              }/${selectedMethod === IS_GUIDE ? MAX_GUIDE_STEP : MAX_BASIC_STEP}`}</StProgressTxt>
            </div>
          </StProgressBarBox>
        </>
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

const marginTopState = (step: number, selectedMethod: string) => {
  switch (step) {
    case 1:
      return selectedMethod === IS_GUIDE ? '6.8rem' : '14.8rem';
    case 2:
      return '5rem';
    case 3:
      return '7.3rem';
    case 4:
      return '3.4rem';
  }
};
const StProgressBarBox = styled.div<{ $step: number; $selectedMethod: string }>`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  width: 38rem;
  height: 2.7rem;
  margin-top: ${({ $step, $selectedMethod }) => marginTopState($step, $selectedMethod)};

  & progress {
    height: 0.8rem !important;
  }
`;

const ProgressTxtBox = css`
  position: absolute;
  right: 0;
  bottom: 0;
  width: fit-content;
`;

const StProgressTxt = styled.span`
  color: ${({ theme }) => theme.colors.gray_300};
  ${({ theme }) => theme.fonts.btn_11_medium};
`;
