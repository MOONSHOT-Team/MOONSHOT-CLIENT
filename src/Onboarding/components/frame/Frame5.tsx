import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import imgFrame5HistoryClose from '../../assets/imgFrame5HistoryClose.png';
import imgFrame5HistoryOpen from '../../assets/imgFrame5HistoryOpen.png';
import imgFrame5HistoryTask from '../../assets/imgFrame5HistoryTask.png';
import imgFrame5List2 from '../../assets/imgFrame5List2.png';
import imgFrame5List3 from '../../assets/imgFrame5List3.png';
import imgFrame5List4 from '../../assets/imgFrame5List4.png';
import useScrollDetect from '../../hooks/useScrollDetect';
import { ImgPopUp } from '../../styles/animation';
import { sectionStyle } from '../../styles/common';
import TextField from './TextField';

const Frame5 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { active, element } = useScrollDetect();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section css={section} ref={element}>
      <TextField
        subTitle="History"
        subTitleColor="sub_blue"
        title="나의 모든 우주 여정을 여기에"
        description="꾸준함으로 쌓인 발자취를 확인하며 앞으로의 미래를 향해 다시 나아가세요"
      />
      {active && (
        <ImgContainer>
          {isOpen && (
            <img src={imgFrame5HistoryOpen} alt="main-dashboard-img-1" width={1005} height={57} />
          )}
          {!isOpen && (
            <img src={imgFrame5HistoryClose} alt="main-dashboard-img-1" width={1005} height={57} />
          )}
          <LateImgPopUp
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
        </ImgContainer>
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

const ImgContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
  justify-content: center;
  width: 100vw;
  animation: ${fadeIn} 1s;
`;

const LateImgPopUp = styled(ImgPopUp)`
  position: absolute;
  top: 0;
  opacity: 0;
`;
