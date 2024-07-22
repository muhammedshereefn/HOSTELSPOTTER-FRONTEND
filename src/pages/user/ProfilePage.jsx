import { useEffect, useState } from 'react';
import axiosInstance from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null); 

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
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="w-full p-4 flex justify-between items-center">
        <h1 className="text-2xl px-8 font-bold text-[#BEF264]">
          <span className='text-white'>BRO</span>STEL
        </h1>
      </nav>

      <div className="container mx-auto px-4 py-8 flex">
         {/* Wallet Section */}
         <div className="w-[30%] bg-gray-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-center text-[#ffffff]">WALLET</h2>
          <div className="mb-4">
            <p className="text-lg font-medium">Balance:</p>
            <p className="text-2xl font-bold text-[#BEF264]">₹ {userData.wallet.balance}</p>
          </div>
          <div>
            <p className="text-lg font-medium">Transaction History:</p>
            <select
              className="w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none "
              defaultValue="" // Set default value if needed
            >
              <option value="" disabled>Select a transaction</option>
              {userData.wallet.history.map((transaction, index) => (
                <option key={index} value={transaction.amount}>
                {transaction.amount} INR - {transaction.transactionType} ({new Date(transaction.transactionDate).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Profile Details Section */}
        <div className="w-[70%] bg-gray-800 rounded-lg p-6 shadow-lg ml-8">
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
      </div>
    </div>
  );
};

export default ProfilePage;

