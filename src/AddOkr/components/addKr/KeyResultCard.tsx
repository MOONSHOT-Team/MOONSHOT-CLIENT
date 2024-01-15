import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Dayjs } from 'dayjs';
import { useState } from 'react';

import { IcClose } from '../../assets';
import KeyResultPeriodInput from '../KeyResultPeriodInput';

interface IKeyResultCardProps {
  cardIdx?: number;
  handleClickCloseBtn?: (cardIdx: number) => void;
}

const KeyResultCard = ({ cardIdx, handleClickCloseBtn }: IKeyResultCardProps) => {
  //다른 브랜치에서 사용한 유틸 함수, 추 후 삭제 예정
  const returnParsedDate = (date: Date, parseString: string) => {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);

    return `${year}${parseString}${month}${parseString}${day}`;
  };

  //힌트 메시지 상수
  const HINT_SENTENCE = 'ex) 개발 관련 아티클 읽기';
  const HINT_TARGET = 'ex) 10';
  const HINT_METRIC = 'ex) 회';

  //핵심 지표 문장 관리 값
  const [sentence, setSentence] = useState('');
  //수치 관리 값
  const [target, setTarget] = useState('');
  //단위 관리 값
  const [metric, setMetric] = useState('');

  /** 
  캘린더 관련 요소
  **/
  const today = new Date();
  const CALE_START_DATE = returnParsedDate(today, '-');
  const CALE_END_DATE = returnParsedDate(new Date(today.setMonth(today.getMonth() + 1)), '-');
  //캘린더 보여주는 플래그
  const [isShowCalender, setIsShowCalender] = useState(false);
  //캘린더 선택한 값
  const [krPeriod, setKrPeriod] = useState([CALE_START_DATE, CALE_END_DATE]);

  //수치 관리 핸들러
  const handleChangeTarget = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsedValue = e.target.value.replace(/[^-0-9]/g, '');
    setTarget(parsedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
  };

  const handleClickSelectDate = (
    _values: [Dayjs | null, Dayjs | null] | null,
    formatString: [string, string],
  ) => {
    if (formatString[0] && formatString[1]) {
      setKrPeriod(formatString);
    }
  };

  return (
    <StKeyResultCardWrapper>
      {/* x 버튼 부분 */}
      {cardIdx && handleClickCloseBtn && (
        <button
          css={CloseIconStyle}
          id={cardIdx.toString()}
          onClick={() => handleClickCloseBtn(cardIdx)}
        >
          <IcClose />
        </button>
      )}

      <StKrInputDescWrapper>
        <StKrInputDescription>핵심 지표를 문장으로 정리해볼까요?</StKrInputDescription>
        <StKrSentenceInput
          value={sentence}
          onChange={(e) => setSentence(e.target.value)}
          placeholder={HINT_SENTENCE}
        />
      </StKrInputDescWrapper>

      <StKrInputDescWrapper>
        <StKrInputDescription>
          핵심 지표를 측정할 수치값과 단위를 입력해주세요.
        </StKrInputDescription>
        <StTargetMetricInputBox>
          <StTargetMetricinput
            value={target}
            onChange={handleChangeTarget}
            placeholder={HINT_TARGET}
          />
          <StTargetMetricinput
            value={metric}
            onChange={(e) => setMetric(e.target.value)}
            placeholder={HINT_METRIC}
          />
        </StTargetMetricInputBox>
      </StKrInputDescWrapper>

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

const StKeyResultCardWrapper = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 34.7rem;
  height: 29.8rem;
  padding: 2.4rem;
  background-color: ${({ theme }) => theme.colors.gray_600};
  border-radius: 10px;
`;

const CloseIconStyle = css`
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
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

const StKrSentenceInput = styled.input`
  width: 29.9rem;
  height: 3.2rem;
  padding: 0.6rem 1rem;
  color: ${({ theme }) => theme.colors.gray_350};
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

const StTargetMetricinput = styled.input`
  width: 14.6rem;
  height: 3.2rem;
  padding: 0.6rem 1rem;
  color: ${({ theme }) => theme.colors.gray_350};
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
