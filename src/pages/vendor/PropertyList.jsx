import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Modal from 'react-modal';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ConfirmModal from '../../components/vendor/ConfirmModal';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false); 
  const [propertyToDelete, setPropertyToDelete] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const vendorToken = localStorage.getItem('vendorToken');

    if (!vendorToken) {
      navigate('/vendor/signIn');
      return;
    }

    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/vendors/propertiesList', {
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
      const response = await axios.delete(`http://localhost:5000/api/vendors/property/${propertyToDelete}`, {
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

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center p-4">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex flex-col items-center justify-center w-full max-w-6xl p-8 bg-gray-800 shadow-lg rounded-3xl">
        <h2 className="text-3xl font-semibold text-white mb-6">
          Your <span className="text-[#F2AA4CFF]">Properties</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {properties.length === 0 ? (
            <p className="text-white">No properties found.</p>
          ) : (
            properties.map((property) => (
              <div key={property._id} className="relative p-4 bg-gray-700 rounded-lg shadow-md">
                <Slider {...sliderSettings}>
                  {property.hostelImages && property.hostelImages.length > 0 ? (
                    property.hostelImages.map((image, index) => (
                      <div key={index}>
                        <img
                          src={image}
                          alt={property.hostelName}
                          className="w-full h-60 object-cover rounded-md mb-4"
                        />
                      </div>
                    ))
                  ) : (
                    <div>
                      <img
                        src="default_image_url"
                        alt={property.hostelName}
                        className="w-full h-60 object-cover rounded-md mb-4"
                      />
                    </div>
                  )}
                </Slider>
                <h3 className="text-xl font-semibold text-white mb-2">{property.hostelName}</h3>
                <p className="text-white"><strong>Location:</strong> {property.hostelLocation}</p>
                <p className="text-white"><strong>Owner:</strong> {property.ownerName}</p>
                <p className="text-white"><strong>Contact:</strong> {property.ownerContact}</p>
                <p className="text-white"><strong>Rent:</strong> {property.rent}</p>
                <p className="text-white"><strong>Deposit:</strong> {property.deposite}</p>
                <button
                  className="mt-4 py-2 px-4 bg-[#F2AA4CFF] hover:bg-[#e39a3b] text-black font-bold rounded focus:outline-none focus:shadow-outline transition-all duration-300 shadow-lg transform hover:scale-105"
                  onClick={() => handleViewDetails(property)}
                >
                  View Details
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
      </div>
      {selectedProperty && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Property Details"
          className="flex items-center justify-center min-h-screen"
          overlayClassName="fixed inset-0 bg-black bg-opacity-75"
        >
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-white max-w-lg w-full relative">
            <h2 className="text-2xl font-bold mb-4">{selectedProperty.hostelName}</h2>
            <p><strong>Location:</strong> {selectedProperty.hostelLocation}</p>
            <p><strong>Owner:</strong> {selectedProperty.ownerName}</p>
            <p><strong>Email:</strong> {selectedProperty.ownerEmail}</p>
            <p><strong>Contact:</strong> {selectedProperty.ownerContact}</p>
            <p><strong>Rent:</strong> {selectedProperty.rent}</p>
            <p><strong>Deposit:</strong> {selectedProperty.deposite}</p>
            <p><strong>Target:</strong> {selectedProperty.target.join(', ')}</p>
            <p><strong>Policies:</strong> {selectedProperty.policies.join(', ')}</p>
            <p><strong>Facilities:</strong> {selectedProperty.facilities.join(', ')}</p>
            <p><strong>Category:</strong> {selectedProperty.category}</p>
            <p><strong>Available Plans:</strong> {selectedProperty.availablePlans.join(', ')}</p>
            <p><strong>Nearby Access:</strong> {selectedProperty.nearbyAccess.join(', ')}</p>
            <p><strong>Room Quantity:</strong> {selectedProperty.roomQuantity}</p>
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 bg-red-600 text-white hover:bg-red-700 font-bold py-2 px-4 rounded transition duration-300"
            >
              Close
            </button>
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
