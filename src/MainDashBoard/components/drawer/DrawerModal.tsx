import instance from '@apis/instance';
import Modal from '@components/Modal';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import useModal from '@hooks/useModal';
import type { ComponentProps, FocusEvent } from 'react';
import { useId, useReducer, useState } from 'react';

interface IModalInputProps extends ComponentProps<'input'> {
  isActive: boolean;
  label: string;
}

/** 날짜 입력 받는 인풋창 */
const ModalInput = ({ isActive, label, ...props }: IModalInputProps) => {
  const uniqueId = useId();
  const { name, value, defaultValue, placeholder, maxLength, onChange, onBlur } = props;
  const isYear = placeholder?.length === 4;
  const InputComponent = isYear ? YearInput : DateInput;

  return (
    <>
      <InputComponent
        required
        autoComplete="off"
        id={uniqueId}
        $activeExtend={isActive}
        disabled={!isActive}
        name={name}
        value={value}
        defaultValue={defaultValue}
        type="text"
        placeholder={placeholder}
        maxLength={maxLength}
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
  if (isNaN(Number(action.value))) return { year: state.year, month: state.month, day: state.day };

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
      return { year: state.year, month: state.month, day: state.day };
  }
};

/** Drawer Modal 창 */
const DrawerModal = () => {
  const [activeExtend, setActiveExtend] = useState(false);
  const [isValidInput, setIsValidInput] = useState('');
  const [dateState, dispatchDate] = useReducer(dateReducer, {
    year: '2024',
    month: '01',
    day: '09',
  });
  const { year, month, day } = dateState;

  const { modalRef, handleShowModal } = useModal();

  const isSave = isValidInput === '' && year !== '' && month !== '' && day !== '';

  /** 월, 일 한 자리 입력 시 두 자리 수로 변환 */
  const handleMakeTwoDigits = (e: FocusEvent<HTMLInputElement, Element>) => {
    setIsValidInput('');

    const isMonth = e.target.name === 'month';

    if (e.target.value.length === 1) {
      isMonth
        ? dispatchDate({ type: 'INPUT_MONTH', value: `0${e.target.value}` })
        : dispatchDate({ type: 'INPUT_DAY', value: `0${e.target.value}` });
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const dateFormat = `${year}-${month}-${day}`;
    const inputDate = new Date(dateFormat);
    const todayDate = new Date();

    // 오늘 날짜 전 날짜 입력 금지
    if (inputDate < todayDate) return setIsValidInput('올바른 날짜를 입력해 주세요.');

    // 입력값 길이 제한
    if (year.length !== 4 || month.length !== 2 || day.length !== 2)
      return setIsValidInput('올바른 날짜를 입력해 주세요.');

    // 입력값 범위 제한
    if (
      Number(year) > 2100 &&
      Number(month) < 1 &&
      Number(month) > 12 &&
      Number(day) < 1 &&
      Number(day) > 31
    )
      return setIsValidInput('올바른 날짜를 입력해 주세요.');

    // 입력 달에 따른 일 수 제한
    const maxDay = ['04', '06', '09', '11'].includes(month!) // 30일
      ? 30
      : ['01', '03', '05', '07', '08', '10', '12'].includes(month!) // 31일
        ? 31
        : (Number(year) % 4 == 0 && Number(year) % 100 != 0) || Number(year) % 400 == 0 // 윤년
          ? 29
          : 28; // 윤년 아닌 2월

    if (day && Number(day) > maxDay) return setIsValidInput('올바른 날짜를 입력해 주세요.');

    await instance.patch('/v1/objective', {
      objectiveId: 1,
      isClosed: false,
      expireAt: dateFormat,
    });
  };

  const handleComplete = async () => {
    await instance.patch('/v1/objective', {
      objectiveId: 1,
      isClosed: true,
    });
  };

  /** 모달창 첫 화면 버튼 */
  const renderExtendButton = () => {
    return (
      <>
        <StCompleteButton type="button" onClick={handleComplete}>
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
    );
  };

  /** 기간 연장하기 버튼 클릭 시 대체되는 버튼 */
  const renderSaveButton = () => {
    return (
      <>
        <StCompleteButton
          type="button"
          onClick={() => {
            modalRef.current?.close();
            setActiveExtend(false);
            setIsValidInput('');
          }}
        >
          취소하기
        </StCompleteButton>
        <StExtendButton type="submit" disabled={!isSave} onClick={handleSubmit}>
          저장하기
        </StExtendButton>
      </>
    );
  };

  return (
    <>
      <button style={{ color: 'red' }} type="button" onClick={handleShowModal}>
        CLICK ME!!
      </button>
      <Modal ref={modalRef}>
        <div css={modalForm}>
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
              maxLength={4}
              onChange={(e) => {
                dispatchDate({ type: 'INPUT_YEAR', value: e.target.value });
                setIsValidInput('');
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
              maxLength={2}
              onChange={(e) => {
                e.preventDefault();
                dispatchDate({ type: 'INPUT_MONTH', value: e.target.value });
                setIsValidInput('');
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
              maxLength={2}
              onChange={(e) => {
                e.preventDefault();
                dispatchDate({ type: 'INPUT_DAY', value: e.target.value });
                setIsValidInput('');
              }}
              onBlur={handleMakeTwoDigits}
            />
            {isValidInput !== '' && <ErrorText>{isValidInput}</ErrorText>}
          </StDateContainer>
          <div css={buttonStyle}>{!activeExtend ? renderExtendButton() : renderSaveButton()}</div>
        </div>
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
