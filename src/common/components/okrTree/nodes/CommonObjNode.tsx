import styled from '@emotion/styled';
import { StNodesContainer } from '@styles/okrTree/CommonNodeStyle';
import React from 'react';

import StraightLine from '../lines/StraightLine';

interface IObjectiveNodeProps {
  children: React.ReactNode;
  objStroke?: undefined | string;
  hoverStyle?: undefined | boolean;
}

export const CommonObjNode = ({ children, objStroke, hoverStyle }: IObjectiveNodeProps) => {
  return (
    <StNodesContainer>
      <StObjLabel>O</StObjLabel>
      <StObjBoxWrapper>
        <StObjectiveBox $objStroke={objStroke} $hoverStyle={hoverStyle}>
          {children}
        </StObjectiveBox>
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

export const StObjectiveBox = styled.div<{
  $objStroke: undefined | string;
  $hoverStyle: undefined | boolean;
}>`
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

  &:hover {
    background-color: ${({ theme, $hoverStyle }) => $hoverStyle && theme.colors.gray_550};
  }
`;
