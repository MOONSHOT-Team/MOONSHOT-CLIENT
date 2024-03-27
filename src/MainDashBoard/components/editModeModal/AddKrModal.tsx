import AddKrForm from '@components/addKr/AddKrForm';
import Modal from '@components/Modal';
import { KR_INPUT_DATA } from '@constants/addKr/KR_INPUT_DATA';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Dayjs } from 'dayjs';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { postAddKr } from '../../apis/fetcher';

const { INPUT_TITLE, INPUT_TARGET, INPUT_METRIC } = KR_INPUT_DATA.INPUT_NAME;

const KrModalFormStyle = {
  gap: '3.2rem',
  /* stylelint-disable */
  inputStyle: {
    longWidth: '40rem',
    shortWidth: '19.4rem',
    height: '3.6rem',
    shortGap: '1.2rem',
  },
};

interface IAddKrModalProps {
  modalRef: React.MutableRefObject<HTMLDialogElement | null>;
  objInfo: { objId: number; objStartAt: string; objExpireAt: string; objTitle: string };
  krIdx: number;
  mutateFcn: () => void;
}

const AddKrModal = ({ modalRef, objInfo, krIdx, mutateFcn }: IAddKrModalProps) => {
  const navigate = useNavigate();
  const { objStartAt, objExpireAt, objId } = objInfo;

  const [isValidMax, setIsValidMax] = useState<{ [key: string]: boolean }>({
    [INPUT_TITLE]: false,
    [INPUT_TARGET]: false,
    [INPUT_METRIC]: false,
  });
  const [newKrInfo, setNewKrInfo] = useState({
    krTitle: '',
    krStartAt: '',
    krExpireAt: '',
    krIdx: krIdx,
    krTarget: '',
    krMetric: '',
  });
  const [isShowCalender, setIsShowCalender] = useState(false);

  const handleChangeKrValues = (e: React.ChangeEvent<HTMLInputElement>, maxLength: number) => {
    const targetInputName = e.target.name;
    let parsedValue = e.target.value.replace(/[^-0-9]/g, '');
    let newValue;

    switch (targetInputName) {
      case INPUT_TARGET:
        if (parsedValue.length === maxLength + 1) {
          setIsValidMax({ ...isValidMax, [targetInputName]: true });
        }

        if (isValidMax[targetInputName]) {
          parsedValue = parsedValue.slice(0, maxLength);
          setIsValidMax({ ...isValidMax, [targetInputName]: false });
        }

        newValue = parsedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        break;

      default:
        if (e.target.value.length > maxLength) {
          setIsValidMax({ ...isValidMax, [targetInputName]: true });
        }

        if (isValidMax[targetInputName] === true) {
          e.target.value = e.target.value.slice(0, maxLength);
          setIsValidMax({ ...isValidMax, [targetInputName]: false });
        }

        newValue = e.target.value;

        break;
    }

    setNewKrInfo({ ...newKrInfo, [targetInputName]: newValue });
  };

  const handleClickKrPeriodBox = () => {
    // 날짜 기간을 입력한 경우 이벤트 전파 방지
    if (isShowCalender) return;
    setNewKrInfo({ ...newKrInfo, krStartAt: objStartAt, krExpireAt: objExpireAt });
    setIsShowCalender(true);
  };

  const handleClickSelectDate = (
    _values: [Dayjs | null, Dayjs | null] | null,
    formatString: [string, string],
  ) => {
    if (formatString[0] && formatString[1]) {
      setNewKrInfo({ ...newKrInfo, krStartAt: formatString[0], krExpireAt: formatString[1] });
    }
  };

  const handleClickCancelBtn = () => {
    setNewKrInfo({
      krTitle: '',
      krStartAt: '',
      krExpireAt: '',
      krIdx: krIdx,
      krTarget: '',
      krMetric: '',
    });
    setIsValidMax({
      krTitle: false,
      krTarget: false,
      krMetric: false,
    });
    setIsShowCalender(false);

    modalRef.current?.close();
  };

  const handleClickConfirmAddBtn = async () => {
    const reqData = {
      objectiveId: objId,
      krTitle: newKrInfo.krTitle,
      krStartAt: newKrInfo.krStartAt.split('. ').join('-'),
      krExpireAt: newKrInfo.krExpireAt.split('. ').join('-'),
      krIdx: krIdx,
      krTarget: Number(newKrInfo.krTarget.toString().split(',').join('')),
      krMetric: newKrInfo.krMetric,
    };

    try {
      await postAddKr('/v1/key-result', reqData);
      mutateFcn();
    } catch {
      navigate('/error');
    }

    modalRef.current?.close();
  };

  return (
    <Modal ref={modalRef}>
      <StAddKrModalWrapper>
        <StAddKrModalTitle>KR 추가하기</StAddKrModalTitle>
        <AddKrForm
          style={KrModalFormStyle}
          krInfo={newKrInfo}
          objInfo={objInfo}
          inputHandler={{ isValidMax: isValidMax, handleChangeKrValues: handleChangeKrValues }}
          calenderHandler={{
            isShowCalender: isShowCalender,
            handleClickKrPeriodBox: handleClickKrPeriodBox,
            handleClickSelectDate: handleClickSelectDate,
          }}
        />

        <div css={AddKrModalBtnContainer}>
          <StAddKrCancelBtn type="button" onClick={handleClickCancelBtn}>
            취소하기
          </StAddKrCancelBtn>
          <StAddKrConfirmAddBtn
            type="button"
            $isActiveAdd={true}
            onClick={handleClickConfirmAddBtn}
          >
            추가하기
          </StAddKrConfirmAddBtn>
        </div>
      </StAddKrModalWrapper>
    </Modal>
  );
};

export default AddKrModal;

const StAddKrModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.6rem;
  align-items: center;

  /* justify-content: center; */
  width: 47.6rem;
  height: 47.6rem;
  padding: 3.4rem 3.8rem 3.6rem;
  color: ${({ theme }) => theme.colors.gray_000};
  background-color: ${({ theme }) => theme.colors.gray_550};
  border-radius: 10px;
`;

const StAddKrModalTitle = styled.p`
  ${({ theme }) => theme.fonts.title_16_semibold};
`;

const AddKrModalBtnContainer = css`
  display: flex;
  gap: 1.2rem;
  margin-top: 1rem;
`;

const StAddKrModalBtnStyle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 19.4rem;
  height: 3.4rem;
  color: ${({ theme }) => theme.colors.gray_000};
  border-radius: 6px;

  ${({ theme }) => theme.fonts.btn_14_semibold};

  &:focus {
    border: none;
    outline: none;
  }
`;

const StAddKrCancelBtn = styled(StAddKrModalBtnStyle)`
  background-color: ${({ theme }) => theme.colors.gray_450};
`;

const StAddKrConfirmAddBtn = styled(StAddKrModalBtnStyle)<{ $isActiveAdd: boolean }>`
  background-color: ${({ theme, $isActiveAdd }) =>
    $isActiveAdd ? theme.colors.main_darkpurple : theme.colors.gray_450};
`;
