import React, { useState } from 'react';

import GuideFirstKeyResultCard from '../components/addKr/GuideFirstKeyResultCard';
import GuideSecondKeyResultCard from '../components/addKr/GuideSecondKeyResultCard';
import KeyResultPlusCard from '../components/addKr/KeyResultPlusCard';
import { EmptyKeyResultCard } from '../styles/KeyResultCardStyle';

const AddGuideKr = () => {
  const MAX_KR_LENGTH = 3;
  const [isActiveSecondKrCard, setIsActiveSecondKrCard] = useState(false);
  const [clickedCard, setClickedCard] = useState<number[]>([0]);

  // KR 카드 추가 취소 버튼 핸들러
  const handleClickCloseBtn = (cardIdx: number) => {
    const parsedArray = clickedCard.filter((item) => {
      return item !== cardIdx;
    });

    setClickedCard(parsedArray);
  };

  const renderFirstKrCards = () => {
    const plusCardLength = Array.from({ length: MAX_KR_LENGTH - 1 }, (_, i) => i + 1);
    return (
      <>
        <GuideFirstKeyResultCard />
        {plusCardLength.map((item) => {
          return (
            <React.Fragment key={item}>
              {clickedCard.find((el) => el === item) ? (
                <GuideFirstKeyResultCard
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
        <button onClick={() => setIsActiveSecondKrCard(true)}>버튼</button>
      </>
    );
  };

  const renderSecondKrCards = () => {
    const secondKrList = [0, 1, 2];

    console.log(clickedCard);
    return (
      <>
        {secondKrList.map((lenth) => {
          return clickedCard.includes(lenth) ? (
            <GuideSecondKeyResultCard krSentence={'첫번째'} />
          ) : (
            <EmptyKeyResultCard />
          );
        })}
      </>
    );
  };

  return <>{isActiveSecondKrCard ? renderSecondKrCards() : renderFirstKrCards()}</>;
};

export default AddGuideKr;
