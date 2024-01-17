/* eslint-disable react/prop-types */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import SelectMethod from '../AddOkr/components/stepLayout/SelectMethod';
import CelebrateMotion from './components/celebrateMotion/CelebrateMotion';
import MainDashBoardDrawer from './components/mainDashBoardDrawer/MainDashBoardDrawer';
import MainDashboardOKRTree from './components/mainDashBoardOkrTree/MainDashboardOKRTree';
import SideSheet from './components/sideSheet/SideSheet';
import { GOAL_DATA } from './constants/GOAL_DATA';
import { MOCK_MAIN_OKR_DATA } from './constants/MOCK_MAIN_OKR_DATA';
import { IobjListTypes } from './type/goalItemTypes';
import { IMainData } from './type/MainDashboardDataTypes';

const DASHBOARD_SHOW_STATE = ['OKR_TREE', 'ADD_SELECT_METHOD', 'CONGRATE'];
// const OKR_TREE = DASHBOARD_SHOW_STATE[0];
// const ADD_SELECT_METHOD = DASHBOARD_SHOW_STATE[1];
// const CONGRATE = DASHBOARD_SHOW_STATE[2];

const MainDashBoard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // const {data, error, isLoading} = useSWR('/v1//v1/objective/{objectiveId}')

  const [showSideSheet, setShowSideSheet] = useState<boolean>(false);
  // const [showCelebrate] = useState(false); //축하 모션 보이는 여부 플래그
  const [objList, setObjList] = useState<IobjListTypes[]>([]);
  const [, setCurrentGoalId] = useState<number>(0);
  const [currentOKRData, setCurrentOKRData] = useState<IMainData>();

  const [showState, setShowState] = useState(DASHBOARD_SHOW_STATE[0]);

  // Step 0 - SELECT METHOD 관련 State
  const [selectedMethod, setSelectedMethod] = useState('');

  // stpe 0 - SELECT METHOD 관련 handler
  const handleClickMethodBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedMethod(e.currentTarget.id);
    navigate('/add-okr', { state: { selectedMethod: e.currentTarget.id } });
  };

  const handleClickAddObjcBtn = () => {
    setShowState(DASHBOARD_SHOW_STATE[1]);
  };

  const renderMainState = () => {
    switch (showState) {
      // 일반 대시보드 화면 = okr Tree 있는 화면 or Empty view
      case DASHBOARD_SHOW_STATE[0]:
        return (
          <>
            <section css={mainDashboardStyle}>
              <MainDashBoardDrawer
                objList={objList}
                onChangeCurrentGoalId={handleCurrentGoalId}
                handleClickAddObjcBtn={handleClickAddObjcBtn}
              />
              <MainDashboardOKRTree
                onShowSideSheet={handleShowSideSheet}
                currentOkrData={currentOKRData}
              />
            </section>
            {showSideSheet && <SideSheet isOpen={showSideSheet} onClose={handleCloseSideSheet} />}
          </>
        );
      case DASHBOARD_SHOW_STATE[1]:
        return (
          <section css={mainDashboardStyle}>
            <MainDashBoardDrawer
              objList={objList}
              onChangeCurrentGoalId={handleCurrentGoalId}
              handleClickAddObjcBtn={handleClickAddObjcBtn}
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
            <CelebrateMotion />
          </>
        );
    }
  };

  useEffect(() => {
    //서버통신
    setCurrentOKRData(MOCK_MAIN_OKR_DATA);
    setObjList(GOAL_DATA.objList);

    // add-okr에서 '처음으로'로 돌아오면 방식 선택 화면 뜨도록
    location.state ? setShowState(DASHBOARD_SHOW_STATE[1]) : setShowState(DASHBOARD_SHOW_STATE[0]);
  }, [location.state]);

  useEffect(() => {});

  const handleShowSideSheet = () => {
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
      {/* {showCelebrate ? (
        <>
          <CelebrateMotion />
        </>
      ) : (
        <>
          <section css={mainDashboardStyle}>
            <MainDashBoardDrawer objList={objList} onChangeCurrentGoalId={handleCurrentGoalId} />
            <MainDashboardOKRTree
              onShowSideSheet={handleShowSideSheet}
              currentOkrData={currentOKRData}
            />
          </section>
          {showSideSheet && <SideSheet isOpen={showSideSheet} onClose={handleCloseSideSheet} />}
        </>
      )} */}
      {renderMainState()}
    </>
  );
};

export default MainDashBoard;

const mainDashboardStyle = css`
  display: flex;
  width: 100vw;
  height: 100%;
`;
