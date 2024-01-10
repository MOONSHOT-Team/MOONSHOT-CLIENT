import Modal from '@components/Modal';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import useModal from '@hooks/useModal';
import { useState } from 'react';

const DrawerModal = () => {
  const [year, setYear] = useState<number | undefined>(undefined);
  const [month, setMonth] = useState<number | undefined>(undefined);
  const [day, setDay] = useState<number | undefined>(undefined);

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
            <YearInput
              value={year}
              type="number"
              placeholder="2024"
              onChange={(e) => {
                setYear(Number(e.target.value));
              }}
            />
            <span>년</span>
            <DateInput
              value={month}
              type="number"
              placeholder="01"
              onChange={(e) => {
                setMonth(Number(e.target.value));
              }}
            />
            <span>월</span>
            <DateInput
              value={day}
              type="number"
              placeholder="09"
              onChange={(e) => {
                setDay(Number(e.target.value));
              }}
            />
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

  display: flex;
  gap: 0.6rem;
  align-items: center;
  justify-content: center;
  margin-bottom: 8.8rem;
  color: ${({ theme }) => theme.colors.gray_400};
`;

const InputStyle = styled.input`
  height: 3.2rem;
  padding: 0 0.2rem;
  color: ${({ theme }) => theme.colors.gray_000};
  text-align: center;
  border-bottom: 1px solid
    ${({ theme, value }) => (value !== undefined ? theme.colors.gray_000 : theme.colors.gray_400)};

  &:focus {
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray_000};
  }
`;

const YearInput = styled(InputStyle)`
  width: 5.4rem;
`;

const DateInput = styled(InputStyle)`
  width: 3.5rem;
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
