import Modal from '@components/Modal';
import ConfirmModalTemplate from '@components/Modal/template/ConfirmModalTemplate';
import { MutableRefObject } from 'react';

const COMPLETE_OBJ_STR = {
  TITLE: '목표 완료하기',
  DESCRIPTION: '정말 목표를 완료하시겠습니까?\n완료된 목표는 히스토리에서 확인 가능합니다.',
  CANCEL_TXT: '취소',
  CONFIRM_TXT: '완료',
};

const { TITLE, DESCRIPTION, CANCEL_TXT, CONFIRM_TXT } = COMPLETE_OBJ_STR;

const CompleteObjConfirmModal = ({
  modalRef,
}: {
  modalRef: MutableRefObject<HTMLDialogElement | null>;
}) => {
  return (
    <Modal ref={modalRef}>
      <ConfirmModalTemplate
        title={TITLE}
        description={DESCRIPTION}
        cancelState={{ text: CANCEL_TXT, handleClickCancel: () => console.log('취소') }}
        confirmState={{ text: CONFIRM_TXT, handleClickConfirm: () => console.log('확인') }}
      />
    </Modal>
  );
};

export default CompleteObjConfirmModal;
