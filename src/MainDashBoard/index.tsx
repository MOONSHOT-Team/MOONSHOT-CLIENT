/* eslint-disable react/prop-types */
import instance from '@apis/instance';
import Loading from '@components/Loading';
import { css } from '@emotion/react';
import useModal from '@hooks/useModal';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useSWR from 'swr';

import SelectMethod from '../AddOkr/components/stepLayout/SelectMethod';
import { deleteObj, getDashBoardData } from './apis/fetcher';
import CelebrateMotion from './components/celebrateMotion/CelebrateMotion';
import MainDashBoardDrawer from './components/mainDashBoardDrawer/MainDashBoardDrawer';
import CompleteObjConfirmModal from './components/mainDashboardModal/CompleteObjConfirmModal';
import DeleteObjConfirmModal from './components/mainDashboardModal/DeleteObjConfirmModal';
import DrawerModal from './components/mainDashboardModal/DrawerModal';
import MainDashboardOKRTree from './components/mainDashBoardOkrTree/MainDashboardOKRTree';
import SideSheet from './components/sideSheet/SideSheet';
import { MAINDASHBOARD_MODAL_CASE } from './constants/MAINDASHBOARD_MODAL_CASE';

const DASHBOARD_SHOW_STATE = ['OKR_TREE', 'ADD_SELECT_METHOD', 'CONGRATE'];

export interface IRightClickStateTypes {
  isRightClick: boolean;
  rightClickId?: number | null;
  rightClickPoints: {
    x: number | null;
    y: number | null;
  };
}

