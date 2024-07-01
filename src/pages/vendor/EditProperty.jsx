import  { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { uploadImages } from '../../api/cloudinaryConfig'; 
const EditProperty = () => {
  const { id } = useParams();
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
  const [imageFiles, setImageFiles] = useState([]);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/vendors/property/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('vendorToken')}`,
          },
        });

        if (response.status === 200) {
          const data = response.data;
          setFormData({
            hostelName: data.hostelName || '',
            hostelLocation: data.hostelLocation || '',
            ownerName: data.ownerName || '',
            ownerEmail: data.ownerEmail || '',
            ownerContact: data.ownerContact || '',
            rent: data.rent || '',
            deposite: data.deposite || '',
            target: data.target || '',
            policies: data.policies || '',
            facilities: data.facilities || '',
            category: data.category || '',
            availablePlans: data.availablePlans || '',
            nearbyAccess: data.nearbyAccess || '',
            roomQuantity: data.roomQuantity || '',
            hostelImages: data.hostelImages || [],
          });
        } else {
          toast.error('Failed to fetch property details');
        }
      } catch (error) {
        console.error('Error fetching property details:', error);
        toast.error('An error occurred while fetching property details');
      }
    };

    fetchProperty();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'hostelImages') {
      setImageFiles([...files]);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (imageFiles.length > 0) {
      try {
        const imageUrls = await uploadImages(imageFiles);
        formData.hostelImages = imageUrls;
      } catch (error) {
        console.error('Error uploading images:', error);
        toast.error('An error occurred while uploading images');
        return;
      }
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/vendors/property/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('vendorToken')}`,
        },
      });

      if (response.status === 200) {
        toast.success('Property updated successfully');
        navigate('/vendor/propertiesList');
      } else {
        toast.error('Failed to update property');
      }
    } catch (error) {
      console.error('Error updating property:', error);
      toast.error('An error occurred while updating the property');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center p-4">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex flex-col items-center justify-center w-full max-w-2xl p-8 bg-gray-800 shadow-lg rounded-3xl">
        <h2 className="text-3xl font-semibold text-white mb-6">
          Edit Your <span className="text-[#F2AA4CFF]">Property</span>
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
            <label className="block text-white mb-1">Deposit</label>
            <input
              type="number"
              name="deposit"
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
              placeholder="Enter available plans"
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
              placeholder="Enter nearby access points"
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
              placeholder="Enter the number of rooms"
              className="w-full py-2 px-3 text-black rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F2AA4CFF] shadow-md"
            />
          </div>
          <div>
            <label className="block text-white mb-1">Hostel Images</label>
            <input
              type="file"
              name="hostelImages"
              onChange={handleChange}
              accept="image/*"
              multiple
              className="w-full py-2 px-3 text-white bg-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-[#F2AA4CFF] shadow-md"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#F2AA4CFF] text-white font-semibold rounded-md shadow-md hover:bg-[#d98f35] transition duration-300"
          >
            Update Property
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProperty;
