import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { uploadImages } from '../../api/cloudinaryConfig';

const CreatePropertyForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    hostelName: '',
    hostelLocation: '',
    ownerName: '',
    ownerEmail: '',
    ownerContact: '',
    rent: '',
    deposite: '',
    target: '',
    policies: '',
    facilities: '',
    category: '',
    availablePlans: '',
    nearbyAccess: '',
    roomQuantity: '',
    hostelImages: [],
  });
  const [imageFiles,setImageFiles] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('vendorToken');
    if (!token) {
      navigate('/vendor/signIn');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e)=>{
    setImageFiles([...e.target.files]);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const imageUrls = await uploadImages(imageFiles);
      formData.hostelImages = imageUrls


      const response = await axios.post('http://localhost:5000/api/vendors/property', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('vendorToken')}`,
        },
      });

      if (response.status === 201) {
        toast.success('Property created successfully');
        navigate('/vendor/propertiesList');
      } else {
        toast.error('Failed to create property');
      }
    } catch (error) {
      console.error('Error during property creation:', error);
      toast.error('An error occurred while creating property');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center p-4">
      <Toaster position="top-center" reverseOrder={false} />
      
      <div className="flex flex-col items-center justify-center w-full max-w-2xl p-8 bg-gray-800 shadow-lg rounded-3xl">
        <h2 className="text-3xl font-semibold text-white mb-6">
          Add Your <span className="text-[#F2AA4CFF]">Property</span>
        </h2>
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div>
            <label className="block text-white mb-1">Hostel Name</label>
            <input
              type="text"
              name="hostelName"
              value={formData.hostelName}
              onChange={handleChange}
              placeholder="Enter the hostel name"
              className="w-full py-2 px-3 text-black rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F2AA4CFF] shadow-md"
            />
          </div>
          <div>
            <label className="block text-white mb-1">Hostel Location</label>
            <input
              type="text"
              name="hostelLocation"
              value={formData.hostelLocation}
              onChange={handleChange}
              placeholder="Enter the hostel location"
              className="w-full py-2 px-3 text-black rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F2AA4CFF] shadow-md"
            />
          </div>
          <div>
            <label className="block text-white mb-1">Owner Name</label>
            <input
              type="text"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
              placeholder="Enter the owner's name"
              className="w-full py-2 px-3 text-black rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F2AA4CFF] shadow-md"
            />
          </div>
          <div>
            <label className="block text-white mb-1">Owner Email</label>
            <input
              type="email"
              name="ownerEmail"
              value={formData.ownerEmail}
              onChange={handleChange}
              placeholder="Enter the owner's email"
              className="w-full py-2 px-3 text-black rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F2AA4CFF] shadow-md"
            />
          </div>
          <div>
            <label className="block text-white mb-1">Owner Contact</label>
            <input
              type="text"
              name="ownerContact"
              value={formData.ownerContact}
              onChange={handleChange}
              placeholder="Enter the owner's contact number"
              className="w-full py-2 px-3 text-black rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F2AA4CFF] shadow-md"
            />
          </div>
          <div>
            <label className="block text-white mb-1">Rent</label>
            <input
              type="number"
              name="rent"
              value={formData.rent}
              onChange={handleChange}
              placeholder="Enter the rent amount"
              className="w-full py-2 px-3 text-black rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F2AA4CFF] shadow-md"
            />
          </div>
          <div>
            <label className="block text-white mb-1">Deposite</label>
            <input
              type="number"
              name="deposite"
              value={formData.deposite}
              onChange={handleChange}
              placeholder="Enter the deposit amount"
              className="w-full py-2 px-3 text-black rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F2AA4CFF] shadow-md"
            />
          </div>
          <div>
            <label className="block text-white mb-1">Target</label>
            <input
              type="text"
              name="target"
              value={formData.target}
              onChange={handleChange}
              placeholder="Enter target audience (e.g., brocampStudents, working professionals)"
              className="w-full py-2 px-3 text-black rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F2AA4CFF] shadow-md"
            />
          </div>
          <div>
            <label className="block text-white mb-1">Policies</label>
            <input
              type="text"
              name="policies"
              value={formData.policies}
              onChange={handleChange}
              placeholder="Enter policies (e.g., visitors allowed, gate close 10 pm)"
              className="w-full py-2 px-3 text-black rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F2AA4CFF] shadow-md"
            />
          </div>
          <div>
            <label className="block text-white mb-1">Facilities</label>
            <input
              type="text"
              name="facilities"
              value={formData.facilities}
              onChange={handleChange}
              placeholder="Enter facilities (e.g., bike parking, AC)"
              className="w-full py-2 px-3 text-black rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F2AA4CFF] shadow-md"
            />
          </div>
          <div>
            <label className="block text-white mb-1">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Enter category (e.g., men, women)"
              className="w-full py-2 px-3 text-black rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F2AA4CFF] shadow-md"
            />
          </div>
          <div>
            <label className="block text-white mb-1">Available Plans</label>
            <input
              type="text"
              name="availablePlans"
              value={formData.availablePlans}
              onChange={handleChange}
              placeholder="Enter available plans (e.g., 4 sharing rooms)"
              className="w-full py-2 px-3 text-black rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F2AA4CFF] shadow-md"
            />
          </div>
          <div>
            <label className="block text-white mb-1">Nearby Access</label>
            <input
              type="text"
              name="nearbyAccess"
              value={formData.nearbyAccess}
              onChange={handleChange}
              placeholder="Enter nearby access points (e.g., temple, metro)"
              className="w-full py-2 px-3 text-black rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F2AA4CFF] shadow-md"
            />
          </div>
          <div>
            <label className="block text-white mb-1">Room Quantity</label>
            <input
              type="number"
              name="roomQuantity"
              value={formData.roomQuantity}
              onChange={handleChange}
              placeholder="Enter the number of rooms available"
              className="w-full py-2 px-3 text-black rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F2AA4CFF] shadow-md"
            />
          </div>
          <div>
            <label className="block text-white mb-1">Hostel Images (up to 6)</label>
            <input
              type="file"
              name="hostelImages"
              onChange={handleImageChange}
              multiple
              accept="image/*"
              className="w-full py-2 px-3 text-black rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F2AA4CFF] shadow-md"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-[#F2AA4CFF] hover:bg-[#e39a3b] text-black font-bold rounded focus:outline-none focus:shadow-outline transition-all duration-300 shadow-lg transform hover:scale-105"
          >
            Add Property
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePropertyForm;
