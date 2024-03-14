import Modal from '@components/Modal';
import ConfirmModalTemplate from '@components/Modal/template/ConfirmModalTemplate';
import { IConfirmModalProps } from '@type/modal/confirmModalTypes';

const DEL_KR_STR = {
  TITLE: 'KR 삭제하기',
  DESCRIPTION: '해당 KR을 삭제하시겠습니까?\nTasks 또한 삭제되며, 삭제된 내용은 복구 불가능합니다',
  CANCEL_TXT: '취소',
  CONFIRM_TXT: '삭제',
};

const { TITLE, DESCRIPTION, CANCEL_TXT, CONFIRM_TXT } = DEL_KR_STR;

const DeleteKrModal = ({ modalRef, modalConfirmHandler }: IConfirmModalProps) => {
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

export default DeleteKrModal;
