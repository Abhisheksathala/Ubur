import React from 'react';
import { Link } from 'react-router-dom';

const Start = () => {
  return (
    <div className="">
      <div className="flex flex-col justify-between w-full h-screen pt-8 bg-red-400 bg-[url(https://i.pinimg.com/736x/9c/1a/8f/9c1a8f577de9c28e30d0f9d217641dde.jpg)] bg-cover bg-center">
        <img
          className="w-20 ml-8"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <div className="px-4 py-4 text-center bg-white">
          <h2 className="text-3xl font-bold">Get Started with Uber</h2>
          <Link to="/userlogin">
            <button className="w-full px-4 py-3 mt-4 text-white bg-black rounded">
              Continue
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Start;
