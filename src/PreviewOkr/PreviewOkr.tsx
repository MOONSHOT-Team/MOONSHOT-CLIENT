import Modal from '@components/Modal';
import OkrTreeTemplate from '@components/okrTree/template/OkrTreeTemplate';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import useModal from '@hooks/useModal';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { IS_GUIDE } from '../AddOkr/constants/ADD_OKR_METHOD_N_STEP';
import { MAX_KR_TITLE, MAX_OBJ_TITLE } from '../AddOkr/constants/OKR_MAX_LENGTH';
import { IFinalOkrListInfoTypes } from '../AddOkr/types/FinalKrListInfo';
import { IKrListInfoTypes } from '../AddOkr/types/KrInfoTypes';
import { IObjInfoTypes } from '../AddOkr/types/ObjectInfoTypes';
import { IPreviewTaskInfoTypes } from '../AddOkr/types/TaskInfoTypes';
import { postOkrInfo } from './apis/postOkrFetcher';
import PreviewModal from './components/PreviewModal';
import PreviewOkrAlertMsg from './components/PreviewOkrAlertMsg';
import { PreviewKrNodes } from './components/PreviewOkrTreeNodes/PreviewKrNodes';
import PreviewObjNode from './components/PreviewOkrTreeNodes/PreviewObjNode';
import { PreviewTaskNodes } from './components/PreviewOkrTreeNodes/PreviewTaskNodes';

interface IPreviewOkrProps {
  selectedMethod: string;
  setStep: Dispatch<SetStateAction<number>>;
  objInfo: IObjInfoTypes;
  krListInfo: IKrListInfoTypes[];
}

