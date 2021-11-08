import React from 'react';
import './Login.css';

function Login(props) {

  function changeInputLogin() {
    let input = document.getElementById('inputLogin');
    props.changeInput({ id: input, value: input.value });
  }

  function changeInputPass() {
    let input = document.getElementById('inputPass');
    props.changeInput({ id: input, value: input.value });
  }
  
  function updateValue(inputId) {
    let {id, value} = props.inputValue;
    if (inputId === id) inputId.value = value;
  }

  function clearInputs() {
    document.getElementById('inputLogin').value = '';
    document.getElementById('inputPass').value = '';
  }

  function checkLogin () {
    if (document.getElementById('inputPass').value.trim() === 'pass') {
      let login = +document.getElementById('inputLogin').value;
      if (Number.isInteger(login) && login > 0 && login < 11) {
        localStorage.setItem('userId', login);
        props.toLogin(login);
      } else alert('WRONG LOGIN!\nYour login is:\n1, 2, 3, 4, 5, 6, 7, 8, 9 or 10');
    } else alert('WRONG PASSWORD!\nYour password is:\npass');
  }

  return (
    <div className="login-wrapper">
      <div className="input-title">Input Your login<br/><span>( 1, 2, 3, 4, 5, 6, 7, 8, 9 or 10 )</span></div>
      <input id="inputLogin" type="text" maxLength="20" value={ updateValue("inputLogin") } onChange={ changeInputLogin } />
      <div className="input-title">Input Your password<br/><span>( pass )</span></div>
      <input id="inputPass" type="text" maxLength="20" value={ updateValue("inputPass") } onChange={ changeInputPass } />
      <button className="clear" onClick = { clearInputs }>Clear</button>
      <button className="login" onClick = { checkLogin }>Login</button>
    </div>
  );
}

export default Login;