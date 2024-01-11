import Modal from '@components/Modal';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import useModal from '@hooks/useModal';
import { ComponentProps, useId, useState } from 'react';

interface IModalInputProps extends ComponentProps<'input'> {
  isActive: boolean;
  label: string;
}

/** 날짜 입력 받는 인풋창 */
const ModalInput = ({ isActive, label, ...props }: IModalInputProps) => {
  const uniqueId = useId();
  const isYear = props.placeholder?.length === 4;
  const InputComponent = isYear ? YearInput : DateInput;

  return (
    <>
      <InputComponent
        required
        id={uniqueId}
        $activeExtend={isActive}
        disabled={!isActive}
        value={props.value}
        defaultValue={props.defaultValue}
        type="text"
        placeholder={props.placeholder}
        pattern={props.pattern}
        title={props.title}
        onChange={props.onChange}
      />
      <label htmlFor={uniqueId}>{label}</label>
    </>
  );
};

/** Drawer Modal 창 */
const DrawerModal = () => {
  const [activeExtend, setActiveExtend] = useState(false);
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
        <form css={modalForm}>
          <StMainText>
            <p>해당 목표의 달성 기간이 종료되었습니다.</p>
            <p>더 도전하기 위해 기간을 연장할까요?</p>
          </StMainText>
          <StSubText>완료된 목표에 대한 내용은 히스토리에서 확인 가능해요.</StSubText>
          <StDateContainer>
            <ModalInput
              required
              label="년"
              isActive={activeExtend}
              disabled={!activeExtend}
              value={year}
              defaultValue={2024}
              type="text"
              placeholder="2024"
              pattern="^[0-9]{4}$"
              title="숫자 4자리를 입력해 주세요."
              onChange={(e) => {
                setYear(Number(e.target.value));
              }}
            />
            <ModalInput
              required
              label="월"
              isActive={activeExtend}
              disabled={!activeExtend}
              value={month}
              defaultValue={1}
              type="text"
              placeholder="01"
              pattern="^[0-9]{2}$"
              title="숫자 2자리를 입력해 주세요."
              onChange={(e) => {
                setMonth(Number(e.target.value));
              }}
            />
            <ModalInput
              required
              label="일"
              isActive={activeExtend}
              disabled={!activeExtend}
              value={day}
              defaultValue={9}
              type="text"
              placeholder="09"
              pattern="^[0-9]{2}$"
              title="숫자 2자리를 입력해 주세요."
              onChange={(e) => {
                setDay(Number(e.target.value));
              }}
            />
          </StDateContainer>
          <div css={buttonStyle}>
            {!activeExtend && (
              <>
                <StCompleteButton
                  type="button"
                  onClick={() => {
                    // 해당 목표 히스토리로 이동시키기 + /history로 페이지 이동
                  }}
                >
                  목표 완료하기
                </StCompleteButton>
                <StExtendButton
                  type="button"
                  onClick={() => {
                    setActiveExtend(true);
                  }}
                >
                  기간 연장하기
                </StExtendButton>
              </>
            )}
            {activeExtend && (
              <>
                <StCompleteButton
                  type="button"
                  onClick={() => {
                    modalRef.current?.close();
                    setActiveExtend(false);
                  }}
                >
                  취소하기
                </StCompleteButton>
                <StExtendButton
                  type="submit"
                  onClick={() => {
                    // 목표 기한 수정 API
                  }}
                >
                  저장하기
                </StExtendButton>
              </>
            )}
          </div>
        </form>
      </Modal>
    </>
  );
};

export default DrawerModal;

const modalForm = css`
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

interface IInputStyleProps {
  $activeExtend: boolean;
}

const InputStyle = styled.input<IInputStyleProps>`
  height: 3.2rem;
  padding: 0 0.2rem;
  color: ${({ theme, $activeExtend }) =>
    $activeExtend ? theme.colors.gray_000 : theme.colors.gray_400};
  text-align: center;
  border-bottom: 1px solid currentcolor;
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
