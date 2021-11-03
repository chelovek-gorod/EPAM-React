import React from 'react';
import './Modal.css';

function Modal(props) {

  function getType () {
    if (props.albums) return (<div className="modal-title">Add new <b>album</b></div>);
    return (<div className="modal-title">Add new <b>photo</b></div>);
  }

  function getNewName() {
    return `My new ${(props.albums) ? 'ALBUM' : 'PHOTO'}`;
  }

  function inputOnChange() {
    console.log('_');
  }

  function addNew() {
    let input = document.getElementById('newInput');
    let newValue = input.value.trim();
    if (newValue.length) input.value = newValue;
    else input.value = getNewName();

    alert('Add new!');
  }

  return (
    <div className="modal-shell">
      <div className="modal">
        { getType() }
        <button className="close" onClick = { props.hidePopup }>X</button>
        <input id="newInput" type="text" maxLength="20" value={ getNewName() } onChange={ inputOnChange } />
        <button className="cancel" onClick = { props.hidePopup }>cancel</button>
        <button className="add-new" onClick = { addNew }>Add new</button>
      </div>
    </div>
  );
}

export default Modal;