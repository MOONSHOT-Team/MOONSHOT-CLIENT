import { useEffect, useState } from 'react';

const useContextMenu = () => {
  const [rightClicked, setRightClicked] = useState(false);
  const [rightClickPoints, setRightClickPoints] = useState({
    x: 0,
    y: 0,
  });
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
    rightClickPoints,
    setRightClickPoints,
  };
};
export default useContextMenu;
