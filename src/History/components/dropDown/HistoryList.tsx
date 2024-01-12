import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useState } from 'react';

import { CloseDropDownIcon, DropDownIcon } from '../../assets/icons';
import HistoryDropDown from './HistoryDropDown';

const HistoryList = () => {
  const [dropdownVisibility, setDropdownVisibility] = useState(false);

  return (
    <div className="app">
      <StDropDownButtonContainer onClick={() => setDropdownVisibility(!dropdownVisibility)}>
        <StDropDownButtonWrapper>
          {dropdownVisibility ? <CloseDropDownIcon /> : <DropDownIcon />}
          <StDropDownCategory>생산성</StDropDownCategory>
          <StDropDownObject>팔로워 1000명을 달성한다</StDropDownObject>
        </StDropDownButtonWrapper>
        <div css={isProgressBar}>프로그래스 바 입니다.</div>

        <StDropDownPeriod>2023.09.01 - 2023.12.25</StDropDownPeriod>
      </StDropDownButtonContainer>
      <HistoryDropDown visibility={dropdownVisibility}>
        <ul>
          <li>item 1</li>
          <li>item 2</li>
          <li>item 3</li>
          <li>item 4</li>
        </ul>
      </HistoryDropDown>
    </div>
  );
};

export default HistoryList;

const StDropDownButtonContainer = styled.button`
  display: flex;
  align-items: center;
  width: 105.8rem;
  height: 6rem;
  padding: 0 2.4rem;
  cursor: none;
  background-color: ${({ theme }) => theme.colors.gray_500};
  border: 1px solid ${({ theme }) => theme.colors.gray_300};
  border-radius: 6px;
`;

const StDropDownButtonWrapper = styled.div`
  display: flex;
  gap: 1.6rem;
  align-items: center;
  width: 52.8rem;
`;
const StDropDownCategory = styled.p`
  padding: 8px 10px;
  ${({ theme }) => theme.fonts.btn_11_medium};

  color: ${({ theme }) => theme.colors.gray_150};
  background-color: ${({ theme }) => theme.colors.gray_650};
  border: 1px solid ${({ theme }) => theme.colors.gray_400};
  border-radius: 6px;
`;

const StDropDownObject = styled.p`
  ${({ theme }) => theme.fonts.body_14_semibold};

  color: ${({ theme }) => theme.colors.gray_000};
`;

const isProgressBar = css`
  width: 29.8rem;
  margin: 0 2.5rem 0 0.4rem;
`;

const StDropDownPeriod = styled.p`
  ${({ theme }) => theme.fonts.body_12_regular};

  color: ${({ theme }) => theme.colors.gray_250};
`;
