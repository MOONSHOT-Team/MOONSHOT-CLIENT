import StraightLine from '@components/okrTree/lines/StraightLine';
import styled from '@emotion/styled';
import {
  StKrBox,
  StKrBoxWrapper,
  StKrLabel,
  StNodesContainer,
} from '@styles/okrTree/CommonNodeStyle';
import { IKeyResultTypes } from '@type/okrTree/KeyResultTypes';

import { IcDrag } from '../../assets/icons';

interface IMainDashKrNodesProps {
  krIdx: number;
  krList: IKeyResultTypes;
  onShowSideSheet: (krId: number | undefined) => void;
  currentKrId: number;
}

export const MainDashKrNodes = ({
  krIdx,
  krList,
  onShowSideSheet,
  currentKrId,
}: IMainDashKrNodesProps) => {
  if (!krList) return;
  const { krTitle, krId } = krList;

  return (
    <StNodesContainer>
      <StKrLabel>KR {krIdx + 1}</StKrLabel>
      <StMainDashKrBoxWrapper>
        <StraightLine />
        <StyledIcDrag />
        <StMainDashBox
          isActive={currentKrId === krId}
          onClick={() => {
            onShowSideSheet(krId);
          }}
        >
          {krTitle}
        </StMainDashBox>
        {krList.taskList.length !== 0 && <StraightLine />}
      </StMainDashKrBoxWrapper>
    </StNodesContainer>
  );
};

const StMainDashKrBoxWrapper = styled(StKrBoxWrapper)`
  display: flex;
  align-items: center;
`;

const StyledIcDrag = styled(IcDrag)`
  margin: 0 0.5rem 0 0.6rem;
`;

const StMainDashBox = styled(StKrBox)<{ isActive: boolean }>`
  color: ${({ theme }) => theme.colors.gray_000};
  cursor: pointer;
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.transparent_purple : theme.colors.gray_600};

  ${({ theme }) => theme.fonts.body_13_medium};
`;
