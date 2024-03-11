import Modal from '@components/Modal';
import ConfirmModalTemplate from '@components/Modal/template/ConfirmModalTemplate';
import { MutableRefObject } from 'react';

const DEL_OBJ_STR = {
  TITLE: '목표 삭제하기',
  DESCRIPTION: '정말 목표를 삭제하시겠습니까?\n삭제된 목표는 되돌릴 수 없습니다',
  CANCEL_TXT: '취소',
  CONFIRM_TXT: '삭제',
};

const { TITLE, DESCRIPTION, CANCEL_TXT, CONFIRM_TXT } = DEL_OBJ_STR;

const DeleteObjConfirmModal = ({
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

export default DeleteObjConfirmModal;
