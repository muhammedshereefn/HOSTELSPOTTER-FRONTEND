// src/pages/user/Home.jsx
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const toastShownRef = useRef(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signin');
      return;
    }

    const checkBlockStatus = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/check-block-status', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        if (response.status === 403) {
          localStorage.removeItem('token');
          navigate('/signin', { state: { message: 'User is blocked' } });
        }
      } catch (error) {
        localStorage.removeItem('token');
        navigate('/signin', { state: { message: 'User is blocked or session expired' } });
      }
    };

    checkBlockStatus();

    if (location.state?.message && !toastShownRef.current) {
      toast.success(location.state.message);
      toastShownRef.current = true;
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate, location.pathname]);

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-white">Welcome to the Home Page</h1>
      {/* Your home page content */}
    </div>
  );
};

export default Home;
