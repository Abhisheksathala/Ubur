import React from 'react';

const ConfirmRide = ({ setConfirmRidePanel, setVehicle, setVechleFound }) => {
  return (
    <div className="relative max-w-md p-4 mx-auto bg-white rounded-lg shadow-md">
      {/* Back Button */}
      <h4
        className="absolute text-xl font-semibold text-gray-600 cursor-pointer top-4 right-4 hover:text-gray-800"
        onClick={() => {
          setConfirmRidePanel(false);
          setVehicle(true);
        }}
      >
        <i className="ri-arrow-left-line"></i>
      </h4>

      {/* Header */}
      <h3 className="mb-6 text-2xl font-bold text-center text-gray-800">
        Confirm Your Ride
      </h3>

      {/* Ride Details */}
      <div className="flex flex-col items-center gap-6">
        {/* Ride Image */}
        <img
          className="object-cover w-32 h-32 rounded-full shadow-md"
          src="data:image/jpeg;base64,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"
          alt=""
        />

        {/* From Address */}
        <div className="flex items-center w-full gap-4 py-3 border-b">
          <i className="text-xl text-green-500 ri-map-pin-line"></i>
          <div>
            <h3 className="text-lg font-medium text-gray-800">456/11-H</h3>
            <p className="text-sm text-gray-500">Kanji, Talab, Bopal</p>
          </div>
        </div>

        {/* To Address */}
        <div className="flex items-center w-full gap-4 py-3 border-b">
          <i className="text-xl text-blue-500 ri-map-pin-2-fill"></i>
          <div>
            <h3 className="text-lg font-medium text-gray-800">456/11-H</h3>
            <p className="text-sm text-gray-500">Kanji, Talab, Bopal</p>
          </div>
        </div>

        {/* Payment Details */}
        <div className="flex items-center w-full gap-4 py-3 border-b">
          <i className="text-xl text-yellow-500 ri-money-rupee-circle-fill"></i>
          <div>
            <h3 className="text-lg font-medium text-gray-800">₹400</h3>
            <p className="text-sm text-gray-500">Cash</p>
          </div>
        </div>
      </div>

      {/* Confirm Button */}
      <button
        onClick={() => {
          setConfirmRidePanel(false);
          setVechleFound(true);
        }}
        className="w-full px-4 py-2 mt-6 text-lg font-semibold text-white transition-all bg-green-500 rounded-lg shadow-lg hover:bg-green-600 active:bg-green-700"
      >
        Confirm Ride
      </button>
    </div>
  );
};

export default ConfirmRide;
