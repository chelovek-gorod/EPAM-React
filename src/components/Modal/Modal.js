import React from 'react';
import './Modal.css';

function Modal(props) {

  function getType () {
    if (props.albums) return (<div className="modal-title">Add new <b>album</b></div>);
    return (<div className="modal-title">Add new <b>photo</b></div>);
  }

  function addNew() {
    let newValue = props.inputValue.trim();
    if (newValue.length) {
      props.add(newValue);
      props.changeInput('');
      props.hidePopup();
    } else {
      alert('ERROR: Empty input!');
    }
  }

  function changeInput() {
    let input = document.getElementById('newInput');
    props.changeInput(input.value);
  }
  
  return (
    <div className="modal-shell">
      <div className="modal">
        { getType() }
        <button className="close" onClick = { props.hidePopup }>X</button>
        <input id="newInput" type="text" maxLength="20" value={ props.inputValue } onChange={ changeInput } />
        <button className="cancel" onClick = { props.hidePopup }>cancel</button>
        <button className="add-new" onClick = { addNew }>Add new</button>
      </div>
    </div>
  );
}

export default Modal;