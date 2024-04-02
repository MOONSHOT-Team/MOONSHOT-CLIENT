import { CommonObjNode } from '@components/okrTree/nodes/CommonObjNode';

import { StMainDashObjP } from '../../styles/mainDashOKRTreeStyles';
export interface IMainBoardObjNodeProps {
  objValue?: string;
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
