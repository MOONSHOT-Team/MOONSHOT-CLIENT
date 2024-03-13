import StraightLine from '@components/okrTree/lines/StraightLine';
import {
  StObjBoxWrapper,
  StObjectiveBox,
  StObjLabel,
} from '@components/okrTree/nodes/CommonObjNode';
import styled from '@emotion/styled';
import { StNodesContainer } from '@styles/okrTree/CommonNodeStyle';

import { IcAdd } from '../../assets/icons';
import { IMainBoardObjNodeProps, StMainDashObjP } from '../mainDashBoardOkrTree/MainDashObjectNode';

const EditObjectNode = ({ objValue, objStroke }: IMainBoardObjNodeProps) => {
  return (
    <StNodesContainer>
      <StObjLabel>O</StObjLabel>
      <StObjBoxWrapper>
        <StObjectiveBox $objStroke={objStroke} $hoverStyle={false}>
          <StMainDashObjP>{objValue}</StMainDashObjP>
        </StObjectiveBox>
        <StraightLine />
        <StIcAdd
          onClick={() => {
            //kr추가 모달띄우는 버튼
          }}
        />
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
