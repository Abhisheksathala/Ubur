import { useState, useRef } from 'react';
import logo from '../assets/10-inspirational-graphic-desig-unscreen.gif';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import LocationSearch from './../components/LocationSearch';
import VechiclePanel from '../components/VechiclePanel';
import ConfirmRide from './../components/ConfirmRide';
import LookingForDriver from './../components/LookingForDriver';
import WaitingForDriver from '../components/WaitforDriver';

const Home = () => {
  const [form, setForm] = useState({
    pickup: '',
    destination: '',
  });

  const [panelopen, setPanelOpen] = useState(false);
  const [vehicle, setVehicle] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vechleFound, setVechleFound] = useState(false);
  const [waitingfordriver, setWaitingfordriver] = useState(false);

  const panelREF = useRef(null);
  const vehicleREF = useRef(null);
  const confirmRidePanelREF = useRef(null);
  const vechleFoundREF = useRef(null);
  const waitingfordriverRef = useRef(null);

  const handdleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handdleSubmit = (e) => {
    e.preventDefault();
  };
  useGSAP(() => {
    if (panelopen) {
      gsap.to(panelREF.current, {
        height: '70%',
      });
    } else {
      gsap.to(panelREF.current, {
        height: '0%',
      });
    }
  }, [panelopen]);
  useGSAP(
    function () {
      if (vehicle) {
        gsap.to(vehicleREF.current, {
          transform: 'translateY(0)',
        });
      } else {
        gsap.to(vehicleREF.current, {
          transform: 'translateY(100%)',
        });
      }
    },
    [vehicle],
  );
  useGSAP(() => {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelREF.current, {
        transform: 'translateY(0)',
      });
    } else {
      gsap.to(confirmRidePanelREF.current, {
        transform: 'translateY(100%)',
      });
    }
  }, [confirmRidePanel]);

  useGSAP(() => {
    if (vechleFound) {
      gsap.to(vechleFoundREF.current, {
        transform: 'translateY(0%)',
      });
    } else {
      gsap.to(vechleFoundREF.current, {
        transform: 'translateY(100%)',
      });
    }
  }, [vechleFound]);

  useGSAP(() => {
    if (waitingfordriver) {
      gsap.to(waitingfordriverRef.current, {
        transform: 'translateY(0%)',
      });
    } else {
      gsap.to(waitingfordriverRef.current, {
        transform: 'translateY(100%)',
      });
    }
  }, [waitingfordriver]);

  return (
    <div className="relative h-screen overflow-hidden">
      <img
        className="absolute w-30 left-[-25%] top-[-17%]"
        src={logo}
        alt="Inspirational Design"
      />
      <div className="image">
        <img
          className="object-cover w-full overflow-hidden"
          src="https://i.pinimg.com/736x/d1/de/00/d1de002e9d211e029c5833e85d161dd8.jpg"
          alt=""
        />
      </div>

      <div className="absolute top-0 flex flex-col justify-end w-full h-screen">
        <div className="h-[30%] p-5 bg-white relative">
          <h4 className="text-2xl font-bold">Find trip</h4>
          <form action="" onSubmit={handdleSubmit}>
            <div className="absolute w-1 h-7 bg-black top-[45%] left-10 rounded-full line"></div>
            <input
              type="text"
              onClick={() => setPanelOpen(!panelopen)}
              className="bg-[#eeee] px-8 mb-2 py-2 text-lg rounded-lg w-full"
              placeholder="Where are you going?"
              onChange={handdleChange}
              value={form.pickup}
              name="pickup"
            />
            <input
              type="text"
              className="bg-[#eeee] mt-3 px-8 py-2 text-lg rounded-lg w-full"
              placeholder="enter your destination?"
              onChange={handdleChange}
              value={form.destination}
              name="destination"
            />
          </form>
        </div>
        <div
          // onClick={() => setPanelOpen(!panelopen)}
          ref={panelREF}
          className="h-[0%] bg-white px-5 "
        >
          <LocationSearch
            setPanelOpen={setPanelOpen}
            panelopen={panelopen}
            vehicle={vehicle}
            setVehicle={setVehicle}
          />
        </div>
      </div>

      <div
        ref={vehicleREF}
        className="fixed bottom-0 z-10 w-full p-5 translate-y-full bg-white"
      >
        <div>
          {/* <h4
          className="text-2xl font-semibold text-center bg-gray-200 cursor-pointer"
          onClick={() => setVehicle(!vehicle) || setPanelOpen(true)}
        >
          <i className="ri-arrow-left-line"></i>
        </h4>
        <h3 className="mb-2 text-2xl font-semibold">choose a vehicle</h3>
        <div className="flex items-center justify-between w-full p-3 mb-2 border rounded shadow-md active:border-black">
          <img
            className="h-10 "
            src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAsJCQcJCQcJCQkJCwkJCQkJCQsJCwsMCwsLDA0QDBEODQ4MEhkSJRodJR0ZHxwpKRYlNzU2GioyPi0pMBk7IRP/2wBDAQcICAsJCxULCxUsHRkdLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCz/wAARCAC0ARsDASIAAhEBAxEB/8QAHAABAAEFAQEAAAAAAAAAAAAAAAECAwQGBwUI/8QAQBAAAQMCBAMFBAcGBQUAAAAAAQACAwQRBQYSITFBURNhcYGRIjJCoQcUI1JyscEVM0NjgpJTYqLR8CQ0c7Lh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDraIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIoJAFzwCCVBIHEgeKx31A3sWgDYkkLy63EKaIDtcWw+jaRfVLJEZXdS3W8fIFB7TpYmi7nADmSbD1Kx/2hRueY4numePeEDS8N/E73R6rUpsRyg8/9TmQynidMh0nzZGfzXoU+Y8nRsbDT4nQxxjYNu9gv1Jcwb95KDYhMTxZbuLgT8lHavPCwWFT12G1f/a1lLP3QTRSH+1pv8lk7j9VUXO0k6j0CdpJ1Hord1O5QXO1f3KO1lHwtPmQqbFUSPjhjdLK9kcTd3SSvbGweLnkBBc+shvvxvaOvEeoVxssTxcOFv8AnNeFLmXLEDy12KU73W4UolqfLVA1zfmrAzLluQksnqWO4B/1SZvqCN/RBtCLxaTG8PmkZCyqiLn/ALu+pjZLfDZ4BDu5eu17Xdx6FRVaIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAseocQYx1uVkLCqXEyAfdAHrugwqmmbI4yta0u4vaeDrdD1WmZ1oRLSUdbDDZ1HI+Ops0XZDINnOtvYEbnvW9g9Vblhina5r2ghwLTfmCLEHuQcKN1F+9dAxjJDH65sLe2J3E08l+xcf8jty35jwWkVdFW0MvY1lPJBJvpEg2f3scPZPkUGODpIINiNwRsR4EbrYsJzhj2GOYx8xraUWDoapxc4D+XKfbB6cQtcUboO34PjeF45B21JIRIwDt6eSwnhJ+80cR0I2/JZddiFNhlLJV1QmMMdtRgjdI7fhcDYDvJAXDqOtrMPqYaujmdFURG7XN3BB4teDsWnmF17L2YaLMFK8ObGysjYGVlK72mkOFi5odxY7/wCHvqNcxHO+JT6o8PjZRx8pXhk1Se/2x2Y/tPitTqpaysk7Wqq5qmTk6qe6Qj8OokDyAWx5oy07DC6voWudhz3DtI93Gje47C/+GeR5cOYWq6u9ETqmj3N7dQbhXY6m1jdWw+yhzI37j2XdR+oRXpRVfInbZbdg2ZdHZ09c8mLZsc+5fHyAfzI7+Xeue6pIzZ17ciOBWVDUEW3Qduila8N3B1AFrmm7XA8CCNldXNsBzE+iLKapLn0R2Ft3U5PxM56eoXrZtxXN+HUMGL5fNDU0NPCZa2KSB0spi3d9Ya5rxdgHvAAEWvuPcitzRYOEVk2IYVg9fMxsctbQUlXIxmrQx80TZC1ure2+yzkBERAREQEREBERAREQEREBERAREQF585+2kHHdtvQL0Fq+ZMRfheG5hr4zaWlpZDCeksmmJh9TfyQRU5kyvR1ow+qxejirCdJje5+ljvuyShpjafFwWVWS4rCYZKKmp6mIMcZ4nymOZ1yC10D92cOvFcfwb6P8Xx7Czi76+GCarMstJFUskcaizi3tJZQfZDiDb2XdeHHaPo+xmvY6vyriokbWYVrNKJiS9sUbxHLT36MJBZvwJ5NQdCikMkUT3xPjc9jXujktrjJF9Di3a45q1VUVFWxOhqYYpon+8yRoc30KvXCAoNIxLIdO7VJhlQ6F3HsKjVJD4Nf74+a0+vwXGcNLvrlHI2MfxogZYCOutnDzAXXq3EIMPjhlnjqHxPeWPfTxGXsQBfXIBvbkrlPU0NdC2ammjmhcXN1sva7dnNIIvccxZBwskbEWtyI4LJoq6sw6qp6ykkMdRC67Txa5p4seObTwI/22tZ2xKsGYMXo46WloY6Oqmgj+q07YZZowfZlmf7xLhY371rcVdWMeHOkfIPiZI4lpCD6PwXF6DMGHds1rDqYYKymks7Q8ts6N4PEG+3UH057mfAJMEqRJCHOw6pc76s4m5hfxMDz1HwnmO8b61geYcbwCqoMVNBUtwqpPZ1bix5hqYdRZdjyNOph1Fu/dzXbpYsLx3DCxxbUUNdAx7HxkcHDUySM8nDiFUcV1KsOWXiOEYjh1fPQPhmlfGQY3wQyPbNE7dkjdAPHpy3HJRFg+Py27PCsRcDuCaaRg9ZAEFgOBFiLg8QVQ5jme0w3bxI5hexFlfNUvDDXsvznmgjH/ALE/JenT5IzA+xmnoKcc/bkmcPJjQP8AUg1mKY7brcMrYvVtnbhwjlqKeU+0yMajSl3GQngGn4gT3jfY51LkPCmPbJW1VTUkWJjitTQuPfou/wD1BbRSUVDQwiCjp4oIR8ELQ0E9XHiT3klBmQyNDQwgNDQGssAG6RsBYbK/x6LEUhzm8D/sgykVtkgdsdnfn4K4ooiIgIiICIiAiIgIiICIiAoJRQSgFy1rOtE2tyxmQNb9sygfOC3ZxFO5tQQbcfdK2J7rAmxNgdhxPgtXxbFaxzZqfsuzgka+KVhbd8kbmlrg5x6jogsZVmZLlvLLoiNLcOgjdYX9qIGNw9QbrVcyacL+kHKeJxez+0mU0VTb43ukfQPcfFun0WDljMdNlmWtwDGJJI6Nk8k2H1QY57WMkNy2RrLu0niCAbG/Xbx805ooMUzLg9dS9rJh2EOpGRuLTHJOIp/rEj2tduLk2bfoOqDtIfbboqw8LXcLzLgGMAfUq2Mync0832VQP6H8fIleyJOqDLDuhUMbGwWYxrGkl1mNDRc7k2CsB/eqw/ggs1uF4RiWj6/QUdUWCzHVMEcj2jo17hqt5rzp8q5ZljbCcIw9sQe2TTFTxx+20WBLmAO+a9kOVV0FmCkpoom0zYYRTtY2NsTWNEbWAaQ0Ntpt3WWTRUVFQxmGjjZBAXOeIYgGxMc4lzixg2FySTb9VAVwa7kWNwLkCxIHeBugvaXdT6lNJVLJL7Eq7cKoosU3Vdwlwgo3RVXaoL2oIUFC5UOcBxKConp8llRv1sB58D4hYgY9w1O+zj5ufYX/AAjisiBzCHBgIa21ieJvzUVeREQEREBERAREQEREBQVKhBBUciqlBCCgrHmp4J2lssbXg/eAJ8jxWSosg0jHsh4TjDNTXOgnbfs3t3Lb8t+S53X/AEeYvQucdbZYxwfpLQfMEhd5LQrbmAggi4PEcj4oPnSTAa2n4tILTsWi2/UFepQZkzXhOln1g1UDdhDXAyAN6Nk98eq7DW4DhtXcmPs3n4orAHxbwWq4jk+YB7omNlbvvHs8DvaUGPh2fMGqNMddHLQTbAufeWnJ7pGDUPNq2yCqgqY2zU80U0TrWkhe17D5tJC5ZWYBLGXDQ4EcQQQR4heXFHimFy9rRVE9NJe94XFoP4m+6fMIO3B6rD1zCgz5idPpjxWlZUsFh21NaKbxcw+wfKy3HDMx4FimkUtYztjb7Cf7Gcd2h9r+RKCznTMUuA4WDTO01ta50ULubG2NyP8An5rkEMebZQ7G6ePF3NY50hr4GVGlrmk6nCZgttz32W5/SKx9Vi2WaQuLWTtEVz8Jkmawn5rqMIhpI4KanaI4aeNkFPHGLNjjiGloFuQQajkbOD8fikoMQc39rUsfadoAGisgBsZNI21t21WG979bbyH9649m6iblPM2D5gw2MR09XK6pdDGNLGTRkMqImgbBr2uv/URy26zHLG9rJIzeN7WyMPVjwHNPpZBlanHhqPgCVNpSNmPPkf1VgSubfS9zb2vpPH1U9s/nLIf6z+iC+Ipz8BHiQFBbb3pYW+dz6BYxcw9/iSfzTWBwA8kGT9gPilk/C3S31KjtQ393GxnefbdfuJWPreVQ545u9N0F18hJu5xc7/MfyHBZFI65l8G39SvOdKBe2w6lZ1C14a97wR2ltAOx0jmfHkgzgVUqAVUCglERAREQEREBERAREQQilQUEWUFVWSyCghQQqyFFkFst7lRoG6vEKLIPPqqCjqgRPC1xt7wFnjwcN1rlflKGQONM4E/dlAB8nAfotyLVQWDfYeaDj+I5angLg+F7TyJbsfA8FrlThEkZvpO247vBd1qIcReCxjKF0Z/xRI71B2XiTZZkqC90slOy/ARRuLR5EoOKYjPipjozNUTSihk1U/bOLzFcg2a53tWuBtddxwzEqfFaChxCAgx1cDZbAg6HnaRjrc2kEHwWpYvlCpbHKOx7SNzSCYt9j4bj0WmUONZjybPPSxtZLRyyGQQ1bHmF5sBrYWODg61gbHlzsg3D6UnxHB8DaSO1OJVLmA8dDYAH27rlq2nL07nYDl1z93HCqDUTztC0XXEsdzDiuYqqOprTG0Qx9jTU9O0thgjvqIY0km54uJJJ8ttkwf6QMWoKampKnDqSqgpoooIXBz6aURRtDWtJZdhsLb6UHXu1HRO1HRc6H0lU1t8CmvztXMt5fZKh30lS/wALAYh07askd6hkYQdHMtuACgzO5W8guWy/SFmKS/YUWFwA/wAqaZ3rI+3yWDLmvOdTcHEpIWu200kUMA9WN1fNB16R72tL5DoYBcvlIYwD8T7BeFW5qy7R6m/WxVTD+DQDtd+hlJEY9SuXuZiVa7VVVFTUOJveolklP+slelSYTK7T7BQbOzNOIVczHQxMp4WuBYxp7SQ98j3Cx8gAtxwnGaiqfDDPGHOfcBzBYja93AbWWpYXgdRKWtiiLjcXdwY38TuC3vDMLhoW32fO4We+1gB91g6IPSCrCpGyqAQVBERAREQEREBERAREQEREBERAUFSiCFFuiqRBRYqLKuyWQUaeKpLe5XbJZBYMa8vEcBwfE43R1lJFIHcSWtv48F7Vksg5lW/RpQNL30PA76LgHyvt814E+S6iAkGKQW4amEfOy7XpTSEHCjlecH3VWzK9QbWjefBjj+QXcdDPuj0CnSOSDjcOT651rU05v/KcPzC9anyTWnSTThv/AJHsbb8yunaUDUGlU2TAyxllhYOjGl5+dgvcpsvYXT2LmOmcLfvSNP8Aa0AL29KWQWmRsY0NY1rWjYNaAGjwA2VYCqspQUqpEQEREBERAREQSoREBERBKIiCEREBERBKIiCEREEqERAsEsERAsEsERAsEsERAsEsiIJREQQpREEIiIJREQQiIglQiIP/2Q=="
            alt=""
          />
          <div className="w-1/2">
            <h4 className="text-base font-medium">
              Uber Go{' '}
              <span>
                <i className="ri-shield-user-line"></i>4
              </span>
              <h5 className="text-sm font-medium">2 mints away</h5>
              <p className="text-xs font-normal"> Affordable ,compact ride</p>
            </h4>
          </div>
          <h2 className="text-xl font-semibold">$192.33</h2>
        </div>
        <div className="flex items-center justify-between w-full p-3 mb-2 border rounded shadow-md active:border-black">
          <img
            className="h-10 "
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_637/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
            alt=""
          />
          <div className="w-1/2">
            <h4 className="text-base font-medium">
              Bike Go{' '}
              <span>
                <i className="ri-shield-user-line"></i>1
              </span>
              <h5 className="text-sm font-medium">2 mints away</h5>
              <p className="text-xs font-normal"> Affordable ,compact ride</p>
            </h4>
          </div>
          <h2 className="text-xl font-semibold">$12.33</h2>
        </div>
        <div className="flex items-center justify-between w-full p-3 mb-2 border rounded shadow-md active:border-black">
          <img
            className="h-10 "
            src="https://th.bing.com/th/id/OIP.gERohywpalGF3NjolmHt5wHaE7?rs=1&pid=ImgDetMain"
            alt=""
          />
          <div className="w-1/2">
            <h4 className="text-base font-medium">
              Auto Go{' '}
              <span>
                <i className="ri-shield-user-line"></i>4
              </span>
              <h5 className="text-sm font-medium">2 mints away</h5>
              <p className="text-xs font-normal"> Affordable ,compact ride</p>
            </h4>
          </div>
          <h2 className="text-xl font-semibold">$192.33</h2>
        </div> */}
        </div>
        {/*  */}
        <VechiclePanel
          vehicle={vehicle}
          setVehicle={setVehicle}
          setConfirmRidePanel={setConfirmRidePanel}
          setPanelOpen={setPanelOpen}
        />
      </div>

      <div
        ref={confirmRidePanelREF}
        className="fixed bottom-0 z-10 w-full p-5 translate-y-full bg-white t"
      >
        <ConfirmRide
          setConfirmRidePanel={setConfirmRidePanel}
          confirmRidePanel={confirmRidePanel}
          setVehicle={setVehicle}
          setVechleFound={setVechleFound}
        />
      </div>
      <div
        ref={vechleFoundREF}
        className="fixed bottom-0 z-10 w-full p-5 translate-y-full bg-white"
      >
        <LookingForDriver
          vechleFound={vechleFound}
          setVechleFound={setVechleFound}
          setConfirmRidePanel={setConfirmRidePanel}
        />
      </div>
      <div
        ref={waitingfordriverRef}
        className="fixed bottom-0 z-10 w-full p-5 translate-y-full bg-white"
      >
        <WaitingForDriver
          vechleFound={vechleFound}
          setVechleFound={setVechleFound}
          setConfirmRidePanel={setConfirmRidePanel}
          waitingfordriver={waitingfordriver}
          setWaitingfordriver={setWaitingfordriver}
        />
      </div>
    </div>
  );
};

export default Home;
