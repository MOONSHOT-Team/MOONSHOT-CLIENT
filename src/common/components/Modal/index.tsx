import { createPortal } from 'react-dom';

const Modal = () => {
  return createPortal(
    <dialog open>
      <p>Modal</p>
      <form method="dialog">
        <button>123</button>
      </form>
    </dialog>,
    document.getElementById('modal')!,
  );
};

export default Modal;
