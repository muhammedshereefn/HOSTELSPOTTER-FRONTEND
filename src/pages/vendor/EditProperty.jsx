import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import vendorAxiosInstance from '../../api/vendor/axios';
import toast, { Toaster } from 'react-hot-toast';
import { uploadImages } from '../../api/cloudinaryConfig';
import Spinner from '../../components/vendor/Spinner';

const EditProperty = () => {
  const { id } = useParams();
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
    const fetchProperty = async () => {
      try {
        const response = await vendorAxiosInstance.get(`/vendors/property/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('vendorToken')}`,
          },
        });

        if (response.status === 200) {
          const data = response.data;
          setFormData({
            hostelName: data.hostelName || '',
            hostelLocation: data.hostelLocation || '',
            state: data.state || '',
            district: data.district || '',
            city: data.city || '',
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
            roomBedQuantities: data.roomBedQuantities || [],
            longitude: data.longitude || '',
            latitude: data.latitude || '',
          });
          setRoomBedQuantities(data.roomBedQuantities || []);
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

      if (name === 'roomQuantity') {
        const quantity = parseInt(value, 10);
        if (!isNaN(quantity)) {
          const newBedQuantities = Array(quantity).fill({ roomName: `${formData.hostelName}:`, bedQuantity: '' });
          setRoomBedQuantities(newBedQuantities);
        } else {
          setRoomBedQuantities([]);
        }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (imageFiles.length > 0) {
      try {
        const imageUrls = await uploadImages(imageFiles);
        formData.hostelImages = [...formData.hostelImages, ...imageUrls];
      } catch (error) {
        console.error('Error uploading images:', error);
        toast.error('An error occurred while uploading images');
        setLoading(false);
        return;
      }
    }

    formData.roomBedQuantities = roomBedQuantities;

    try {
      const response = await vendorAxiosInstance.put(`/vendors/property/${id}`, formData, {
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center p-4">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex flex-col items-center justify-center w-full max-w-2xl p-8 bg-gray-800 shadow-lg rounded-3xl">
        <h2 className="text-3xl font-semibold text-white mb-6">
          Edit Your <span className="text-[#F2AA4CFF]">Property</span>
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
              <label className="block text-white mb-1">Hostel Location</label>
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
                type="tel"
                name="ownerContact"
                value={formData.ownerContact}
                onChange={handleChange}
                placeholder="Enter owner contact number"
                className="w-full py-2 px-3 text-black rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F2AA4CFF] shadow-md"
              />
            </div>
            <div>
              <label className="block text-white mb-1">Rent (₹)</label>
              <input
                type="number"
                name="rent"
                value={formData.rent}
                onChange={handleChange}
                placeholder="Enter rent amount"
                className="w-full py-2 px-3 text-black rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F2AA4CFF] shadow-md"
              />
            </div>
            <div>
              <label className="block text-white mb-1">Deposite (₹)</label>
              <input
                type="number"
                name="deposite"
                value={formData.deposite}
                onChange={handleChange}
                placeholder="Enter deposite amount"
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
                placeholder="Enter target"
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
                placeholder="Enter policies"
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
                placeholder="Enter room quantity"
                className="w-full py-2 px-3 text-black rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F2AA4CFF] shadow-md"
              />
            </div>
            {roomBedQuantities.map((room, index) => (
              <div key={index} className="flex items-center mb-4">
                <input
                  type="text"
                  name={`roomName-${index}`}
                  value={room.roomName}
                  onChange={(e) => handleBedQuantityChange(index, e.target.value, 'roomName')}
                  placeholder={`Room ${index + 1} Name`}
                  className="w-1/2 py-2 px-3 text-black rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F2AA4CFF] shadow-md mr-2"
                />
                <input
                  type="number"
                  name={`bedQuantity-${index}`}
                  value={room.bedQuantity}
                  onChange={(e) => handleBedQuantityChange(index, e.target.value, 'bedQuantity')}
                  placeholder={`Room ${index + 1} Bed Quantity`}
                  className="w-1/2 py-2 px-3 text-black rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F2AA4CFF] shadow-md"
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
                name="hostelImages"
                onChange={handleChange}
                multiple
                className="w-full py-2 px-3 text-black rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F2AA4CFF] shadow-md"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-[#F2AA4CFF] text-white font-semibold rounded hover:bg-[#F2AA4CFF] focus:outline-none focus:ring-2 focus:ring-[#F2AA4CFF] shadow-md"
            >
              Update Property
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditProperty;
