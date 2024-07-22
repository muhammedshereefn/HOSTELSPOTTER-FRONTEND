


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

  const handleSubmit = async (e) => {
    e.preventDefault();
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
              <label className="block text-white mb-1">Deposite (INR)</label>
              <input
                type="number"
                name="deposite"
                value={formData.deposite}
                onChange={handleChange}
                placeholder="Enter deposite"
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
                placeholder="Enter target (comma separated)"
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
                placeholder="Enter policies (comma separated)"
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
                placeholder="Enter facilities (comma separated)"
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
              <input
                type="text"
                name="availablePlans"
                value={formData.availablePlans}
                onChange={handleChange}
                placeholder="Enter available plans (comma separated)"
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
                placeholder="Enter nearby access (comma separated)"
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
            {roomBedQuantities.map((bedQuantity, index) => (
              <div key={index} className="mb-4">
                <label className="block text-white mb-1">
                  Room Name {index + 1}
                </label>
                <input
                  type="text"
                  name={`roomName${index}`}
                  value={bedQuantity.roomName}
                  onChange={(e) =>
                    handleBedQuantityChange(index, e.target.value, 'roomName')
                  }
                  placeholder="Enter room name"
                  className="w-full py-2 px-3 text-black rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F2AA4CFF] shadow-md"
                />
                <label className="block text-white mb-1">
                  Bed Quantity {index + 1}
                </label>
                <input
                  type="number"
                  name={`bedQuantity${index}`}
                  value={bedQuantity.bedQuantity}
                  onChange={(e) =>
                    handleBedQuantityChange(index, e.target.value, 'bedQuantity')
                  }
                  placeholder="Enter bed quantity"
                  className="w-full py-2 px-3 text-black rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F2AA4CFF] shadow-md"
                />
              </div>
            ))}
            <div>
            <div>
              <label className="block text-white mb-1">Latitude</label>
              <input
                type="text"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                placeholder="Enter Latitude"
                className="w-full py-2 px-3 text-black rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F2AA4CFF] shadow-md"
              />
            </div>
            <div>
              <label className="block text-white mb-1">Longitude</label>
              <input
                type="text"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                placeholder="Enter Longitude"
                className="w-full py-2 px-3 text-black rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F2AA4CFF] shadow-md"
              />
            </div>
              <label className="block text-white mb-1">Hostel Images</label>
              <input
                type="file"
                multiple
                onChange={handleImageChange}
                className="w-full py-2 px-3 text-black rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F2AA4CFF] shadow-md"
              />
            </div>
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="py-2 px-4 bg-[#F2AA4CFF] text-white font-semibold rounded hover:bg-[#cf8f35] shadow-lg"
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CreatePropertyForm;
