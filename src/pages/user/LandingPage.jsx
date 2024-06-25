// src/pages/user/Home.jsx
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#1E2530] min-h-screen flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-8 py-12">
        <h1 className="text-4xl font-bold text-white mb-6 text-center">Find Your Perfect Accommodation</h1>
        <p className="text-lg text-gray-200 mb-12 text-center">
          Connecting students and professionals with PGs and hostels
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white shadow-lg rounded-lg p-8 transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">For Users</h2>
            <p className="text-gray-600 mb-4">
              Discover a range of accommodations tailored to your needs. From shared apartments to single rooms, find your ideal place to stay.
            </p>
            <button
              onClick={() => navigate('/signup', { state: { userType: 'user' } })}
              className="bg-[#BEF264] text-black font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50 hover:bg-green-600 hover:text-white transition duration-300"
            >
              Search Accommodations
            </button>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-8 transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">For Sellers</h2>
            <p className="text-gray-600 mb-4">
              List your properties with ease. Manage listings, update availability, and connect with potential tenants effortlessly.
            </p>
            <button
              onClick={() => navigate('/sell', { state: { userType: 'seller' } })}
              className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-opacity-50 transition duration-300"
            >
              List Your Property
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
