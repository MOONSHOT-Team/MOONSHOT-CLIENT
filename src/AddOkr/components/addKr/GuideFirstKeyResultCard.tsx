import styled from '@emotion/styled';
import { Dayjs } from 'dayjs';
import { useState } from 'react';

import { IcClose } from '../../assets';
import { CloseIconStyle, EmptyKeyResultCard } from '../../styles/KeyResultCardStyle';
import KeyResultPeriodInput from './KeyResultPeriodInput';

interface IGuideFirstKeyResultCard {
  cardIdx?: number;
  handleClickCloseBtn?: (cardIdx: number) => void;
}

const GuideFirstKeyResultCard = ({ cardIdx, handleClickCloseBtn }: IGuideFirstKeyResultCard) => {
  //다른 브랜치에서 사용한 유틸 함수, 추 후 삭제 예정
  const returnParsedDate = (date: Date, parseString: string) => {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);

    return `${year}${parseString}${month}${parseString}${day}`;
  };

  // 성과 관련 값
  const [krSentence, setKrSentence] = useState('');
  const KR_SENTENCE_PLACEHOLDER = 'ex) 개발 관련 아티클 읽기';

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

  const handleClickSelectDate = (
    _values: [Dayjs | null, Dayjs | null] | null,
    formatString: [string, string],
  ) => {
    if (formatString[0] && formatString[1]) {
      setKrPeriod(formatString);
    }
  };

  return (
    <StGuideFirstKeyResultCardWrapper>
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

      <StKrInputBox>
        <StKrInputDescription>목표를 달성하기 위해 필요한 성과는?</StKrInputDescription>
        <StKrSentenceInput
          value={krSentence}
          placeholder={KR_SENTENCE_PLACEHOLDER}
          onChange={(e) => setKrSentence(e.target.value)}
        />
      </StKrInputBox>

      <StKrInputBox>
        <StKrInputDescription>해당 성과를 달성할 기간은?</StKrInputDescription>
        <StKrPeriodBox onClick={() => setIsShowCalender(true)} $isHoverStyle={isShowCalender}>
          {isShowCalender ? (
            <KeyResultPeriodInput handleClickSelectDate={handleClickSelectDate} period={krPeriod} />
          ) : (
            <p>YYYY.MM.DD - YYYY.MM.DD</p>
          )}
        </StKrPeriodBox>
      </StKrInputBox>
    </StGuideFirstKeyResultCardWrapper>
  );
};

export default GuideFirstKeyResultCard;

const StGuideFirstKeyResultCardWrapper = styled(EmptyKeyResultCard)`
  position: relative;
  gap: 3.7rem;
  align-items: center;
  justify-content: center;
  padding: 0 1.7rem;
`;

const StKrInputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StKrInputDescription = styled.p`
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.body_14_medium};
`;

const StKrSentenceInput = styled.input`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 31.3rem;
  height: 3.2rem;
  padding: 0.6rem 0;
  color: ${({ theme }) => theme.colors.gray_350};
  text-align: center;
  background-color: ${({ theme }) => theme.colors.gray_600};
  border: 1px solid ${({ theme }) => theme.colors.gray_500};
  border-radius: 6px;

  ${({ theme }) => theme.fonts.body_13_medium};

  &:focus,
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray_550};
  }
`;

const StKrPeriodBox = styled.div<{ $isHoverStyle: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 31.3rem;
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