const MainDashBoard = () => {
  const { modalRef, handleShowModal } = useModal();

  const location = useLocation();
  const navigate = useNavigate();

  const [showSideSheet, setShowSideSheet] = useState<boolean>(false);
  const [currentGoalId, setCurrentGoalId] = useState<number>();
  const [currentKrId, setCurrentKrId] = useState<number>(0);

  const [showState, setShowState] = useState(DASHBOARD_SHOW_STATE[0]);
  const [targetModal, setTargetModal] = useState<string | null>(null);

  // step 0 - SELECT METHOD 관련 State
  const [selectedMethod, setSelectedMethod] = useState('');

  //우클릭 관련 state
  const [rightClickState, setRightClickState] = useState<IRightClickStateTypes>({
    isRightClick: false,
    rightClickId: null,
    rightClickPoints: {
      x: null,
      y: null,
    },
  });

  //동적 파라미터 url
  const url = currentGoalId ? `/v1/objective?objectiveId=${currentGoalId}` : '/v1/objective';
  const { data: treeData, isLoading, mutate } = useSWR(url, getDashBoardData);
  const okrTreeData = treeData?.data.tree;
  const goalListTreeData = treeData?.data.objList;

  if (treeData?.tree?.objIsExpired) {
    setTargetModal(MAINDASHBOARD_MODAL_CASE.OBJ.PERIOD);
  }

  /** 
   핸들러 함수들
   **/
  // step 0 - SELECT METHOD 관련 handler
  const handleClickMethodBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedMethod(e.currentTarget.id);
    navigate('/add-okr', { state: { selectedMethod: e.currentTarget.id } });
  };

  //showState 바꿔주는 핸들러
  const handleChangeState = (state: number) => {
    setShowState(DASHBOARD_SHOW_STATE[state]);
  };

  /** Drawer 관련 핸들러 함수 **/
  //목표 추가하기 버튼 눌렀을 때 핸들러
  const handleClickAddObjcBtn = () => {
    setShowState(DASHBOARD_SHOW_STATE[1]);
  };

  const handleCurrentGoalId = (id: number | number) => {
    if (!id) return;
    setCurrentGoalId(id);
  };

  //우클릭의 삭제 버튼 클릭 시의 핸들러
  const handleClickDelObjBtn = () => {
    setTargetModal(MAINDASHBOARD_MODAL_CASE.OBJ.DEL);
  };

  //우클릭의 완료 버튼 클릭 시의 핸들러
  const handleClickCompleteObjBtn = () => {
    setTargetModal(MAINDASHBOARD_MODAL_CASE.OBJ.COMPLETE);
  };

  //목표 삭제 모달 -> 삭제 버튼 클릭 시의 핸들러
  const handleComfirmDelObj = async () => {
    setTargetModal(null);
    try {
      await deleteObj(`/v1/objective/${rightClickState.rightClickId}`);
      mutate();
    } catch {
      navigate('/error');
    }
  };

  //목표 완료 모달 -> 완료 버튼 클릭 시의 핸들러
  const handleComfirmCompleteObj = async () => {
    await instance.patch('/v1/objective', {
      objectiveId: rightClickState.rightClickId,
      isClosed: true,
    });
    //목표 완료 -> 대시보드
    navigate('/history');
  };

  /** SideSheet 관련 핸들러 함수 **/
  const handleShowSideSheet = (id: number | undefined) => {
    if (!id) return;
    setCurrentKrId(id);
    setShowSideSheet(true);
  };

  const handleCloseSideSheet = () => {
    setShowSideSheet(false);
  };

  /** 
  조건부 렌더링 함수들
  **/

  const renderMainState = () => {
    if (isLoading) return <Loading isDrawer={true} />;
    switch (showState) {
      // 일반 대시보드 화면 = okr Tree 있는 화면 or Empty view
      case DASHBOARD_SHOW_STATE[0]:
        return (
          <>
            <section css={mainDashboardStyle}>
              <MainDashBoardDrawer
                objList={goalListTreeData}
                onChangeCurrentGoalId={handleCurrentGoalId}
                handleClickAddObjcBtn={handleClickAddObjcBtn}
                objListSize={okrTreeData?.objListSize}
                objId={okrTreeData?.objId}
                showState={showState}
                rightClickState={rightClickState}
                setRightClickState={setRightClickState}
                handleClickDelObjBtn={handleClickDelObjBtn}
                handleClickCompleteObjBtn={handleClickCompleteObjBtn}
              />
              <MainDashboardOKRTree
                onShowSideSheet={handleShowSideSheet}
                currentOkrData={okrTreeData}
              />
            </section>
            {showSideSheet && (
              <SideSheet
                isOpen={showSideSheet}
                onClose={handleCloseSideSheet}
                keyResultId={currentKrId}
                objStartAt={okrTreeData.objStartAt}
                objExpireAt={okrTreeData.objExpireAt}
                handleChangeState={handleChangeState}
                objId={okrTreeData?.objId}
              />
            )}
          </>
        );
      case DASHBOARD_SHOW_STATE[1]:
        return (
          <section css={mainDashboardStyle}>
            <MainDashBoardDrawer
              objList={goalListTreeData}
              onChangeCurrentGoalId={handleCurrentGoalId}
              handleClickAddObjcBtn={handleClickAddObjcBtn}
              handleChangeState={handleChangeState}
              objListSize={okrTreeData?.objListSize}
              objId={okrTreeData?.objId}
              showState={showState}
              rightClickState={rightClickState}
              setRightClickState={setRightClickState}
              handleClickDelObjBtn={handleClickDelObjBtn}
              handleClickCompleteObjBtn={handleClickCompleteObjBtn}
            />
            <SelectMethod
              selectedMethod={selectedMethod}
              handleClickMethodBtn={handleClickMethodBtn}
            />
          </section>
        );
      case DASHBOARD_SHOW_STATE[2]:
        return (
          <>
            {isLoading ? (
              <Loading isDrawer={true} />
            ) : (
              <CelebrateMotion
                handleChangeState={handleChangeState}
                nickname={treeData.data.nickname}
                currentObjId={okrTreeData?.objId}
              />
            )}
          </>
        );
    }
  };

  const renderTargetModal = (targetModal: string | null) => {
    switch (targetModal) {
      // 목표 기간 연장 모달
      case MAINDASHBOARD_MODAL_CASE.OBJ.PERIOD:
        return (
          treeData?.data?.tree && (
            <DrawerModal
              currentObjId={okrTreeData?.objId}
              ref={modalRef}
              handleChangeState={handleChangeState}
              objExpireAt={okrTreeData.objExpireAt}
            />
          )
        );
      // 목표 삭제 모달
      case MAINDASHBOARD_MODAL_CASE.OBJ.DEL:
        return (
          <DeleteObjConfirmModal
            modalRef={modalRef}
            modalConfirmHandler={{
              handleClickCancel: () => {
                setTargetModal(null);
              },
              handleClickConfirm: handleComfirmDelObj,
            }}
          />
        );
      //목표 완료 모달
      case MAINDASHBOARD_MODAL_CASE.OBJ.COMPLETE:
        return (
          <CompleteObjConfirmModal
            modalRef={modalRef}
            modalConfirmHandler={{
              handleClickCancel: () => {
                setTargetModal(null);
              },
              handleClickConfirm: handleComfirmCompleteObj,
            }}
          />
        );
    }
  };

  useEffect(() => {
    // add-okr에서 '처음으로'로 돌아오면 방식 선택 화면 뜨도록
    location.state ? setShowState(DASHBOARD_SHOW_STATE[1]) : setShowState(DASHBOARD_SHOW_STATE[0]);
  }, [location.state]);

  useEffect(() => {
    //targetModal 바뀌면 감지
    if (targetModal === null) return;

    handleShowModal();
  }, [targetModal]);

  return (
    <>
      {renderMainState()}
      {renderTargetModal(targetModal)}
    </>
  );
};

export default MainDashBoard;

const mainDashboardStyle = css`
  display: flex;
  width: 100vw;
  height: 100%;
`;
