

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaStore,  FaMoneyBill, FaComments, FaSignOutAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication tokens or any other user data from localStorage
    localStorage.removeItem('adminToken');

    // Show a toast message to indicate successful logout
    toast.success('Logged out successfully');

    // Redirect the user to the login page
    navigate('/admin/signIn');
  };

  return (
    <aside className="w-64 h-full bg-gradient-to-b from-[#4e54c8] to-[#8f94fb] shadow-lg shadow-[#000000aa]">
      <div className="p-8">
        <h1 className="text-4xl font-extrabold text-center mb-14 text-white drop-shadow-lg">
          BRO<span className="text-[#FFD700]">STEL</span>
        </h1>
        <nav>
          <ul>
            <li className="mb-4">
              <Link
                to="/admin/dashboard"
                className={`flex items-center p-2 hover:bg-[#6a6cff] rounded-lg shadow-lg transform transition-transform hover:translate-x-1 ${
                  location.pathname === '/admin/dashboard' ? 'bg-[#6a6cff]' : ''
                }`}
                title="Dashboard"
              >
                <FaTachometerAlt className="text-white" />
                <span className="ml-2 text-white">Dashboard</span>
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="/admin/userlist"
                className={`flex items-center p-2 hover:bg-[#6a6cff] rounded-lg shadow-lg transform transition-transform hover:translate-x-1 ${
                  location.pathname === '/admin/userlist' ? 'bg-[#6a6cff]' : ''
                }`}
                title="Users List"
              >
                <FaUsers className="text-white" />
                <span className="ml-2 text-white">Users List</span>
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="/admin/vendorlist"
                className={`flex items-center p-2 hover:bg-[#6a6cff] rounded-lg shadow-lg transform transition-transform hover:translate-x-1 ${
                  location.pathname === '/admin/vendorlist' ? 'bg-[#6a6cff]' : ''
                }`}
                title="Vendors List"
              >
                <FaStore className="text-white" />
                <span className="ml-2 text-white">Vendors List</span>
              </Link>
            </li>

            <li className="mb-4">
              <Link
                to="/admin/payments"
                className={`flex items-center p-2 hover:bg-[#6a6cff] rounded-lg shadow-lg transform transition-transform hover:translate-x-1 ${
                  location.pathname === '/admin/payments' ? 'bg-[#6a6cff]' : ''
                }`}
                title="Payments"
              >
                <FaMoneyBill className="text-white" />
                <span className="ml-2 text-white">Payments</span>
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="/admin/communication"
                className={`flex items-center p-2 hover:bg-[#6a6cff] rounded-lg shadow-lg transform transition-transform hover:translate-x-1 ${
                  location.pathname === '/admin/communication' ? 'bg-[#6a6cff]' : ''
                }`}
                title="Communication"
              >
                <FaComments className="text-white" />
                <span className="ml-2 text-white">Communication</span>
              </Link>
            </li>
            <li>
            <button
                onClick={handleLogout}
                className="flex items-center p-2 w-full text-left hover:bg-[#6a6cff] rounded-lg shadow-lg transform transition-transform hover:translate-x-1"
                title="Logout"
              >
                <FaSignOutAlt className="text-white" />
                <span className="ml-2 text-white">Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
