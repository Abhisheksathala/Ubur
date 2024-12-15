import React from 'react';

const LocationSearch = ({ vehicle, setVehicle, setPanelOpen, panelopen }) => {
  const locations = [
    '15A, beside Harmony Mall, MG Road, Mumbai',
    '302C, near Blue Lotus Cafe, Park Street, Kolkata',
    '45B, opposite Olive Garden, Residency Road, Bangalore',
    '67F, adjacent to Maple Plaza, SG Highway, Ahmedabad',
    '128D, next to Crimson Corner, NH5, Chennai',
    '92E, near Green Valley Park, FC Road, Pune',
    '78G, opposite Oceanview Hotel, Marine Drive, Kochi',
    '33H, close to Amber Cafe, Ring Road, Hyderabad',
    '11J, beside Silver Leaf Tower, Central Avenue, Jaipur',
    '20K, near Sunrise Bistro, Hill Road, Shimla',
  ];

  return (
    <div>
      {/* This is just dummy data for sample purposes */}
      {locations.map((location, index) => (
        <div
          key={index} // Assigning the key to the root element in the map
          onClick={() => setVehicle(true) || setPanelOpen(false)}
          className="flex items-center gap-2 my-2 space-x-2 border-b-2"
        >
          <h2 className="font-semibold bg-[#eee] p-2 rounded-full text-1xl">
            <i className="ri-map-pin-line"></i>
          </h2>
          <h4 className="font-semibold">{location}</h4>
        </div>
      ))}
    </div>
  );
};

export default LocationSearch;
