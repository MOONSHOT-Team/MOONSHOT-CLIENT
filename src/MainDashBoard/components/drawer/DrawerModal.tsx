import Modal from '@components/Modal';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import useModal from '@hooks/useModal';

const DrawerModal = () => {
  const { modalRef, handleShowModal } = useModal();

  return (
    <>
      <button style={{ color: 'red' }} type="button" onClick={handleShowModal}>
        CLICK ME!!
      </button>
      <Modal ref={modalRef}>
        <div css={modalContainer}>
          <StMainText>
            <p>해당 목표의 달성 기간이 종료되었습니다.</p>
            <p>더 도전하기 위해 기간을 연장할까요?</p>
          </StMainText>
          <StSubText>완료된 목표에 대한 내용은 히스토리에서 확인 가능해요.</StSubText>
          <StDateContainer>
            <input css={inputStyle} type="number" placeholder="2024" />
            <span>년</span>
            <input css={inputStyle} type="number" placeholder="01" />
            <span>월</span>
            <input css={inputStyle} type="number" placeholder="09" />
            <span>일</span>
          </StDateContainer>
          <div css={buttonStyle}>
            <form method="dialog">
              <StCompleteButton type="button">목표 완료하기</StCompleteButton>
            </form>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <StExtendButton type="submit">기간 연장하기</StExtendButton>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DrawerModal;

const modalContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 0 5.4rem;
`;

const inputStyle = css`
  width: 7rem;
  height: 3.2rem;
  text-align: center;
  border-bottom: 1px solid currentcolor;
`;

const buttonStyle = css`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  justify-content: center;
`;

const StMainText = styled.p`
  ${({ theme }) => theme.fonts.title_20_semibold};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.gray_000};
`;

const StSubText = styled.p`
  ${({ theme }) => theme.fonts.body_14_regular};

  margin-bottom: 7.4rem;
  color: ${({ theme }) => theme.colors.gray_150};
`;

const StDateContainer = styled.div`
  ${({ theme }) => theme.fonts.title_20_semibold};

  margin-bottom: 8.8rem;
  color: ${({ theme }) => theme.colors.gray_400};
`;

const StModalButton = styled.button`
  ${({ theme }) => theme.fonts.btn_14_semibold};

  display: flex;
  align-items: center;
  justify-content: center;
  width: 17.8rem;
  height: 3.4rem;
  color: ${({ theme }) => theme.colors.gray_000};
  border-radius: 6px;
`;

const StCompleteButton = styled(StModalButton)`
  background-color: ${({ theme }) => theme.colors.gray_450};
`;

const StExtendButton = styled(StModalButton)`
  background-color: ${({ theme }) => theme.colors.main_darkpurple};
`;
