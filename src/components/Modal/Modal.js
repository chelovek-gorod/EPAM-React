import React from 'react';
import './Modal.css';

function Modal(props) {

  function getType () {
    if (props.albums) return (<div className="modal-title">Add new <b>album</b></div>);
    return (<div className="modal-title">Add new <b>photo</b></div>);
  }

  function addNew() {
    let newValue = props.inputValue.value.trim();
    if (newValue.length) {
      props.add(newValue);
      props.changeInput('');
      props.hidePopup();
    } else {
      alert('ERROR: Empty input!');
    }
  }

  function changeInput() {
    let input = document.getElementById('inputName');
    props.changeInput({ id: input, value: input.value });
  }

  function updateValue(inputId) {
    let {id, value} = props.inputValue;
    if (inputId === id) inputId.value = value;
  }
  
  return (
    <div className="modal-shell">
      <div className="modal">
        { getType() }
        <button className="close" onClick = { props.hidePopup }>X</button>
        <input id="inputName" type="text" maxLength="20" value={ updateValue("inputName") } onChange={ changeInput } />
        <button className="cancel" onClick = { props.hidePopup }>cancel</button>
        <button className="add-new" onClick = { addNew }>Add new</button>
      </div>
    </div>
  );
}

export default Modal;