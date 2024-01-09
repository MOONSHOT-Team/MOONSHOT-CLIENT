import { Theme } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';

import {
  IcDoneState,
  IcDropDownThin,
  IcDropUpThin,
  IcHoldState,
  IcOnGoingState,
  IcWaitState,
} from '../../assets/icons';

const KRSTATUS = [
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

const KrStatus = () => {
  const [krStatusLabel, setKrStatusLabel] = useState('진행');
  const [krStatusIcon, setKrStatusIcon] = useState<React.ReactNode>(<IcOnGoingState />);
  const [isDrop, setIsDrop] = useState(false);

  useEffect(() => {
    const tmp = KRSTATUS.find((status) => status.label === krStatusLabel)?.icon;
    if (tmp) setKrStatusIcon(tmp);
  }, [krStatusLabel]);

  const handleKrStatus = (currentStatusLabel: string) => {
    setKrStatusLabel(currentStatusLabel);
    setIsDrop(false);
  };

  const handleIsDrop = () => {
    setIsDrop(!isDrop);
  };
  return (
    <>
      <StContainer isDrop={isDrop}>
        <KrStatusItem icon={krStatusIcon} label={krStatusLabel} />
        {isDrop ? (
          <IcDropUpThin onClick={handleIsDrop} />
        ) : (
          <IcDropDownThin onClick={handleIsDrop} />
        )}
      </StContainer>
      {isDrop && (
        <StStatusContainer>
          {KRSTATUS.filter(({ label }) => label !== krStatusLabel).map(({ icon, label }) => (
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

const StContainer = styled.div<{ isDrop: boolean }>`
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
