import Modal from '@components/Modal';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import useModal from '@hooks/useModal';
import { ComponentProps, FocusEvent, FormEvent, useId, useReducer, useState } from 'react';

interface IModalInputProps extends ComponentProps<'input'> {
  isActive: boolean;
  label: string;
}

/** 날짜 입력 받는 인풋창 */
const ModalInput = ({ isActive, label, ...props }: IModalInputProps) => {
  const uniqueId = useId();
  const isYear = props.placeholder?.length === 4;
  const InputComponent = isYear ? YearInput : DateInput;
  const { name, value, defaultValue, placeholder, pattern, maxLength, title, onChange, onBlur } =
    props;

  return (
    <>
      <InputComponent
        required
        id={uniqueId}
        $activeExtend={isActive}
        disabled={!isActive}
        name={name}
        value={value}
        defaultValue={defaultValue}
        type="text"
        placeholder={placeholder}
        pattern={pattern}
        maxLength={maxLength}
        title={title}
        onChange={onChange}
        onBlur={onBlur}
      />
      <label htmlFor={uniqueId}>{label}</label>
    </>
  );
};

type dateStateType = {
  year: string;
  month: string;
  day: string;
};

type actionType = {
  type: string;
  value: string;
};

const dateReducer = (state: dateStateType, action: actionType): dateStateType => {
  switch (action.type) {
    case 'INPUT_YEAR': {
      return { year: action.value, month: state.month, day: state.day };
    }
    case 'INPUT_MONTH': {
      return { year: state.year, month: action.value, day: state.day };
    }
    case 'INPUT_DAY': {
      return { year: state.year, month: state.month, day: action.value };
    }
    default:
      throw Error;
  }
};

/** Drawer Modal 창 */
const DrawerModal = () => {
  const [activeExtend, setActiveExtend] = useState(false);
  const [isValidInput, setIsValidInput] = useState(true);
  const [isError] = useState(true);
  const [dateState, dispatchDate] = useReducer(dateReducer, {
    year: '2024',
    month: '01',
    day: '09',
  });
  const { year, month, day } = dateState;

  const { modalRef, handleShowModal } = useModal();

  const isSave = isValidInput && year !== '' && month !== '' && day !== '';

  const handleMakeTwoDigits = (e: FocusEvent<HTMLInputElement, Element>) => {
    setIsValidInput(true);

    const isMonth = e.target.name === 'month';
    const maxDay = month === '02' ? 29 : ['04', '06', '09', '11'].includes(month!) ? 30 : 31;

    if (day && Number(day) > maxDay) {
      setIsValidInput(false);
    }

    if (e.target.value.length === 1) {
      isMonth
        ? dispatchDate({ type: 'INPUT_MONTH', value: `0${e.target.value}` })
        : dispatchDate({ type: 'INPUT_DAY', value: `0${e.target.value}` });
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 날짜 수정 API 붙이기
  };

  return (
    <>
      <button style={{ color: 'red' }} type="button" onClick={handleShowModal}>
        CLICK ME!!
      </button>
      <Modal ref={modalRef}>
        <form css={modalForm} onSubmit={handleSubmit}>
          <StMainTextContainer>
            <p>해당 목표의 달성 기간이 종료되었습니다.</p>
            <p>더 도전하기 위해 기간을 연장할까요?</p>
          </StMainTextContainer>
          <StSubTextContainer>
            완료된 목표에 대한 내용은 히스토리에서 확인 가능해요.
          </StSubTextContainer>
          <StDateContainer>
            <ModalInput
              required
              label="년"
              isActive={activeExtend}
              disabled={!activeExtend}
              name="year"
              value={year}
              defaultValue="2024"
              type="text"
              placeholder="2024"
              pattern="^(19|20)\d{2}$"
              maxLength={4}
              title="유효한 숫자가 아닙니다."
              onChange={(e) => {
                dispatchDate({ type: 'INPUT_YEAR', value: e.target.value });
              }}
            />
            <ModalInput
              required
              label="월"
              isActive={activeExtend}
              disabled={!activeExtend}
              name="month"
              value={month}
              defaultValue="01"
              type="text"
              placeholder="01"
              pattern="^(0?[1-9]|1[012])$"
              maxLength={2}
              title="유효한 숫자가 아닙니다."
              onChange={(e) => {
                dispatchDate({ type: 'INPUT_MONTH', value: e.target.value });
              }}
              onBlur={handleMakeTwoDigits}
            />
            <ModalInput
              required
              label="일"
              isActive={activeExtend}
              disabled={!activeExtend}
              name="day"
              value={day}
              defaultValue="09"
              type="text"
              placeholder="09"
              pattern="^(0[1-9]|[12]\d|3[01])$"
              maxLength={2}
              title="유효한 숫자가 아닙니다."
              onChange={(e) => {
                dispatchDate({ type: 'INPUT_DAY', value: e.target.value });
              }}
              onBlur={handleMakeTwoDigits}
            />
            {isError && <ErrorText>올바른 날짜를 입력해 주세요.</ErrorText>}
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
                <StExtendButton type="submit" disabled={!isSave}>
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

const StMainTextContainer = styled.div`
  ${({ theme }) => theme.fonts.title_20_semibold};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.gray_000};
`;

const StSubTextContainer = styled.div`
  ${({ theme }) => theme.fonts.body_14_regular};

  margin-bottom: 7.4rem;
  color: ${({ theme }) => theme.colors.gray_150};
`;

const StDateContainer = styled.div`
  ${({ theme }) => theme.fonts.title_20_semibold};

  position: relative;
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

const ErrorText = styled.p`
  ${({ theme }) => theme.fonts.btn_14_medium};

  position: absolute;
  top: 6.2rem;
  left: 50%;
  width: 16rem;
  height: 1.4rem;
  color: ${({ theme }) => theme.colors.sub_lightred};
  transform: translateX(-50%);
`;

const StCompleteButton = styled(StModalButton)`
  background-color: ${({ theme }) => theme.colors.gray_450};
`;

const StExtendButton = styled(StModalButton)`
  background-color: ${({ theme }) => theme.colors.main_darkpurple};
`;
