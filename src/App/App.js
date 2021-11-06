import { Routes, Route } from "react-router-dom";
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
        <Route path="/login" element={ <Content type={'login'}/> } />
        <Route path="/user/:userId" element={ <Content type={'user albums'} /> } />
        <Route path="/albums" element={ <Content type={'all albums'} /> } />
        <Route path="/albums/:albumId" element={ <Content type={'all photos'} /> } />
        <Route path="/user/:userId/albums/:albumId" element={ <Content type={'user photos'} /> } />
        <Route path="/" element={ <Content type={'login'} /> } />
        <Route path="/home" element={ <Content type={'login'} /> } />
      </Routes>
    </div>
  );
}

/*
<Route path="/" element={ <Content type={'login'} /> } />
        <Route path="/home" element={ <Content type={'login'} /> } />

        <Route path="/" element={<Navigate replace to='login' />} />
        <Route path="/home" element={<Navigate replace to='login' />} />


        <Route exact path="/" render={() => {<Navigate replace to='login' /> }}
*/
export default App;