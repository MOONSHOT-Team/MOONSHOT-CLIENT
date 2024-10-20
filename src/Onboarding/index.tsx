import { css } from '@emotion/react';
import { useCallback, useEffect, useRef, useState } from 'react';

import Frame1 from './components/frame/Frame1';
import Frame2 from './components/frame/Frame2';
import Frame3 from './components/frame/Frame3';
import Frame4 from './components/frame/Frame4';
import Frame5 from './components/frame/Frame5';
import Frame6 from './components/frame/Frame6';
import OnboardingFooter from './components/layout/OnboardingFooter';

const Onboarding = () => {
  const sectionsRef = useRef<HTMLSelectElement[]>([]);

  const [sectionsUpdated, setSectionsUpdated] = useState(false);
  const [isInView, setIsInView] = useState([true, false, false, false, false]);

  const refCallback = useCallback((element: HTMLSelectElement) => {
    if (element) {
      sectionsRef.current.push(element);

      if (sectionsRef.current.length === 5) {
        setSectionsUpdated(true);
      }
    }
  }, []);

  useEffect(() => {
    if (!sectionsUpdated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.getAttribute('id');
          const sectionIndex = ['frame1', 'frame2', 'frame3', 'frame4', 'frame5'].indexOf(
            sectionId!,
          );

          if (entry.isIntersecting && !isInView[sectionIndex]) {
            setIsInView((prev) => {
              const updatedState = [...prev];
              updatedState[sectionIndex] = entry.isIntersecting;
              return updatedState;
            });
          }
        });
      },
      { root: null, rootMargin: '-500px' },
    );

    sectionsRef.current.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sectionsRef.current.forEach((section) => observer.unobserve(section));
    };
  }, [isInView, sectionsUpdated]);

  return (
    <div css={frameContainer}>
      <Frame1 isInView={isInView[0]} refCallback={refCallback} />
      <Frame2 isInView={isInView[1]} refCallback={refCallback} />
      <Frame3 isInView={isInView[2]} refCallback={refCallback} />
      <Frame4 isInView={isInView[3]} refCallback={refCallback} />
      <Frame5 isInView={isInView[4]} refCallback={refCallback} />
      <Frame6 />
      <OnboardingFooter />
    </div>
  );
};

export default Onboarding;

const frameContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
