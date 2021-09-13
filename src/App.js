import user from './User';
import avatar from './avatar.png';
import './App.css';

function App() {
  return (
    <div className="App">

      <div className="UserDetails border">

        <div className="user-avatar border">
          <img src={avatar} alt="Avatar"/>
        </div>

        <div className="user-info border">
          <div className="user-line">name : <span className="line-data">{user.name}</span></div>
          <div className="user-line">user name : <span className="line-data">{user.username}</span></div>
          <div className="user-line">email : <span className="line-data">{user.email}</span></div>
          <div className="user-line">address : <span className="line-data">
            {user.address.street}, {user.address.suite}<br/>{user.address.city}, {user.address.zipcode}</span></div>
          <div className="user-line">phone : <span className="line-data">{user.phone}</span></div>
          <div className="user-line">company name : <span className="line-data">{user.company.name}</span></div>
        </div>
      
      </div>

      <div className="content border">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </div>
      
    </div>
  );
}

export default App;