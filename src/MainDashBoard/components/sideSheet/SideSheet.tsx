import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import { IKrDetailTypes } from '../../type/CheckInLogTypes';
import CheckInLogs from './CheckInLogs';

// import { IcClose } from '../../assets/icons';
// import KrStatus from './KrStatus';

const data: IKrDetailTypes = {
  title: '통합 회원가입수 200,000건 돌파',
  progressBar: 80,
  KrState: '진행',
  startDate: '2023-01-01',
  expireDate: '2023-12-31',
  Log: [
    {
      state: 'kr 수정',
      date: '2023-12-14 19:09',
      title: '500,000건 → 200,000건',
      content:
        '새롭게 시도한 인스타그램 마케팅으로 회원가입수가 생각보다 빠르게 늘고 있다. 이대로만 쭉쭉 갔으면 좋겠다! 이대로만 쭉쭉 갔으면 좋겠다! 이대로만 쭉쭉 갔으면 좋겠다! 좋겠다!',
    },
    {
      state: 'kr 수정',
      date: '2023-12-14 19:09',
      title: '500,000건 → 200,000건',
      content:
        '새롭게 시도한 인스타그램 마케팅으로 회원가입수가 생각보다 빠르게 늘고 있다. 이대로만 쭉쭉 갔으면 좋겠다! 이대로만 쭉쭉 갔으면 좋겠다! 이대로만 쭉쭉 갔으면 좋겠다! 좋겠다!',
    },
    {
      state: '진척상황 기록',
      date: '2023-12-14 19:09',
      title: '800건 → 3,000건',
      content:
        '새롭게 시도한 인스타그램 마케팅으로 회원가입수가 생각보다 빠르게 늘고 있다. 이대로만 쭉쭉 갔으면 좋겠다! 이대로만 쭉쭉 갔으면 좋겠다! 이대로만 쭉쭉 갔으면 좋겠다! 좋겠다!',
    },
    {
      state: 'kr 생성',
      date: '2023-12-14 19:09',
      title: '통합 회원가입수 200,000건 돌파 KR 생성',
      content: '',
    },
  ],
};

interface ISideSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideSheet = ({ isOpen, onClose }: ISideSheetProps) => {
  return (
    <StBackground>
      <StContainer $isOpen={isOpen}>
        <section css={krDetailUpperStyles}>
          <StKrDetailHeader>
            <span>kr</span>
            <span>
              {/* <IcClose onClick={onClose} /> */}
              <button onClick={onClose}>x</button>
            </span>
          </StKrDetailHeader>
          <StKrTitle>통합 회원수 200,000건 돌파</StKrTitle>
          <div css={{ height: '3.8rem' }}>프로그래스바(공통컴포넌트)</div>
          <StKrStatus>
            <StKrDetailLabel>상태</StKrDetailLabel>
            <span>{/* <KrStatus /> */}</span>
          </StKrStatus>
          <StKrPeriodContainer>
            <StKrDetailLabel>일정</StKrDetailLabel>
            <StKrPeriod>
              {`2023. 01. 01`} - {`2023. 12. 31`}
            </StKrPeriod>
          </StKrPeriodContainer>
          <StKrCheckInBtn type="button">체크인</StKrCheckInBtn>
        </section>
        <CheckInLogs data={data.Log} />
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
  align-items: center;
  margin-top: 1.2rem;
  margin-bottom: 1rem;
`;

const StKrPeriodContainer = styled.div`
  display: flex;
  gap: 3.2rem;
  align-items: center;
  margin-bottom: 2.4rem;
`;

const StKrPeriod = styled.p`
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.body_12_regular};
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
