import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import imgFrame5HistoryClose from '../../assets/frame/imgFrame5HistoryClose.png';
import imgFrame5HistoryOpen from '../../assets/frame/imgFrame5HistoryOpen.png';
import imgFrame5HistoryTask from '../../assets/frame/imgFrame5HistoryTask.png';
import imgFrame5List2 from '../../assets/frame/imgFrame5List2.png';
import imgFrame5List3 from '../../assets/frame/imgFrame5List3.png';
import imgFrame5List4 from '../../assets/frame/imgFrame5List4.png';
import { CONTENTS } from '../../constants/CONTENTS';
import { ImgPopUp } from '../../styles/animation';
import { sectionStyle } from '../../styles/common';
import TextField from './TextField';

interface Frame5Props {
  isInView: boolean;
  refCallback: (elem: HTMLSelectElement) => void;
}

const Frame5 = ({ isInView, refCallback }: Frame5Props) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="frame5" css={section} ref={refCallback}>
      <TextField
        subTitle={CONTENTS[4].subTitle!}
        subTitleColor={CONTENTS[4].subTitleColor!}
        title={CONTENTS[4].title}
        description={CONTENTS[4].description!}
      />
      {isInView && (
        <StImgContainer>
          {isOpen && (
            <img src={imgFrame5HistoryOpen} alt="main-dashboard-img-1" width={1005} height={57} />
          )}
          {!isOpen && (
            <img src={imgFrame5HistoryClose} alt="main-dashboard-img-1" width={1005} height={57} />
          )}
          <StLateImgPopUp
            fromY={5.7}
            toY={7.2}
            delay={1.2}
            src={imgFrame5HistoryTask}
            alt="main-dashboard-img-2"
            width={1005}
            height={168}
          />
          <ImgPopUp
            fromY={0}
            toY={19}
            delay={1}
            src={imgFrame5List2}
            alt="main-dashboard-img-3"
            width={1005}
            height={57}
          />
          <ImgPopUp
            fromY={0}
            toY={19}
            delay={1}
            src={imgFrame5List3}
            alt="main-dashboard-img-3"
            width={1005}
            height={57}
          />
          <ImgPopUp
            fromY={0}
            toY={19}
            delay={1}
            src={imgFrame5List4}
            alt="main-dashboard-img-3"
            width={1005}
            height={57}
          />
        </StImgContainer>
      )}
    </section>
  );
};
// 168

export default Frame5;

const section = css`
  gap: 10rem;
  height: 96.1rem;
  padding-top: 10rem;

  ${sectionStyle}
`;

const fadeIn = keyframes`
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  `;

const StImgContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
  justify-content: center;
  width: 100vw;
  animation: ${fadeIn} 1s;
`;

const StLateImgPopUp = styled(ImgPopUp)`
  position: absolute;
  top: 0;
  opacity: 0;
`;
