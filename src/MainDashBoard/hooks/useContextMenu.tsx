import { useEffect, useState } from 'react';

const useContextMenu = () => {
  const [rightClicked, setRightClicked] = useState(false);

  useEffect(() => {
    const handleClick = () => setRightClicked(false);
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return {
    rightClicked,
    setRightClicked,
  };
};
export default useContextMenu;
