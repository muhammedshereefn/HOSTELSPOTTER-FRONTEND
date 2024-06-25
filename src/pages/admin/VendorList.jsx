import  { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/admin/Sidebar';
import {  FaEnvelope, FaBan, FaUnlock } from 'react-icons/fa';

const VendorsList = () => {
  const [vendors, setVendors] = useState([]);
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

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

  // const handleDeleteVendor = async (vendorId) => {
  //   const confirmDelete = window.confirm('Are you sure you want to delete this vendor?');
  //   if (confirmDelete) {
  //     try {
  //       await axios.delete(`http://localhost:5000/api/admin/deleteVendor/${vendorId}`);
  //       setVendors(vendors.filter(vendor => vendor._id !== vendorId));
  //     } catch (error) {
  //       console.log('Error deleting vendor:', error);
  //     }
  //   }
  // };

  const filteredVendors = vendors.filter(vendor =>
    vendor.name.toLowerCase().includes(search.toLowerCase()) &&
    (filter === '' || (filter === 'Active' && !vendor.isBlocked) || (filter === 'Blocked' && vendor.isBlocked))
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
                <th className="py-4 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {filteredVendors.map((vendor, index) => (
                <tr key={vendor._id} className="border-b border-gray-400 hover:bg-gray-200 transition duration-200">
                  <td className="py-4 px-6">{index + 1}</td>
                  <td className="py-4 px-6">{vendor.name}</td>
                  <td className="py-4 px-6">{vendor.email}</td>
                  <td className="py-4 px-6">{vendor.contact}</td>
                  <td className="py-4 px-6">{vendor.isBlocked ? 'Blocked' : 'Active'}</td>
                  <td className="py-4 px-6 flex justify-center space-x-4">
                    {/* <FaTrashAlt className="text-red-500 cursor-pointer hover:scale-125 transition-transform" onClick={() => handleDeleteVendor(vendor._id)} /> */}
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
