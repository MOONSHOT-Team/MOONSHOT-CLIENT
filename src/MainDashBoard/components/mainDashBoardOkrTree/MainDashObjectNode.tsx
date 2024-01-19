import { CommonObjNode } from '@components/okrTree/nodes/CommonObjNode';
import styled from '@emotion/styled';
export interface IMainBoardObjNodeProps {
  objValue: string;
  objStroke: string;
}

const MainDashObjectNode = ({ objValue, objStroke }: IMainBoardObjNodeProps) => {
  return (
    <CommonObjNode hoverStyle={false} objStroke={objStroke}>
      <StMainDashObjP>{objValue}</StMainDashObjP>
    </CommonObjNode>
  );
};

export default MainDashObjectNode;

const StMainDashObjP = styled.p`
  min-width: 21rem;
  color: ${({ theme }) => theme.colors.gray_000};
  ${({ theme }) => theme.fonts.body_13_medium};

  word-break: normal;
  overflow-wrap: break-word;
`;
