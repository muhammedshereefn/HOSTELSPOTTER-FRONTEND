// src/components/CheckUserBlocked.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axios';
import toast from 'react-hot-toast';

const CheckUserBlocked = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserBlocked = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/signIn');
        return;
      }

      try {
        const response = await axiosInstance.get('/users/details', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { isBlocked } = response.data;

        if (isBlocked) {
          localStorage.removeItem('token');
          toast.error('User is blocked');
          navigate('/signIn');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        localStorage.removeItem('token');
        navigate('/signIn');
      }
    };

    checkUserBlocked();
  }, [navigate]);

  return <>{children}</>;
};

export default CheckUserBlocked;
