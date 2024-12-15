import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CaptainDataContext } from '../context/Captaincontext';

const CaptainProtectedWrapper = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [isLoading, setIsLoading] = useState(true); // Set loading initially to true
  const { captain, setCaptain } = useContext(CaptainDataContext);

  useEffect(() => {
    if (!token) {
      navigate('/captainlogin'); // Redirect to login if no token exists
      return;
    }

    // Fetch captain data
    axios
      .get(`${import.meta.env.VITE_BE_URL}/api/v1/captain/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.success) {
          setCaptain(response.data.captain);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem('token');
        navigate('/captainlogin');
        setIsLoading(false);
      });
  }, [token, navigate, setCaptain]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return <div>{children}</div>;
};

export default CaptainProtectedWrapper;
