import styled from '@emotion/styled';

import { IcCalender } from '../../assets/icons';

interface IPeriodBtnProps {
  period: string;
  isClicked: boolean;
  isDate?: boolean;
}

const PeriodBtn = ({ period, isClicked, isDate = false }: IPeriodBtnProps) => {
  return (
    <StPeriodBtnBox $isClicked={isClicked}>
      {isDate && <IcCalender />}
      <StPeriodText>{period}</StPeriodText>
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
    background-color: ${({ theme }) => theme.colors.gray_550};
  }
`;

const StPeriodText = styled.p`
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.body_14_medium};
`;
