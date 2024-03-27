import AddKrForm from '@components/addKr/AddKrForm';
import { KR_INPUT_DATA } from '@constants/addKr/KR_INPUT_DATA';
import styled from '@emotion/styled';
import { Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react';

import { IcClose } from '../../assets/icons';
import { CloseIconStyle, EmptyKeyResultCard } from '../../styles/KeyResultCardStyle';
import { IKrListInfoTypes } from '../../types/KrInfoTypes';
import { IObjInfoTypes } from '../../types/ObjectInfoTypes';

const KrCardStyle = {
  gap: '3.2rem',
  /* stylelint-disable */
  inputStyle: {
    longWidth: '29.9rem',
    shortWidth: '14.6rem',
    height: '3.2rem',
    shortGap: '0.7rem',
  },
};

interface IKeyResultCardProps {
  objInfo: IObjInfoTypes;
  krListInfo: IKrListInfoTypes[];
  setKrListInfo: React.Dispatch<React.SetStateAction<IKrListInfoTypes[]>>;
  cardIdx: number;
  handleClickCloseBtn?: (cardIdx: number) => void;
}

const KeyResultCard = ({
  objInfo,
  krListInfo,
  setKrListInfo,
  cardIdx,
  handleClickCloseBtn,
}: IKeyResultCardProps) => {
  const [isValidMax, setIsValidMax] = useState({
    krTitle: false,
    krTarget: false,
    krMetric: false,
  });
  const { krStartAt, krExpireAt } = krListInfo[cardIdx];
  const { objStartAt, objExpireAt } = objInfo;

  /** 
  캘린더 관련 요소
  **/
  //캘린더 보여주는 플래그
  const [isShowCalender, setIsShowCalender] = useState(false);

  useEffect(() => {
    // kr 선택 예외 처리) 날짜 기간을 입력 했으나, 앞에서 obj 기간을 수정한 경우 obj 기간으로 초기화
    if (new Date(objStartAt) > new Date(krStartAt) || new Date(objExpireAt) < new Date(krExpireAt))
      krListInfo[cardIdx] = {
        ...krListInfo[cardIdx],
        krStartAt: objStartAt,
        krExpireAt: objExpireAt,
      };
    setKrListInfo([...krListInfo]);
  }, []);

  const handleClickKrPeriodBox = () => {
    // 날짜 기간을 입력한 경우 이벤트 전파 방지
    if (isShowCalender) return;

    krListInfo[cardIdx] = {
      ...krListInfo[cardIdx],
      krStartAt: objStartAt,
      krExpireAt: objExpireAt,
    };
    setKrListInfo([...krListInfo]);
    setIsShowCalender(true);
  };

  const handleChangeBasicKr = (e: React.ChangeEvent<HTMLInputElement>, maxLength: number) => {
    const parsedValue = e.target.value.replace(/[^-0-9]/g, '');

    switch (e.target.name) {
      case KR_INPUT_DATA.INPUT_NAME.INPUT_TARGET:
        if (e.target.value.length > maxLength) {
          setIsValidMax({ ...isValidMax, [e.target.name]: true });
        }
        if (e.target.value.length <= maxLength) {
          setIsValidMax({ ...isValidMax, [e.target.name]: false });
          krListInfo[cardIdx].krTarget = parsedValue
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          setKrListInfo([...krListInfo]);
        }
        break;
      default:
        if (e.target.value.length > maxLength) {
          setIsValidMax({ ...isValidMax, [e.target.name]: true });
        }
        if (e.target.value.length <= maxLength) {
          setIsValidMax({ ...isValidMax, [e.target.name]: false });

          krListInfo[cardIdx] = { ...krListInfo[cardIdx], [e.target.name]: e.target.value };
          setKrListInfo([...krListInfo]);
        }
        break;
    }
  };

  const handleClickSelectDate = (
    _values: [Dayjs | null, Dayjs | null] | null,
    formatString: [string, string],
  ) => {
    if (formatString[0] && formatString[1]) {
      krListInfo[cardIdx] = {
        ...krListInfo[cardIdx],
        krStartAt: formatString[0],
        krExpireAt: formatString[1],
      };
      setKrListInfo([...krListInfo]);
    }
  };

  return (
    <StKeyResultCardWrapper>
      {/* x 버튼 부분 */}
      {cardIdx > 0 && handleClickCloseBtn && (
        <button
          type="button"
          css={CloseIconStyle}
          id={cardIdx.toString()}
          onClick={() => handleClickCloseBtn(cardIdx)}
        >
          <IcClose />
        </button>
      )}

      <AddKrForm
        style={KrCardStyle}
        krInfo={krListInfo[cardIdx]}
        objInfo={objInfo}
        inputHandler={{ isValidMax: isValidMax, handleChangeKrValues: handleChangeBasicKr }}
        calenderHandler={{
          isShowCalender: isShowCalender,
          handleClickKrPeriodBox: handleClickKrPeriodBox,
          handleClickSelectDate: handleClickSelectDate,
        }}
      />
    </StKeyResultCardWrapper>
  );
};

export default KeyResultCard;

const StKeyResultCardWrapper = styled(EmptyKeyResultCard)`
  position: relative;
  padding: 2.4rem;
`;
