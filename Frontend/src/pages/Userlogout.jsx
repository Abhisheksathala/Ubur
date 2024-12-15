import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Userlogout = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  axios
    .get(`${import.meta.env.VITE_BASE_URL}/api/v1/user/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      if (res.success) {
        localStorage.removeItem('token');
        navigate('/userlogin');
      }
    });

  return <div>Userlogout</div>;
};

export default Userlogout;
