import instance from '@apis/instance';
import Modal from '@components/Modal';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import type { ComponentProps, FocusEvent, ForwardedRef, RefObject } from 'react';
import { useId, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { validateDate } from '../../utils/validateDate';

interface IModalInputProps extends ComponentProps<'input'> {
  isActive: boolean;
  label: string;
}

/** 날짜 입력 받는 인풋창 */
const ModalInput = ({ isActive, label, ...props }: IModalInputProps) => {
  const uniqueId = useId();
  const { name, value, placeholder, maxLength, onChange, onBlur } = props;
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
const DrawerModal = ({
  currentObjId,
  modalRef,
  handleChangeState,
  objExpireAt,
}: {
  currentObjId: number;
  modalRef: ForwardedRef<HTMLDialogElement>;
  handleChangeState: (state: number) => void;
  objExpireAt: string;
}) => {
  const [activeExtend, setActiveExtend] = useState(false);
  const [isValidInput, setIsValidInput] = useState('');
  const [dateState, dispatchDate] = useReducer(dateReducer, {
    year: objExpireAt.slice(0, 4),
    month: objExpireAt.slice(5, 7),
    day: objExpireAt.slice(8, 10),
  });
  const { year, month, day } = dateState;

  const navigate = useNavigate();
  const ref = modalRef as RefObject<HTMLDialogElement>;

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

    const isProperValue = validateDate(year, month, day);

    isProperValue ? setIsValidInput('') : setIsValidInput('올바른 날짜를 입력해 주세요.');

    const response = await instance.patch('/v1/objective', {
      objectiveId: currentObjId,
      isClosed: false,
      expireAt: `${year}-${month}-${day}`,
    });
    console.log(response);
    if (response.status === 204) {
      console.log('204');
      handleChangeState?.(0);
    }
  };

  const handleComplete = async () => {
    await instance.patch('/v1/objective', {
      objectiveId: currentObjId,
      isClosed: true,
    });
    //목표 완료 -> 대시보드
    navigate('/history');
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
            ref.current?.close();
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
