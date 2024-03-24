import Modal from '@components/Modal';
import ConfirmModalTemplate from '@components/Modal/template/ConfirmModalTemplate';
import { IConfirmModalProps } from '@type/modal/confirmModalTypes';

const COMPLETE_OBJ_STR = {
  TITLE: '목표 완료하기',
  DESCRIPTION: '정말 목표를 완료하시겠습니까?\n완료된 목표는 히스토리에서 확인 가능합니다.',
  CANCEL_TXT: '취소',
  CONFIRM_TXT: '완료',
};

const { TITLE, DESCRIPTION, CANCEL_TXT, CONFIRM_TXT } = COMPLETE_OBJ_STR;

const CompleteObjConfirmModal = ({ modalRef, modalConfirmHandler }: IConfirmModalProps) => {
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

export default CompleteObjConfirmModal;
