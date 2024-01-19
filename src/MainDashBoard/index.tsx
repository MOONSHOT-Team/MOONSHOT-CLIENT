/* eslint-disable react/prop-types */
import Loading from '@components/Lodaing';
import { css } from '@emotion/react';
import useModal from '@hooks/useModal';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useSWR from 'swr';

import SelectMethod from '../AddOkr/components/stepLayout/SelectMethod';
import { getDashBoardData } from './apis/fetcher';
import CelebrateMotion from './components/celebrateMotion/CelebrateMotion';
import DrawerModal from './components/drawer/DrawerModal';
import MainDashBoardDrawer from './components/mainDashBoardDrawer/MainDashBoardDrawer';
import MainDashboardOKRTree from './components/mainDashBoardOkrTree/MainDashboardOKRTree';
import SideSheet from './components/sideSheet/SideSheet';

const DASHBOARD_SHOW_STATE = ['OKR_TREE', 'ADD_SELECT_METHOD', 'CONGRATE'];

const MainDashBoard = () => {
  const { modalRef, handleShowModal } = useModal();

  const location = useLocation();
  const navigate = useNavigate();

  const [showSideSheet, setShowSideSheet] = useState<boolean>(false);
  const [currentGoalId, setCurrentGoalId] = useState<number>();
  const [currentKrId, setCurrentKrId] = useState<number>(0);

  const [showState, setShowState] = useState(DASHBOARD_SHOW_STATE[0]);

  // Step 0 - SELECT METHOD 관련 State
  const [selectedMethod, setSelectedMethod] = useState('');

  //동적 파라미터 url
  const url = currentGoalId ? `/v1/objective?objectiveId=${currentGoalId}` : '/v1/objective';
  const { data: treeData, isLoading } = useSWR(url, getDashBoardData);

  if (treeData?.tree?.objIsExpired) {
    handleShowModal();
  }
  // stpe 0 - SELECT METHOD 관련 handler
  const handleClickMethodBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedMethod(e.currentTarget.id);
    navigate('/add-okr', { state: { selectedMethod: e.currentTarget.id } });
  };

  //목표 추가하기 버튼 눌렀을 때 핸들러
  const handleClickAddObjcBtn = () => {
    setShowState(DASHBOARD_SHOW_STATE[1]);
  };

  //showState 바꿔주는 핸들러
  const handleChangeState = (state: number) => {
    setShowState(DASHBOARD_SHOW_STATE[state]);
  };

  const renderMainState = () => {
    if (isLoading) return <Loading />;
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
              <Loading />
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
  useEffect(() => {
    // add-okr에서 '처음으로'로 돌아오면 방식 선택 화면 뜨도록
    location.state ? setShowState(DASHBOARD_SHOW_STATE[1]) : setShowState(DASHBOARD_SHOW_STATE[0]);
  }, [location.state]);

  const okrTreeData = treeData?.data.tree;
  const goalListTreeData = treeData?.data.objList;

  const handleShowSideSheet = (id: number) => {
    setCurrentKrId(id);
    setShowSideSheet(true);
  };

  const handleCloseSideSheet = () => {
    setShowSideSheet(false);
  };

  const handleCurrentGoalId = (id: number) => {
    setCurrentGoalId(id);
  };

  return (
    <>
      {renderMainState()}
      {treeData?.data?.tree && (
        <DrawerModal
          currentObjId={okrTreeData?.objId}
          ref={modalRef}
          handleChangeState={handleChangeState}
          objExpireAt={okrTreeData.objExpireAt}
        />
      )}
    </>
  );
};

export default MainDashBoard;

const mainDashboardStyle = css`
  display: flex;
  width: 100vw;
  height: 100%;
`;
