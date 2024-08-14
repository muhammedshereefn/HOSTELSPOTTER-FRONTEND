// src/components/admin/UserBookingHistoryPage.tsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../components/admin/Sidebar';
import ReactPaginate from 'react-paginate';
import { FaSearch, } from 'react-icons/fa';

const UserBookingHistory = () => {
  const { userId } = useParams();
  const [bookingHistory, setBookingHistory] = useState([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');

  const itemsPerPage = 8;

  useEffect(() => {
    const fetchBookingHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/user/${userId}/booking-history`);
        setBookingHistory(response.data);
      } catch (error) {
        console.error('Error fetching booking history:', error);
        setError('Failed to fetch booking history');
      }
    };

    fetchBookingHistory();
  }, [userId]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filterBookings = (bookings) => {
    let filteredBookings = bookings;

    if (searchTerm) {
      filteredBookings = filteredBookings.filter((booking) =>
        booking.hostelName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    const now = new Date();

    if (filter === 'yesterday') {
      const yesterday = new Date(now);
      yesterday.setDate(now.getDate() - 1);
      filteredBookings = filteredBookings.filter(
        (booking) => new Date(booking.bookedAt).toDateString() === yesterday.toDateString()
      );
    } else if (filter === 'lastWeek') {
      const lastWeek = new Date(now);
      lastWeek.setDate(now.getDate() - 7);
      filteredBookings = filteredBookings.filter(
        (booking) => new Date(booking.bookedAt) >= lastWeek
      );
    }

    return filteredBookings;
  };

  const filteredBookings = filterBookings(bookingHistory);
  const pageCount = Math.ceil(filteredBookings.length / itemsPerPage);
  const displayedBookings = filteredBookings.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="flex h-screen bg-white text-black">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-extrabold mb-6 text-black drop-shadow-lg">User Booking History</h1>
        <div className="mb-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search by hostel name"
              className="p-2 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <FaSearch className="text-gray-500" />
          </div>
          <div className="flex items-center space-x-4">
            <select
              className="p-2 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filter}
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              <option value="yesterday">Yesterday</option>
              <option value="lastWeek">Last 7 Days</option>
            </select>
           
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-100 rounded-lg shadow-lg overflow-hidden">
            <thead className="bg-[#000000] text-white">
              <tr>
                <th className="py-4 px-6 text-left">Hostel Name</th>
                <th className="py-4 px-6 text-left">Room Name</th>
                <th className="py-4 px-6 text-left">Bed Quantity</th>
                <th className="py-4 px-6 text-left">Booking Date</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {displayedBookings.map((booking) => (
                <tr key={booking._id} className="border-b border-gray-400 hover:bg-gray-200 transition duration-200">
                  <td className="py-4 px-6">{booking.hostelName}</td>
                  <td className="py-4 px-6">{booking.roomName}</td>
                  <td className="py-4 px-6">{booking.bedQuantity}</td>
                  <td className="py-4 px-6">{new Date(booking.bookedAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 flex justify-center">
          <ReactPaginate
              previousLabel={'Previous'}
              nextLabel={'Next'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageChange}
              containerClassName={'pagination flex space-x-2'}
              subContainerClassName={'pages pagination'}
              activeClassName={'bg-black text-white px-3 py-1 rounded-md'}
              pageClassName={'page-item'}
              pageLinkClassName={'page-link px-3 py-1 border border-gray-300 rounded-md'}
              previousClassName={'page-item'}
              previousLinkClassName={'page-link px-3 py-1 border border-gray-300 rounded-md'}
              nextClassName={'page-item'}
              nextLinkClassName={'page-link px-3 py-1 border border-gray-300 rounded-md'}
            />

          </div>
        </div>
      </main>
    </div>
  );
};

export default UserBookingHistory;
