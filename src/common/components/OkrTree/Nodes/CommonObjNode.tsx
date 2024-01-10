import styled from '@emotion/styled';
import { StNodesContainer } from '@styles/okrTree/CommonNodeStyle';
import React from 'react';

import StraightLine from '../lines/StraightLine';

interface IObjectiveNodeProps {
  children: React.ReactNode;
  objStroke?: undefined | string;
}

export const CommonObjNode = ({ children, objStroke }: IObjectiveNodeProps) => {
  return (
    <StNodesContainer>
      <StObjLabel>O</StObjLabel>
      <StObjBoxWrapper>
        <StObjectiveBox $objStroke={objStroke}>{children}</StObjectiveBox>
        <StraightLine />
      </StObjBoxWrapper>
    </StNodesContainer>
  );
};

/* style definition */

//Objective
export const StObjLabel = styled.span`
  position: absolute;
  top: -2.2rem;
  left: 3.2rem;
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.title_11_bold};
`;

export const StObjBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StObjectiveBox = styled.div<{ $objStroke: undefined | string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  max-width: 21.6rem;
  padding: 1.4rem 2.4rem;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 75px;
  outline: 1px solid ${({ $objStroke, theme }) => ($objStroke ? $objStroke : theme.colors.gray_500)};
`;

// const StObjBoxText = styled.p`
//   color: ${({ theme }) => theme.colors.gray_000};
//   word-break: keep-all;

//   ${({ theme }) => theme.fonts.body_13_medium};
// `;
