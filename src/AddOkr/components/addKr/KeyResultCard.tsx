import styled from '@emotion/styled';
import { Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react';

import { IcClose } from '../../assets/icons';
import { MAX_KR_METRIC, MAX_KR_TARGET, MAX_KR_TITLE } from '../../constants/OKR_MAX_LENGTH';
import { CloseIconStyle, EmptyKeyResultCard } from '../../styles/KeyResultCardStyle';
import { IKrListInfoTypes } from '../../types/KrInfoTypes';
import { IObjInfoTypes } from '../../types/ObjectInfoTypes';
import KeyResultPeriodInput from './KeyResultPeriodInput';

//힌트 메시지 상수
const HINT_SENTENCE = 'ex) 개발 관련 아티클 읽기';
const HINT_TARGET = 'ex) 10';
const HINT_METRIC = 'ex) 회';

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
    title: false,
    target: false,
    metric: false,
  });
  const { krTitle, krTarget, krMetric, krStartAt, krExpireAt } = krListInfo[cardIdx];
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
      case 'target':
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

      {/* 핵심 지표 문장 입력 부분 */}
      <StKrInputDescWrapper>
        <StKrInputDescription>핵심 지표를 문장으로 정리해볼까요?</StKrInputDescription>
        <StKrTitleInput
          type="text"
          name={'title'}
          value={krTitle}
          onChange={(e) => handleChangeBasicKr(e, MAX_KR_TITLE)}
          placeholder={HINT_SENTENCE}
          $isMax={isValidMax.title}
          autoComplete="off"
        />
      </StKrInputDescWrapper>

      {/*수치값 단위 입력 부분*/}
      <StKrInputDescWrapper>
        <StKrInputDescription>핵심 지표를 측정할 수치값과 단위를 입력해주세요</StKrInputDescription>
        <StTargetMetricInputBox>
          <StTargetMetricInput
            type="text"
            name={'target'}
            value={krTarget}
            onChange={(e) => handleChangeBasicKr(e, MAX_KR_TARGET)}
            placeholder={HINT_TARGET}
            $isMax={isValidMax.target}
            autoComplete="off"
          />
          <StTargetMetricInput
            type="text"
            name={'metric'}
            value={krMetric}
            onChange={(e) => handleChangeBasicKr(e, MAX_KR_METRIC)}
            placeholder={HINT_METRIC}
            $isMax={isValidMax.metric}
            autoComplete="off"
          />
        </StTargetMetricInputBox>
      </StKrInputDescWrapper>

      {/*달성 기간 입력 부분*/}
      <StKrInputDescWrapper>
        <StKrInputDescription>핵심 지표를 달성할 기간을 입력해주세요</StKrInputDescription>
        <StKrPeriodBox onClick={handleClickKrPeriodBox}>
          {isShowCalender || krStartAt || krExpireAt ? (
            <KeyResultPeriodInput
              handleClickSelectDate={handleClickSelectDate}
              krPeriod={[krStartAt, krExpireAt]}
              objInfo={objInfo}
            />
          ) : (
            <p>YYYY.MM.DD - YYYY.MM.DD</p>
          )}
        </StKrPeriodBox>
      </StKrInputDescWrapper>
    </StKeyResultCardWrapper>
  );
};

export default KeyResultCard;

const StKeyResultCardWrapper = styled(EmptyKeyResultCard)`
  position: relative;
  gap: 2rem;
  padding: 2.4rem;
`;

const StKrInputDescWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StKrInputDescription = styled.p`
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.body_14_medium};
`;

const StKrTitleInput = styled.input<{ $isMax: boolean }>`
  width: 29.9rem;
  height: 3.2rem;
  padding: 0.6rem 1rem;
  color: ${({ theme, $isMax }) => ($isMax ? '#ff6969' : theme.colors.gray_000)};
  background-color: ${({ theme }) => theme.colors.gray_600};
  border: 1px solid ${({ theme }) => theme.colors.gray_500};
  border-radius: 6px;

  ${({ theme }) => theme.fonts.body_13_medium};

  &:focus,
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray_550};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray_350};
  }
`;

const StTargetMetricInputBox = styled.div`
  display: flex;
  gap: 0.7rem;
`;

const StTargetMetricInput = styled.input<{ $isMax: boolean }>`
  width: 14.6rem;
  height: 3.2rem;
  padding: 0.6rem 1rem;
  color: ${({ theme, $isMax }) => ($isMax ? '#ff6969' : theme.colors.gray_000)};
  background-color: ${({ theme }) => theme.colors.gray_600};
  border: 1px solid ${({ theme }) => theme.colors.gray_500};
  border-radius: 6px;

  ${({ theme }) => theme.fonts.body_14_medium};

  &:focus,
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray_550};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray_350};
  }
`;

const StKrPeriodBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 29.9rem;
  height: 3.2rem;
  padding: 0.6rem 0;
  color: ${({ theme }) => theme.colors.gray_400};
  text-align: center;
  background-color: ${({ theme }) => theme.colors.gray_600};
  border: 1px solid ${({ theme }) => theme.colors.gray_500};
  border-radius: 6px;

  ${({ theme }) => theme.fonts.body_13_medium};

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray_550};
  }
`;
