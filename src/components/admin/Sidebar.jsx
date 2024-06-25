// import { Link, useLocation } from 'react-router-dom';
// import { FaTachometerAlt, FaUsers, FaStore, FaHome, FaMoneyBill, FaComments, FaSignOutAlt } from 'react-icons/fa';

// const Sidebar = () => {
//   const location = useLocation();

//   return (
//     <aside className="w-64 h-full bg-gradient-to-b from-[#1b2735] to-[#0d162c] shadow-lg shadow-[#000000aa]">
//       <div className="p-8">
       
//         <h1 className="text-3xl font-bold text-center mb-14 text-[#BEF264] drop-shadow-md">
//           BRO<span className="text-white">stel</span>
//         </h1>
//         <nav>
//           <ul>
//             <li className="mb-4">
//               <Link
//                 to="/admin/dashboard"
//                 className={`flex items-center p-2 hover:bg-gray-700 rounded-lg shadow-lg transform transition-transform hover:translate-x-1 ${
//                   location.pathname === '/admin/dashboard' ? 'bg-gray-700' : ''
//                 }`}
//                 title="Dashboard"
//               >
//                 <FaTachometerAlt className="text-white" />
//                 <span className="ml-2 text-[#ffffff]">Dashboard</span>
//               </Link>
//             </li>
//             <li className="mb-4">
//               <Link
//                 to="/admin/userlist"
//                 className={`flex items-center p-2 hover:bg-gray-700 rounded-lg shadow-lg transform transition-transform hover:translate-x-1 ${
//                   location.pathname === '/admin/userlist' ? 'bg-gray-700' : ''
//                 }`}
//                 title="Users List"
//               >
//                 <FaUsers className="text-white" />
//                 <span className="ml-2 text-[#ffffff]">Users List</span>
//               </Link>
//             </li>
//             <li className="mb-4">
//               <Link
//                 to="/admin/vendorlist"
//                 className={`flex items-center p-2 hover:bg-gray-700 rounded-lg shadow-lg transform transition-transform hover:translate-x-1 ${
//                   location.pathname === '/admin/vendorlist' ? 'bg-gray-700' : ''
//                 }`}
//                 title="Vendors List"
//               >
//                 <FaStore className="text-white" />
//                 <span className="ml-2 text-[#ffffff]">Vendors List</span>
//               </Link>
//             </li>
//             <li className="mb-4">
//               <Link
//                 to="/admin/properties"
//                 className={`flex items-center p-2 hover:bg-gray-700 rounded-lg shadow-lg transform transition-transform hover:translate-x-1 ${
//                   location.pathname === '/admin/properties' ? 'bg-gray-700' : ''
//                 }`}
//                 title="Properties"
//               >
//                 <FaHome className="text-white" />
//                 <span className="ml-2 text-[#ffffff]">Properties</span>
//               </Link>
//             </li>
//             <li className="mb-4">
//               <Link
//                 to="/admin/payments"
//                 className={`flex items-center p-2 hover:bg-gray-700 rounded-lg shadow-lg transform transition-transform hover:translate-x-1 ${
//                   location.pathname === '/admin/payments' ? 'bg-gray-700' : ''
//                 }`}
//                 title="Payments"
//               >
//                 <FaMoneyBill className="text-white" />
//                 <span className="ml-2 text-[#ffffff]">Payments</span>
//               </Link>
//             </li>
//             <li className="mb-4">
//               <Link
//                 to="/admin/communication"
//                 className={`flex items-center p-2 hover:bg-gray-700 rounded-lg shadow-lg transform transition-transform hover:translate-x-1 ${
//                   location.pathname === '/admin/communication' ? 'bg-gray-700' : ''
//                 }`}
//                 title="Communication"
//               >
//                 <FaComments className="text-white" />
//                 <span className="ml-2 text-[#ffffff]">Communication</span>
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/logout"
//                 className="flex items-center p-2 hover:bg-gray-700 rounded-lg shadow-lg transform transition-transform hover:translate-x-1"
//                 title="Logout"
//               >
//                 <FaSignOutAlt className="text-white" />
//                 <span className="ml-2 text-[#ffffff]">Logout</span>
//               </Link>
//             </li>
//           </ul>
//         </nav>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;










import { Link, useLocation } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaStore, FaHome, FaMoneyBill, FaComments, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 h-full bg-gradient-to-b from-[#4e54c8] to-[#8f94fb] shadow-lg shadow-[#000000aa]">
      <div className="p-8">
        <h1 className="text-4xl font-extrabold text-center mb-14 text-white drop-shadow-lg">
          BRO<span className="text-[#FFD700]">stel</span>
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
                to="/admin/properties"
                className={`flex items-center p-2 hover:bg-[#6a6cff] rounded-lg shadow-lg transform transition-transform hover:translate-x-1 ${
                  location.pathname === '/admin/properties' ? 'bg-[#6a6cff]' : ''
                }`}
                title="Properties"
              >
                <FaHome className="text-white" />
                <span className="ml-2 text-white">Properties</span>
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
              <Link
                to="/logout"
                className="flex items-center p-2 hover:bg-[#6a6cff] rounded-lg shadow-lg transform transition-transform hover:translate-x-1"
                title="Logout"
              >
                <FaSignOutAlt className="text-white" />
                <span className="ml-2 text-white">Logout</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
