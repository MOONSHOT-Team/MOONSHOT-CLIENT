import StraightLine from '@components/OkrTree/Lines/StraightLine';
import {
  StKrBox,
  StKrBoxWrapper,
  StKrLabel,
  StNodesContainer,
} from '@styles/OkrTree/CommonNodeStyle';

interface IPreviewKrNodesProps {
  idx: number;
  title: string;
}

export const PreviewKrNodes = ({ idx, title }: IPreviewKrNodesProps) => {
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
