import DynamicInput from '@components/input/DynamicInput';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Dayjs } from 'dayjs';
import { useState } from 'react';

import KeyResultPeriodInput from '../KeyResultPeriodInput';

const KeyResultCard = () => {
  //다른 브랜치에서 사용한 유틸 함수, 추후 삭제 예정
  const returnParsedDate = (date: Date, parseString: string) => {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);

    return `${year}${parseString}${month}${parseString}${day}`;
  };

  //힌트 메시지 상수
  const HINT_TARGET = 'ex) 100';
  const HINT_METRIC = 'ex) %';

  //수치 관리 값
  const [target, setTarget] = useState('');
  const [isClickTarget, setIsClickTarget] = useState(false);

  //단위 관리 값
  const [metric, setMetric] = useState('');
  const [isClickMetric, setIsClickMetric] = useState(false);

  const [isClickDescription, setIsClickDescription] = useState(false);
  const [description, setDescription] = useState('');

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

  //수치 관리 핸들러
  const handleChangeTarget = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsedValue = e.target.value.replace(/[^-0-9]/g, '');
    setTarget(parsedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
  };

  //단위 관리 핸들러
  const handleChangeMetric = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMetric(e.target.value);
  };

  const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
    setIsClickDescription(true);
  };

  return (
    <StKeyResultCardWrapper>
      <div css={TopKrDescription}>
        <div css={KrDescriptionBox}>
          <StKrDescripText>핵심 지표의 수치 값은</StKrDescripText>
          <StKrInputBox $isHoverStyle={isClickTarget}>
            {isClickTarget ? (
              <DynamicInput
                value={target}
                handleChangeValue={handleChangeTarget}
                isAutoFocus={true}
                maxLength={13}
              />
            ) : (
              <StKrMetricTxt onClick={() => setIsClickTarget(true)}>{HINT_TARGET}</StKrMetricTxt>
            )}
          </StKrInputBox>
          <StKrDescripText>이고</StKrDescripText>
        </div>

        <div css={KrDescriptionBox}>
          <StKrDescripText>단위는</StKrDescripText>
          <StKrInputBox $isHoverStyle={isClickMetric}>
            {isClickMetric ? (
              <DynamicInput
                value={metric}
                handleChangeValue={handleChangeMetric}
                isAutoFocus={true}
              />
            ) : (
              <StKrMetricTxt onClick={() => setIsClickMetric(true)}>{HINT_METRIC}</StKrMetricTxt>
            )}
          </StKrInputBox>
          <StKrDescripText>입니다.</StKrDescripText>
        </div>
      </div>

      <div css={BottomKrDescription}>
        <StKrDescripText>핵심 지표를 수치값과 단위를 포함한 문장으로 정리하면</StKrDescripText>
        <StKrDescripInput
          value={description}
          placeholder={'ex) 홈페이지 방문자수 100% 상승 기록'}
          onChange={handleChangeDescription}
          $isHoverStyle={isClickDescription}
        />
        <StKrDescripText>이며, 핵심 지표를 달성할 기간은</StKrDescripText>
        <StKrPeriodBox onClick={() => setIsShowCalender(true)} $isHoverStyle={isShowCalender}>
          {isShowCalender ? (
            <KeyResultPeriodInput handleClickSelectDate={handleClickSelectDate} period={krPeriod} />
          ) : (
            <p>YYYY.MM.DD - YYYY.MM.DD</p>
          )}
        </StKrPeriodBox>
      </div>
    </StKeyResultCardWrapper>
  );
};

export default KeyResultCard;

const StKeyResultCardWrapper = styled.article`
  display: flex;
  flex-direction: column;
  gap: 5rem;
  width: 34.7rem;
  height: 29.8rem;
  padding: 2.4rem;
  background-color: ${({ theme }) => theme.colors.gray_600};
  border-radius: 10px;
`;

const KrDescriptionBox = css`
  display: flex;
  gap: 1.2rem;
  align-items: center;
`;

const TopKrDescription = css`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const BottomKrDescription = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StKrDescripText = styled.span`
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.body_14_medium};
`;

const StKrInputBox = styled.div<{ $isHoverStyle: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  min-width: 6.5rem;
  height: 3.2rem;
  padding: 1.4rem 1rem;
  color: ${({ theme }) => theme.colors.gray_000};
  background-color: ${({ theme, $isHoverStyle }) =>
    $isHoverStyle ? theme.colors.gray_550 : theme.colors.gray_600};
  border: 1px solid ${({ theme }) => theme.colors.gray_450};
  border-radius: 6px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray_550};
  }

  ${({ theme }) => theme.fonts.body_14_medium};
`;

const StKrMetricTxt = styled.p`
  color: ${({ theme }) => theme.colors.gray_350};
  ${({ theme }) => theme.fonts.body_14_medium};
`;

const StKrDescripInput = styled.input<{ $isHoverStyle: boolean }>`
  width: 30.7rem;
  height: 3.2rem;
  padding: 0.6rem 2rem;
  color: ${({ theme }) => theme.colors.gray_350};
  background-color: ${({ theme, $isHoverStyle }) =>
    $isHoverStyle ? theme.colors.gray_550 : theme.colors.gray_600};
  border: 1px solid ${({ theme }) => theme.colors.gray_500};
  border-radius: 6px;

  ${({ theme }) => theme.fonts.body_13_medium};
`;

const StKrPeriodBox = styled.div<{ $isHoverStyle: boolean }>`
  display: flex;
  align-items: center;
  width: 22.6rem;
  height: 3.2rem;
  padding: 0.6rem 2rem;
  color: ${({ theme }) => theme.colors.gray_400};
  text-align: center;
  background-color: ${({ theme, $isHoverStyle }) =>
    $isHoverStyle ? theme.colors.gray_550 : theme.colors.gray_600};
  border: 1px solid ${({ theme }) => theme.colors.gray_500};
  border-radius: 6px;

  ${({ theme }) => theme.fonts.body_13_medium};
`;
