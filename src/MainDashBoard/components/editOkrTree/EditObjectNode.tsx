import StraightLine from '@components/okrTree/lines/StraightLine';
import {
  StObjBoxWrapper,
  StObjectiveBox,
  StObjLabel,
} from '@components/okrTree/nodes/CommonObjNode';
import styled from '@emotion/styled';
import useModal from '@hooks/useModal';
import { StNodesContainer } from '@styles/okrTree/CommonNodeStyle';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import useSWR from 'swr';

import { getDashBoardData } from '../../apis/fetcher';
import { IcAdd } from '../../assets/icons';
import { MAINDASHBOARD_KEY } from '../../constants/mainDashConstants';
import { StMainDashObjP } from '../../styles/mainDashOKRTreeStyles';
import AddKrModal from '../editModeModal/AddKrModal';
import { IMainBoardObjNodeProps } from '../mainDashBoardOkrTree/MainDashObjectNode';

interface IEditObjectNode extends IMainBoardObjNodeProps {
  objInfo: { objId: number; objStartAt: string; objExpireAt: string; objTitle: string };
  krListLen: number;
  viewMode: string;
  setViewMode: Dispatch<SetStateAction<string>>;
}

const EditObjectNode = ({
  objStroke,
  objInfo,
  krListLen,
  viewMode,
  setViewMode,
}: IEditObjectNode) => {
  const { objTitle, objId } = objInfo;

  const url = objId ? `/v1/objective?objectiveId=${objId}` : '/v1/objective';
  const { mutate } = useSWR([url, MAINDASHBOARD_KEY], getDashBoardData);

  const { modalRef, handleShowModal } = useModal();

  const [isntFull, setIsntFull] = useState(false);

  const mutateFcn = () => {
    mutate();
    setViewMode(viewMode);
  };

  useEffect(() => {
    krListLen < 3 ? setIsntFull(true) : setIsntFull(false);
  }, [krListLen]);

  return (
    <>
      <AddKrModal modalRef={modalRef} objInfo={objInfo} krIdx={krListLen} mutateFcn={mutateFcn} />
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
