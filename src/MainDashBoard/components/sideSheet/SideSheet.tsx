import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { useState } from 'react';

import { IcClose } from '../../assets/icons';
import { KRDETAILDATA } from '../../constants/KrDetailData';
import CheckInLogs from './CheckInLogs';
import KrCheckIn from './KrCheckIn';
import KRPeriodSelect from './KRPeriodSelect';
import KrStatus from './KrStatus';

interface ISideSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideSheet = ({ isOpen, onClose }: ISideSheetProps) => {
  const [isCheckinView, setIsCheckinView] = useState(true);

  const handleCheckInView = () => {
    setIsCheckinView(true);
  };

  return (
    <StBackground>
      <StContainer $isOpen={isOpen}>
        <section css={krDetailUpperStyles}>
          <StKrDetailHeader>
            <span>kr</span>
            <span>
              <IcClose onClick={onClose} />
              <button onClick={onClose}>x</button>
            </span>
          </StKrDetailHeader>
          <StKrTitle>통합 회원수 200,000건 돌파</StKrTitle>
          <div css={{ height: '3rem' }}>프로그래스바(공통컴포넌트)</div>
          <StKrStatus>
            <StKrDetailLabel>상태</StKrDetailLabel>
            <span>
              <KrStatus />
            </span>
          </StKrStatus>
          <StKrPeriodContainer>
            <StKrDetailLabel>일정</StKrDetailLabel>
            <KRPeriodSelect />
          </StKrPeriodContainer>
        </section>

        <section css={StKRDetailLowerStyles}>
          {isCheckinView ? (
            <KrCheckIn />
          ) : (
            <>
              <StKrCheckInBtn type="button" onClick={handleCheckInView}>
                체크인
              </StKrCheckInBtn>
              <CheckInLogs data={KRDETAILDATA.Log} />
            </>
          )}
        </section>
      </StContainer>
    </StBackground>
  );
};

export default SideSheet;

const StBackground = styled.section`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.transparent_black_50};
`;

const StContainer = styled.aside<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 34.2rem;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.gray_600};
  transform: translateX(${({ $isOpen }) => ($isOpen ? '0' : '100%')});
  animation: ${({ $isOpen }) => ($isOpen ? slideIn : 'none')} 0.3s forwards;
`;
const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const krDetailUpperStyles = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 2.6rem 2.2rem 2.1rem;
  padding: 2.6rem 2.2rem 0;
`;

const StKrDetailHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StKrTitle = styled.h2`
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.title_16_semibold};
`;

const StKrStatus = styled.div`
  display: flex;
  gap: 3.2rem;
  align-items: center;
  margin-top: 1.2rem;
  margin-bottom: 0.5rem;
`;

const StKrPeriodContainer = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  margin-bottom: 3rem;
`;

const StKrDetailLabel = styled.p`
  color: ${({ theme }) => theme.colors.gray_200};
  ${({ theme }) => theme.fonts.body_12_regular};
`;

const StKRDetailLowerStyles = css`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const StKrCheckInBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 29.8rem;
  height: 4.4rem;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.gray_000};
  background-color: ${({ theme }) => theme.colors.gray_500};
  border-radius: 6px;

  ${({ theme }) => theme.fonts.btn_14_semibold};

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray_450};
  }
`;
