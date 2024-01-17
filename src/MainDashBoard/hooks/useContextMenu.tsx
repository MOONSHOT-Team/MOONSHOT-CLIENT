import { useEffect, useState } from 'react';

const useContextMenu = () => {
  const [rightClicked, setRightClicked] = useState(false);
  const [rightClickpoints, setRightClickPoints] = useState({
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
    rightClickpoints,
    setRightClickPoints,
  };
};
export default useContextMenu;
