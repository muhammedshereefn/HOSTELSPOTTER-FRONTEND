import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import vendorAxiosInstance from '../../api/vendor/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { format } from 'date-fns';
import { io } from 'socket.io-client';
import CustomAlert from '../../components/vendor/CustomAlert';
import ReactPaginate from 'react-paginate';

const BookingList = () => {
  const { hostelName } = useParams();
  const [bookings, setBookings] = useState([]);
  const [alert, setAlert] = useState({ message: '', type: '', visible: false });
  const [currentPage, setCurrentPage] = useState(0);
  const [bookingsPerPage] = useState(10); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await vendorAxiosInstance.get(`/vendors/property/${hostelName}/bookings`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('vendorToken')}`,
          },
        });

        console.log(response)
        if (response.status === 200) {
          setBookings(response.data);
        } else {
          toast.error('Failed to fetch bookings');
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
        toast.error('An error occurred while fetching bookings');
      }
    };

    fetchBookings();

    const socket = io('https://watch-vogue.shop');

    socket.on('newBooking', ({ userName, bedQuantity, hostelName: newHostelName }) => {
      if (newHostelName === hostelName) {
        setAlert({
          message: `New Booking! ${userName} booked ${bedQuantity} beds in ${hostelName}`,
          type: 'success',
          visible: true,
        });
        fetchBookings();
      }
    });

    socket.on('bookingCancelled', ({ userName, bedQuantity, hostelName: cancelledHostelName }) => {
      if (cancelledHostelName === hostelName) {
        setAlert({
          message: `Booking Cancelled! ${userName} cancelled ${bedQuantity} beds in ${hostelName}`,
          type: 'error',
          visible: true,
        });
        fetchBookings();
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [hostelName, navigate]);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const offset = currentPage * bookingsPerPage;
  const currentBookings = bookings.slice(offset, offset + bookingsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black p-4">
      <button
        className="mt-8 uppercase py-2 ml-24 px-4 mb-3 bg-[#F2AA4CFF] text-black font-bold rounded focus:outline-none focus:shadow-outline transition-all duration-300 shadow-lg transform hover:scale-105"
        onClick={() => navigate('/vendor/propertiesList')}
      >
        Back to Properties
      </button>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      {alert.visible && (
        <CustomAlert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ ...alert, visible: false })}
        />
      )}
      <div className="w-full max-w-6xl p-8 bg-gray-800 shadow-lg rounded-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-white mb-6 uppercase ">
          <span className="text-[#F2AA4CFF] uppercase text-2xl">Bookings</span> for {hostelName}
        </h2>
        {currentBookings.length === 0 ? (
          <p className="text-red-400">No bookings found.</p>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="min-w-full bg-gray-800">
              <thead>
                <tr>
                  <th className="py-2 px-4 text-left text-white">Username</th>
                  <th className="py-2 px-4 text-left text-white">Contact</th>
                  <th className="py-2 px-4 text-left text-white">Room Name</th>
                  <th className="py-2 px-4 text-left text-white">Bed Quantity</th>
                  <th className="py-2 px-4 text-left text-white">Status</th>
                  <th className="py-2 px-4 text-left text-white">Booked At</th>
                  <th className="py-2 px-4 text-left text-white">Booking For</th>
                </tr>
              </thead>
              <tbody>
                {currentBookings.map((booking, index) => (
                  <tr key={index} className="bg-gray-700 border-b border-gray-600">
                    <td className="py-2 px-4 text-white">{booking.name}</td>
                    <td className="py-2 px-4 text-white">{booking.contact}</td>
                    <td className="py-2 px-4 text-white">{booking.roomName}</td>
                    <td className="py-2 px-4 text-white">{booking.bedQuantity}</td>
                    <td className="py-2 px-4 text-white">{booking.status}</td>
                    <td className="py-2 px-4 text-white">{format(new Date(booking.bookedAt), 'dd/MM/yyyy')}</td>
                    <td className="py-2 px-4 text-white">{format(new Date(booking.bookingDate), 'dd/MM/yyyy')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="flex justify-center mt-4">
          <ReactPaginate
            previousLabel={'Previous'}
            nextLabel={'Next'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={Math.ceil(bookings.length / bookingsPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={'flex items-center space-x-2'}
            activeClassName={'bg-black text-black px-3 py-1 rounded-full shadow-lg'}
            pageClassName={'page-item'}
            pageLinkClassName={'px-3 py-1 text-white rounded-full hover:bg-gray-600 transition'}
            previousClassName={'page-item'}
            previousLinkClassName={'px-3 py-1 text-white bg-gray-700 rounded-full hover:bg-gray-600 transition'}
            nextClassName={'page-item'}
            nextLinkClassName={'px-3 py-1 text-white bg-gray-700 rounded-full hover:bg-gray-600 transition'}
            breakLinkClassName={'px-3 py-1 text-white bg-gray-700 rounded-full'}
          />
        </div>
      </div>
    </div>
  );
};

export default BookingList;
