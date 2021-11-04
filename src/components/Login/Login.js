import React from 'react';
import './Login.css';

function Login(props) {

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
        <input id="newInput" type="text" maxLength="20" value={ props.inputValue } onChange={ changeInput } />
        <button className="clear" onClick = { props.hidePopup }>Clear</button>
        <button className="login" onClick = { addNew }>Login</button>
      </div>
    </div>
  );
}

export default Login;