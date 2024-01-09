import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import { IcClose } from '../../assets/icons';

interface ISideSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideSheet = ({ isOpen, onClose }: ISideSheetProps) => {
  return (
    <StBackground>
      <StContainer $isOpen={isOpen}>
        <StKRDetailUpper>
          <StKrDetailHeader>
            <span>kr</span>
            <span>
              <IcClose onClick={onClose} />
            </span>
          </StKrDetailHeader>
          <StKrTitle>통합 회원수 200,000건 돌파</StKrTitle>
          <div>프로그래스바(공통컴포넌트)</div>
          <StKrStatus>
            <StKrDetailLabel>상태</StKrDetailLabel>
            <span></span>
          </StKrStatus>
          <StKrPeriod>
            <StKrDetailLabel>일정</StKrDetailLabel>
            <span></span>
          </StKrPeriod>
          <StKrCheckInBtn type="button">체크인</StKrCheckInBtn>
        </StKRDetailUpper>
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
  width: 34.2rem;
  height: 100%;
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

const StKRDetailUpper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 2.6rem 2.2rem;
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
  margin-top: 1.2rem;
  margin-bottom: 1rem;
`;

const StKrPeriod = styled.div`
  display: flex;
  gap: 3.2rem;
  margin-bottom: 2.4rem;
`;

const StKrDetailLabel = styled.p`
  color: ${({ theme }) => theme.colors.gray_200};
  ${({ theme }) => theme.fonts.body_12_regular};
`;

const StKrCheckInBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 29.8rem;
  height: 4.4rem;
  color: ${({ theme }) => theme.colors.gray_000};
  background-color: ${({ theme }) => theme.colors.gray_500};
  border-radius: 6px;
  ${({ theme }) => theme.fonts.btn_14_semibold};
`;
