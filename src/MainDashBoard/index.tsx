/* eslint-disable react/prop-types */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';

import { getDashBoardData } from './apis/fetcher';
import CelebrateMotion from './components/celebrateMotion/CelebrateMotion';
import MainDashBoardDrawer from './components/mainDashBoardDrawer/MainDashBoardDrawer';
import MainDashboardOKRTree from './components/mainDashBoardOkrTree/MainDashboardOKRTree';
import SideSheet from './components/sideSheet/SideSheet';
import { IobjListTypes } from './type/goalItemTypes';
import { IMainData } from './type/MainDashboardDataTypes';

const MainDashBoard = () => {
  const [showSideSheet, setShowSideSheet] = useState<boolean>(false);
  const [showCelebrate] = useState(false); //축하 모션 보이는 여부 플래그
  const [objList, setObjList] = useState<IobjListTypes[]>([]);
  const [, setCurrentGoalId] = useState<number>(0);
  const [currentOKRData, setCurrentOKRData] = useState<IMainData>();
  const { data } = useSWR('/v1/objective', getDashBoardData);
  const navigator = useNavigate();

  useEffect(() => {
    if (!data) return;
    console.log(data.data);
    if (!data?.data?.tree) {
      navigator('/add-okr');
    }
  }, [data, navigator]);

  const okrTreeData = data?.data.tree;
  const goalListData = data?.data.objList;

  useEffect(() => {
    setCurrentOKRData(okrTreeData);
    setObjList(goalListData);
  }, [okrTreeData, goalListData]);

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
      {showCelebrate ? (
        <>
          <CelebrateMotion />
        </>
      ) : (
        <>
          {objList && objList.length > 0 && (
            <section css={mainDashboardStyle}>
              <MainDashBoardDrawer objList={objList} onChangeCurrentGoalId={handleCurrentGoalId} />
              <MainDashboardOKRTree
                onShowSideSheet={handleShowSideSheet}
                currentOkrData={currentOKRData}
              />
            </section>
          )}
          {showSideSheet && <SideSheet isOpen={showSideSheet} onClose={handleCloseSideSheet} />}
        </>
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
