import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/admin/Sidebar';
import { FaTrashAlt,  FaBan, FaUnlock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const navigate = useNavigate();
  const adminToken = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!adminToken) {
      navigate('/admin/signin');
    }
  }, [adminToken, navigate]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://watch-vogue.shop/api/users/all');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to fetch users');
      }
    };

    fetchUsers();
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleBlockUser = async (userId) => {
    try {
      await axios.put(`https://watch-vogue.shop/api/admin/blockUser/${userId}`);
      setUsers(users.map(user => user._id === userId ? { ...user, isBlocked: true } : user));
    } catch (error) {
      console.error('Error blocking user:', error);
    }
  };

  const handleUnblockUser = async (userId) => {
    try {
      await axios.put(`https://watch-vogue.shop/api/admin/unblockUser/${userId}`);
      setUsers(users.map(user => user._id === userId ? { ...user, isBlocked: false } : user));
    } catch (error) {
      console.error('Error unblocking user:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      try {
        await axios.delete(`https://watch-vogue.shop/api/admin/deleteUser/${userId}`);
        setUsers(users.filter(user => user._id !== userId));
      } catch (error) {
        console.log('Error deleting user:', error);
      }
    }
  };

  const viewBookingHistory = (userId) => {
    navigate(`/admin/user/${userId}/booking-history`);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) &&
    (filter === '' || (filter === 'Active' && !user.isBlocked) || (filter === 'Blocked' && user.isBlocked))
  );

  // Calculate paginated users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="flex h-screen bg-white text-black">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-extrabold mb-6 text-black drop-shadow-lg">USER LIST</h1>
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
            placeholder="Search User"
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
              {currentUsers.map((user, index) => (
                <tr key={user._id} className="border-b border-gray-400 hover:bg-gray-200 transition duration-200">
                  <td className="py-4 px-6">{indexOfFirstUser + index + 1}</td>
                  <td className="py-4 px-6">{user.name}</td>
                  <td className="py-4 px-6">{user.email}</td>
                  <td className="py-4 px-6">{user.contact}</td>
                  <td className="py-4 px-6">{user.isBlocked ? 'Blocked' : 'Active'}</td>
                  <td className="py-4 px-6 flex justify-center space-x-4">
                    <FaTrashAlt className="text-red-500 cursor-pointer hover:scale-125 transition-transform" onClick={() => handleDeleteUser(user._id)} />
                    {user.isBlocked ? (
                      <FaUnlock className="text-green-500 cursor-pointer hover:scale-125 transition-transform" onClick={() => handleUnblockUser(user._id)} />
                    ) : (
                      <FaBan className="text-yellow-500 cursor-pointer hover:scale-125 transition-transform" onClick={() => handleBlockUser(user._id)} />
                    )}
                     <button
                      className="text-sm text-black hover:underline bg-[#00000025] rounded-lg"
                      onClick={() => viewBookingHistory(user._id)}
                    >
                      View Booking History
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded-lg ${currentPage === index + 1 ? 'bg-black text-white' : 'bg-gray-200 text-black'}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default UsersList;
