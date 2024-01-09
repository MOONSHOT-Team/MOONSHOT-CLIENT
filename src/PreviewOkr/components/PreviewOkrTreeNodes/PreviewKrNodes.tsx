import StraightLine from '@components/OkrTree/lines/StraightLine';
import {
  StKrBox,
  StKrBoxWrapper,
  StKrLabel,
  StNodesContainer,
} from '@styles/okrTree/CommonNodeStyle';
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
