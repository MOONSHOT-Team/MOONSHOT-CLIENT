import ProgressBar from '@components/ProgressBar';
import styled from '@emotion/styled';
import { useState } from 'react';

import { IcDropDown, IcDropUp } from '../../assets/icons';
import { GOAL_DATA } from '../../constants/GOAL_DATA';
import { IobjListTypes } from '../../type/goalItemTypes';

const GoalItem = ({ id, title, content, category, date, progress }: IobjListTypes) => {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  console.log(id);

  const handleOnClick = () => {
    setIsDetailOpen(!isDetailOpen);
  };
  return (
    <li>
      <div>
        <span>{category}</span>
        <span>{date}</span>
      </div>
      <div>
        <span>{title}</span>
        <i>
          {isDetailOpen ? (
            <IcDropUp onClick={handleOnClick} />
          ) : (
            <IcDropDown onClick={handleOnClick} />
          )}
        </i>
      </div>
      {isDetailOpen && <div>{content}</div>}
      <ProgressBar
        currentProgress={progress}
        progressBarColor={'#5B5B5B'}
        progressValueColor={'#C2C2C2'}
        textColor={'#A7A7A7'}
        isCurrentProgress={false}
      ></ProgressBar>
    </li>
  );
};

const MainDashBoardDrawer = () => {
  console.log(GOAL_DATA);
  const { objList } = GOAL_DATA;
  console.log(objList);
  return (
    <StContainer>
      <div>
        <button type="button">목표 추가하기</button>
      </div>
      <div>
        <div>
          <span>목표 리스트</span>
          <span>0/0</span>
        </div>
        <ul>
          {objList.map((objListItem) => {
            return <GoalItem key={objListItem.id} {...objListItem} />;
          })}
        </ul>
      </div>
    </StContainer>
  );
};

export default MainDashBoardDrawer;

const StContainer = styled.aside`
  min-width: 23.2rem;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.gray_600};
`;
