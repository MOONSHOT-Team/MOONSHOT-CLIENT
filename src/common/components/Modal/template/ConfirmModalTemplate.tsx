import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { MutableRefObject } from 'react';

interface IConfirmModalTemplateProps {
  modalRef: MutableRefObject<HTMLDialogElement | null>;
  title: string;
  description: string;
  cancelState: { text: string; onClick?: () => void };
  confirmState: { text: string; onClick?: () => void };
}

const ConfirmModalTemplate = ({
  modalRef,
  title,
  description,
  cancelState,
  confirmState,
}: IConfirmModalTemplateProps) => {
  const classNameForGA =
    title === 'KR 삭제하기' ? 'delKR_edit' : title === 'Task 삭제하기' ? 'deltask_edit' : '';

  // cancel function
  const handleClickCancel = () => {
    cancelState.onClick && cancelState.onClick();

    modalRef.current?.close();
  };

  // confirm function
  const handleClickConfirm = () => {
    confirmState.onClick && confirmState.onClick();
    modalRef.current?.close();
  };

  return (
    <StConfirmModalTemplateWrapper>
      <div css={ConfirmTextContainer}>
        <StConfirmModalTitle>{title}</StConfirmModalTitle>
        <StConfirmModalDescription>{description}</StConfirmModalDescription>
      </div>
      <div css={ConfirmBtnContainer}>
        <StCancelBtn type="button" onClick={handleClickCancel}>
          {cancelState.text}
        </StCancelBtn>

        <StConfirmBtn onClick={handleClickConfirm} className={classNameForGA}>
          {confirmState.text}
        </StConfirmBtn>
      </div>
    </StConfirmModalTemplateWrapper>
  );
};

export default ConfirmModalTemplate;

const StConfirmModalTemplateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  align-items: center;
  justify-content: center;
  width: 40rem;
  height: 18.8rem;
  padding: 2.4rem;
  background-color: ${({ theme }) => theme.colors.gray_550};
  border-radius: 10px;
`;
// 텍스트 영역 스타일
const StConfirmModalTitle = styled.p`
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.title_16_semibold};
`;

const StConfirmModalDescription = styled.p`
  color: ${({ theme }) => theme.colors.gray_200};
  white-space: pre-wrap;

  ${({ theme }) => theme.fonts.body_14_medium};
`;

const ConfirmTextContainer = css`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  text-align: center;
`;

//버튼 영역 스타일
const ConfirmBtnContainer = css`
  display: flex;
  gap: 1.2rem;
`;

const StCommonBtnStyle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 17rem;
  height: 3.4rem;
  color: ${({ theme }) => theme.colors.gray_000};
  border-radius: 6px;

  &:focus {
    outline: none;
  }

  ${({ theme }) => theme.fonts.btn_14_semibold};
`;

const StCancelBtn = styled(StCommonBtnStyle)`
  background-color: ${({ theme }) => theme.colors.gray_450};
`;

const StConfirmBtn = styled(StCommonBtnStyle)`
  background-color: ${({ theme }) => theme.colors.main_darkpurple};
`;
