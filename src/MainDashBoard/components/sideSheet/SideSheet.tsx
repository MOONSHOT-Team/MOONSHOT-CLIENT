import ProgressBar from '@components/ProgressBar';
import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { useRef, useState } from 'react';
import useSWR from 'swr';

import { getDashBoardData } from '../../apis/fetcher';
import { IcClose } from '../../assets/icons';
import { handleProcessBarColor } from '../../utils/handleProcessBarColor';
import CheckInLogs from './CheckInLogs';
import KrCheckIn from './krCheckIn/KrCheckIn';
import KRPeriodSelect from './KRPeriodSelect';
import KrStatus from './KrStatus';

interface ISideSheetProps {
  isOpen: boolean;
  keyResultId: number;
  objStartAt: string;
  objExpireAt: string;
  objId: number;
  onClose: () => void;
  handleChangeState?: (state: number) => void;
}

const SideSheet = ({
  isOpen,
  keyResultId,
  objStartAt,
  objExpireAt,
  objId,
  onClose,
  handleChangeState,
}: ISideSheetProps) => {
  const { data: sideSheetData } = useSWR([`/v1/key-result/${keyResultId}`], getDashBoardData);
  const krDetailData = sideSheetData?.data;
  const modalRef = useRef<HTMLDivElement>(null);

  const [isCheckInView, setIsCheckInView] = useState(false);
  if (!sideSheetData) return;
  const { title, target, metric, progressBar, krState, startAt, expireAt, logList } = krDetailData;

  const handleCheckInView = () => {
    setIsCheckInView(!isCheckInView);
  };

  const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current === e.target) onClose();
  };

  return (
    <StBackground ref={modalRef} onClick={closeModal}>
      <StContainer $isOpen={isOpen}>
        <section css={krDetailUpperStyles}>
          <StKrDetailHeader>
            <span>KR</span>
            <span>
              <IcClose onClick={onClose} />
              <button onClick={onClose}>x</button>
            </span>
          </StKrDetailHeader>
          <StKrTitle>
            {title} {target.toLocaleString()}
            {metric}
          </StKrTitle>
          <div>
            <ProgressBar
              currentProgress={progressBar}
              progressBarColor={'#444444'}
              progressValueColor={handleProcessBarColor(progressBar)}
              textColor={handleProcessBarColor(progressBar)}
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
          {isCheckInView && (
            <KrCheckIn
              onCancel={handleCheckInView}
              keyResultId={keyResultId}
              title={title}
              target={target}
              metric={metric}
              handleChangeState={handleChangeState}
              objId={objId}
            />
          )}
          {!isCheckInView && (
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
  color: ${({ theme }) => theme.colors.gray_600};
  background-color: ${({ theme }) => theme.colors.sub_mint};
  border-radius: 6px;

  ${({ theme }) => theme.fonts.btn_14_semibold};
`;
