import StraightLine from '@components/OkrTree/Lines/StraightLine';
import {
  StKrBox,
  StKrBoxWrapper,
  StKrLabel,
  StNodesContainer,
} from '@styles/OkrTree/CommonNodeStyle';
import { IKeyResultTypes } from '@type/OkrTree/KeyResultTypes';

export const PreviewKrNodes = ({ idx, title }: IKeyResultTypes) => {
  return (
    <StNodesContainer>
      <StKrLabel>KR {idx + 1}</StKrLabel>
      <StKrBoxWrapper>
        <StraightLine />
        <StKrBox>{title}</StKrBox>
      </StKrBoxWrapper>
    </StNodesContainer>
  );
};
