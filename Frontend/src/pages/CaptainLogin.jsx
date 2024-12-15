import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { CaptainDataContext } from '../context/Captaincontext';
import axios from 'axios';
import { toast } from 'react-toastify';
const captainLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const { captain, setCaptain } = useContext(CaptainDataContext);

  console.log(captain);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/captain/login`,
        form,
      );
      console.log(response.data); // Log the response data

      if (response.data.success) {
        const data = response.data;
        toast.success('Login Successful');
        setCaptain(data.captain); // Correct key: 'captain' instead of 'captian'
        localStorage.setItem('token', data.token);
        navigate('/captainhome');
      } else {
        toast.error('Invalid credentials');
      }
    } catch (error) {
      console.log(error); // Log the error
      toast.error(
        error.response?.data?.msg || 'Invalid credentials - user not found',
      );
    }
  };

  return (
    <div className="flex flex-col justify-between h-screen p-7">
      <div className="">
        <img
          className="w-20 mb-8"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <form action="" onSubmit={handleSubmit}>
          <h3 className="mb-2 text-xl font-medium">Whats your Email</h3>
          <input
            className="w-full px-4 py-2 bg-gray-200 border rounded mb-7 placeholder:sm"
            type="email"
            placeholder="Enter your email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
          />

          <h3 className="mb-2 text-xl font-medium">Whats your Password</h3>
          <input
            className="w-full px-4 py-2 bg-gray-200 border rounded mb-7 placeholder:sm"
            type="password"
            name="password"
            placeholder="Enter your password"
            required
            value={form.password}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-black border rounded mb-7 "
          >
            Login
          </button>
          <Link to="/captainregister" className="text-center">
            <button className="text-blue-600 ">
              {' '}
              <span className="font-medium text-black">
                want to join a fleet?
              </span>{' '}
              Create new Account
            </button>
          </Link>
        </form>
      </div>
      <div className="mt-3">
        <Link to="/userlogin">
          <button className="w-full px-4 py-2 font-medium text-white bg-orange-600 border rounded mb-7 ">
            Sing in as user
          </button>
        </Link>
      </div>
    </div>
  );
};

export default captainLogin;
