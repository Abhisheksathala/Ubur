import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserProtectedWrapper = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/captainlogin');
    }
  }, [token, navigate]);

  return <div>{token ? children : null}</div>;
};

export default UserProtectedWrapper;