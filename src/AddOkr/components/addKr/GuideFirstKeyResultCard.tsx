import styled from '@emotion/styled';
import { Dayjs } from 'dayjs';
import { useState } from 'react';

import { IcClose } from '../../assets/icons';
import { CALE_END_DATE, CALE_START_DATE } from '../../constants/ADD_OKR_DATES';
import { MAX_KR_TITLE } from '../../constants/MAX_KR_LENGTH';
import { CloseIconStyle, EmptyKeyResultCard } from '../../styles/KeyResultCardStyle';
import { IKrListInfoTypes } from '../../types/KrInfoTypes';
import KeyResultPeriodInput from './KeyResultPeriodInput';

interface IGuideFirstKeyResultCard {
  krListInfo: IKrListInfoTypes[];
  setKrListInfo: React.Dispatch<React.SetStateAction<IKrListInfoTypes[]>>;
  cardIdx: number;
  handleClickCloseBtn?: (cardIdx: number) => void;
}

const KR_TITLE_PLACEHOLDER = 'ex) 개발 관련 아티클 읽기';

const GuideFirstKeyResultCard = ({
  krListInfo,
  setKrListInfo,
  cardIdx,
  handleClickCloseBtn,
}: IGuideFirstKeyResultCard) => {
  //캘린더 보여주는 플래그
  const [isShowCalender, setIsShowCalender] = useState(
    krListInfo[cardIdx].startAt && krListInfo[cardIdx].expireAt ? true : false,
  );
  const [isMaxTitle, setIsMaxTitle] = useState(false);

  //캘린더 선택한 값
  const [krPeriod, setKrPeriod] = useState([
    krListInfo[cardIdx].startAt
      ? krListInfo[cardIdx].startAt.split('. ').join('-')
      : CALE_START_DATE,
    krListInfo[cardIdx].expireAt
      ? krListInfo[cardIdx].expireAt.split('. ').join('-')
      : CALE_END_DATE,
  ]);

  const handleChangeTitleInput = (e: React.ChangeEvent<HTMLInputElement>, maxLength: number) => {
    if (e.target.value.length > maxLength) {
      setIsMaxTitle(true);
    }

    if (e.target.value.length <= maxLength) {
      setIsMaxTitle(false);
      krListInfo[cardIdx].title = e.target.value;
      setKrListInfo([...krListInfo]);
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
    <StGuideFirstKeyResultCardWrapper>
      {/* x 버튼 부분 */}
      {cardIdx > 0 && handleClickCloseBtn && (
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
          value={krListInfo[cardIdx].title}
          placeholder={KR_TITLE_PLACEHOLDER}
          onChange={(e) => handleChangeTitleInput(e, MAX_KR_TITLE)}
          $isMax={isMaxTitle}
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

const StKrSentenceInput = styled.input<{ $isMax: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 31.3rem;
  height: 3.2rem;
  padding: 0.6rem 0;
  color: ${({ theme, $isMax }) => ($isMax ? '#ff6969' : theme.colors.gray_000)};
  text-align: center;
  background-color: ${({ theme }) => theme.colors.gray_600};
  border: 1px solid ${({ theme }) => theme.colors.gray_500};
  border-radius: 6px;

  ${({ theme }) => theme.fonts.body_13_medium};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray_350};
  }

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
