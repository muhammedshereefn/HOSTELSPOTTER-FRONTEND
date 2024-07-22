import { useEffect, useState } from 'react';
import axiosInstance from '../../api/axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaHistory, FaRegUserCircle } from 'react-icons/fa';

export default function BookingHistoryPage() {
  const navigate = useNavigate();
  const [bookingHistory, setBookingHistory] = useState([]);
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    if (!token) {
      console.error('No access token found, redirecting to login...');
      navigate('/signIn');
      return;
    }

    const fetchBookingHistory = async () => {
      try {
        const response = await axiosInstance.get('/users/booking-history', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookingHistory(response.data);
      } catch (error) {
        console.error('Error fetching booking history:', error);
      }
    };

    fetchBookingHistory();
  }, [token, navigate]);

  const handleCancelSlot = async (bookingId) => {
    const confirmation = window.confirm('Are you sure you want to cancel this booking?');
    if (!confirmation) return;

    try {
      await axiosInstance.delete(`/users/booking-history/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBookingHistory(bookingHistory.filter((booking) => booking.id !== bookingId));
      toast.success('Booking cancelled successfully');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error('Cancellation time has expired');
      } else {
        console.error('Error canceling booking:', error);
      }
    }
  };

  return (
    
    <div className="container mx-auto px-4 py-8">
                  <header className="w-full flex justify-between items-center shadow-md px-8 sm:pl-14">
                <h1 className="text-2xl font-bold text-[#BEF264]"><span className='text-white'>BRO</span>STEL</h1>
                <div className="flex items-center space-x-4 sm:pr-16">




                <Link to="/profile">
            <button className="p-2 bg-[#BEF264] text-[#1B213B] rounded-full">
              <FaRegUserCircle className="text-xl" />
            </button>
          </Link>
                </div>
            </header>
      <h1 className="text-2xl mt-8 font-bold mb-8 text-center text-white">BOOKING <span className='text-[#BEF264]'>HISTORY</span></h1>
      <ToastContainer />
      {bookingHistory.length === 0 ? (
        <div className="text-center text-white">
          <p className="text-sm">No bookings found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-[#BEF264]">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Hostel Name</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Location</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Room</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Beds Booked</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Booked At</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookingHistory.map((booking) => (
                <tr key={booking.id} className="border-b">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.hostelName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.hostelLocation}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.roomName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.bedQuantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(booking.bookedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <button
                      onClick={() => handleCancelSlot(booking.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                      Cancel Slot
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
