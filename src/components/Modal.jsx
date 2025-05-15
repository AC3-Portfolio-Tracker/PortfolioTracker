import React from 'react';
import './Modal.css';

const Modal = ({ children, onClose }) => {
  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
