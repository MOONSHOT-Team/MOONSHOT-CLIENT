import Error from '@components/Error';
import ProgressBar from '@components/ProgressBar';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import PreviewOkr from '../PreviewOkr/PreviewOkr';
import StepBtns from './components/commonUse/StepBtns';
import AddGuideFirstKr from './components/stepLayout/AddGuideFirstKr';
import AddGuideSecondKr from './components/stepLayout/AddGuideSecondKr';
import AddKr from './components/stepLayout/AddKr';
import ObjContent from './components/stepLayout/ObjContent';
import ObjPeriod from './components/stepLayout/ObjPeriod';
import ObjTitleCateg from './components/stepLayout/ObjTitleCateg';
import { OBJ_START_AT } from './constants/ADD_OKR_DATES';
import { IS_GUIDE, MAX_BASIC_STEP, MAX_GUIDE_STEP } from './constants/ADD_OKR_METHOD_N_STEP';
import { IKrListInfoTypes } from './types/KrInfoTypes';

const AddOkr = () => {
  const location = useLocation();
  const navigate = useNavigate();

  //TODO: 매핑으로 바꿨는데 문제 없는지 확인 필요
  const resetTaskInfo = [0, 1, 2].map((idx) => {
    return {
      taskTitle: '',
      taskIdx: idx,
    };
  });

  const resetKrListInfo = [0, 1, 2].map((idx) => {
    return {
      krIdx: idx,
      krTitle: '',
      krStartAt: '',
      krExpireAt: '',
      krTarget: '',
      krMetric: '',
      taskList: resetTaskInfo,
    };
  });

  const resetObjInfoState = {
    objTitle: '',
    objCategory: '',
    objContent: '',
    objStartAt: OBJ_START_AT,
    objExpireAt: '',
  };

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

  // step 4 - kr 카드 선택 여부 관리
  const [clickedCard, setClickedCard] = useState<number[]>([0]);

  // 이전, 다음 버튼 관련 handler
  const handleClickPrevBtn = () => {
    // step 1 -> 0으로 이동시 정보 초기화
    if (step === 1) {
      navigate('/dashboard', { state: { selectedMethod: selectedMethod } });
    }

    // default function
    setStep((prev) => prev - 1);
  };

  const handleClickNextBtn = () => {
    // 가이드에 따라 설정하기 vs 직접 설정하기 구분 조건
    // if (
    //   (step === 4 && selectedMethod !== IS_GUIDE) ||
    //   (step === 5 && selectedMethod === IS_GUIDE)
    // ) {
    //   navigate('/preview-okr', {
    //     state: {
    //       selectedMethod: selectedMethod,
    //       step: step,
    //       objInfo: objInfo,
    //       krListInfo: krListInfo.filter((kr) => kr.title),
    //     },
    //   });
    // }

    // 가이드에 따라 설정하기 vs 직접 설정하기 구분 조건 : 직접 설정하기일 때는 step 4 -> step 6로 preview okr로 이동
    if (step === 4 && selectedMethod !== IS_GUIDE) {
      isActiveNext && setStep((prev) => prev + 2);
      return;
    }

    // default function
    isActiveNext && setStep((prev) => prev + 1);
  };

  // step 4 ~ 5 -  kr 카드 추가 버튼 핸들러
  const handleClickPlusCard = (item: number) => {
    //순서 보장 조건 -> 앞에서부터 추가
    if (clickedCard.toString() === [0].toString() && item === 2) return;
    setClickedCard((prev) => [...prev, item]);
  };

  // step 4 ~ 5 - KR 카드 추가 취소 버튼 핸들러
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
        // 가이드에 따라 설정 - 첫 번째 kr 카드일 때
        if (selectedMethod === IS_GUIDE) {
          krListInfo.filter((kr) => {
            return clickedCard.includes(kr.krIdx);
          }).length ===
          krListInfo.filter((kr) => {
            const { krTitle, krStartAt, krExpireAt } = kr;
            return krTitle && krStartAt && krExpireAt;
          }).length
            ? setIsActiveNext(true)
            : setIsActiveNext(false);
        }

        // 직접 설정하기 플로우일 때
        if (selectedMethod !== IS_GUIDE) {
          krListInfo.filter((kr) => {
            return clickedCard.includes(kr.krIdx);
          }).length ===
          krListInfo.filter((kr) => {
            const { krTitle, krTarget, krMetric, krStartAt, krExpireAt } = kr;
            return krTitle && krTarget && krMetric && krStartAt && krExpireAt;
          }).length
            ? setIsActiveNext(true)
            : setIsActiveNext(false);
        }
        break;
      case 5:
        //가이드에 따라 설정 - 두번째 kr 카드일 떄
        krListInfo.filter((kr) => {
          return clickedCard.includes(kr.krIdx);
        }).length ===
        krListInfo.filter((kr) => {
          const { krTarget, krMetric } = kr;
          return krTarget && krMetric;
        }).length
          ? setIsActiveNext(true)
          : setIsActiveNext(false);
        break;
    }
  };

  // step에 따라 다른 layout 렌더링하는 함수
  const renderStepLayout = () => {
    switch (step) {
      case 0:
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
        // step 2 - O 기간 설정
        return (
          <ObjPeriod
            objInfo={objInfo}
            setObjInfo={setObjInfo}
            selectedPeriod={selectedPeriod}
            setSelectedPeriod={setSelectedPeriod}
          />
        );

      case 3:
        // step 3 - O 내용 설정
        return <ObjContent objInfo={objInfo} setObjInfo={setObjInfo} />;

      case 4:
        // step 4 - KR 추가 (가이드에 따라 설정 첫번째 kr 카드 or 직접 설정하기)
        return selectedMethod === IS_GUIDE ? (
          <AddGuideFirstKr
            objInfo={objInfo}
            clickedCard={clickedCard}
            handleClickPlusCard={handleClickPlusCard}
            handleClickCloseBtn={handleClickCloseBtn}
            krListInfo={krListInfo}
            setKrListInfo={setKrListInfo}
          />
        ) : (
          <AddKr
            objInfo={objInfo}
            clickedCard={clickedCard}
            handleClickPlusCard={handleClickPlusCard}
            handleClickCloseBtn={handleClickCloseBtn}
            krListInfo={krListInfo}
            setKrListInfo={setKrListInfo}
          />
        );
      case 5:
        //step 5 - 가이드에 따라 설정 두번째 Kr 카드(KR 추가)
        return (
          <AddGuideSecondKr
            objInfo={objInfo}
            clickedCard={clickedCard}
            handleClickPlusCard={handleClickPlusCard}
            handleClickCloseBtn={handleClickCloseBtn}
            krListInfo={krListInfo}
            setKrListInfo={setKrListInfo}
          />
        );
      case 6:
        //step 6 - preview Okr
        return (
          <PreviewOkr
            selectedMethod={selectedMethod}
            setStep={setStep}
            objInfo={objInfo}
            krListInfo={krListInfo.filter((kr) => kr.krTitle)}
          />
        );
      default:
        return <Error />;
    }
  };

  // 스텝에 따라 검증
  useEffect(() => {
    validNextStep();
  }, [step, objInfo, krListInfo, clickedCard]);

  return (
    <>
      {selectedMethod && step <= 5 ? (
        <section css={AddOkrContainer}>
          <StSelectedMethodTxt>{selectedMethod}</StSelectedMethodTxt>
          {renderStepLayout()}
          <>
            <StepBtns
              isInit={step === 1}
              isActiveNext={isActiveNext}
              handleClickPrev={handleClickPrevBtn}
              handleClickNext={handleClickNextBtn}
            />
            <StProgressBarBox $step={step} $selectedMethod={selectedMethod}>
              <ProgressBar
                currentProgress={step}
                maximumProgress={selectedMethod === IS_GUIDE ? MAX_GUIDE_STEP : MAX_BASIC_STEP}
              />
              <div css={ProgressTxtBox}>
                <StProgressTxt>{`${step}/${
                  selectedMethod === IS_GUIDE ? MAX_GUIDE_STEP : MAX_BASIC_STEP
                }`}</StProgressTxt>
              </div>
            </StProgressBarBox>
          </>
        </section>
      ) : (
        // step > 6, 즉 preview-okr에서는 페이지 정렬 다르게
        renderStepLayout()
      )}
    </>
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

const StSelectedMethodTxt = styled.p`
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
    case 5:
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
