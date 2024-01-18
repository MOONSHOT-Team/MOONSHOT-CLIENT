import Modal from '@components/Modal';
import OkrTreeTemplate from '@components/okrTree/template/OkrTreeTemplate';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import useModal from '@hooks/useModal';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { IKrListInfoTypes } from '../AddOkr/types/KrInfoTypes';
import { IPreviewTaskInfoTypes } from '../AddOkr/types/TaskInfoTypes';
import PreviewModal from './components/PreviewModal';
import PreviewOkrAlertMsg from './components/PreviewOkrAlertMsg';
import { PreviewKrNodes } from './components/PreviewOkrTreeNodes/PreviewKrNodes';
import PreviewObjNode from './components/PreviewOkrTreeNodes/PreviewObjNode';
import { PreviewTaskNodes } from './components/PreviewOkrTreeNodes/PreviewTaskNodes';

const PreviewOkr = () => {
  const location = useLocation();

  const { modalRef, handleShowModal } = useModal();

  const { selectedMethod, objInfo, krListInfo } = location.state;
  const [previewObjValue, setPreviewObjValue] = useState(objInfo.objTitle);

  const [previewKrListInfo, setPreviewKrListInfo] = useState<IKrListInfoTypes[]>(krListInfo);
  const [previewTaskListInfo, setPreviewTaskListInfo] = useState<IPreviewTaskInfoTypes[]>([
    {
      krIdx: 0,
      taskList: [
        {
          title: '',
          idx: 0,
        },
        {
          title: '',
          idx: 1,
        },
        {
          title: '',
          idx: 2,
        },
      ],
    },
    {
      krIdx: 1,
      taskList: [
        {
          title: '',
          idx: 0,
        },
        {
          title: '',
          idx: 1,
        },
        {
          title: '',
          idx: 2,
        },
      ],
    },
    {
      krIdx: 2,
      taskList: [
        {
          title: '',
          idx: 0,
        },
        {
          title: '',
          idx: 1,
        },
        {
          title: '',
          idx: 2,
        },
      ],
    },
  ]);

  const handleClickSaveOkrBtn = () => {
    console.log('여기서 okr 생성 post api 한 번에 통신 예쩡');
    console.log(objInfo, 'objInfo');
    console.log(previewKrListInfo, 'krList');
    console.log(previewTaskListInfo, 'taskList');
  };

  const handlechangeObjTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPreviewObjValue(e.target.value);
  };

  useEffect(() => {
    console.log(location.state, '!!!');
    location.state && handleShowModal();
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
                handleChangeObjValue={handlechangeObjTextArea}
              />
            )}
            keyResultList={krListInfo}
            KrNodes={(krIdx) => (
              <PreviewKrNodes
                krIdx={krIdx}
                previewKrListInfo={previewKrListInfo}
                setPreviewKrListInfo={setPreviewKrListInfo}
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

        <StSaveOkrBtn type="button" onClick={handleClickSaveOkrBtn}>
          저장하기
        </StSaveOkrBtn>
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
  height: 100%;
`;

const okrTreeDiv = css`
  display: flex;
  align-self: flex-start;
  padding-left: 26.9rem;
`;

const StSaveOkrBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 17.8rem;
  height: 3.4rem;
  margin-bottom: 4.6rem;
  color: ${({ theme }) => theme.colors.gray_650};
  background: ${({ theme }) => theme.colors.gray_100};
  border-radius: 6px;

  ${({ theme }) => theme.fonts.btn_14_semibold};
`;
