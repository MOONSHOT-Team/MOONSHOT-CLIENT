import AddKrForm from '@components/addKr/AddKrForm';
import Modal from '@components/Modal';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Dayjs } from 'dayjs';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { postAddKr } from '../../apis/fetcher';

interface IAddKrModalProps {
  modalRef: React.MutableRefObject<HTMLDialogElement | null>;
  objInfo: { objId: number; objStartAt: string; objExpireAt: string; objTitle: string };
  krIdx: number;
}
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

//TODO: 공통 컴포넌트 사용으로, 핸들러 완성 후 뷰 다시 확인하기
const AddKrModal = ({ modalRef, objInfo, krIdx }: IAddKrModalProps) => {
  const navigate = useNavigate();
  const { objStartAt, objExpireAt, objId } = objInfo;

  const [isValidMax, setIsValidMax] = useState({
    krTitle: false,
    krTarget: false,
    krMetric: false,
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
    const parsedValue = e.target.value.replace(/[^-0-9]/g, '');
    switch (e.target.name) {
      case 'krTarget':
        if (e.target.value.length > maxLength) {
          setIsValidMax({ ...isValidMax, [e.target.name]: true });
        }
        if (e.target.value.length <= maxLength) {
          setIsValidMax({ ...isValidMax, [e.target.name]: false });
          setNewKrInfo({
            ...newKrInfo,
            krTarget: parsedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
          });
        }
        break;
      default:
        if (e.target.value.length > maxLength) {
          setIsValidMax({ ...isValidMax, [e.target.name]: true });
        }
        if (e.target.value.length <= maxLength) {
          setIsValidMax({ ...isValidMax, [e.target.name]: false });
          setNewKrInfo({ ...newKrInfo, [e.target.name]: e.target.value });
        }
        break;
    }
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
      krStartAt: objStartAt,
      krExpireAt: objExpireAt,
      krIdx: krIdx,
      krTarget: '',
      krMetric: '',
    });
    modalRef.current?.close();
  };

  const handleClickConfirmAddBtn = async () => {
    const reqData = {
      objectiveId: objId,
      title: newKrInfo.krTitle,
      startAt: newKrInfo.krStartAt.split('. ').join('-'),
      expireAt: newKrInfo.krExpireAt.split('. ').join('-'),
      idx: krIdx,
      target: Number(newKrInfo.krTarget.toString().split(',').join('')),
      metric: newKrInfo.krMetric,
    };

    try {
      await postAddKr('/v1/key-result', reqData);
    } catch {
      navigate('/error');
    }

    modalRef.current?.close();
  };

  //TODO: add-okr의 kr 카드와 공통 컴포넌트로 만들어 추상화 하기
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
