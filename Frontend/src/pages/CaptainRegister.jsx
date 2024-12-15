import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CaptainDataContext } from './../context/Captaincontext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CaptainRegister = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullname: {
      firstname: '',
      lastname: '',
    },
    email: '',
    password: '',
    vehicle: {
      color: '',
      plate: '',
      capacity: '',
      vehicleType: '',
    },
  });

  const { captain, setCaptain, isLoading, setIsLoading, error, setError } =
    useContext(CaptainDataContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'firstname' || name === 'lastname') {
      setForm((prevForm) => ({
        ...prevForm,
        fullname: {
          ...prevForm.fullname,
          [name]: value,
        },
      }));
    } else if (name in form.vehicle) {
      setForm((prevForm) => ({
        ...prevForm,
        vehicle: {
          ...prevForm.vehicle,
          [name]: value,
        },
      }));
    } else {
      setForm((prevForm) => ({ ...prevForm, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitted Form Data:', form);

    // Send the form data to the server
    const payload = {
      fullname: {
        firstname: form.fullname.firstname,
        lastname: form.fullname.lastname,
      },
      email: form.email,
      password: form.password,
      vehicle: {
        color: form.vehicle.color,
        plate: form.vehicle.plate,
        capacity: form.vehicle.capacity,
        vehicleType: form.vehicle.vehicleType,
      },
    };

    setIsLoading(true); // Set loading state to true before API call

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/captain/register`,
        payload
      );
      
      if (response.data.success) {
        const data = response.data;
        setCaptain(data.captain);  // Assuming "captain" is the correct field
        localStorage.setItem('token', data.token);
        setIsLoading(false);
        navigate('/captainhome');
      } else {
        setError('Registration failed, please try again.');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error.response?.data?.msg || 'An error occurred, please try again.');
      setIsLoading(false);
    }
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
          <h3 className="mb-2 text-xl font-medium">What’s your Name?</h3>
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
          <h3 className="mb-2 text-xl font-medium">What’s your Email?</h3>
          <input
            className="w-full px-4 py-2 bg-gray-200 border rounded mb-7 placeholder:sm"
            type="email"
            placeholder="Enter your email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
          />
          <h3 className="mb-2 text-xl font-medium">What’s your Password?</h3>
          <input
            className="w-full px-4 py-2 bg-gray-200 border rounded mb-7 placeholder:sm"
            type="password"
            name="password"
            placeholder="Enter your password"
            required
            value={form.password}
            onChange={handleChange}
          />

          <h3 className="mb-2 text-xl font-medium">Vehicle Information</h3>
          <input
            className="w-full px-4 py-2 bg-gray-200 border rounded mb-7 placeholder:sm"
            type="text"
            placeholder="Vehicle color"
            name="color"
            required
            value={form.vehicle.color}
            onChange={handleChange}
          />
          <input
            className="w-full px-4 py-2 bg-gray-200 border rounded mb-7 placeholder:sm"
            type="text"
            placeholder="Vehicle plate number"
            name="plate"
            required
            value={form.vehicle.plate}
            onChange={handleChange}
          />
          <input
            className="w-full px-4 py-2 bg-gray-200 border rounded mb-7 placeholder:sm"
            type="number"
            placeholder="Vehicle capacity"
            name="capacity"
            required
            value={form.vehicle.capacity}
            onChange={handleChange}
          />

          <h3 className="mb-2 text-xl font-medium">Vehicle Type</h3>
          <select
            className="w-full px-4 py-2 bg-gray-200 border rounded mb-7"
            onChange={handleChange}
            value={form.vehicle.vehicleType}
            required
            name="vehicleType"
            id=""
          >
            <option value="car">car</option>
            <option value="motorcycle">motorcycle</option>
            <option value="auto">auto</option>
          </select>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-black border rounded mb-7"
          >
            Register
          </button>
          <Link to="/captainlogin">
            <button className="text-blue-600">
              <span className="font-medium text-black">
                Already have an account?
              </span>{' '}
              Login
            </button>
          </Link>
        </form>
      </div>
      <div className="mt-3">
        <p className="text-sm font-semibold text-gray-600">
          Ensure all details are accurate to avoid any inconvenience.
        </p>
      </div>
    </div>
  );
};

export default CaptainRegister;
