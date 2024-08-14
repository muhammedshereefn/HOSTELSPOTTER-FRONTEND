import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const VendorKYCApproval = () => {
  const { vendorId } = useParams();
  const [vendor, setVendor] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/vendors/${vendorId}`);
        setVendor(response.data);
      } catch (error) {
        console.error('Error fetching vendor:', error);
        setError('Failed to fetch vendor');
      }
    };

    fetchVendor();
  }, [vendorId]);

  const handleApprove = async () => {
    try {
      await axios.put(`http://localhost:5000/api/admin/approveKYC/${vendorId}`);
      setVendor({ ...vendor, kycStatus: 'success' });
    } catch (error) {
      console.error('Error approving KYC:', error);
    }
  };

  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;
  }

  if (!vendor) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100 text-black">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8 mr-14 ml-14">
        <div className="bg-white p-6 rounded-2xl shadow-2xl">
          <h1 className="text-2xl font-extrabold mb-6 text-gray-800">KYC APPROVAL</h1>
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="text-center">
              <h2 className=" font-bold text-gray-700">{vendor.name}</h2>
              <p className="text-sm text-gray-500">{vendor.contact}</p>
            </div>
            <div className="w-2/5 p-4 bg-gray-50 rounded-xl shadow-lg">
              <img
                src={`http://localhost:5000/${vendor.kycImage}`}
                alt="KYC"
                className="w-full rounded-xl shadow-md"
              />
            </div>
            {vendor.kycStatus === 'success' ? (
              <span className="text-green-500 font-semibold text-lg">Approved</span>
            ) : (
              <button
                onClick={handleApprove}
                className="bg-green-500 text-white py-2 px-6 rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 transition-transform transform hover:scale-105"
              >
                Approve
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default VendorKYCApproval;
