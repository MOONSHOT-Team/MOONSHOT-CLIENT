import { MutableRefObject } from 'react';

export interface IConfirmModalProps {
  modalRef: MutableRefObject<HTMLDialogElement | null>;
  modalConfirmHandler: {
    handleClickCancel?: () => void;
    handleClickConfirm?: () => Promise<void> | void;
  };
}
