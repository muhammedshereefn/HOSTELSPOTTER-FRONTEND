import { useEffect, useState } from 'react';
import vendorAxiosInstance from '../../api/vendor/axios';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import CustomAlert from '../../components/vendor/CustomAlert';

const VendorProfile = () => {
  const navigate = useNavigate();
  const [vendorData, setVendorData] = useState(null);
  const [alert, setAlert] = useState({ message: '', type: '', visible: false });

  useEffect(() => {
    const fetchVendorData = async () => {
      const token = localStorage.getItem('vendorToken');
      if (!token) {
        navigate('/vendor/signIn');
        return;
      }

      try {
        const response = await vendorAxiosInstance.get('/vendors/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setVendorData(response.data);
      } catch (error) {
        console.error('Error fetching vendor profile:', error);
      }
    };

    fetchVendorData();

    const socket = io('https://watch-vogue.shop');

    socket.on('newBooking', ({ userName, bedQuantity, hostelName }) => {
      setAlert({
        message: `New Booking! ${userName} booked ${bedQuantity} beds in ${hostelName}`,
        type: 'success',
        visible: true,
      });   
    });

    socket.on('bookingCancelled', ({ userName, bedQuantity, hostelName }) => {
      setAlert({
        message: `Booking Cancelled! ${userName} cancelled ${bedQuantity} beds in ${hostelName}`,
        type: 'error',
        visible: true,
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [navigate]);

  if (!vendorData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="w-full p-4 flex justify-between items-center">
        {alert.visible && (
          <CustomAlert
            message={alert.message}
            type={alert.type}
            onClose={() => setAlert({ ...alert, visible: false })}
          />
        )}
        <button
          className="py-2 px-4 bg-gray-700 text-white font-bold rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-[#BEF264]"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </nav>

      <div className="container mx-auto px-4 py-8 flex">
        {/* Profile Details Section */}
        <div className="w-full bg-gray-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-center text-[#F2AA4CFF]"><span className='text-white'>VENDOR</span> PROFILE</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="vendorname">Vendor Name</label>
            <input
              className="w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#BEF264]"
              type="text"
              id="vendorname"
              value={vendorData.vendorname}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
            <input
              className="w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#BEF264]"
              type="email"
              id="email"
              value={vendorData.email}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="contact">Contact</label>
            <input
              className="w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#BEF264]"
              type="text"
              id="contact"
              value={vendorData.contact}
              readOnly
            />
          </div>
          <button
            className="w-full py-2 mt-4 bg-[#7a1004] text-white font-bold rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-[#BEF264]"
            onClick={() => {
              localStorage.removeItem('vendorToken');
              navigate('/vendor/signIn');
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorProfile;
