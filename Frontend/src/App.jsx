import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import UserLogin from './pages/UserLogin';
import UserRegister from './pages/UserRegister';
import CaptainLogin from './pages/CaptainLogin';
import CaptainRegister from './pages/CaptainRegister';

const App = () => {
  return (
    <>
      <div className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/userlogin" element={<UserLogin />} />
          <Route path="/userregister" element={<UserRegister />} />
          <Route path="/captainlogin" element={<CaptainLogin />} />
          <Route path="/captainregister" element={<CaptainRegister />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
