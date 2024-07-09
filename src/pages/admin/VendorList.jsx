import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/admin/Sidebar';
import { FaEnvelope, FaBan, FaUnlock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import PremiumBadge from '/vendor/pngwing.com (3).png'; // Adjust the path to your badge image

const VendorsList = () => {
  const [vendors, setVendors] = useState([]);
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const adminToken = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!adminToken) {
      navigate('/admin/signin');
    }
  }, [adminToken, navigate]);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/vendors/all');
        setVendors(response.data);
      } catch (error) {
        console.error('Error fetching vendors:', error);
        setError('Failed to fetch vendors');
      }
    };

    fetchVendors();
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleBlockVendor = async (vendorId) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/blockVendor/${vendorId}`);
      setVendors(vendors.map(vendor => vendor._id === vendorId ? { ...vendor, isBlocked: true } : vendor));
    } catch (error) {
      console.error('Error blocking vendor:', error);
    }
  };

  const handleUnblockVendor = async (vendorId) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/unblockVendor/${vendorId}`);
      setVendors(vendors.map(vendor => vendor._id === vendorId ? { ...vendor, isBlocked: false } : vendor));
    } catch (error) {
      console.error('Error unblocking vendor:', error);
    }
  };

  const handleViewKYC = (vendorId) => {
    navigate(`/admin/kyc/${vendorId}`);
  };

  const handleViewProperties = (vendorId) => {
    navigate(`/admin/vendor-properties/${vendorId}`);
  };

  const filteredVendors = vendors.filter(vendor =>
    vendor.name.toLowerCase().includes(search.toLowerCase()) &&
    (filter === '' || (filter === 'Active' && !vendor.isBlocked) || (filter === 'Blocked' && vendor.isBlocked) || (filter === 'Premium' && vendor.getPremium))
  );

  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="flex h-screen bg-white text-black">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-extrabold mb-6 text-black drop-shadow-lg">VENDOR LIST</h1>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <select
              className="bg-gray-200 text-black p-3 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              value={filter}
              onChange={handleFilterChange}
            >
              <option value="">Filter By</option>
              <option value="Active">Active</option>
              <option value="Blocked">Blocked</option>
              <option value="Premium">Premium</option>
            </select>
          </div>
          <input
            type="text"
            placeholder="Search Vendor"
            className="bg-gray-200 text-black p-3 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            value={search}
            onChange={handleSearchChange}
          />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-100 rounded-lg shadow-lg overflow-hidden">
            <thead className="bg-[#000000] text-white">
              <tr>
                <th className="py-4 px-6 text-left">ID</th>
                <th className="py-4 px-6 text-left">Name</th>
                <th className="py-4 px-6 text-left">Email</th>
                <th className="py-4 px-6 text-left">Contact</th>
                <th className="py-4 px-6 text-left">Status</th>
                <th className="py-4 px-6 text-left">KYC</th>
                <th className="py-4 px-6 text-left">Properties</th>
                <th className="py-4 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {filteredVendors.map((vendor, index) => (
                <tr key={vendor._id} className="border-b border-gray-400 hover:bg-gray-200 transition duration-200">
                  <td className="py-4 px-6">{index + 1}</td>
                  <td className="py-4 px-6 relative">
                    {vendor.name}
                    {vendor.getPremium && (
                      <img
                        src={PremiumBadge}
                        alt="Premium Badge"
                        className="absolute top-3 right-0 w-5 h-5"
                      />
                    )}
                  </td>
                  <td className="py-4 px-6">{vendor.email}</td>
                  <td className="py-4 px-6">{vendor.contact}</td>
                  <td className="py-4 px-6">{vendor.isBlocked ? 'Blocked' : 'Active'}</td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => handleViewKYC(vendor._id)}
                      className="bg-blue-500 text-white py-1 px-4 rounded-lg hover:bg-blue-600 focus:outline-none"
                    >
                      View
                    </button>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => handleViewProperties(vendor._id)}
                      className="bg-green-500 text-white py-1 px-4 rounded-lg hover:bg-green-600 focus:outline-none"
                    >
                      View
                    </button>
                  </td>
                  <td className="py-4 px-6 flex justify-center space-x-4">
                    <FaEnvelope className="text-blue-500 cursor-pointer hover:scale-125 transition-transform" />
                    {vendor.isBlocked ? (
                      <FaUnlock className="text-green-500 cursor-pointer hover:scale-125 transition-transform" onClick={() => handleUnblockVendor(vendor._id)} />
                    ) : (
                      <FaBan className="text-yellow-500 cursor-pointer hover:scale-125 transition-transform" onClick={() => handleBlockVendor(vendor._id)} />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default VendorsList;
