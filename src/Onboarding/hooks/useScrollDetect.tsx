import { useEffect, useRef, useState } from 'react';

const useScrollDetect = () => {
  const element = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY + 100; //현재 위치
      //현재 페이지 상단
      if (element.current) {
        const pagePosTop = element.current.getBoundingClientRect().top + window.scrollY;
        //현재 페이지 하단
        const pagePosBot = element.current.getBoundingClientRect().bottom + window.scrollY;

        if (pagePosTop - 150 < scrollTop && scrollTop < pagePosBot - 150) {
          setActive(true);
        }
      }
    };
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [active]);

  return { active, element };
};

export default useScrollDetect;
