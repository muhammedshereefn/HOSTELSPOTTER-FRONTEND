import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Modal from 'react-modal';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const VendorProperties = () => {
  const { vendorId } = useParams();
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState('');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`https://watch-vogue.shop/api/admin/${vendorId}/properties`);
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
        setError('Failed to fetch properties');
      }
    };

    fetchProperties();
  }, [vendorId]);

  const handleEdit = (id) => {
    navigate(`/property/edit/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`https://watch-vogue.shop/api/vendors/property/${id}`);
      if (response.status === 200) {
        setProperties(properties.filter((property) => property._id !== id));
      } else {
        setError('Failed to delete property');
      }
    } catch (error) {
      console.error('Error deleting property:', error);
      setError('An error occurred while deleting property');
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

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="flex h-screen bg-white text-black">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-2xl font-extrabold mb-6 text-black drop-shadow-lg">Vendor Properties</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.length === 0 ? (
            <p>No properties found.</p>
          ) : (
            properties.map((property) => (
              <div key={property._id} className="relative p-4 bg-gray-200 rounded-lg shadow-md">
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
                <h3 className="text-xl font-semibold text-black mt-7">{property.hostelName}</h3>
                <p><strong>Location:</strong> {property.hostelLocation}</p>
                <p><strong>Owner:</strong> {property.ownerName}</p>
                <p><strong>Rent:</strong> {property.rent}</p>
                <p><strong>Deposit:</strong> {property.deposite}</p>
                <button
                  className="absolute bottom-4 right-4 bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-900 focus:outline-none"
                  onClick={() => handleViewDetails(property)}
                >
                  View Details
                </button>
              </div>
            ))
          )}
        </div>
      </main>
      {selectedProperty && (
        <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Property Details"
        className="flex items-center justify-center min-h-screen"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75"
      >
        <div className="bg-gray-300 p-8 rounded-lg shadow-lg text-white max-w-4xl w-full relative overflow-auto max-h-screen">
          <div className="border-b border-gray-600 pb-4 mb-4">
            <h2 className="text-3xl font-bold mb-2 text-[#000000]">{selectedProperty.hostelName}</h2>
            <p className="text-xl font-semibold mb-2 text-black">ADDRESS: {selectedProperty.hostelLocation}</p>
          </div>
      
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="border border-gray-600 rounded-lg p-4 bg-gray-700">
              <h3 className="text-xl font-semibold mb-2">General Information</h3>
              <p><strong>State:</strong> {selectedProperty.state}</p>
              <p><strong>District:</strong> {selectedProperty.district}</p>
              <p><strong>City:</strong> {selectedProperty.city}</p>
              <p><strong>Owner:</strong> {selectedProperty.ownerName}</p>
              <p><strong>Email:</strong> {selectedProperty.ownerEmail}</p>
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
            <p><strong>Available Plans:</strong> {selectedProperty.availablePlans.join(', ')}</p>
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
      
          <div className="flex justify-between items-center text-black mt-4">
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
    </div>
  );
};

export default VendorProperties;
