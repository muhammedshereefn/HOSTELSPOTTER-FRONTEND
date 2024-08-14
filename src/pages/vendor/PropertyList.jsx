import { useEffect, useState } from 'react';
import vendorAxiosInstance from '../../api/vendor/axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { FaArrowLeft, FaEdit, FaTrash } from 'react-icons/fa';
import Modal from 'react-modal';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ConfirmModal from '../../components/vendor/ConfirmModal';
import { io } from 'socket.io-client';
import 'react-toastify/dist/ReactToastify.css';
import CustomAlert from '../../components/vendor/CustomAlert';
import ReactPaginate from 'react-paginate';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false); 
  const [propertyToDelete, setPropertyToDelete] = useState(null); 
  const [alert, setAlert] = useState({ message: '', type: '', visible: false });
  const [currentPage, setCurrentPage] = useState(0);
  const [propertiesPerPage] = useState(3); 

  const navigate = useNavigate();

  useEffect(() => {
    const vendorToken = localStorage.getItem('vendorToken');

    if (!vendorToken) {
      navigate('/vendor/signIn');
      return;
    }

    const fetchProperties = async () => {
      try {
        const response = await vendorAxiosInstance.get('/vendors/propertiesList', {
          headers: {
            Authorization: `Bearer ${vendorToken}`,
          },
        });

        if (response.status === 200) {
          setProperties(response.data);
        } else {
          toast.error('Failed to fetch properties');
        }
      } catch (error) {
        console.error('Error fetching properties:', error);
        toast.error('An error occurred while fetching properties');
      }
    };

    fetchProperties();

    const socket = io('http://localhost:5000');

    socket.on('newBooking', ({ userName, bedQuantity, hostelName }) => {
      setAlert({
        message: `New Booking! ${userName} booked ${bedQuantity} beds in ${hostelName}`,
        type: 'success',
        visible: true,
      });   
      fetchProperties();
    });

    socket.on('bookingCancelled', ({ userName, bedQuantity, hostelName }) => {
      setAlert({
        message: `Booking Cancelled! ${userName} cancelled ${bedQuantity} beds in ${hostelName}`,
        type: 'error',
        visible: true,
      });      
      fetchProperties();
    });

    return () => {
      socket.disconnect();
    };
  }, [navigate]);

  const handleEdit = (id) => {
    navigate(`/property/edit/${id}`);
  };

  const handleDelete = (id) => {
    setPropertyToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await vendorAxiosInstance.delete(`/vendors/property/${propertyToDelete}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('vendorToken')}`,
        },
      });

      if (response.status === 200) {
        toast.success('Property deleted successfully');
        setProperties(properties.filter((property) => property._id !== propertyToDelete));
      } else {
        toast.error('Failed to delete property');
      }
    } catch (error) {
      console.error('Error deleting property:', error);
      toast.error('An error occurred while deleting property');
    } finally {
      setDeleteModalOpen(false);
      setPropertyToDelete(null);
    }
  };

  const handleViewDetails = (property) => {
    setSelectedProperty(property);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedProperty(null);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setPropertyToDelete(null);
  };

  const handleViewBookings = (hostelName) => {
    navigate(`/property/${hostelName}/bookings`);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  // Pagination logic
  const offset = currentPage * propertiesPerPage;
  const currentProperties = properties.slice(offset, offset + propertiesPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center p-4">
       <button
        className="flex items-center mt-8 uppercase py-1 ml-2 px-3 mb-3 bg-[#F2AA4CFF] text-black font-bold rounded focus:outline-none focus:shadow-outline transition-all duration-300 shadow-lg transform hover:scale-105"
        onClick={() => navigate('/vendor/home')}
      >
        <FaArrowLeft className="mr-2" /> {/* Add the icon with some margin */}
        Back to Home
      </button>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />   
      {alert.visible && (
        <CustomAlert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ ...alert, visible: false })}
        />
      )}
      <div className="flex flex-col items-center justify-center w-full max-w-6xl p-8 bg-gray-800 shadow-lg rounded-3xl">
      <div className="flex items-center justify-between w-full mb-6">
    <h2 className="text-2xl font-semibold uppercase text-white">
      Your <span className="text-[#F2AA4CFF]">Properties</span>
    </h2>
    <button
      className="py-1 px-4 bg-[#F2AA4CFF] text-black font-bold rounded focus:outline-none focus:shadow-outline transition-all duration-300 shadow-lg transform hover:scale-105"
      onClick={() => navigate('/vendor/allBookings')}
    >
      Show All Bookings
    </button>
  </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {currentProperties.length === 0 ? (
            <p className="text-white">No properties found.</p>
          ) : (
            currentProperties.map((property) => (
              <div key={property._id} className="relative p-4 bg-gray-700 rounded-lg shadow-md">
                <Slider {...sliderSettings}>
                  {property.hostelImages && property.hostelImages.length > 0 ? (
                    property.hostelImages.map((image, index) => (
                      <div key={index}>
                        <img
                          src={image}
                          alt={property.hostelName}
                          className="w-full  h-60 object-cover rounded-md mb-4"
                        />
                      </div>
                    ))
                  ) : (
                    <div>
                      <img
                        src="default_image_url"
                        alt={property.hostelName}
                        className="w-full  h-60 object-cover rounded-md mb-4"
                      />
                    </div>
                  )}
                </Slider>
                <h3 className="text-xl uppercase pb-5 font-semibold text-white mt-8">{property.hostelName}</h3>
                <p className="text-white"><strong>Location:</strong> {property.hostelLocation}</p>
                <p className="text-white"><strong>Owner:</strong> {property.ownerName}</p>
                <p className="text-white"><strong>Contact:</strong> {property.ownerContact}</p>
                <p className="text-white"><strong>Rent:</strong> {property.rent}</p>
                <p className="text-white"><strong>Deposit:</strong> {property.deposite}</p>
                <button
                  className="mt-4 uppercase text-sm mr-5 py-2 px-4 bg-[#F2AA4CFF] hover:bg-[#e39a3b] text-black font-bold rounded focus:outline-none focus:shadow-outline transition-all duration-300 shadow-lg transform hover:scale-105"
                  onClick={() => handleViewDetails(property)}
                >
                  View Details
                </button>
                <button
                  className="mt-2 py-2 px-4 uppercase text-sm bg-[#F2AA4CFF] hover:bg-[#f2aa4cbc] text-black font-bold rounded focus:outline-none focus:shadow-outline transition-all duration-300 shadow-lg transform hover:scale-105"
                  onClick={() => handleViewBookings(property.hostelName)}
                >
                  View Bookings
                </button>
                <div className="flex justify-end mt-4 space-x-4">
                  <button
                    className="text-white hover:text-yellow-500"
                    onClick={() => handleEdit(property._id)}
                  >
                    <FaEdit size={20} />
                  </button>
                  <button
                    className="text-white hover:text-red-500"
                    onClick={() => handleDelete(property._id)}
                  >
                    <FaTrash size={20} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="mt-8">
        <ReactPaginate
          previousLabel={<span className="text-white">&laquo;</span>}
          nextLabel={<span className="text-white">&raquo;</span>}
          breakLabel={<span className="text-white">...</span>}
          pageCount={Math.ceil(properties.length / propertiesPerPage)}
          onPageChange={handlePageClick}
          containerClassName="flex justify-center items-center mt-8 space-x-2"
          pageClassName="mx-1"
          pageLinkClassName="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-all duration-300"
          previousClassName="mx-1"
          previousLinkClassName="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-all duration-300"
          nextClassName="mx-1"
          nextLinkClassName="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-all duration-300"
          breakClassName="mx-1"
          breakLinkClassName="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-all duration-300"
          activeClassName="bg-gray-600"
        />
        </div>
      </div>
      {selectedProperty && (
    <Modal
    isOpen={modalIsOpen}
    onRequestClose={closeModal}
    contentLabel="Property Details"
    className="flex items-center justify-center min-h-screen"
    overlayClassName="fixed inset-0 bg-black bg-opacity-75"
  >
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-white max-w-4xl w-full relative overflow-auto max-h-screen">
      <div className="border-b border-gray-600 pb-4 mb-4">
        <h2 className="text-3xl font-bold mb-2 text-[#F2AA4CFF]">{selectedProperty.hostelName}</h2>
        <p className="text-xl font-semibold mb-2">ADDRESS: {selectedProperty.hostelLocation}</p>
      </div>
  
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="border border-gray-600 rounded-lg p-4 bg-gray-700">
          <h3 className="text-xl font-semibold mb-2">General Information</h3>
          <p><strong>State:</strong> {selectedProperty.state}</p>
          <p><strong>District:</strong> {selectedProperty.district}</p>
          <p><strong>City:</strong> {selectedProperty.city}</p>
          <p><strong>Contact:</strong> {selectedProperty.ownerContact}</p>
        </div>
  
        <div className="border border-gray-600 rounded-lg p-4 bg-gray-700">
          <h3 className="text-xl font-semibold mb-2">Financials</h3>
          <p><strong>Rent:</strong> {selectedProperty.rent}</p>
          <p><strong>Deposit:</strong> {selectedProperty.deposite}</p>
        </div>
      </div>
  
      <div className="border border-gray-600 rounded-lg p-4 bg-gray-700 mb-6">
        <h3 className="text-xl font-semibold mb-2">Details</h3>
        <p><strong>Target:</strong> {selectedProperty.target.join(', ')}</p>
        <p><strong>Policies:</strong> {selectedProperty.policies.join(', ')}</p>
        <p><strong>Facilities:</strong> {selectedProperty.facilities.join(', ')}</p>
        <p><strong>Category:</strong> {selectedProperty.category}</p>
        <p><strong>Nearby Access:</strong> {selectedProperty.nearbyAccess.join(', ')}</p>
        <p><strong>Room Quantity:</strong> {selectedProperty.roomQuantity}</p>
      </div>
  
      <div className="border border-gray-600 rounded-lg p-4 bg-gray-700 mb-6">
        <h3 className="text-xl font-semibold mb-2">Room Bed Quantities</h3>
        <ul className="list-disc list-inside">
          {selectedProperty.roomBedQuantities.map((room, index) => (
            <li key={index}>
              {room.roomName}: {room.bedQuantity} beds
            </li>
          ))}
        </ul>
      </div>
  
      <div className="border border-gray-600 rounded-lg p-4 bg-gray-700 mb-6">
        <h3 className="text-xl font-semibold mb-2">Hostel Images</h3>
        <div className="flex space-x-2 overflow-x-auto">
          {selectedProperty.hostelImages.map((image, index) => (
            <img key={index} src={image} alt={`Hostel Image ${index + 1}`} className="w-32 h-32 rounded-lg object-cover" />
          ))}
        </div>
      </div>
  
      <div className="flex justify-between items-center mt-4">
        <p><strong>Longitude:</strong> {selectedProperty.longitude}</p>
        <p><strong>Latitude:</strong> {selectedProperty.latitude}</p>
        <button
          onClick={closeModal}
          className="bg-red-600 text-white hover:bg-red-700 font-bold py-2 px-4 rounded transition duration-300"
        >
          Close
        </button>
      </div>
    </div>
  </Modal>
  
      )}
      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default PropertyList;
