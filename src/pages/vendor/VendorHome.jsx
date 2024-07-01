import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const VendorHome = () => {
  const navigate = useNavigate();
  const [kycStatus, setKycStatus] = useState(null);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    const checkVendorStatus = async () => {
      const token = localStorage.getItem('vendorToken');
      if (!token) {
        navigate('/vendor/signIn');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/vendors/check-block-status', {
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
        }
      } catch (error) {
        localStorage.removeItem('vendorToken');
        navigate('/vendor/signIn', { state: { message: 'Vendor is blocked or session expired' } });
        toast.error('Vendor is blocked or session expired');
      }
    };

    checkVendorStatus();
  }, [navigate]);

  // Function to toggle mobile nav menu
  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#101820FF] text-white">
      <Toaster position="top-center" reverseOrder={false} />

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
          <div className="hidden md:flex space-x-8 text-white">
            <button
              className="hover:text-yellow-500 transition duration-300"
              onClick={() => navigate('/guide')}
            >
              Guide
            </button>
            <button
              className="hover:text-yellow-500 transition duration-300"
              onClick={() => navigate('/vendor/propertiesList')}
            >
              Properties
            </button>
            <button
              className="hover:text-yellow-500 transition duration-300"
              onClick={() => navigate('/profile')}
            >
              Profile
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMobileNavOpen && (
          <div className="md:hidden bg-gray-900">
            <button
              className="block w-full text-left py-2 px-4 text-white hover:bg-gray-800"
              onClick={() => navigate('/guide')}
            >
              Guide
            </button>
            <button
              className="block w-full text-left py-2 px-4 text-white hover:bg-gray-800"
              onClick={() => navigate('/vendor/propertiesList')}
            >
              Properties
            </button>
            <button
              className="block w-full text-left py-2 px-4 text-white hover:bg-gray-800"
              onClick={() => navigate('/profile')}
            >
              Profile
            </button>
          </div>
        )}
      </nav>

      {/* Main Content */}
      {kycStatus === 'success' ? (
        <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8">
          <div className="flex flex-col md:flex-row items-center bg-gray-800 bg-opacity-80 rounded-3xl shadow-lg overflow-hidden w-full max-w-4xl p-6">
            <div className="w-full md:w-1/2 p-4 sm:p-8">
              <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-white">List Hostels and PGs. Grow your business</h1>
              <p className="text-base sm:text-lg mb-6">Discover a wide range of listings and get started by selecting your preferences below.</p>
              <button
                className="px-4 sm:px-6 py-2 sm:py-3 bg-[#F2AA4CFF] text-black rounded-full hover:bg-yellow-600 transition duration-300"
                onClick={() => navigate('/vendor/addProperty')}
              >
                ADD YOUR PROPERTIES
              </button>
            </div>
            <div className="hidden md:block w-full md:w-1/2 flex justify-center items-center p-4 sm:p-8">
              <img
                src="/vendor/3d-rendering-isometric-house (3).jpg"
                alt="Hostel"
                className="rounded-s-full border-2 border-yellow-300 shadow-lg w-auto h-auto ml-44"
              />
            </div>
          </div>
          {/* Mobile Image */}
          <div className="md:hidden flex justify-center items-center p-4 sm:p-8">
            <img
              src="/vendor/3d-rendering-isometric-house (3).jpg"
              alt="Hostel"
              className="rounded-s-full border-2 border-yellow-300 shadow-lg w-auto h-auto"
            />
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-4 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-medium mb-4 text-yellow-400">KYC Document Under Review</h2>
          <p>Your KYC document is being reviewed by the admin. You can list your property once it is approved.</p>
        </div>
      )}
    </div>
  );
};

export default VendorHome;
