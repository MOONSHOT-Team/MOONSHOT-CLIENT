import styled from '@emotion/styled';
import { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';

import { IcClose } from '../../assets/icons';
import { MAX_KR_TITLE } from '../../constants/OKR_MAX_LENGTH';
import { CloseIconStyle, EmptyKeyResultCard } from '../../styles/KeyResultCardStyle';
import { IKrListInfoTypes } from '../../types/KrInfoTypes';
import { IObjInfoTypes } from '../../types/ObjectInfoTypes';
import KeyResultPeriodInput from './KeyResultPeriodInput';

interface IGuideFirstKeyResultCard {
  objInfo: IObjInfoTypes;
  krListInfo: IKrListInfoTypes[];
  setKrListInfo: React.Dispatch<React.SetStateAction<IKrListInfoTypes[]>>;
  cardIdx: number;
  handleClickCloseBtn?: (cardIdx: number) => void;
}

const KR_TITLE_PLACEHOLDER = 'ex) 개발 관련 아티클 읽기';

const GuideFirstKeyResultCard = ({
  objInfo,
  krListInfo,
  setKrListInfo,
  cardIdx,
  handleClickCloseBtn,
}: IGuideFirstKeyResultCard) => {
  const { objStartAt, objExpireAt } = objInfo;
  const { startAt: krStartAt, expireAt: krExpireAt } = krListInfo[cardIdx];
  //캘린더 보여주는 플래그
  const [isShowCalender, setIsShowCalender] = useState(
    krListInfo[cardIdx].startAt && krListInfo[cardIdx].expireAt ? true : false,
  );
  const [isMaxTitle, setIsMaxTitle] = useState(false);

  useEffect(() => {
    // kr 선택 예외 처리) 날짜 기간을 입력 했으나, 앞에서 obj 기간을 수정한 경우 obj 기간으로 초기화
    if (new Date(objStartAt) > new Date(krStartAt) || new Date(objExpireAt) < new Date(krExpireAt))
      krListInfo[cardIdx] = {
        ...krListInfo[cardIdx],
        startAt: objStartAt,
        expireAt: objExpireAt,
      };
    setKrListInfo([...krListInfo]);
  }, []);

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

  const handleClickKrPeriodBox = () => {
    // 날짜 기간을 입력한 경우 이벤트 전파 방지
    if (isShowCalender) return;

    krListInfo[cardIdx] = {
      ...krListInfo[cardIdx],
      startAt: objStartAt,
      expireAt: objExpireAt,
    };
    setKrListInfo([...krListInfo]);
    setIsShowCalender(true);
  };

  const handleClickSelectDate = (
    _values: [Dayjs | null, Dayjs | null] | null,
    formatString: [string, string],
  ) => {
    if (formatString[0] && formatString[1]) {
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
          autoComplete="off"
        />
      </StKrInputBox>

      <StKrInputBox>
        <StKrInputDescription>해당 성과를 달성할 기간은?</StKrInputDescription>
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

const StKrPeriodBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 31.3rem;
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
