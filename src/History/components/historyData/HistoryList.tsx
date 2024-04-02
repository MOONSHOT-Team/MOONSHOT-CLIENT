import { css } from '@emotion/react';
import { useState } from 'react';

import { ObjectiveTypes } from '../../type/historyData';
import { HistoryKeyResult, HistoryObjective, HistoryTask } from './ItemWrappers';

const HistoryList = ({ krList, objCategory, objPeriod, objProgress, objTitle }: ObjectiveTypes) => {
  const [isShowKR, setIsShowKR] = useState(false);

  const handleShowKR = () => {
    setIsShowKR((prev) => !prev);
  };

  return (
    <>
      <HistoryObjective
        category={objCategory}
        objective={objTitle}
        progress={objProgress}
        period={objPeriod}
        isShowKR={isShowKR}
        onClick={handleShowKR}
      >
        <div css={addGapBetweenItems}>
          {krList.map(({ krIdx, krProgress, krTitle, taskList }) => (
            <HistoryKeyResult
              key={`${krTitle}-${krIdx}`}
              index={krIdx}
              keyResult={krTitle}
              progress={krProgress}
            >
              {taskList.map(({ taskIdx, taskTitle }) => (
                <HistoryTask key={`${taskTitle}-${taskIdx}`} index={taskIdx} task={taskTitle} />
              ))}
            </HistoryKeyResult>
          ))}
        </div>
      </HistoryObjective>
    </>
  );
};

export default HistoryList;

const addGapBetweenItems = css`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  justify-content: center;
  margin-bottom: 3rem;
`;
