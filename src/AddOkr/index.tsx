import Error from '@components/Error';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import PreviewOkr from '../PreviewOkr/PreviewOkr';
import AddOkrPageLayout from './components/AddOkrPageLayout';
import AddGuideFirstKr from './components/stepLayout/AddGuideFirstKr';
import AddGuideSecondKr from './components/stepLayout/AddGuideSecondKr';
import AddKr from './components/stepLayout/AddKr';
import ObjContent from './components/stepLayout/ObjContent';
import ObjPeriod from './components/stepLayout/ObjPeriod';
import ObjTitleCateg from './components/stepLayout/ObjTitleCateg';
import { OBJ_START_AT } from './constants/ADD_OKR_DATES';
import { IS_GUIDE } from './constants/ADD_OKR_METHOD_N_STEP';
import { IKrListInfoTypes } from './types/KrInfoTypes';

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

const AddOkr = () => {
  const location = useLocation();

  const selectedMethod = location.state.selectedMethod ?? null;

  // step 관리 값
  const [step, setStep] = useState(1);
  //이전, 다음 버튼 관리 값
  const [isActiveNext, setIsActiveNext] = useState(false);

  const [objInfo, setObjInfo] = useState(resetObjInfoState);
  const { objTitle, objCategory, objContent, objStartAt, objExpireAt } = objInfo;

  const [krListInfo, setKrListInfo] = useState<IKrListInfoTypes[]>(resetKrListInfo);

  // Step 2 ObjPeriod- 선택된 기간 버튼 관리 값
  const [selectedPeriod, setSelectedPeriod] = useState('');

  // step 4 - kr 카드 선택 여부 관리
  const [clickedCard, setClickedCard] = useState<number[]>([0]);

  const handleMoveStep = (targetStep: (prev: number) => number) => {
    setStep(targetStep);
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

  if (!location.state.selectedMethod) {
    return <Error />;
  }

  return (
    <AddOkrPageLayout
      isActiveNext={isActiveNext}
      selectedMethod={selectedMethod}
      step={step}
      onMoveStep={handleMoveStep}
    >
      {renderStepLayout()}
    </AddOkrPageLayout>
  );
};

export default AddOkr;
