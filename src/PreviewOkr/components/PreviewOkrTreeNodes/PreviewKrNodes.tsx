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

import { MAX_KR_TITLE } from '../../../AddOkr/constants/MAX_KR_LENGTH';
import { IKrListInfoTypes } from '../../../AddOkr/types/KrInfoTypes';

interface IPreviewKrNodesProps {
  krIdx: number;
  previewKrListInfo: IKrListInfoTypes[];
  setPreviewKrListInfo: React.Dispatch<React.SetStateAction<IKrListInfoTypes[]>>;
}

export const PreviewKrNodes = ({
  krIdx,
  previewKrListInfo,
  setPreviewKrListInfo,
}: IPreviewKrNodesProps) => {
  const title = previewKrListInfo[krIdx].title;
  const target = previewKrListInfo[krIdx].target;
  const metric = previewKrListInfo[krIdx].metric;

  const handleChangeTitleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    previewKrListInfo[krIdx].title = e.target.value;
    setPreviewKrListInfo([...previewKrListInfo]);
  };

  return (
    <StNodesContainer>
      <StKrLabel>KR {krIdx + 1}</StKrLabel>
      <StKrBoxWrapper>
        <StraightLine />
        <StPreviewKrBox>
          {/*수치 값 앞 문장*/}
          {title && (
            <DynamicInput
              value={title}
              handleChangeValue={handleChangeTitleValue}
              maxLength={MAX_KR_TITLE}
            />
          )}

          {/*수치 값*/}
          <StPreviewKrBoxValue>
            <span>:</span>
            <span>
              {target}
              {metric}
            </span>
          </StPreviewKrBoxValue>
        </StPreviewKrBox>
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
