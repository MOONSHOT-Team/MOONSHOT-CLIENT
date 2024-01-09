import styled from '@emotion/styled';
import { StNodesContainer } from '@styles/OkrTree/CommonNodeStyle';

import StraightLine from '../Lines/StraightLine';

interface IObjectiveNodesStroke {
  title: string;
  objStroke: undefined | string;
}

export const ObjectiveNodes = ({ title, objStroke }: IObjectiveNodesStroke) => {
  return (
    <StNodesContainer>
      <StObjLabel>O</StObjLabel>
      <StObjBoxWrapper>
        <StObjectiveBox $objStroke={objStroke}>
          <StObjBoxText>{title}</StObjBoxText>
        </StObjectiveBox>
        <StraightLine />
      </StObjBoxWrapper>
    </StNodesContainer>
  );
};

/* style definition */

//Objective
const StObjLabel = styled.span`
  position: absolute;
  top: -2.2rem;
  left: 3.2rem;
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.title_11_bold};
`;

const StObjBoxWrapper = styled.div`
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

const StObjBoxText = styled.p`
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.body_13_medium};

  word-break: keep-all;
`;
