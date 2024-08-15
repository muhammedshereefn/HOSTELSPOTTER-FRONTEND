import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import vendorAxiosInstance from '../../api/vendor/axios';
import toast, { Toaster } from 'react-hot-toast';
import { uploadImages } from '../../api/cloudinaryConfig';
import Spinner from '../../components/vendor/Spinner';
import FacilityModall from '../../components/vendor/FacilityModal'
import PoliciesModal from '../../components/vendor/PoliciesModal';
import TutorialModal from '../../components/vendor/TutorialModal';

const CreatePropertyForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    hostelName: '',
    hostelLocation: '',
    state: '',
    district: '',
    city: '',  
    ownerContact: '',
    rent: '',
    deposite: '',
    target: 'Students, Working Professionals',
    policies: '',
    facilities: '',
    category: '',
    nearbyAccess: 'Temple, Church, Mosque, Hospital, Metro, Mall, Medical Store, GYM',
    roomQuantity: '',
    hostelImages: [],
    roomBedQuantities: [],
    longitude: '', 
    latitude: '', 
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [roomBedQuantities, setRoomBedQuantities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPoliciesModalOpen, setIsPoliciesModalOpen] = useState(false);
  const [isTutorialModalOpen, setIsTutorialModalOpen] = useState(false);
  // FACILITIES
  const [predefinedFacilities, setPredefinedFacilities] = useState([
    'Wi-Fi','Cleaning Staff','Study Table','CCTV','Play Ground', 'Laundry','AC', 'Cafeteria', 'Parking', 'Gym', 'Security', 'Power Backup'
  ]);
  const [selectedFacilities, setSelectedFacilities] = useState([]);


  //POLICIES
  const [predefinedPolicies, setPredefinedPolicies] = useState([
    'Gate Close Time : 10', 'Visitors allowed', 'Fulltime warden', 'Notice period', 'No Drinking'
  ]); 
  const [selectedPolicies, setSelectedPolicies] = useState([]);


  
  const statesOfIndia = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];


  
  const FacilityModal = FacilityModall

  
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
      hostelName, hostelLocation, state, district, city, ownerContact,
      rent, deposite, target, category, nearbyAccess,
      roomQuantity, longitude, latitude,
    } = formData;

    if (!hostelName || !hostelLocation || !state || !district || !city ||
      !ownerContact || !rent || !deposite || !target || !category || !nearbyAccess || !roomQuantity || !longitude || !latitude) {
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

  const openFacilityModal = () => {
    setIsModalOpen(true);
  };

  const closeFacilityModal = () => {
    setIsModalOpen(false);
  };


  const openPoliciesModal = () => {
    setIsPoliciesModalOpen(true);
  };

  const closePoliciesModal = () => {
    setIsPoliciesModalOpen(false);
  };

  const handleSelectFacility = (facility) => {
    const newFacilities = [...selectedFacilities, facility];
    setSelectedFacilities(newFacilities);
    setFormData({
      ...formData,
      facilities: newFacilities.join(', '),
    });
    closeFacilityModal();
  };

  const handleAddCustomFacility = (facility) => {
    const newFacilities = [...selectedFacilities, facility];
    setSelectedFacilities(newFacilities);
    setFormData({
      ...formData,
      facilities: newFacilities.join(', '),
    });
    closeFacilityModal();
  };

  const handleSelectPolicy = (policy) => {
    const newPolicies = [...selectedPolicies, policy];
    setSelectedPolicies(newPolicies);
    setFormData({
      ...formData,
      policies: newPolicies.join(', '),
    });
    closePoliciesModal();
  };

  const handleAddCustomPolicy = (policy) => {
    const newPolicies = [...selectedPolicies, policy];
    setSelectedPolicies(newPolicies);
    setFormData({
      ...formData,
      policies: newPolicies.join(', '),
    });
    closePoliciesModal();
  };


  const openTutorialModal = () => {
    setIsTutorialModalOpen(true);
  };

  const closeTutorialModal = () => {
    setIsTutorialModalOpen(false);
  }


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
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full py-2 px-3 text-black rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F2AA4CFF] shadow-md"
              >
                <option value="">Select state</option>
                {statesOfIndia.map((state, index) => (
                  <option key={index} value={state}>
                    {state}
                  </option>
                ))}
              </select>
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
              <label className="block text-white mb-1">Contact person mobile</label>
              <input
                type="text"
                name="ownerContact"
                value={formData.ownerContact}
                onChange={handleChange}
                placeholder="+91 xxxxxxxxxx"
                className="w-full py-2 px-3 text-black rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F2AA4CFF] shadow-md"
              />
            </div>
            <div>
              <label className="block text-white mb-1">Rent per month(INR)</label>
              <input
                type="text"
                name="rent"
                value={formData.rent}
                onChange={handleChange}
                placeholder="Enter amount"
                className="w-full py-2 px-3 text-black rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F2AA4CFF] shadow-md"
              />
            </div>
            <div>
              <label className="block text-white mb-1">Deposit (INR)</label>
              <input
                type="text"
                name="deposite"
                value={formData.deposite}
                onChange={handleChange}
                placeholder="Enter amount"
                className="w-full py-2 px-3 text-black rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F2AA4CFF] shadow-md"
              />
            </div>
            <div>
              <label className="block text-white mb-1">Tenant Preferred</label>
              <textarea
                name="target"
                value={formData.target}
                onChange={handleChange}
                placeholder="eg : students, employees"
                className="w-full py-2 px-3 text-black rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F2AA4CFF] shadow-md"
              />
            </div>
            <div>
              <label className="block text-white mb-1">Policies</label>
              <textarea
                name="policies"
                value={formData.policies}
                onClick={openPoliciesModal}
                readOnly
                placeholder="Click to select or type policies"
                className="w-full py-2 px-3 text-black rounded bg-gray-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F2AA4CFF] shadow-md"
              />
            </div>
            <div>
              <label className="block text-white mb-1">Facilities</label>
              <textarea
                name="facilities"
                value={formData.facilities}
                onClick={openFacilityModal}
                readOnly
                placeholder="Click to select or type facilities"
                className="w-full py-2 px-3 text-black rounded bg-gray-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F2AA4CFF] shadow-md"
              />
            </div>
            <div>
              <label className="block text-white mb-1">Category</label>
              <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full py-2 px-3 text-black rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F2AA4CFF] shadow-md"
            >
              <option value="">Select Category</option>
              <option value="Gents">Gents</option>
              <option value="Ladies">Ladies</option>
              <option value="Mixed">Mixed</option>
            </select>
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
                <label className="block text-white mb-1">Enter Room {index + 1} Name & Bed Quantity</label>
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
            <button
            type="button" 
            className="px-6 py-1 bg-gray-600 text-sm underline text-blue-400 font-bold rounded-lg shadow-md transform transition-transform duration-300 ease-in-out hover:scale-105 hover: focus:outline-none focus:ring-2 focus:ring-[#F2AA4CFF]"
            onClick={openTutorialModal}
          >
            Click to View How to Get Latitude & Longitude
          </button>


        <TutorialModal
        isOpen={isTutorialModalOpen}
        onClose={closeTutorialModal}
      />
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
                className="px-6 font-bold uppercase text-black py-2  w-full bg-[#F2AA4CFF] rounded-lg shadow-md hover:bg-[#F2AA4CFF] focus:outline-none focus:ring-2 focus:ring-[#F2AA4CFF]"
              >
                Create Property
              </button>
            </div>
          </form>
        )}
      </div>
      <FacilityModal
        isOpen={isModalOpen}
        onClose={closeFacilityModal}
        facilities={predefinedFacilities}
        onSelectFacility={handleSelectFacility}
        onAddCustomFacility={handleAddCustomFacility}
      />

      <PoliciesModal
        isOpen={isPoliciesModalOpen}
        onClose={closePoliciesModal}
        policies={predefinedPolicies}
        onSelectPolicy={handleSelectPolicy}
        onAddCustomPolicy={handleAddCustomPolicy}
      />
    </div>
  );
};
export default CreatePropertyForm;
