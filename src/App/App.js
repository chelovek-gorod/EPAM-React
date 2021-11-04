import { Routes, Route, Link } from "react-router-dom";

import UserDetails from '../components/UserDetails/UserDetails';
import Content from '../components/Content/Content';
import './App.css';

/*
  ROUTING TASK   ( Add logout button somewhere )   [ if (*) -> Address === target ]

  ADDRESS                        loginTarget       LogOutTarget    Description

  /login                        /user/:userId           *            You should redirect to this page in case if user isn’t authorized (use “email” as login and “username” as password)
  /albums --------------------------- * --------------- * ---------- All available albums (Don’t show information about user)
  /albums/:albumId                    *                 *            Page with album’s photos (Don’t show information about user)
  /user/:userId --------------------- * ------------- /login ------- Only for authorized users. User information and list of user albums
  /user/:userId/albums/:albumId       *               /login         Only for authorized users. User information and list of albumId photos
  /, /home -------------------- /user/:userId ------ /albums --------------------------------------------------------------------------------
  
*/

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="login" element={ <Content type={'login'}/> } />
        <Route path="user/:userId" element={ <UserDetails />, <Content type={'user albums'} /> } />
        <Route path="albums" element={ <Content type={'all albums'} /> } />
        <Route path="albums/:albumId" element={ <Content type={'photos'} /> } />
        <Route path="/user/:userId/albums/:albumId" element={ <UserDetails />, <Content type={'photos'} /> } />
      </Routes>
    </div>
  );
}

export default App;