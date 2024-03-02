import { Theme } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mutate } from 'swr';

import { patchCheckIn } from '../../apis/fetcher';
import {
  IcDoneState,
  IcDropDownThin,
  IcDropUpThin,
  IcHoldState,
  IcOnGoingState,
  IcWaitState,
} from '../../assets/icons';

const KR_STATUS = [
  { icon: <IcOnGoingState />, label: '진행' },
  { icon: <IcWaitState />, label: '대기' },
  { icon: <IcHoldState />, label: '보류' },
  { icon: <IcDoneState />, label: '완료' },
];

interface IKrStatusItemProps {
  icon: React.ReactNode;
  label: string;
}

const KrStatusItem = ({ icon, label }: IKrStatusItemProps) => {
  return (
    <StState label={label}>
      {icon}
      {label}
    </StState>
  );
};

const KrStatus = ({ krStatus, keyResultId }: { krStatus: string; keyResultId: number }) => {
  const [krStatusLabel, setKrStatusLabel] = useState(krStatus);
  const [krStatusIcon, setKrStatusIcon] = useState<React.ReactNode>(<IcOnGoingState />);
  const [isDrop, setIsDrop] = useState(false);
  const navigator = useNavigate();

  useEffect(() => {
    const tmp = KR_STATUS.find((status) => status.label === krStatusLabel)?.icon;
    if (tmp) setKrStatusIcon(tmp);
  }, [krStatusLabel]);

  const handleKrStatus = async (currentStatusLabel: string) => {
    setKrStatusLabel(currentStatusLabel);
    const data = {
      keyResultId: keyResultId,
      state: currentStatusLabel,
    };

    try {
      await patchCheckIn('/v1/key-result', data);
      await mutate(`/v1/key-result/${keyResultId}`);
    } catch {
      navigator('/error');
    }
    setIsDrop(false);
  };

  const handleIsDrop = () => {
    setIsDrop(!isDrop);
  };
  return (
    <>
      <StContainer type="button" isDrop={isDrop} onClick={handleIsDrop}>
        <KrStatusItem icon={krStatusIcon} label={krStatusLabel} />
        {isDrop ? <IcDropUpThin /> : <IcDropDownThin />}
      </StContainer>
      {isDrop && (
        <StStatusContainer>
          {KR_STATUS.filter(({ label }) => label !== krStatusLabel).map(({ icon, label }) => (
            <StStateContainer key={label} type="button" onClick={() => handleKrStatus(label)}>
              <KrStatusItem icon={icon} label={label} />
            </StStateContainer>
          ))}
        </StStatusContainer>
      )}
    </>
  );
};

export default KrStatus;

const StContainer = styled.button<{ isDrop: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 7.4rem;
  height: 2.4rem;
  padding: 0.6rem;
  background-color: ${({ theme }) => theme.colors.gray_500};
  border-radius: ${({ isDrop }) => (isDrop ? '3px 3px 0px 0px' : '3px')};
`;

const StStateContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 7.4rem;
  height: 2.4rem;
  padding: 0.6rem;
  background-color: ${({ theme }) => theme.colors.gray_550};

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray_500};
  }
`;

const StStatusContainer = styled.div`
  position: absolute;
  z-index: 1;
`;

const getColorFromLabel = (theme: Theme, label: string) => {
  switch (label) {
    case '진행':
      return theme.colors.sub_yellow;
    case '대기':
      return theme.colors.main_purple;
    case '보류':
      return theme.colors.sub_pink;
    case '완료':
      return theme.colors.sub_mint;
    default:
      return;
  }
};

const StState = styled.span<{ label: string }>`
  display: flex;
  gap: 0.6rem;
  align-items: center;
  color: ${({ theme, label }) => getColorFromLabel(theme, label)};
  ${({ theme }) => theme.fonts.btn_11_semibold};
`;
