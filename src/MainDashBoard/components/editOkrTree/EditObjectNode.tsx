import StraightLine from '@components/okrTree/lines/StraightLine';
import {
  StObjBoxWrapper,
  StObjectiveBox,
  StObjLabel,
} from '@components/okrTree/nodes/CommonObjNode';
import styled from '@emotion/styled';
import { StNodesContainer } from '@styles/okrTree/CommonNodeStyle';
import { useEffect, useState } from 'react';

import { IcAdd } from '../../assets/icons';
import { IMainBoardObjNodeProps, StMainDashObjP } from '../mainDashBoardOkrTree/MainDashObjectNode';

interface IEditObjectNode extends IMainBoardObjNodeProps {
  objId: number;
  krListLen: number;
}

const EditObjectNode = ({ objValue, objStroke, objId, krListLen }: IEditObjectNode) => {
  const [isntFull, setIsntFull] = useState(false);
  useEffect(() => {
    if (krListLen >= 3) {
      setIsntFull(false);
      return;
    }
    if (krListLen < 3) {
      setIsntFull(true);
      return;
    }
  }, [krListLen]);
  return (
    <StNodesContainer>
      <StObjLabel>O</StObjLabel>
      <StObjBoxWrapper>
        <StObjectiveBox $objStroke={objStroke} $hoverStyle={false}>
          <StMainDashObjP>{objValue}</StMainDashObjP>
        </StObjectiveBox>
        <StraightLine />
        {isntFull && (
          <StIcAdd
            onClick={() => {
              //kr추가 모달띄우는 버튼
              console.log(objId);
            }}
          />
        )}
      </StObjBoxWrapper>
    </StNodesContainer>
  );
};

export default EditObjectNode;

const StIcAdd = styled(IcAdd)`
  position: absolute;
  right: -10px;
  z-index: 1;
`;
