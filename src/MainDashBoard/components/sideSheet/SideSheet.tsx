import ProgressBar from '@components/ProgressBar';
import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { useState } from 'react';
import useSWR from 'swr';

import { getDashBoardData } from '../../apis/fetcher';
import { IcClose } from '../../assets/icons';
import CheckInLogs from './CheckInLogs';
import KrCheckIn from './krCheckIn/KrCheckIn';
import KRPeriodSelect from './KRPeriodSelect';
import KrStatus from './KrStatus';

interface ISideSheetProps {
  isOpen: boolean;
  onClose: () => void;
  keyResultId: number;
  objStartAt: string;
  objExpireAt: string;
}

const SideSheet = ({ isOpen, onClose, keyResultId, objStartAt, objExpireAt }: ISideSheetProps) => {
  const { data: sideSheetData } = useSWR(`/v1/key-result/${keyResultId}`, getDashBoardData);
  const krDetailData = sideSheetData?.data;

  const [isCheckinView, setIsCheckinView] = useState(false);
  if (!sideSheetData) return;
  const { title, target, metric, progressBar, krState, startAt, expireAt, logList } = krDetailData;

  const handleCheckInView = () => {
    setIsCheckinView(!isCheckinView);
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
          <StKrTitle>
            {title} {target}
            {metric}
          </StKrTitle>
          <div>
            <ProgressBar
              currentProgress={progressBar}
              progressBarColor={'#444444'}
              progressValueColor={'#A6EEF6'}
              textColor={'#A6EEF6'}
              isCurrentProgress={true}
            />
          </div>
          <StKrStatus>
            <StKrDetailLabel>상태</StKrDetailLabel>
            <span>
              <KrStatus keyResultId={keyResultId} krStatus={krState} />
            </span>
          </StKrStatus>
          <StKrPeriodContainer>
            <StKrDetailLabel>일정</StKrDetailLabel>
            <KRPeriodSelect
              keyResultId={keyResultId}
              objStartAt={objStartAt}
              objExpireAt={objExpireAt}
              startAt={startAt}
              expireAt={expireAt}
            />
          </StKrPeriodContainer>
        </section>

        <section css={StKRDetailLowerStyles}>
          {isCheckinView && (
            <KrCheckIn
              onCancel={handleCheckInView}
              keyResultId={keyResultId}
              title={title}
              target={target}
              metric={metric}
            />
          )}
          {!isCheckinView && (
            <>
              <StKrCheckInBtn type="button" onClick={handleCheckInView}>
                체크인
              </StKrCheckInBtn>
              <CheckInLogs data={logList} />
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
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.transparent_black_50};
`;

const StContainer = styled.aside<{ $isOpen: boolean }>`
  position: fixed;
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
  padding: 2.6rem 2.2rem 0;
`;

const StKrDetailHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StKrTitle = styled.h2`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.2rem;
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
