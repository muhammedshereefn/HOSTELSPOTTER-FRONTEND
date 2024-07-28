import { useEffect, useState } from 'react';
import axiosInstance from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        navigate('/signIn'); 
        return;
      }

      try {
        const response = await axiosInstance.get('/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data); 
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserData();
  }, [navigate]);

  
  if (!userData) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white">
        <div className="text-center">
          <div className="loader border-t-4 border-b-4 border-[#BEF264] rounded-full w-16 h-16 animate-spin"></div>
          <p className="mt-4 text-lg font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="w-full p-4 flex justify-between items-center">
        <h1 className="text-2xl px-8 font-bold text-[#BEF264]">
          <span className='text-white'>BRO</span>STEL
        </h1>
        <button
            onClick={() => navigate(-1)}
            className="p-2 bg-[#BEF264] text-[#1B213B] mr-11 mt-7 rounded-full"
          >
            <FaArrowLeft className="text-xl" />
          </button>
      </nav>

      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row">
        {/* Profile Details Section */}
        <div className="w-full lg:w-[70%] bg-gray-800 rounded-lg p-6 shadow-lg mb-8 lg:mb-0 lg:mr-8">
          <h2 className="text-2xl font-bold mb-4 text-center text-[#BEF264]">PROFILE</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="username">Username</label>
            <input
              className="w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#BEF264]"
              type="text"
              id="username"
              value={userData.username}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
            <input
              className="w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#BEF264]"
              type="email"
              id="email"
              value={userData.email}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="contact">Contact</label>
            <input
              className="w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#BEF264]"
              type="text"
              id="contact"
              value={userData.contact}
              readOnly
            />
          </div>
          <button
            className="w-full py-2 mt-4 bg-[#7a1004] text-white font-bold rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-[#BEF264]"
            onClick={() => {
              localStorage.removeItem('accessToken');
              navigate('/signIn');
            }}
          >
            Logout
          </button>
        </div>

        {/* Wallet Section */}
        <div className="w-full lg:w-[30%] bg-gray-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-center text-[#ffffff]">WALLET</h2>
          <div className="mb-4">
            <p className="text-lg font-medium">Balance:</p>
            <p className="text-2xl font-bold text-[#BEF264]">₹ {userData.wallet.balance}</p>
          </div>
          <div>
            <p className="text-lg font-medium">Transaction History:</p>
            <button
              className="w-full py-2 mt-4 bg-[#BEF264] text-black font-bold rounded-md hover:bg-[#93c33f] focus:outline-none focus:ring-2 focus:ring-[#BEF264]"
              onClick={() => setIsModalOpen(true)}
            >
              View Transactions
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-[90%] lg:w-[50%] max-h-[90%] overflow-hidden relative">
      <div className="absolute inset-0 border-4 border-[#BEF264] rounded-lg"></div>
      <div className="relative z-10 p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[#BEF264]">Transaction History</h2>
          <button
            className="p-2 bg-[#BEF264] text-[#1B213B] rounded-full"
            onClick={() => setIsModalOpen(false)}
          >
            Close
          </button>
        </div>
        <div className="overflow-y-auto max-h-[60vh]">
          <table className="w-full table-auto">
            <thead>
              <tr className="text-left bg-gray-700">
                <th className="p-2">Amount</th>
                <th className="p-2">Transaction Type</th>
                <th className="p-2">Date</th>
                <th className="p-2">Hostel Name</th> {/* Add this line */}
              </tr>
            </thead>
            <tbody>
              {userData.wallet.history.map((transaction, index) => (
                <tr key={index} className="border-b border-gray-700">
                  <td className="p-2">₹{transaction.amount}</td>
                  <td className="p-2">{transaction.transactionType}</td>
                  <td className="p-2">{new Date(transaction.transactionDate).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                  <td className="p-2">{transaction.hostelName}</td> {/* Add this line */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
)}


    </div>
  );
};

export default ProfilePage;

