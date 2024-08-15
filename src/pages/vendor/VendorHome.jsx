import { useEffect, useState } from 'react';
import vendorAxiosInstance from '../../api/vendor/axios';
import { useNavigate } from 'react-router-dom';
import  { Toaster } from 'react-hot-toast';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { io } from 'socket.io-client';
import PerformanceModal from '../../components/vendor/PerformanceModal ';

import premiumIcon from '/vendor/pngwing.com (3).png'; 
import CustomAlert from '../../components/vendor/CustomAlert';
import { FaChartLine, FaEnvelope, FaHome, FaPlus, FaUser } from 'react-icons/fa';
 
const VendorHome = () => {
  const navigate = useNavigate();
  const [kycStatus, setKycStatus] = useState(null);
  const [getPremium, setGetPremium] = useState(false); 
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [alert, setAlert] = useState({ message: '', type: '', visible: false });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const checkVendorStatus = async () => {
      const token = localStorage.getItem('vendorToken');
      if (!token) {
        navigate('/vendor/signIn');
        return;
      }

      try {
        const response = await vendorAxiosInstance.get('/vendors/check-block-status', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.isBlocked) {
          localStorage.removeItem('vendorToken');
          navigate('/vendor/signIn', { state: { message: 'Vendor is blocked' } });
          toast.error('Vendor is blocked');
        } else if (response.data.kycImage === null) {
          navigate('/vendor/kyc');
        } else {
          setKycStatus(response.data.kycStatus);
          setGetPremium(response.data.getPremium); 
        }
      } catch (error) {
        localStorage.removeItem('vendorToken');
        navigate('/vendor/signIn', { state: { message: 'Vendor is blocked or session expired' } });
        toast.error('Vendor is blocked or session expired');
      }
    };

    checkVendorStatus();

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


  const handleChatClick = async () => {
    try {
      const response = await vendorAxiosInstance.get('/vendors/vendorId', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('vendorToken')}`,
        },
      });
      const vendorId = response.data.vendorId;
      navigate('/vendor/chat', { state: { vendorId } });
    } catch (error) {
      toast.error('Failed to get vendor ID');
    }
  };


  // Function to toggle mobile nav menu
  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#101820FF] text-white">
      <Toaster position="top-center" reverseOrder={false} />
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

      {alert.visible && (
        <CustomAlert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ ...alert, visible: false })}
        />
      )}

      {/* Navbar */}
      <nav className="w-full bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 py-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center px-6">
          <div className="text-2xl font-extrabold tracking-wide text-[#3f0547]">
            <h5 className="text-[#F2AA4CFF] w-fit cursor-pointer md:pl-20 font-semibold text-xl hover:text-[#8fb848]">
              BROSTEL<span className="text-white">vendor</span>
            </h5>
          </div>
          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden">
            <button
              className="text-white hover:text-yellow-500 focus:outline-none"
              onClick={toggleMobileNav}
            >
              {isMobileNavOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 text-white">
          <button
            className="border border-[#F2AA4CFF] text-white text-sm rounded-full px-4 py-2 flex items-center space-x-2 hover:bg-black hover:text-white transition duration-300"
            onClick={handleChatClick}
          >
            <FaEnvelope className="text-lg" /> {/* Add the message icon */}
            <span>Chat's</span>
          </button>

            <button
            className="border border-[#F2AA4CFF] text-white text-sm rounded-full px-4 py-2 flex items-center space-x-2 hover:bg-black hover:text-white transition duration-300"
            onClick={() => navigate('/vendor/propertiesList')}
          >
            <FaHome className="text-lg" /> 
            <span>Properties</span>
          </button>
          <button
            className="border border-[#F2AA4CFF] text-white text-sm rounded-full px-4 py-2 flex items-center space-x-2 hover:bg-black hover:text-white transition duration-300 relative"
            onClick={() => navigate('/vendor/profile')}
          >
            <FaUser className="text-md" /> 
            <span>Profile</span>
            {getPremium && (
              <img
                src={premiumIcon}
                alt="Premium Vendor"
                className="h-5 w-5 absolute top-0 right-0 -mt-2 -mr-2"
              />
            )}
          </button>

            {!getPremium && (
              <button
                className="border border-[#ff0000] bg-red-500 text-white text-sm rounded-full px-4 py-2 hover:bg-red-800 hover:text-white transition duration-300"
                onClick={() => navigate('/vendor/subscription')}
              >
                SUBSCRIBE
              </button>
              
            )}

          </div>
        </div>
        {/* Mobile Menu */}
        {isMobileNavOpen && (
          <div className="md:hidden bg-gray-900">
           

            <button
              className="block w-full text-left py-2 px-4 text-white hover:bg-gray-800 uppercase"
              onClick={handleChatClick}
            >
              CHAT
            </button>

            <button
              className="block w-full text-left py-2 px-4 text-white hover:bg-gray-800 uppercase"
              onClick={() => navigate('/vendor/propertiesList')}
            >
              Properties
            </button>
            <button
              className="block w-full text-left py-2 px-4 text-white hover:bg-gray-800 relative uppercase"
              onClick={() => navigate('/vendor/profile')}
            >
              Profile
              {getPremium && (
                <img
                  src={premiumIcon}
                  alt="Premium Vendor"
                  className="h-5 w-5 absolute top-3 right-0 "
                />
              )}
            </button>
            {!getPremium && ( 
              <button
                className="block w-full text-left py-2 px-4 text-white hover:bg-gray-800"
                onClick={() => navigate('/vendor/subscription')}
              >
                SUBSCRIBE
              </button>
            )}
          </div>
        )}
      </nav>

      {/* Main Content */}
      {kycStatus === 'success' ? (
        <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8">
         <div className="flex flex-col md:flex-row items-center bg-gray-800 bg-opacity-80 rounded-3xl shadow-lg overflow-hidden w-full max-w-4xl p-6 relative">
  <div className="absolute  rounded-3xl pointer-events-none"></div>
  <div className="w-full md:w-1/2 p-4 sm:p-8 relative z-10">
    <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-white">List Hostels and PGs. Grow your business</h1>
    <p className="text-base sm:text-lg mb-6">Discover a wide range of listings and get started by selecting your preferences below.</p>
    <button
      className="px-3 py-2 font-bold bg-[#F2AA4CFF] text-black rounded-full hover:bg-yellow-600 transition duration-300 flex items-center"
      onClick={() => navigate('/vendor/propertyPayment')}
      style={{
        animation: 'scaleUpDown 2s infinite'
      }}
    >
      <FaPlus className="mr-2 text-lg" />
      ADD YOUR PROPERTIES
      <style jsx>{`
        @keyframes scaleUpDown {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </button>
    <button
      className=" px-4 sm:px-6 py-2 sm:py-1 bg-white text-black rounded-full hover:bg-gray-400 transition duration-300 mt-4 text-sm font-bold flex items-center"
      onClick={() => setIsModalOpen(true)}
    >
      <FaChartLine className="mr-2 text-lg text-blue-900" /> 
      VIEW PERFORMANCE
        </button>
      </div>
      <div className="hidden md:flex w-full md:w-1/2 relative z-10">
      <img
      src="/vendor/Designer (3).png"
      alt="Hostel"
      className="object-cover w-full h-full rounded-e-3xl shadow-md"
      style={{ boxShadow: '0 0 20px 10px rgba(255, 255, 255, 0.5)' }}
    />

      </div>
    </div>

              {/* Mobile Image */}
              <div className="md:hidden flex justify-center items-center p-4 sm:p-8">
              <img
      src="/vendor/Designer.png"
      alt="Hostel"
      className="object-cover w-full h-full rounded-e-3xl shadow-md"
      style={{ boxShadow: '0 0 20px 10px rgba(255, 255, 255, 0.5)' }}
    />

              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-4 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-medium mb-4 text-yellow-400">KYC Document Under Review</h2>
              <p>Your KYC document is being reviewed by the admin. You can list your property once it is approved.</p>
            </div>
          )}

            < PerformanceModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      );
    };

export default VendorHome;
