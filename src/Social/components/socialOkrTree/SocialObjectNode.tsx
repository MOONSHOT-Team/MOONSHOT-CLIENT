import { CommonObjNode } from '@components/okrTree/nodes/CommonObjNode';
import styled from '@emotion/styled';
export interface IMainBoardObjNodeProps {
  objValue: string;
  objStroke: string;
}

const SocialObjectNodes = ({ objValue, objStroke }: IMainBoardObjNodeProps) => {
  return (
    <CommonObjNode hoverStyle={false} objStroke={objStroke}>
      <StMainDashObjP>{objValue}</StMainDashObjP>
    </CommonObjNode>
  );
};

export default SocialObjectNodes;

const StMainDashObjP = styled.p`
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.body_13_medium};

  word-break: keep-all;
`;
