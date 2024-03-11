import Modal from '@components/Modal';
import ConfirmModalTemplate from '@components/Modal/template/ConfirmModalTemplate';

import { IObjConfirmModalProps } from '../../type/objConfirmModalTypes';

const DEL_OBJ_STR = {
  TITLE: '목표 삭제하기',
  DESCRIPTION: '정말 목표를 삭제하시겠습니까?\n삭제된 목표는 되돌릴 수 없습니다',
  CANCEL_TXT: '취소',
  CONFIRM_TXT: '삭제',
};

const { TITLE, DESCRIPTION, CANCEL_TXT, CONFIRM_TXT } = DEL_OBJ_STR;

const DeleteObjConfirmModal = ({ modalRef, modalConfirmHandler }: IObjConfirmModalProps) => {
  return (
    <Modal ref={modalRef}>
      <ConfirmModalTemplate
        modalRef={modalRef}
        title={TITLE}
        description={DESCRIPTION}
        cancelState={{
          text: CANCEL_TXT,
          onClick: modalConfirmHandler.handleClickCancel && modalConfirmHandler.handleClickCancel,
        }}
        confirmState={{
          text: CONFIRM_TXT,
          onClick: modalConfirmHandler.handleClickConfirm && modalConfirmHandler.handleClickConfirm,
        }}
      />
    </Modal>
  );
};

export default DeleteObjConfirmModal;
