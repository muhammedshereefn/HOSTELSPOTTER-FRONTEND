import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUserCircle, FaEnvelope, FaRegComments } from 'react-icons/fa';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/properties/${id}`);
        setProperty(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching property details:', error);
        navigate('/home'); // Redirect to home if there is an error
      }
    };

    fetchPropertyDetails();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#2C3554] text-white">
        <div className="text-center">
          <div className="loader"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return <div className="flex justify-center items-center min-h-screen text-white">Property not found.</div>;
  }

  return (
    <div className="min-h-screen text-white flex flex-col items-center">
      <header className="w-full p-4 flex justify-between items-center shadow-md px-8 sm:pl-14 bg-[#1F253D]">
        <h1 className="text-2xl font-bold text-[#BEF264]"><span className='text-white'>BRO</span>STEL</h1>
        <button onClick={() => navigate(-1)} className="bg-[#BEF264] text-[#000000] py-2 px-4 rounded-lg shadow-md transition duration-300 hover:bg-[#A0C1B8]">Back</button>
      </header>
      <main className="flex flex-col items-end mt-12 text-left px-4 w-full max-w-6xl">
        <h2 className="text-3xl font-bold mb-4 pr-7">{property.hostelName}</h2>
        <div className="w-full flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {property.hostelImages?.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  alt={property.hostelName}
                  className="w-full h-auto object-cover border transition duration-300 transform hover:scale-105 rounded-lg shadow-md"
                  style={{ maxHeight: '300px' }}
                />
              </div>
            ))}
          </div>
          <div className="p-4 bg-[#4C525E] rounded-lg shadow-md w-full lg:w-1/3">
  <ul className="list-none space-y-4 text-sm lg:text-base">
    <li className="text-gray-200">{property.category}</li>
    <li className="text-[#ffffff] font-bold text-3xl">RENT/month: <span className='text-[#BEF264]'>₹</span> {property.rent}</li>
    <li className="text-[#ffffff] font-bold">Deposit: <span className='text-[#BEF264]'>₹</span> {property.deposite}</li>
    <li className="text-[#BEF264]">Room Quantity: <span className='text-white'>{property.roomQuantity}</span></li>
    <li className="text-gray-200"><strong>Location:</strong> {property.hostelLocation}</li>
    <div className="mt-4 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
    <div className="flex items-center space-x-2">
      <span className="bg-[#BEF264] p-2 rounded-full cursor-pointer">
        <FaRegComments className="h-6 w-6 text-[#1F253D]" />
      </span>
    </div>
    <button className="bg-[#BEF264] text-[#1F253D] font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 hover:bg-[#A0C1B8] mt-4 sm:mt-0">
      Contact
    </button>
  </div>
    <li className="text-[#BEF264] pt-96"><strong>Available Room Plans:</strong></li>
    <div className="bg-[#2C3554] p-2 rounded-lg">
      <ul className="list-none space-y-2 text-sm lg:text-base">
        {property.availablePlans?.map((plan, index) => (
          <li key={index} className="text-white">
            <span className='text-[#BEF264] pr-2'>•</span> {plan}
          </li>
        ))}
      </ul>
    </div>
  </ul>
 
</div>

        </div>
        <div className="mt-8 w-full max-w-6xl">
          <div className="bg-[#4C525E] p-4 rounded-lg shadow-md">
            <h3 className="text-xl text-[#BEF264] underline font-bold mb-4">Facilities</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {property.facilities?.map((facility, index) => (
                <div key={index} className="flex items-center text-white">
                  <span className='text-[#BEF264] pr-3'>•</span> {facility}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 w-full max-w-6xl">
          <div className="bg-[#4C525E] p-4 rounded-lg shadow-md">
            <h3 className="text-xl text-[#BEF264] underline font-bold mb-4">Policies</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {property.policies?.map((policy, index) => (
                <div key={index} className="flex items-center text-white">
                  <span className='text-[#BEF264] pr-3'>•</span>{policy}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 w-full max-w-6xl">
          <div className="bg-[#4C525E] p-4 rounded-lg shadow-md">
            <h3 className="text-xl text-[#BEF264] underline font-bold mb-4">Nearby Accessibility Areas</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {property.nearbyAccess?.map((area, index) => (
                <div key={index} className="flex items-center text-white">
                  <span className='text-[#BEF264] pr-3'>✔️</span>{area}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PropertyDetails;
