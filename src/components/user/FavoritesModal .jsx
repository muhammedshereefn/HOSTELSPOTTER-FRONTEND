import React from 'react';
import { FaTimes, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FavoritesModal = ({ showModal, closeModal, favorites, removeFavorite }) => {
  if (!showModal) return null;

  const handleRemove = async (propertyId) => {
    try {

        console.log(propertyId,'-=-=-=-=-=-=-=')
      await removeFavorite(propertyId);
    } catch (error) {
      console.error("Failed to remove favorite hostel", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 sm:w-3/4 lg:w-1/2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[#1B213B]">Your Favorite Hostels</h2>
          <button onClick={closeModal}>
            <FaTimes className="text-xl text-[#BEF264]" />
          </button>
        </div>
        <div className="overflow-y-auto max-h-96">
          {favorites.length > 0 ? (
            <ul className="space-y-4">
              {favorites.map((hostel, index) => (
                <li key={index} className="flex items-center justify-between p-4 border rounded-lg shadow-sm">
                <div className="flex items-center">
                    <img
                    src={hostel.hostelImage}
                    alt={hostel.hostelName}
                    className="w-24 h-24 object-cover rounded-md mr-4"
                    />
                    <div>
                    <h3 className="text-lg font-semibold text-[#1B213B]">{hostel.hostelName}</h3>
                    <p className="text-sm text-gray-600">{hostel.hostelLocation}</p>
                    <Link to={`/propertyDetails/${hostel.propertyId}`}>
                        <button className="mt-2 font-bold bg-[#BEF264] text-black py-2 px-4 rounded-lg shadow-md transition duration-300 hover:bg-[#A0C1B8]">
                        View Details
                        </button>
                    </Link>
                    </div>
                </div>
                <button onClick={() => handleRemove(hostel.propertyId)} className="flex items-center">
                    <FaTrash className="text-xl text-red-500" />
                </button>
                </li>

              
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-600">No favorite hostels found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoritesModal;
