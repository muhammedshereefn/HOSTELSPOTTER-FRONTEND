import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import vendorAxiosInstance from '../../api/vendor/axios';
import toast, { Toaster } from 'react-hot-toast';
import { uploadImages } from '../../api/cloudinaryConfig';
import Spinner from '../../components/vendor/Spinner';

const CreatePropertyForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    hostelName: '',
    hostelLocation: '',
    state: '',
    district: '',
    city: '',  
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
    roomBedQuantities: [],
    longitude: '', 
    latitude: '', 
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [roomBedQuantities, setRoomBedQuantities] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('vendorToken');
    if (!token) {
      navigate('/vendor/signIn');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'roomQuantity') {
      const quantity = parseInt(value, 10);
      if (!isNaN(quantity)) {
        const newBedQuantities = Array(quantity).fill({ roomName: `${formData.hostelName}:`, bedQuantity: '' });
        setRoomBedQuantities(newBedQuantities);
      } else {
        setRoomBedQuantities([]);
      }
    }
  };

  const handleBedQuantityChange = (index, value, key) => {
    const newBedQuantities = [...roomBedQuantities];
    newBedQuantities[index] = {
      ...newBedQuantities[index],
      [key]: key === 'roomName' ? `${formData.hostelName}:${value.replace(`${formData.hostelName}:`, '')}` : value,
    };
    setRoomBedQuantities(newBedQuantities);
  };

  const handleImageChange = (e) => {
    setImageFiles([...e.target.files]);
  };

  const validateForm = () => {
    const {
      hostelName, hostelLocation, state, district, city, ownerName, ownerEmail, ownerContact,
      rent, deposite, target, policies, facilities, category, availablePlans, nearbyAccess,
      roomQuantity, longitude, latitude,
    } = formData;

    if (!hostelName || !hostelLocation || !state || !district || !city || !ownerName || !ownerEmail ||
      !ownerContact || !rent || !deposite || !target || !policies || !facilities || !category ||
      !availablePlans || !nearbyAccess || !roomQuantity || !longitude || !latitude) {
      toast.error('All fields are required');
      return false;
    }

    if (!imageFiles.length) {
      toast.error('Please upload at least one image');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const imageUrls = await uploadImages(imageFiles);
      formData.hostelImages = imageUrls;
      formData.roomBedQuantities = roomBedQuantities;

      const response = await vendorAxiosInstance.post('/vendors/property', formData, {
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center p-4">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex flex-col items-center justify-center w-full max-w-2xl p-8 bg-gray-800 shadow-lg rounded-3xl">
        <h2 className="text-3xl font-semibold text-white mb-6">
          Adding Your <span className="text-[#F2AA4CFF]">Property</span>
          
        </h2>
        {loading ? (
          <Spinner />
        ) : (
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div>
              <label className="block text-white mb-1">Hostel Name</label>
              <input
                type="text"
                name="hostelName"
                value={formData.hostelName}
                onChange={handleChange}
                placeholder="Enter hostel name"
                className="w-full py-2 px-3 text-black rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F2AA4CFF] shadow-md"
              />
            </div>
            <div>
              <label className="block text-white mb-1">Hostel Address</label>
              <input
                type="text"
                name="hostelLocation"
                value={formData.hostelLocation}
                onChange={handleChange}
                placeholder="Enter hostel address"
                className="w-full py-2 px-3 text-black rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F2AA4CFF] shadow-md"
              />
            </div>
            <div>
              <label className="block text-white mb-1">State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="Enter state"
                className="w-full py-2 px-3 text-black rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F2AA4CFF] shadow-md"
              />
            </div>
            <div>
              <label className="block text-white mb-1">District</label>
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                placeholder="Enter district"
                className="w-full py-2 px-3 text-black rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F2AA4CFF] shadow-md"
              />
            </div>
            <div>
              <label className="block text-white mb-1">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter city"
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
                placeholder="Enter owner name"
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
                placeholder="Enter owner email"
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
                placeholder="Enter owner contact"
                className="w-full py-2 px-3 text-black rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F2AA4CFF] shadow-md"
              />
            </div>
            <div>
              <label className="block text-white mb-1">Rent (INR)</label>
              <input
                type="number"
                name="rent"
                value={formData.rent}
                onChange={handleChange}
                placeholder="Enter rent"
                className="w-full py-2 px-3 text-black rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F2AA4CFF] shadow-md"
              />
            </div>
            <div>
              <label className="block text-white mb-1">Deposit (INR)</label>
              <input
                type="number"
                name="deposite"
                value={formData.deposite}
                onChange={handleChange}
                placeholder="Enter deposit"
                className="w-full py-2 px-3 text-black rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F2AA4CFF] shadow-md"
              />
            </div>
            <div>
              <label className="block text-white mb-1">Target</label>
              <textarea
                name="target"
                value={formData.target}
                onChange={handleChange}
                placeholder="Enter target"
                className="w-full py-2 px-3 text-black rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F2AA4CFF] shadow-md"
              />
            </div>
            <div>
              <label className="block text-white mb-1">Policies</label>
              <textarea
                name="policies"
                value={formData.policies}
                onChange={handleChange}
                placeholder="Enter policies"
                className="w-full py-2 px-3 text-black rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F2AA4CFF] shadow-md"
              />
            </div>
            <div>
              <label className="block text-white mb-1">Facilities</label>
              <textarea
                name="facilities"
                value={formData.facilities}
                onChange={handleChange}
                placeholder="Enter facilities"
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
                placeholder="Enter category"
                className="w-full py-2 px-3 text-black rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F2AA4CFF] shadow-md"
              />
            </div>
            <div>
              <label className="block text-white mb-1">Available Plans</label>
              <textarea
                name="availablePlans"
                value={formData.availablePlans}
                onChange={handleChange}
                placeholder="Enter available plans"
                className="w-full py-2 px-3 text-black rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F2AA4CFF] shadow-md"
              />
            </div>
            <div>
              <label className="block text-white mb-1">Nearby Access</label>
              <textarea
                name="nearbyAccess"
                value={formData.nearbyAccess}
                onChange={handleChange}
                placeholder="Enter nearby access"
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
                placeholder="Enter room quantity"
                className="w-full py-2 px-3 text-black rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F2AA4CFF] shadow-md"
              />
            </div>
            {roomBedQuantities.map((room, index) => (
              <div key={index} className="mb-2">
                <label className="block text-white mb-1">Room {index + 1}</label>
                <input
                  type="text"
                  value={room.roomName}
                  onChange={(e) => handleBedQuantityChange(index, e.target.value, 'roomName')}
                  placeholder={`Enter room name`}
                  className="w-full py-2 px-3 mb-2 text-black rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F2AA4CFF] shadow-md"
                />
                <input
                  type="number"
                  value={room.bedQuantity}
                  onChange={(e) => handleBedQuantityChange(index, e.target.value, 'bedQuantity')}
                  placeholder={`Enter bed quantity for room ${index + 1}`}
                  className="w-full py-2 px-3 text-black rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F2AA4CFF] shadow-md"
                />
              </div>
            ))}
            <div>
              <label className="block text-white mb-1">Longitude</label>
              <input
                type="text"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                placeholder="Enter longitude"
                className="w-full py-2 px-3 text-black rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F2AA4CFF] shadow-md"
              />
            </div>
            <div>
              <label className="block text-white mb-1">Latitude</label>
              <input
                type="text"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                placeholder="Enter latitude"
                className="w-full py-2 px-3 text-black rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F2AA4CFF] shadow-md"
              />
            </div>
            <div>
              <label className="block text-white mb-1">Hostel Images</label>
              <input
                type="file"
                multiple
                onChange={handleImageChange}
                className="w-full py-2 px-3 text-black rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F2AA4CFF] shadow-md"
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-6 py-2 text-white bg-[#F2AA4CFF] rounded-lg shadow-md hover:bg-[#F2AA4CFF] focus:outline-none focus:ring-2 focus:ring-[#F2AA4CFF]"
              >
                Create Property
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
export default CreatePropertyForm;
