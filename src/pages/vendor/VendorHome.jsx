




// src/pages/vendor/VendorHome.jsx
import  { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const VendorHome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkBlockStatus = async () => {
      const token = localStorage.getItem('vendorToken');
      if (!token) {
        navigate('/vendor/signIn');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/vendors/check-block-status', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data.isBlocked) {
          localStorage.removeItem('vendorToken');
          navigate('/vendor/signIn', { state: { message: 'Vendor is blocked' } });
          toast.error('Vendor is blocked');
        }
      } catch (error) {
        localStorage.removeItem('vendorToken');
        navigate('/vendor/signIn', { state: { message: 'Vendor is blocked or session expired' } });
        toast.error('Vendor is blocked or session expired');
      }
    };

    checkBlockStatus();
  }, [navigate]);

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-white">Vendor Home Page</h1>
      {/* Vendor home page content */}
    </div>
  );
};

export default VendorHome;

