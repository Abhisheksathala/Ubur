import React from 'react';

const WaitingForDriver = () => {
  // Static data for the ride
  const ride = {
    captain: {
      fullname: { firstname: 'John' },
      vehicle: { plate: 'AB12CD3456' },
    },
    otp: '1234',
    pickup: 'Kanji, Talab, Bopal',
    destination: 'Satellite Road, Ahmedabad',
    fare: 400,
  };

  return (
    <div>
      {/* Back Button */}
      <h5 className="absolute top-0 p-1 text-center w-[93%]" onClick={() => {}}>
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>

      {/* Ride Details */}
      <div className="flex items-center justify-between">
        {/* Driver Image */}
        <img
          className="h-12"
          src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
          alt="Driver"
        />
        {/* Ride Info */}
        <div className="text-right">
          <h2 className="text-lg font-medium capitalize">
            {ride.captain.fullname.firstname}
          </h2>
          <h4 className="-mt-1 -mb-1 text-xl font-semibold">
            {ride.captain.vehicle.plate}
          </h4>
          <p className="text-sm text-gray-600">Maruti Suzuki Alto</p>
          <h1 className="text-lg font-semibold">{ride.otp}</h1>
        </div>
      </div>

      {/* Address and Payment Details */}
      <div className="flex flex-col items-center justify-between gap-2">
        <div className="w-full mt-5">
          {/* Pickup Address */}
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="-mt-1 text-sm text-gray-600">{ride.pickup}</p>
            </div>
          </div>
          {/* Destination Address */}
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="-mt-1 text-sm text-gray-600">{ride.destination}</p>
            </div>
          </div>
          {/* Fare Details */}
          <div className="flex items-center gap-5 p-3">
            <i className="ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">₹{ride.fare}</h3>
              <p className="-mt-1 text-sm text-gray-600">Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingForDriver;
