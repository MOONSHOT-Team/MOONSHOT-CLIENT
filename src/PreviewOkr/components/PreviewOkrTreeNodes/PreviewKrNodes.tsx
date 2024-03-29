import DynamicInput from '@components/input/DynamicInput';
import StraightLine from '@components/okrTree/lines/StraightLine';
import styled from '@emotion/styled';
import {
  StKrBox,
  StKrBoxWrapper,
  StKrLabel,
  StNodesContainer,
} from '@styles/okrTree/CommonNodeStyle';
import React from 'react';

import { MAX_KR_TITLE } from '../../../AddOkr/constants/OKR_MAX_LENGTH';
import { IKrListInfoTypes } from '../../../AddOkr/types/KrInfoTypes';

interface IPreviewKrNodesProps {
  krIdx: number;
  handleChangeKrTitleValue: (e: React.ChangeEvent<HTMLInputElement>, krIdx: number) => void;
  previewKrListInfo: IKrListInfoTypes[];
}

export const PreviewKrNodes = ({
  krIdx,
  previewKrListInfo,
  handleChangeKrTitleValue,
}: IPreviewKrNodesProps) => {
  const { krTitle, krTarget, krMetric } = previewKrListInfo[krIdx];

  return (
    <StNodesContainer>
      <StKrLabel>KR {krIdx + 1}</StKrLabel>
      <StKrBoxWrapper>
        <StraightLine />
        <StPreviewKrBox>
          <DynamicInput
            value={krTitle}
            handleChangeValue={(e) => handleChangeKrTitleValue(e, krIdx)}
            maxLength={MAX_KR_TITLE}
          />

          {/*수치 값*/}
          <StPreviewKrBoxValue>
            <span>:</span>
            <span>
              {krTarget}
              {krMetric}
            </span>
          </StPreviewKrBoxValue>
        </StPreviewKrBox>
        <StraightLine />
      </StKrBoxWrapper>
    </StNodesContainer>
  );
};

const StPreviewKrBox = styled(StKrBox)`
  display: flex;
  gap: 0.3rem;
`;

const StPreviewKrBoxValue = styled.p`
  display: flex;
  gap: 0.4rem;
  margin-right: 0.1rem;
  color: ${({ theme }) => theme.colors.gray_400};

  ${({ theme }) => theme.fonts.body_13_medium};

  cursor: default;
`;
