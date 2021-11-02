import React from 'react';
//import ReactDOM from 'react-dom';
import './Modal.css';

function Modal(props) {
  console.log('i\'m Modal.js');
  return (
    <div className="my-modal">
        <span>My modal window</span>
    </div>
  );
}

export default Modal;