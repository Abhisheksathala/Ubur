import React, { useState, useContext } from 'react'; // Correcting import statements
import { Link, useNavigate } from 'react-router-dom'; // Corrected useNavigate
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';
import { toast } from 'react-toastify';

const UserRegister = () => {
  const navigate = useNavigate(); // Corrected useNavigate hook

  const { user, setUser } = useContext(UserDataContext);

  const [form, setForm] = useState({
    // Corrected useState
    fullname: {
      firstname: '',
      lastname: '',
    },
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'firstname' || name === 'lastname') {
      setForm({
        ...form,
        fullname: {
          ...form.fullname,
          [name]: value,
        },
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);

    const payload = {
      fullname: {
        firstname: form.fullname.firstname,
        lastname: form.fullname.lastname,
      },
      email: form.email,
      password: form.password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/user/register`,
        payload,
      );

      if (response.data.success) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem('token', JSON.stringify(data.token));
        toast.success(data.msg);
        navigate('/home');
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      console.error(
        'Error registering user:',
        error.response ? error.response.data : error.message,
      );
      toast.error('An error occurred while registering.');
    }

    setForm({
      fullname: {
        firstname: '',
        lastname: '',
      },
      email: '',
      password: '',
    });
  };

  return (
    <div className="flex flex-col justify-between h-screen p-7">
      <div>
        <img
          className="w-20 mb-8"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber Logo"
        />
        <form onSubmit={handleSubmit}>
          <h3 className="mb-2 text-xl font-medium">What's your Name?</h3>
          <div className="flex gap-1">
            <input
              className="w-1/2 px-4 py-2 bg-gray-200 border rounded mb-7 placeholder:sm"
              type="text"
              placeholder="Enter your first name"
              name="firstname"
              required
              value={form.fullname.firstname}
              onChange={handleChange}
            />
            <input
              className="w-1/2 px-4 py-2 bg-gray-200 border rounded mb-7 placeholder:sm"
              type="text"
              placeholder="Enter your last name"
              name="lastname"
              required
              value={form.fullname.lastname}
              onChange={handleChange}
            />
          </div>
          <h3 className="mb-2 text-xl font-medium">What's your Email?</h3>
          <input
            className="w-full px-4 py-2 bg-gray-200 border rounded mb-7 placeholder:sm"
            type="email"
            placeholder="Enter your email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
          />

          <h3 className="mb-2 text-xl font-medium">What's your Password?</h3>
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
            Create Account
          </button>
          <Link to="/userlogin">
            <button className="text-blue-600">
              <span className="font-medium text-black">
                Already have an account?
              </span>
              Login
            </button>
          </Link>
        </form>
      </div>
      <div className="mt-3">
        <p className="text-sm font-semibold text-gray-600">
          Cumque aperiam fuga ex error cupiditate atque harum, quo veniam
          quibusdam voluptatem.
        </p>
      </div>
    </div>
  );
};

export default UserRegister;
