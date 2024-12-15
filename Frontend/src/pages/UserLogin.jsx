import React, { useState, useContext } from 'react'; // import useContext here
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from './../context/UserContext'; // Corrected context import
import { toast } from 'react-toastify';

const UserLogin = () => {
  // Component name updated to capitalize 'UserLogin'
  const { user, setUser } = useContext(UserDataContext); // Corrected context name
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      email: form.email,
      password: form.password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/user/login`,
        payload,
      );

      if (response.data.success) {
        const data = response.data;
        setUser(data.user); // Set user data from response
        localStorage.setItem('token', JSON.stringify(data.token)); // Store token in localStorage
        toast.success(data.msg); // Show success message
        navigate('/home'); // Navigate to home after login
        localStorage.setItem('token', JSON.stringify(data.token));
        setForm({
          email: '',
          password: '',
        });
      } else {
        toast.error(response.data.msg); // Show error if login fails
      }
    } catch (error) {
      console.error(
        'Error logging in user:',
        error.response ? error.response.data : error.message,
      );
      toast.error(
        error.response
          ? error.response.data
          : 'An error occurred while logging in.',
      );
    }
  };

  return (
    <div className="flex flex-col justify-between h-screen p-7">
      <div>
        <img
          className="w-20 mb-8"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Logo"
        />
        <form onSubmit={handleSubmit}>
          <h3 className="mb-2 text-xl font-medium">What's your Email</h3>
          <input
            className="w-full px-4 py-2 bg-gray-200 border rounded mb-7 placeholder:sm"
            type="email"
            placeholder="Enter your email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
          />

          <h3 className="mb-2 text-xl font-medium">What's your Password</h3>
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
            className="w-full px-4 py-2 text-white bg-black border rounded mb-7"
          >
            Login
          </button>
          <Link to="/userregister">
            <button className="text-blue-600">
              <span className="font-medium text-black">New here?</span> Create
              new Account
            </button>
          </Link>
        </form>
      </div>
      <div className="mt-3">
        <Link to="/captainlogin">
          <button className="w-full px-4 py-2 font-medium text-white bg-green-600 border rounded mb-7">
            Sign in as Captain
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UserLogin; // Updated export name
