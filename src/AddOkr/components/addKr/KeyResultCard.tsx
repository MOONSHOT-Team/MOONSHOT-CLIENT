import styled from '@emotion/styled';
import { Dayjs } from 'dayjs';
import React, { useState } from 'react';

import { IcClose } from '../../assets/icons';
import { CALE_END_DATE, CALE_START_DATE } from '../../constants/ADD_OKR_DATES';
import { CloseIconStyle, EmptyKeyResultCard } from '../../styles/KeyResultCardStyle';
import { IKrListInfoTypes } from '../../types/KrInfoTypes';
import KeyResultPeriodInput from './KeyResultPeriodInput';

//힌트 메시지 상수
const HINT_SENTENCE = 'ex) 개발 관련 아티클 읽기';
const HINT_TARGET = 'ex) 10';
const HINT_METRIC = 'ex) 회';

const MAX_SENTENCE = 20;
const MAX_TARGET = 6;
const MAX_METRIC = 4;

interface IKeyResultCardProps {
  krListInfo: IKrListInfoTypes[];
  setKrListInfo: React.Dispatch<React.SetStateAction<IKrListInfoTypes[]>>;
  cardIdx: number;
  handleClickCloseBtn?: (cardIdx: number) => void;
}

const KeyResultCard = ({
  krListInfo,
  setKrListInfo,
  cardIdx,
  handleClickCloseBtn,
}: IKeyResultCardProps) => {
  const [isValidMax, setIsValidMAx] = useState({
    sentence: false,
    target: false,
    metric: false,
  });

  /** 
  캘린더 관련 요소
  **/

  //캘린더 보여주는 플래그
  const [isShowCalender, setIsShowCalender] = useState(false);
  //캘린더 선택한 값
  const [krPeriod, setKrPeriod] = useState([CALE_START_DATE, CALE_END_DATE]);

  const handlChangeBasicKr = (e: React.ChangeEvent<HTMLInputElement>, maxLength: number) => {
    const parsedValue = e.target.value.replace(/[^-0-9]/g, '');

    switch (e.target.name) {
      case 'target':
        if (e.target.value.length > maxLength) {
          setIsValidMAx({ ...isValidMax, [e.target.name]: true });
        }
        if (e.target.value.length <= maxLength) {
          setIsValidMAx({ ...isValidMax, [e.target.name]: false });
          krListInfo[cardIdx].target = parsedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          setKrListInfo([...krListInfo]);
        }
        break;
      default:
        if (e.target.value.length > maxLength) {
          setIsValidMAx({ ...isValidMax, [e.target.name]: true });
        }
        if (e.target.value.length <= maxLength) {
          setIsValidMAx({ ...isValidMax, [e.target.name]: false });

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
      setKrPeriod(formatString);
      krListInfo[cardIdx] = {
        ...krListInfo[cardIdx],
        startAt: formatString[0],
        expireAt: formatString[1],
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
          value={krListInfo[cardIdx].title}
          onChange={(e) => handlChangeBasicKr(e, MAX_SENTENCE)}
          placeholder={HINT_SENTENCE}
          $isMax={isValidMax.sentence}
        />
      </StKrInputDescWrapper>

      {/*수치값 단위 입력 부분*/}
      <StKrInputDescWrapper>
        <StKrInputDescription>
          핵심 지표를 측정할 수치값과 단위를 입력해주세요.
        </StKrInputDescription>
        <StTargetMetricInputBox>
          <StTargetMetricinput
            type="text"
            name={'target'}
            value={krListInfo[cardIdx].target}
            onChange={(e) => handlChangeBasicKr(e, MAX_TARGET + 1)}
            placeholder={HINT_TARGET}
            $isMax={isValidMax.target}
          />
          <StTargetMetricinput
            type="text"
            name={'metric'}
            value={krListInfo[cardIdx].metric}
            onChange={(e) => handlChangeBasicKr(e, MAX_METRIC)}
            placeholder={HINT_METRIC}
            $isMax={isValidMax.metric}
          />
        </StTargetMetricInputBox>
      </StKrInputDescWrapper>

      {/*달성 기간 입력 부분*/}
      <StKrInputDescWrapper>
        <StKrInputDescription>핵심 지표를 달성할 기간을 입력해주세요.</StKrInputDescription>
        <StKrPeriodBox onClick={() => setIsShowCalender(true)} $isHoverStyle={isShowCalender}>
          {isShowCalender ? (
            <KeyResultPeriodInput handleClickSelectDate={handleClickSelectDate} period={krPeriod} />
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
  color: ${({ theme, $isMax }) => ($isMax ? '#ff6969' : theme.colors.gray_350)};
  background-color: ${({ theme }) => theme.colors.gray_600};
  border: 1px solid ${({ theme }) => theme.colors.gray_500};
  border-radius: 6px;

  ${({ theme }) => theme.fonts.body_13_medium};

  &:focus,
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray_550};
  }
`;

const StTargetMetricInputBox = styled.div`
  display: flex;
  gap: 0.7rem;
`;

const StTargetMetricinput = styled.input<{ $isMax: boolean }>`
  width: 14.6rem;
  height: 3.2rem;
  padding: 0.6rem 1rem;
  color: ${({ theme, $isMax }) => ($isMax ? '#ff6969' : theme.colors.gray_350)};
  background-color: ${({ theme }) => theme.colors.gray_600};
  border: 1px solid ${({ theme }) => theme.colors.gray_500};
  border-radius: 6px;

  ${({ theme }) => theme.fonts.body_14_medium};

  &:focus,
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray_550};
  }
`;

const StKrPeriodBox = styled.div<{ $isHoverStyle: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 29.9rem;
  height: 3.2rem;
  padding: 0.6rem 0;
  color: ${({ theme }) => theme.colors.gray_400};
  text-align: center;
  background-color: ${({ theme, $isHoverStyle }) =>
    $isHoverStyle ? theme.colors.gray_550 : theme.colors.gray_600};
  border: 1px solid ${({ theme }) => theme.colors.gray_500};
  border-radius: 6px;

  ${({ theme }) => theme.fonts.body_13_medium};
`;
