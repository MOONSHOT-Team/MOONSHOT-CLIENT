import styled from '@emotion/styled';
import { Dayjs } from 'dayjs';

import { IcCalender } from '../../assets/icons';
import PeriodSelectInput from './PeriodSelectInput';

interface IPeriodBtnProps {
  length: string;
  periodName: string;
  isClicked: boolean;
  isDate: boolean;
  handleClickPeriodBtn: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleClickSelectDate: (
    _values: [Dayjs | null, Dayjs | null] | null,
    formatString: [string, string],
  ) => void;
  period: string[];
}

const PeriodBtn = ({
  length,
  periodName,
  isClicked,
  isDate = false,
  handleClickPeriodBtn,
  handleClickSelectDate,
  period,
}: IPeriodBtnProps) => {
  const SELECT_PERIOD_TEXT = '기간 선택하기';

  return (
    <StPeriodBtnBox id={length} $isClicked={isClicked} onClick={handleClickPeriodBtn}>
      {isDate ? (
        <>
          {isClicked ? (
            <>
              <PeriodSelectInput handleClickSelectDate={handleClickSelectDate} period={period} />
            </>
          ) : (
            <>
              <IcCalender />
              <StPeriodText>{SELECT_PERIOD_TEXT}</StPeriodText>
            </>
          )}
        </>
      ) : (
        <StPeriodText>{periodName}</StPeriodText>
      )}
    </StPeriodBtnBox>
  );
};

export default PeriodBtn;

const StPeriodBtnBox = styled.button<{ $isClicked: boolean }>`
  display: flex;
  gap: 0.6rem;
  align-items: center;
  justify-content: center;
  width: 35.7rem;
  height: 4.2rem;
  padding: 1.1rem 2rem;
  color: ${({ theme }) => theme.colors.gray_000};
  background-color: ${({ theme, $isClicked }) =>
    $isClicked ? theme.colors.transparent_purple : theme.colors.background};
  border: 1px solid
    ${({ theme, $isClicked }) =>
      $isClicked ? theme.colors.main_darkpurple : theme.colors.gray_450};
  border-radius: 6px;

  &:hover {
    background-color: ${({ theme, $isClicked }) => !$isClicked && theme.colors.gray_550};
  }
`;

const StPeriodText = styled.p`
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.body_14_medium};
`;
