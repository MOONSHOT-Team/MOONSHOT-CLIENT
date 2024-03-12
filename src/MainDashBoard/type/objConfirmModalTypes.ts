import { MutableRefObject } from 'react';

export interface IObjConfirmModalProps {
  modalRef: MutableRefObject<HTMLDialogElement | null>;
  modalConfirmHandler: {
    handleClickCancel?: () => void;
    handleClickConfirm?: () => Promise<void> | void;
  };
}
