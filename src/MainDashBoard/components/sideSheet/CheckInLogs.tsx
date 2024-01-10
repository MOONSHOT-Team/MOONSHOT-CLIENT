import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';

import { ICheckInLogTypes } from '../../type/CheckInLogTypes';

const CheckInLogItem = ({ state, date, title, content }: ICheckInLogTypes) => {
  return (
    <StCheckInLogItemContainer>
      <StCheckInLogHeader>
        <StCheckInLogState label={state}>{state}</StCheckInLogState>
        <span>[{date}]</span>
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
  min-height: calc(100% - 25rem);
`;

const StCheckInLogP = styled.p`
  padding: 1rem 2.2rem;
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.body_14_semibold};
`;

const StCheckInLogScroll = styled.article`
  height: 100%;
  overflow-y: scroll;
  background-color: ${({ theme }) => theme.colors.gray_550};
  border-top: 1px solid ${({ theme }) => theme.colors.transparent_white};

  &::-webkit-scrollbar {
    width: 13px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.gray_650};
    background-clip: padding-box; /* 스크롤에 여백넣기 -> background에 테두리영역 제외하여 표현 */
    border: 4px solid transparent;
    border-radius: 50px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    background-size: cover;
  }
`;

const checkInLogContainer = css`
  display: flex;
  flex-basis: 0;
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
    case 'kr 생성':
      return theme.colors.main_purple;
    case 'kr 수정':
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
const StCheckInLogContent = styled.p`
  color: ${({ theme }) => theme.colors.gray_200};
  ${({ theme }) => theme.fonts.body_12_regular};
`;
