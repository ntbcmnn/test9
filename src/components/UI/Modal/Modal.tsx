import Backdrop from '../Backdrop/Backdrop.tsx';
import React from 'react';

interface Props extends React.PropsWithChildren {
  show: boolean;
  closeModal: () => void;
  defaultModalBtn?: boolean;
}

const Modal: React.FC<Props> = ({show, children, closeModal, defaultModalBtn}) => {
  return (
    <>
      <Backdrop show={show} onClick={closeModal}/>
      <div className="modal show" style={{
        display: show ? 'block' : 'none',
        width: '500px',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              {defaultModalBtn ?
                <button onClick={closeModal} className="btn btn-close" type="button"></button> : null}
            </div>
            <div className="p-2">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;