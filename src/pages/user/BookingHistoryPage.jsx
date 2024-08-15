
import { useEffect, useState } from 'react';
import axiosInstance from '../../api/axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaArrowLeft, FaRegUserCircle } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';
import Modal from 'react-modal';

export default function BookingHistoryPage() {
  const navigate = useNavigate();
  const [bookingHistory, setBookingHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [itemsPerPage] = useState(4); 
  const [selectedBooking, setSelectedBooking] = useState(null);
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
        setPageCount(Math.ceil(response.data.length / itemsPerPage));
      } catch (error) {
        console.error('Error fetching booking history:', error);
      }
    };

    fetchBookingHistory();
  }, [token, navigate, itemsPerPage]);

  const handleCancelSlot = async (bookingId) => {
  

    const isConfirmed = window.confirm("Are you sure you want to cancel this booking?");

    if (!isConfirmed) {
      return; 
    }
  
    try {
      await axiosInstance.delete(`/users/booking-history/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBookingHistory((prevHistory) =>
        prevHistory.map((booking) =>
          booking.id === bookingId ? { ...booking, status: 'Cancelled' } : booking
        )
      );

      toast.success('Booking cancelled successfully');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error('Cancellation time has expired');
      } else {
        console.error('Error canceling booking:', error);
      }
    }
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const handleDetailsClick = (booking) => {
    setSelectedBooking(booking);
  };

  const closeModal = () => {
    setSelectedBooking(null);
  };

  const offset = currentPage * itemsPerPage;
  const currentPageData = bookingHistory.slice(offset, offset + itemsPerPage);

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
      <button
        onClick={() => navigate(-1)}
        className="p-2 bg-[#BEF264] text-[#1B213B] mt-7 rounded-full"
      >
        <FaArrowLeft className="text-xl" />
      </button>
      <h1 className="text-2xl mt-8 font-bold mb-8 text-center text-white">BOOKING <span className='text-[#BEF264]'>HISTORY</span></h1>
      <ToastContainer />
      {bookingHistory.length === 0 ? (
        <div className="text-center text-white">
          <p className="text-sm">No bookings found.</p>
        </div>
      ) : (
        <div className="shadow-sm rounded-xl">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-[#BEF264]">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 uppercase">Hostel Name</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 uppercase">Booked At</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 uppercase">Booking For</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 uppercase">Details</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-900"></th>
              </tr>
            </thead>
            <tbody>
              {currentPageData.map((booking) => (
                <tr key={booking.id} className="border-b hover:bg-gray-100 transition">
                  <td className="px-6 py-4 text-sm text-gray-900">{booking.hostelName}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{booking.status}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {new Date(booking.bookedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 ">
                    <span className='bg-[#BEF264] rounded-2xl p-1'>{new Date(booking.bookingDate).toLocaleDateString()}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <button
                      onClick={() => handleDetailsClick(booking)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                      Details
                    </button>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {booking.status === 'Success' && (
                      <button
                        onClick={() => handleCancelSlot(booking.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                      >
                        Cancel Slot
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-5 flex justify-center">
            <ReactPaginate
              previousLabel={'Previous'}
              nextLabel={'Next'}
              breakLabel={'...'}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={'flex items-center space-x-1'}
              pageClassName={'mx-1'}
              pageLinkClassName={'px-4 py-2 border border-transparent rounded text-white bg-gray-700 hover:bg-gray-500 transition'}
              previousClassName={'mx-1'}
              previousLinkClassName={'px-4 py-2 border border-transparent rounded text-white bg-gray-700 hover:bg-gray-500 transition'}
              nextClassName={'mx-1'}
              nextLinkClassName={'px-4 py-2 border border-transparent rounded text-white bg-gray-700 hover:bg-gray-500 transition'}
              activeClassName={'bg-[#BEF264] text-gray-900'}
              breakLinkClassName={'px-4 py-2 border border-transparent rounded text-gray-700 bg-gray-200'}
            />
          </div>
        </div>
      )}

      {selectedBooking && (
        <Modal
          isOpen={!!selectedBooking}
          onRequestClose={closeModal}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
            <h2 className="text-xl font-bold mb-4">Booking Details</h2>
            <p><strong>Location:</strong> {selectedBooking.hostelLocation}</p>
            <p><strong>Room:</strong> {selectedBooking.roomName}</p>
            <p><strong>Beds Booked:</strong> {selectedBooking.bedQuantity}</p>
            <button
              onClick={closeModal}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Close
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
