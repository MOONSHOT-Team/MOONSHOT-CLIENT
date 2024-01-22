import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';

import { ICheckInLogTypes } from '../../type/checkInLogTypes';

const CheckInLogItem = ({ logState, dateTime, title, content }: ICheckInLogTypes) => {
  return (
    <StCheckInLogItemContainer>
      <StCheckInLogHeader>
        <StCheckInLogState label={logState}>{logState}</StCheckInLogState>
        <span>[{dateTime}]</span>
      </StCheckInLogHeader>
      <StCheckInLogTitle>{title}</StCheckInLogTitle>
      <StCheckInLogContent>{content}</StCheckInLogContent>
    </StCheckInLogItemContainer>
  );
};

const CheckInLogs = ({ data }: { data: ICheckInLogTypes[] }) => {
  return (
    <StCheckInLogContainer>
      <StCheckInLogP>체크인 로그</StCheckInLogP>
      <StCheckInLogScroll>
        <ul css={checkInLogContainer}>
          {data.map((item, idx) => {
            return <CheckInLogItem key={item.title + idx} {...item} />;
          })}
        </ul>
      </StCheckInLogScroll>
    </StCheckInLogContainer>
  );
};

export default CheckInLogs;

const StCheckInLogContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StCheckInLogP = styled.p`
  padding: 1rem 2.2rem;
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.body_14_semibold};
`;

const StCheckInLogScroll = styled.article`
  height: calc(100vh - 29.8rem);
  overflow-y: auto;
  background-color: ${({ theme }) => theme.colors.gray_550};
  border-top: 1px solid ${({ theme }) => theme.colors.transparent_white};
`;

const checkInLogContainer = css`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StCheckInLogItemContainer = styled.li`
  height: 13.9rem;
  padding: 1.6rem 2.2rem 2rem 1.6rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.transparent_white};
`;

const StCheckInLogHeader = styled.p`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.3rem;
  color: ${({ theme }) => theme.colors.gray_200};
  ${({ theme }) => theme.fonts.caption_10_medium};
`;

const getColorCheckInState = (theme: Theme, label: string) => {
  switch (label) {
    case 'KR 생성':
      return theme.colors.main_purple;
    case 'KR 수정':
      return theme.colors.sub_yellow;
    case '진척상황 기록':
      return theme.colors.sub_mint;
    default:
      return;
  }
};

const StCheckInLogState = styled.span<{ label: string }>`
  color: ${({ theme, label }) => getColorCheckInState(theme, label)};
`;

const StCheckInLogTitle = styled.p`
  margin-bottom: 1.1rem;
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.body_14_medium};
`;

const StCheckInLogContent = styled.div`
  color: ${({ theme }) => theme.colors.gray_200};
  ${({ theme }) => theme.fonts.body_12_regular};
`;
