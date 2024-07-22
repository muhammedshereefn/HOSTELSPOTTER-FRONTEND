// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';
// import { FaUserCircle, FaEnvelope, FaRegComments } from 'react-icons/fa';

// const PropertyDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [property, setProperty] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedImage, setSelectedImage] = useState(null);

//   useEffect(() => {
//     const fetchPropertyDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/users/properties/${id}`);
//         setProperty(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching property details:', error);
//         navigate('/home'); // Redirect to home if there is an error
//       }
//     };

//     fetchPropertyDetails();
//   }, [id, navigate]);

//   const openImageModal = (image) => {
//     setSelectedImage(image);
//   };

//   const closeImageModal = () => {
//     setSelectedImage(null);
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-[#2C3554] text-white">
//         <div className="text-center">
//           <div className="loader"></div>
//           <p>Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!property) {
//     return <div className="flex justify-center items-center min-h-screen text-white">Property not found.</div>;
//   }

//   return (
//     <div className="min-h-screen text-white flex flex-col items-center ">
//       <header className="w-full p-4 flex justify-between items-center shadow-md px-8 sm:pl-14 ">
//         <h1 className="text-2xl font-bold text-[#BEF264]"><span className='text-white'>BRO</span>STEL</h1>
//         <button onClick={() => navigate(-1)} className="bg-[#BEF264] text-[#000000] py-2 px-4 rounded-lg shadow-md transition duration-300 hover:bg-[#A0C1B8]">Back</button>
//       </header>
      
//       <main className="flex flex-col items-center mt-12 text-left px-4 w-full max-w-6xl">
//         <h2 className="text-3xl font-bold mb-4">{property.hostelName}</h2>
//         <div className="w-full flex flex-col lg:flex-row gap-6">
//           <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
//             {property.hostelImages?.map((image, index) => (
//               <div key={index} className="relative">
//                 <img
//                   src={image}
//                   alt={property.hostelName}
//                   className="w-full h-auto object-cover border transition duration-300 transform hover:scale-105 rounded-lg shadow-md cursor-pointer"
//                   style={{ maxHeight: '300px' }}
//                   onClick={() => openImageModal(image)}
//                 />
//               </div>
//             ))}
//           </div>
//           <div className="p-4 bg-[#4c525e5b] rounded-lg shadow-md w-full lg:w-1/3">
//             <ul className="list-none space-y-4 text-sm lg:text-base">
//               <li className="text-gray-200">{property.category}</li>
//               <li className="text-[#ffffff] font-bold text-3xl">RENT/month: <span className='text-[#BEF264]'>₹</span> {property.rent}</li>
//               <li className="text-[#ffffff] font-bold">Deposit: <span className='text-[#BEF264]'>₹</span> {property.deposite}</li>
//               <li className="text-[#BEF264]">Room Quantity: <span className='text-white'>{property.roomQuantity}</span></li>
//               <li className="text-gray-200"><strong>Location:</strong> {property.hostelLocation}</li>
//               <div className="mt-4 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
//                 <div className="flex items-center space-x-2">
//                   <Link to="/chat">
//                     <button className="p-2 bg-[#BEF264] text-[#1B213B] rounded-full">
//                       <FaRegComments className="text-xl" />
//                     </button>
//                   </Link>
//                 </div>
//                 <button className="bg-[#BEF264] text-[#1F253D] font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 hover:bg-[#A0C1B8] mt-4 sm:mt-0">
//                   Contact
//                 </button>
//               </div>
//               <li className="text-[#BEF264] pt-96"><strong>Available Room Plans:</strong></li>
//               <div className="bg-[#4c525e5b] p-2 rounded-lg">
//                 <ul className="list-none space-y-2 text-sm lg:text-base">
//                   {property.availablePlans?.map((plan, index) => (
//                     <li key={index} className="text-white">
//                       <span className='text-[#BEF264] pr-2'>•</span> {plan}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </ul>
//           </div>
//         </div>

//         <div className="mt-8 w-full max-w-6xl">
//           <div className="bg-[#4c525e5b] p-4 rounded-lg shadow-md">
//             <h3 className="text-xl text-[#ffffff]  font-bold mb-11">Facilities</h3>
//             <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//               {property.facilities?.map((facility, index) => (
//                 <div key={index} className="flex items-center text-white">
//                   <span className='text-[#BEF264] pr-3'>•</span> {facility}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="mt-8 w-full max-w-6xl">
//           <div className="bg-[#4c525e5b] p-4 rounded-lg shadow-md">
//             <h3 className="text-xl text-[#ffffff]  font-bold mb-11">Policies</h3>
//             <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//               {property.policies?.map((policy, index) => (
//                 <div key={index} className="flex items-center text-white">
//                   <span className='text-[#BEF264] pr-3'>•</span>{policy}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="mt-8 w-full max-w-6xl">
//           <div className="bg-[#4c525e5b] p-4 rounded-lg shadow-md">
//             <h3 className="text-xl text-[#ffffff]  font-bold mb-11">Nearby Accessibility Areas</h3>
//             <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//               {property.nearbyAccess?.map((area, index) => (
//                 <div key={index} className="flex items-center text-white">
//                   <span className='text-[#BEF264] pr-3'>✔️</span>{area}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </main>
//       <footer className="w-full p-4 flex justify-center items-center bg-[#2C3554] mt-12">
//         <p className="text-gray-200">© 2024 Brostel. All rights reserved.</p>
//       </footer>

//       {selectedImage && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50" onClick={closeImageModal}>
//           <img src={selectedImage} alt="Selected" className="w-3/4 h-auto object-cover rounded-lg shadow-md" />
//         </div>
//       )}
//     </div>
//   );
// };

// export default PropertyDetails;




import  { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import axiosInstance from '../../api/axios';
import { FaHistory, FaLocationArrow, FaRegComments, FaStar, FaUserFriends } from 'react-icons/fa';
import ChatModal from '../../components/user/ChatModal';
import toast from 'react-hot-toast';
import mapboxgl from 'mapbox-gl';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/signin');
      return;
    }

    const fetchPropertyDetails = async () => {
      try {
        const response = await axiosInstance.get(`/users/properties/${id}`);
        setProperty(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching property details:', error);
        navigate('/home');
      }
    };

    fetchPropertyDetails();
  }, [id, navigate]);

  useEffect(() => {
    if (location.state?.bookingSuccess) {
      toast.success('Booking successful!');
    }
  }, [location.state]);

  const openImageModal = (image) => {
    setSelectedImage(image);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    if (property && property.longitude && property.latitude) {
      console.log('Initializing map with coordinates:', property.longitude, property.latitude);
      mapboxgl.accessToken = 'pk.eyJ1Ijoic2hlcmVlZnNoYXoiLCJhIjoiY2x5cXVqdzc5MGRrODJqcXZxbzEwYjFkYiJ9.I2x00Rca-_u3T24Lm-oaww';

      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [property.latitude, property.longitude],
        zoom: 14,
      });

      // Add navigation controls (zoom and rotation controls)
      const nav = new mapboxgl.NavigationControl();
      map.addControl(nav, 'top-left');

  


      const marker = new mapboxgl.Marker()
      .setLngLat([property.latitude, property.longitude])
      .addTo(map);

          // Add click event to the marker
      marker.getElement().addEventListener('click', () => {
        window.open(`https://www.google.com/maps/search/?api=1&query=${property.longitude},${property.latitude}`, '_blank');
      });

    } else {
      console.log('Property coordinates are not available yet.');
    }
  }, [property]);

  const handleSlotBooking = (roomName, bedQuantity) => {
    navigate(`/slot-booking/${id}/${roomName}/${bedQuantity}`);
  };

  const openGoogleMaps = () => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${property.longitude},${property.latitude}`, '_blank');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white">
        <div className="text-center">
          <div className="loader border-t-4 border-b-4 border-[#BEF264] rounded-full w-16 h-16 animate-spin"></div>
          <p className="mt-4 text-lg font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return <div className="flex justify-center items-center min-h-screen text-white">Property not found.</div>;
  }

  return (
    <div className="min-h-screen text-white flex flex-col items-center">
      <header className="w-full p-4 flex justify-between items-center shadow-md px-8 sm:pl-14">
        <h1 className="text-2xl font-bold text-[#BEF264]"><span className='text-white'>BRO</span>STEL</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/home')}
            className="bg-[#BEF264] text-[#000000] py-2 px-4 rounded-lg shadow-md transition duration-300 hover:bg-[#A0C1B8]"
          >
            Back
          </button>
          <Link to="/bookingHistory">
            <button className="p-2 bg-[#BEF264] text-[#000000bc] rounded-full shadow-md transition duration-300 hover:bg-[#A0C1B8]">
              <FaHistory className="text-xl" />
            </button>
          </Link>
        </div>
      </header>

      <main className="flex flex-col items-center mt-12 text-left px-4 w-full max-w-6xl">
        <h2 className="text-3xl uppercase font-bold mb-4">{property.hostelName}</h2>
        <div className="w-full flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {property.hostelImages?.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  alt={property.hostelName}
                  className="w-full h-auto object-cover transition duration-300 transform hover:scale-105 rounded-lg cursor-pointer "
                  style={{ maxHeight: '300px' }}
                  onClick={() => openImageModal(image)}
                />
              </div>
            ))}
          </div>

          <div className="p-4 bg-[#0000005b] rounded-lg  w-full lg:w-1/3">
            <ul className="list-none space-y-4 text-sm lg:text-base">
              <li className="text-gray-200">{property.category}</li>
              <li className="text-[#ffffff] font-bold text-3xl">RENT/<span className='text-xl uppercase text-gray-300'>month</span> : <span className='text-[#fed400]'>₹</span> {property.rent}</li>
              <li className="text-[#ffffff] font-bold">Deposit: <span className='text-[#fed400]'>₹</span> {property.deposite}</li>
              <li className="text-[#fed400] uppercase text-sm">Room Quantity: <span className='text-white'>{property.roomQuantity}</span></li>
              <li className="text-gray-300"><strong>ADDRESS :</strong> {property.hostelLocation}</li>
              <button
                className="w-full bg-[#fefffffd] text-[#000000f7] text-sm font-bold py-2 px-6 md:px-8 rounded-3xl shadow-md transition duration-300 hover:bg-[#517ca5] mt-4 sm:mt-0 flex items-center justify-center"
                onClick={openGoogleMaps}
              >
                <FaLocationArrow className="mr-2" />
                Navigate to location
              </button>

              <div className="mt-5 pt-6 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-2">
                  <button className="p-2 bg-[#BEF264] text-[#1B213B] rounded-full" onClick={() => setIsChatOpen(true)}>
                    <FaRegComments className="text-xl" />
                  </button>
                </div>
                <button
                className="bg-[#BEF264] text-[#1F253D] font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 hover:bg-[#A0C1B8] mt-4 sm:mt-0 text-sm flex items-center justify-center"
              >
                <FaUserFriends className="mr-2" />
                CONNECT WITH OWNER
              </button>
              </div>
              
              <li className="text-[#fed400] mt-20 pt-14 uppercase"><strong>Available Room Plans</strong></li>
              <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold text-white mb-4 ">Available Plans</h2>
                <ul className="space-y-2">
                  {property.availablePlans.map((plan, index) => (
                    <li key={index} className="text-gray-300 border-b border-gray-600 py-2">
                      {plan}
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-200 mb-4">
                    <p>Book Beds in Advance</p>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {property.roomBedQuantities.map((room, index) => (
                      <button
                        key={index}
                        onClick={() => handleSlotBooking(room.roomName, room.bedQuantity)}
                        className="text-white bg-green-500 hover:bg-green-600 px-4 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">{room.bedQuantity} Beds Room</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </ul>
          </div>
        </div>

        <div id="map" className="mt-8 w-full max-w-6xl h-96 rounded-lg shadow-md"></div>

        <div className="mt-8 w-full max-w-6xl">
          <div className="bg-[#2C3554] p-4 rounded-2xl">
            <h3 className="uppercase text-xl text-[#ffffff] font-bold mb-6">Facilities</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {property.facilities?.map((facility, index) => (
                <div key={index} className="flex items-center rounded-lg p-2 bg-[#1E2530] hover:bg-[#28c4dd] hover:shadow-lg transition duration-300 ease-in-out">
                  <FaStar className="text-[#28c4dd] pr-2" />
                  <span className="uppercase text-[#fdfdfd] font-bold">{facility}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 w-full max-w-6xl">
          <div className="bg-[#2C3554] p-4 rounded-2xl">
            <h3 className="uppercase text-xl text-[#ffffff] font-bold mb-6">Policies</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {property.policies?.map((policy, index) => (
                <div key={index} className="flex items-center rounded-lg p-2 bg-[#1E2530] hover:bg-[#28c4dd] hover:shadow-lg transition duration-300 ease-in-out">
                  <FaStar className="text-[#28c4dd] pr-2" />
                  <span className="uppercase text-[#ffffff] font-bold">{policy}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 w-full max-w-6xl">
          <div className="bg-[#2C3554] p-4 rounded-2xl">
            <h3 className="uppercase text-xl text-[#ffffff] font-bold mb-6">Nearby Accessibility Areas</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {property.nearbyAccess?.map((area, index) => (
                <div key={index} className="flex items-center rounded-lg p-2 bg-[#1E2530] hover:bg-[#28c4dd] hover:shadow-lg transition duration-300 ease-in-out">
                  <FaStar className="text-[#28c4dd] pr-2" />
                  <span className="uppercase text-[#ffffff] font-bold">{area}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full bg-[#1E2530] text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="flex flex-col">
              <h4 className="text-lg font-bold mb-4">Contact Us</h4>
              <p className="text-gray-400">Brostel Hostel Management</p>
              <p className="text-gray-400">123 Hostel St, City, Country</p>
              <p className="text-gray-400">Email: info@brostel.com</p>
              <p className="text-gray-400">Phone: +123 456 7890</p>
            </div>
            <div className="flex flex-col">
              <h4 className="text-lg font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="/home" className="text-gray-400 hover:text-[#BEF264]">Home</a></li>
                <li><a href="/properties" className="text-gray-400 hover:text-[#BEF264]">Properties</a></li>
                <li><a href="/about" className="text-gray-400 hover:text-[#BEF264]">About Us</a></li>
                <li><a href="/contact" className="text-gray-400 hover:text-[#BEF264]">Contact</a></li>
              </ul>
            </div>
            <div className="flex flex-col">
              <h4 className="text-lg font-bold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-[#BEF264]"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="text-gray-400 hover:text-[#BEF264]"><i className="fab fa-twitter"></i></a>
                <a href="#" className="text-gray-400 hover:text-[#BEF264]"><i className="fab fa-instagram"></i></a>
                <a href="#" className="text-gray-400 hover:text-[#BEF264]"><i className="fab fa-linkedin-in"></i></a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-600 mt-8 pt-4 text-center">
            <p className="text-gray-400">&copy; 2024 Brostel. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {selectedImage && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75 cursor-pointer"
          onClick={closeImageModal}
        >
          <img
            src={selectedImage}
            alt={property.hostelName}
            className="max-h-full max-w-full"
            style={{ maxHeight: '90%', maxWidth: '90%' }}
          />
        </div>
      )}

      {/* Render the ChatModal component and manage its visibility */}
      {isChatOpen && (
        <ChatModal onClose={() => setIsChatOpen(false)} />
      )}
    </div>
  );
};

export default PropertyDetails;