//TODO: PreviewOkr이 AddOkr에 병합 되었으므로, 폴더 구조 변동 필요
const PreviewOkr = ({ selectedMethod, setStep, objInfo, krListInfo }: IPreviewOkrProps) => {
  const selectedMethodId = localStorage.getItem('selectedMethod');
  const classNameForGA =
    selectedMethodId === '직접 설정하기'
      ? 'addOKR_brief'
      : selectedMethodId === '가이드에 따라 설정하기'
        ? 'addOKR_guide'
        : '';
  // const location = useLocation();
  const navigate = useNavigate();

  // const { step, selectedMethod, objInfo, krListInfo } = location.state;

  const { modalRef, handleShowModal } = useModal();

  // '저장하기' 버튼 활성화 비활성화 관리
  const [isActiveSave, setIsActiveSave] = useState(true);
  // o, kr, task 값 입력 관리
  const [previewObjValue, setPreviewObjValue] = useState(objInfo.objTitle);
  const [previewKrListInfo, setPreviewKrListInfo] = useState<IKrListInfoTypes[]>(krListInfo);
  //preview에서의 taskInfo 기본 값
  const resetPreviewTaskList = [0, 1, 2].map((idx) => {
    return {
      krIdx: idx,
      taskList: [
        {
          taskTitle: '',
          taskIdx: 0,
        },
        {
          taskTitle: '',
          taskIdx: 1,
        },
        {
          taskTitle: '',
          taskIdx: 2,
        },
      ],
    };
  });
  const [previewTaskListInfo, setPreviewTaskListInfo] =
    useState<IPreviewTaskInfoTypes[]>(resetPreviewTaskList);

  const handleClickPrevBtn = () => {
    setStep((prev) => prev - (selectedMethod === IS_GUIDE ? 1 : 2));
  };

  const handleClickSaveOkrBtn = async () => {
    if (!isActiveSave) return;

    const { objStartAt, objExpireAt } = objInfo;

    const finalOkrInfo: IFinalOkrListInfoTypes = {
      ...objInfo,
      objTitle: previewObjValue,
      objStartAt: objStartAt.split('. ').join('-'),
      objExpireAt: objExpireAt.split('. ').join('-'),
      krList: [0, 1, 2].map((idx) => {
        return (
          previewKrListInfo[idx] && {
            ...previewKrListInfo[idx],
            krTarget: Number(previewKrListInfo[idx].krTarget.toString().split(',').join('')),
            krStartAt: previewKrListInfo[idx].krStartAt.split('. ').join('-'),
            krExpireAt: previewKrListInfo[idx].krExpireAt.split('. ').join('-'),
            taskList: previewTaskListInfo[idx].taskList,
          }
        );
      }),
    };

    try {
      const res = await postOkrInfo('/v1/objective', finalOkrInfo);
      if (res.data.status.toString().startsWith('40')) alert('OKR 생성에 실패했습니다');
      if (res) navigate('/dashboard');
    } catch {
      navigate('/error');
    }
  };

  // o, kr 값이 빈 값일 때 저장하기 비활성화를 위한 검증 함수
  const validEmptyValue = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    e.target.value === '' ? setIsActiveSave(false) : setIsActiveSave(true);
  };

  const handleChangeObjTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    validEmptyValue(e);

    if (e.target.value.length > MAX_OBJ_TITLE)
      e.target.value = e.target.value.slice(0, MAX_KR_TITLE);
    setPreviewObjValue(e.target.value);
  };

  const handleChangeKrTitleValue = (e: React.ChangeEvent<HTMLInputElement>, krIdx: number) => {
    validEmptyValue(e);

    if (e.target.value.length > MAX_KR_TITLE)
      e.target.value = e.target.value.slice(0, MAX_KR_TITLE);

    previewKrListInfo[krIdx].krTitle = e.target.value;
    setPreviewKrListInfo([...previewKrListInfo]);
  };

  useEffect(() => {
    handleShowModal();
  }, []);

  return (
    // O 노드<의 위치 고정을 위해 트리 가져올때 항상 상위 요소에 높이 값(100vh or 100%), 세로 가운데 정렬해야함 !
    <>
      <Modal ref={modalRef}>
        <PreviewModal selectedMethod={selectedMethod} />
      </Modal>
      <section css={previewOkrContainer}>
        <PreviewOkrAlertMsg />

        <div css={okrTreeDiv}>
          <OkrTreeTemplate
            ObjNode={() => (
              <PreviewObjNode
                objValue={previewObjValue}
                handleChangeObjValue={handleChangeObjTextArea}
              />
            )}
            keyResultList={krListInfo}
            KrNodes={(krIdx) => (
              <PreviewKrNodes
                krIdx={krIdx}
                handleChangeKrTitleValue={handleChangeKrTitleValue}
                previewKrListInfo={previewKrListInfo}
              />
            )}
            TaskNodes={(isFirstChild, krIdx, taskIdx) => (
              <PreviewTaskNodes
                isFirstChild={isFirstChild}
                krIdx={krIdx}
                taskIdx={taskIdx}
                previewTaskListInfo={previewTaskListInfo}
                setPreviewTaskListInfo={setPreviewTaskListInfo}
              />
            )}
          />
        </div>

        <StBtnWrapper>
          <StPrevBtn type="button" onClick={handleClickPrevBtn}>
            이전으로
          </StPrevBtn>
          <StSaveBtn
            type="button"
            onClick={handleClickSaveOkrBtn}
            $isActiveSave={isActiveSave}
            className={classNameForGA}
          >
            저장하기
          </StSaveBtn>
        </StBtnWrapper>
      </section>
    </>
  );
};

export default PreviewOkr;

const previewOkrContainer = css`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 7.6rem);
  padding: 0;
  margin-top: 7.6rem;
`;

const okrTreeDiv = css`
  display: flex;
  align-self: flex-start;
  height: calc(100vh - 7.6rem);
  padding-left: 26.9rem;
  margin-bottom: 8rem;
`;

const StBtnWrapper = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  gap: 1.2rem;
  width: fit-content;
  margin-bottom: 4.6rem;
`;

const StPrevBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 17.8rem;
  height: 3.4rem;
  color: ${({ theme }) => theme.colors.gray_000};
  background: ${({ theme }) => theme.colors.gray_550};
  border-radius: 6px;

  ${({ theme }) => theme.fonts.btn_14_semibold};
`;

const StSaveBtn = styled(StPrevBtn)<{ $isActiveSave: boolean }>`
  color: ${({ theme, $isActiveSave }) => $isActiveSave && theme.colors.gray_650};
  background-color: ${({ theme, $isActiveSave }) => $isActiveSave && theme.colors.gray_100};

  ${({ theme }) => theme.fonts.btn_14_semibold};
`;
