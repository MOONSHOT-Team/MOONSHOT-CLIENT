import StraightLine from '@components/okrTree/lines/StraightLine';
import {
  StObjBoxWrapper,
  StObjectiveBox,
  StObjLabel,
} from '@components/okrTree/nodes/CommonObjNode';
import styled from '@emotion/styled';
import useModal from '@hooks/useModal';
import { StNodesContainer } from '@styles/okrTree/CommonNodeStyle';
import { useEffect, useState } from 'react';

import { IcAdd } from '../../assets/icons';
import AddKrModal from '../editModeModal/AddKrModal';
import { IMainBoardObjNodeProps, StMainDashObjP } from '../mainDashBoardOkrTree/MainDashObjectNode';

interface IEditObjectNode extends IMainBoardObjNodeProps {
  objInfo: { objId: number; objStartAt: string; objExpireAt: string; objTitle: string };
  krListLen: number;
}

const EditObjectNode = ({ objStroke, objInfo, krListLen }: IEditObjectNode) => {
  const { objTitle } = objInfo;
  // const navigate = useNavigate();

  const { modalRef, handleShowModal } = useModal();

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
    <>
      <AddKrModal modalRef={modalRef} objInfo={objInfo} krIdx={krListLen} />
      <StNodesContainer>
        <StObjLabel>O</StObjLabel>
        <StObjBoxWrapper>
          <StObjectiveBox $objStroke={objStroke} $hoverStyle={false}>
            <StMainDashObjP>{objTitle}</StMainDashObjP>
          </StObjectiveBox>
          <StraightLine />
          {isntFull && (
            <StIcAdd
              onClick={() => {
                //kr추가 모달띄우는 버튼
                handleShowModal();
              }}
            />
          )}
        </StObjBoxWrapper>
      </StNodesContainer>
    </>
  );
};

export default EditObjectNode;

const StIcAdd = styled(IcAdd)`
  position: absolute;
  right: -10px;
  z-index: 1;
`;
