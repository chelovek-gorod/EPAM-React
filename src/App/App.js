import { Routes, Route, Link } from "react-router-dom";

import UserDetails from '../components/UserDetails/UserDetails';
import Content from '../components/Content/Content';
import './App.css';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<UserDetails />} />
        <Route path="about" element={<Content />} />
      </Routes>
    </div>
  );
}

export default App;