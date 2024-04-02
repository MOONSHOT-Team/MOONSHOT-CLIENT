import AddKrForm from '@components/addKr/AddKrForm';
import Modal from '@components/Modal';
import { KR_INPUT_DATA } from '@constants/addKr/KR_INPUT_DATA';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { validMaxKrInputVal } from '@utils/addKr/validMaxKrInputVal';
import { Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react';
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

  const [isActiveSave, setIsActiveSave] = useState(false);

  const handleChangeKrValues = (e: React.ChangeEvent<HTMLInputElement>, maxLength: number) => {
    const { newValue, targetInputName } = validMaxKrInputVal(
      e,
      maxLength,
      isValidMax,
      setIsValidMax,
    );

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

  const resetKrData = () => {
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
  };

  const handleClickCancelBtn = () => {
    resetKrData();
    modalRef.current?.close();
  };

  const handleClickConfirmAddBtn = async () => {
    if (!isActiveSave) return;

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
      resetKrData();
      mutateFcn();
    } catch {
      navigate('/error');
    }

    modalRef.current?.close();
  };

  // '추가하기' 버튼 클릭 이전 필수 값, 제한 길이 검증 로직
  useEffect(() => {
    const { krTitle, krTarget, krMetric, krStartAt, krExpireAt } = newKrInfo;
    krTitle &&
    krTarget &&
    krMetric &&
    krStartAt &&
    krExpireAt &&
    !isValidMax[INPUT_TITLE] &&
    !isValidMax[INPUT_TARGET] &&
    !isValidMax[INPUT_METRIC]
      ? setIsActiveSave(true)
      : setIsActiveSave(false);
  }, [newKrInfo, isValidMax]);

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
            $isActiveSave={isActiveSave}
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

const StAddKrConfirmAddBtn = styled(StAddKrModalBtnStyle)<{ $isActiveSave: boolean }>`
  background-color: ${({ theme, $isActiveSave }) =>
    $isActiveSave ? theme.colors.main_darkpurple : theme.colors.gray_450};
`;
