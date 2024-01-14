import styled from '@emotion/styled';
import React, { useState } from 'react';

import KeyResultCard from './components/addKr/KeyResultCard';
import KeyResultPlusCard from './components/addKr/KeyResultPlusCard';

const AddOkr = () => {
  const MAX_KR_LENGTH = 3;

  const [clickedCard, setClickedCard] = useState<number[]>([0]);

  // KR 카드 추가 취소 버튼 핸들러
  const handleClickCloseBtn = (cardIdx: number) => {
    const parsedArray = clickedCard.filter((item) => {
      return item !== cardIdx;
    });

    setClickedCard(parsedArray);
  };

  const renderKrCards = () => {
    const plusCardLength = Array.from({ length: MAX_KR_LENGTH - 1 }, (_, i) => i + 1);
    return (
      <>
        <KeyResultCard />
        {plusCardLength.map((item) => {
          return (
            <React.Fragment key={item}>
              {clickedCard.find((el) => el === item) ? (
                <KeyResultCard
                  key={item}
                  cardIdx={item}
                  handleClickCloseBtn={handleClickCloseBtn}
                />
              ) : (
                <div
                  key={item}
                  onClick={() => setClickedCard((prev) => [...prev, item])}
                  onKeyDown={() => setClickedCard((prev) => [...prev, item])}
                  role="presentation"
                >
                  <KeyResultPlusCard key={item} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </>
    );
  };

  return <StAddOkrLayoutContainer>{renderKrCards()}</StAddOkrLayoutContainer>;
};

export default AddOkr;

const StAddOkrLayoutContainer = styled.section`
  display: flex;
  gap: 2rem;
`;
