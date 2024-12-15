import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Start from './pages/Start';
import UserLogin from './pages/UserLogin';
import UserRegister from './pages/UserRegister';
import CaptainLogin from './pages/CaptainLogin';
import CaptainRegister from './pages/CaptainRegister';
import Home from './pages/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserProtectedWrapper from './pages/UserProtectedWrapper';
import Userlogout from './pages/Userlogout';
import Captainhome from './pages/Captainhome';
import CaptainProtectedWrapper from './pages/CaptainProtectWrapper';
import 'remixicon/fonts/remixicon.css';
const App = () => {
  return (
    <>
      <div className="">
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/userlogin" element={<UserLogin />} />
          <Route path="/userregister" element={<UserRegister />} />
          <Route path="/captainlogin" element={<CaptainLogin />} />
          <Route path="/captainregister" element={<CaptainRegister />} />
          <Route
            path="/home"
            element={
              <UserProtectedWrapper>
                <Home />
              </UserProtectedWrapper>
            }
          />

          <Route
            path="/user/logout"
            element={
              <UserProtectedWrapper>
                <Userlogout />
              </UserProtectedWrapper>
            }
          />
          <Route
            path="/Captainhome"
            element={
              <CaptainProtectedWrapper>
                {' '}
                <Captainhome />{' '}
              </CaptainProtectedWrapper>
            }
          />
        </Routes>
      </div>
    </>
  );
};

export default App;
