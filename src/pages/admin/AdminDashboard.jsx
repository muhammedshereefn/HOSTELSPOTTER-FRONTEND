import { FaUserAlt, FaCube, FaMoneyBillWave, FaUsers } from 'react-icons/fa';
import Sidebar from '../../components/admin/Sidebar';
import 'tailwindcss/tailwind.css';

const AdminDashboard = () => {
  
  return (
    <div className="flex h-screen bg-white text-black">
      <Sidebar />
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-4xl font-extrabold drop-shadow-lg">Dashboard</h2>
          <div className="flex items-center">
            <div className="mr-4">
              <span className="flag-icon flag-icon-in"></span>
            </div>
            <div className="flex items-center">
              <img
                src="https://via.placeholder.com/40"
                alt="Profile"
                className="rounded-full w-12 h-12 shadow-lg"
              />
              <div className="ml-2">
                <h3 className="text-lg font-semibold">Shereef</h3>
                <p className="text-sm text-gray-500">Admin</p>
              </div>
            </div>
          </div>
        </header>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-gray-200 p-6 rounded-xl flex items-center justify-between shadow-2xl">
            <div>
              <h4 className="text-xl font-bold">Total Users</h4>
              <p className="text-4xl font-extrabold">40,689</p>
            </div>
            <FaUserAlt className="text-5xl text-gray-700" />
          </div>
          <div className="bg-gray-200 p-6 rounded-xl flex items-center justify-between shadow-2xl">
            <div>
              <h4 className="text-xl font-bold">Total Properties</h4>
              <p className="text-4xl font-extrabold">10,293</p>
              <p className="text-sm text-green-600">1.3% Up from past week</p>
            </div>
            <FaCube className="text-5xl text-gray-700" />
          </div>
          <div className="bg-gray-200 p-6 rounded-xl flex items-center justify-between shadow-2xl">
            <div>
              <h4 className="text-xl font-bold">Total Revenue</h4>
              <p className="text-4xl font-extrabold">₹89,000.87</p>
            </div>
            <FaMoneyBillWave className="text-5xl text-gray-700" />
          </div>
          <div className="bg-gray-200 p-6 rounded-xl flex items-center justify-between shadow-2xl">
            <div>
              <h4 className="text-xl font-bold">Total Sellers</h4>
              <p className="text-4xl font-extrabold">120</p>
            </div>
            <FaUsers className="text-5xl text-gray-700" />
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
