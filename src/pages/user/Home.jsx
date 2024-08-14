import { useEffect, useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axios';
import toast, { Toaster } from 'react-hot-toast';
import { FiSearch } from 'react-icons/fi';
import { FaRegUserCircle, FaCheckCircle, FaHistory, FaHome, FaMapMarkerAlt, FaLocationArrow, FaArrowRight, FaArrowLeft, FaHeart, FaCompass } from 'react-icons/fa';
import houseImage from '../../../public/vendor/Designer (1).png';
import thumbsUpImage from '../../../public/vendor/Designer (2).png'; 

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReactPaginate from 'react-paginate';
import FavoritesModal from '../../components/user/FavoritesModal ';

const HomePage = () => {

  const [showFavoritesModal, setShowFavoritesModal] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const location = useLocation();
  const navigate = useNavigate();
  const toastShownRef = useRef(false);
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);

  const [propertiesGroupedByState, setPropertiesGroupedByState] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const propertiesPerPage = 4;

  const exploreSectionRef = useRef(null);


  useEffect(() => {

    const fetchFavorites = async () => {
      try {
        const response = await axiosInstance.get('/users/getfavorites');
        console.log(response)
        setFavorites(response.data);
      } catch (error) {
        console.error('Error fetching favorite hostels:', error);
      }
    };

    if (showFavoritesModal) {
      fetchFavorites();
    }
  }, [showFavoritesModal]);

  useEffect(() => {
    const fetchPropertiesGroupedByState = async () => {
      try {
        const response = await axiosInstance.get('/users/properties/grouped-by-state');
        setPropertiesGroupedByState(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };
    fetchPropertiesGroupedByState();
  }, []);
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/signin');
      return;
    }

    const checkBlockStatus = async () => {
      try {
        const response = await axiosInstance.get('/users/check-block-status', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.status === 403) {
          localStorage.removeItem('token');
          navigate('/signin', { state: { message: 'User is blocked' } });
        }
      } catch (error) {
        localStorage.removeItem('token');
        navigate('/signin', { state: { message: 'User is blocked or session expired' } });
      }
    };

    checkBlockStatus();

    if (location.state?.message && !toastShownRef.current) {
      toast.success(location.state.message);
      toastShownRef.current = true;
      navigate(location.pathname, { replace: true, state: {} });
    }

    const fetchProperties = async () => {
      try {
        const response = await axiosInstance.get('/users/properties');
        setProperties(response.data);
        setFilteredProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, [location.state, navigate, location.pathname]);


  const handleFavoritesClick = () => {
    setShowFavoritesModal(true);
  };

  const closeModal = () => {
    setShowFavoritesModal(false);
  };

  const handleRemoveFavorite = async (propertyId) => {
    try {
      await axiosInstance.delete(`/users/favorites/${propertyId}`);
      setFavorites((prevFavorites) => prevFavorites.filter(fav => fav.propertyId !== propertyId));
      toast.success("Favorite hostel removed successfully.");
    } catch (error) {
      console.error('Failed to remove favorite hostel:', error);
      toast.error("Failed to remove favorite hostel.");
    }
  };
  

  const handleStateClick = (state) => {
    navigate(`/properties/${state}`);
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredProperties(properties);
    } else {
      setFilteredProperties(properties.filter(property => property.category === category));
    }
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };


  const handleExploreClick = () => {
    if (exploreSectionRef.current) {
      exploreSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };


  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    const filtered = properties.filter(property =>
      property.hostelName.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredProperties(filtered);
    setCurrentPage(0); 
  };

  const offset = currentPage * propertiesPerPage;
  const currentProperties = filteredProperties.slice(offset, offset + propertiesPerPage);

  return (
    <div className="min-h-screen text-white flex flex-col items-center">
      <header className="w-full p-4 flex justify-between items-center shadow-md px-8 sm:pl-14">
        <h1 className="text-2xl font-bold text-[#BEF264]"><span className='text-white'>BRO</span>STEL</h1>
        <div className="flex items-center space-x-4 sm:pr-16">

          <Link to="/bookingHistory">
            <button className="p-2 bg-[#BEF264] text-[#1B213B] rounded-full">
              <FaHistory className="text-xl" />
            </button>
          </Link>

          <Link to="/profile">
            <button className="p-2 bg-[#BEF264] text-[#1B213B] rounded-full">
              <FaRegUserCircle className="text-xl" />
            </button>
          </Link>
        
          <button onClick={handleFavoritesClick} className="p-2 bg-[#BEF264] text-[#1B213B] rounded-full">
            <FaHeart className="text-xl" />
          </button>
         
        </div>
      </header>

      <FavoritesModal 
        showModal={showFavoritesModal} 
        closeModal={closeModal} 
        favorites={favorites} 
        removeFavorite={handleRemoveFavorite}
      />

      <main className="flex flex-col sm:flex-row items-center mt-12 text-left px-4 w-full sm:justify-between">
        {/* search section */}
        <div className="flex flex-col items-start sm:w-1/2 space-y-4 pl-4 sm:pl-16">
          <h2 className="text-4xl font-bold leading-tight">Find <span className='text-[#BEF264]'>Hostels</span> and <span className='text-[#BEF264]'>PGs</span> which suit you.</h2>
          <p className="text-lg text-gray-400">Browse through hundreds of hostel/PG listings. Get started by selecting your preference below.</p>

          

          <button
          className="flex items-center justify-center p-3 bg-[#BEF264] text-[#1B213B] rounded-full w-40 font-bold"
          onClick={handleExploreClick}
          style={{
            animation: 'scaleUpDown 2s infinite'
          }}
        >
          <FaCompass className="mr-2 text-[#1B213B] text-lg" /> 
          Explore
          <style jsx>{`
            @keyframes scaleUpDown {
              0% {
                transform: scale(1);
              }
              50% {
                transform: scale(1.05);
              }
              100% {
                transform: scale(1);
              }
            }
          `}</style>
        </button>
        </div>
        {/* search section */}
        <div className="flex justify-center items-center sm:w-1/2 mt-8 sm:mt-0 sm:px-8 hidden sm:block">
          <img 
            src={houseImage} 
            alt="3D Rendering Cartoon House" 
            className="ml-6 w-auto h-auto rounded-s-full shadow-[0_0_15px_5px_rgba(190,242,100,0.3),0_0_30px_15px_rgba(190,242,100,0.2),0_0_60px_30px_rgba(190,242,100,0.1)]"
          />
        </div>
      </main>

      {/* New Section */}
      <section className="w-full  px-8 flex flex-col items-center">
        <div className="flex flex-col md:flex-row items-center md:justify-between w-full max-w-6xl">
          <div className="w-full md:w-1/3 flex justify-center mt-12 md:mt-0  ">
            <img 
              src={thumbsUpImage} 
              alt="Thumbs Up" 
              className="max-w-lg h-auto rounded-e-full mr-7 mb-8 shadow-[0_0_10px_2px_rgba(135,206,235,0.3),0_0_20px_10px_rgba(135,206,235,0.2),0_0_40px_20px_rgba(135,206,235,0.1)]"
            />
          </div>
          <div className="flex flex-col items-start w-full md:w-1/2 space-y-8">
            <div className="flex items-start space-x-4">
              <FaCheckCircle className="text-[#BEF264] text-3xl" />
              <div>
                <h3 className="text-2xl font-bold">Effortless Booking</h3>
                <p className="text-gray-400">This emphasizes the user-friendly interface, making booking a breeze for students who might be new to hostel stays.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <FaCheckCircle className="text-[#BEF264] text-3xl" />
              <div>
                <h3 className="text-2xl font-bold">Reliable Hostel Info</h3>
                <p className="text-gray-400">This highlights the fact that the data is frequently updated, ensuring students have access to the latest information on hostels, prices, and amenities.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <FaCheckCircle className="text-[#BEF264] text-3xl" />
              <div>
                <h3 className="text-2xl font-bold">Affordable Options</h3>
                <p className="text-gray-400">This point underlines that students can find cost-effective living arrangements without compromising on quality.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={exploreSectionRef} className="w-full px-8 flex flex-col items-center mt-12">
        <h2 className="pb-10 text-3xl font-bold text-[#BEF264] mb-11">
          <span className="text-white">EXPLORE WITH </span> STATES
        </h2>
        <div className={`grid gap-8 mb-36 w-full ${
          propertiesGroupedByState.length === 1 ? 'grid-cols-1' : 
          propertiesGroupedByState.length === 2 ? 'grid-cols-2' : 
          'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        }`}>
          {propertiesGroupedByState.map((group) => (
            <div
              key={group.state}
              onClick={() => handleStateClick(group.state)}
              className="p-6 bg-[#2C3554] rounded-lg shadow-lg cursor-pointer hover:bg-[#3E4C75] transform transition-all duration-300 hover:scale-105 flex flex-col items-center"
            >
              <div className="flex items-center mb-2">
                <FaMapMarkerAlt className="mr-2 text-[#BEF264]" />
                <h3 className="text-2xl font-semibold text-white">{group.state}</h3>
                <FaLocationArrow className="ml-2 text-[#ffffff]" />
              </div>
              <p className="text-gray-400 flex items-center uppercase">
                <FaHome className="mr-2 text-[#BEF264]" /> {group.totalProperties} Hostels
              </p>
            </div>
          ))}
        </div>
      </section>

      <section ref={exploreSectionRef} className="flex flex-col items-center mt-16 w-full px-8">
        <h2 className="pb-10 text-3xl font-bold text-[#BEF264] mb-11">
          <span className='text-white'>RECENTLY ADDED</span> PROPERTIES
        </h2>

          
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 w-full md:space-x-4 space-y-4 md:space-y-0 px-4">
            
          
            <div className="flex justify-center md:justify-start space-x-2 md:space-x-4">
                {['All', 'Gents', 'Ladies', 'Mixed'].map(category => (
                    <button
                        key={category}
                        className={`px-4 py-2 rounded-full font-bold transition-colors duration-300 ${selectedCategory === category ? 'bg-[#BEF264] text-[#1B213B]' : 'bg-[#2C3554] text-white hover:bg-[#1B213B]'}`}
                        onClick={() => handleCategoryFilter(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>
            
            {/* Search bar */}
            <div className="flex justify-center md:justify-end w-full md:w-auto relative">
        <input
            type="text"
            placeholder="Search by hostel name"
            value={searchTerm}
            onChange={handleSearch}
            className="px-10 py-2 w-full md:w-64 lg:w-80 rounded-full bg-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-[#BEF264] focus:bg-white transition-colors duration-300"
        />
        <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
    </div>
        </div>


      
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-6xl">
          {currentProperties.map(property => (
            <div key={property._id} className="bg-[#1E293B] rounded-xl shadow-lg hover:shadow-2xl transform transition-all duration-300 overflow-hidden">
              <Slider {...sliderSettings}>
                {property.hostelImages.map((image, index) => (
                  <div key={index}>
                    <img
                      src={image || 'https://via.placeholder.com/150'}
                      alt={property.hostelName}
                      className="w-full h-64 object-cover transition duration-300 transform hover:scale-105"
                    />
                  </div>
                ))}
              </Slider>
              <div className="p-6 bg-[#2E3A4E] flex flex-col justify-between" style={{ height: '250px' }}>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 truncate uppercase">{property.hostelName}</h3>
                  <span className='text-[#fed400] bg-gray-700 rounded-lg text-sm uppercase'>{property.category} Hostel</span>
                  <p className="text-gray-400 mb-2 truncate">{property.hostelLocation}</p>
                  <p className="text-white font-bold">RENT/month: <span className='text-[#fed400]'>₹</span>{property.rent}</p>
                  <p className="text-white font-bold">Deposit: <span className='text-[#fed400]'>₹</span>{property.deposite}</p>
                </div>
                <p className="text-[#BEF264] uppercase text-sm">Room Quantity: <span className='text-white'>{property.roomQuantity}</span></p>
                <Link to={`/propertyDetails/${property._id}`}>
                  <button className="w-full mt-4 font-bold bg-[#BEF264] text-black py-2 px-4 rounded-lg shadow-md transition duration-300 hover:bg-[#A0C1B8]">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <ReactPaginate
          previousLabel={
            <span className="flex items-center space-x-2">
              <FaArrowLeft />
              <span>Previous</span>
            </span>
          }
          nextLabel={
            <span className="flex items-center space-x-2">
              <span>Next</span>
              <FaArrowRight />
            </span>
          }
          breakLabel={'...'}
          pageCount={Math.ceil(filteredProperties.length / propertiesPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'flex justify-center mt-8 space-x-2'}
          activeClassName={'bg-black text-[#1B213B] font-bold'}
          pageClassName={'px-3 py-1 rounded-xl cursor-pointer hover:bg-[#3E4C75] transition'}
          previousClassName={'px-3 py-1 bg-[#3E4C75] rounded-full cursor-pointer hover:bg-[#2C3A5A] transition'}
          nextClassName={'px-3 py-1 bg-[#3E4C75] rounded-full cursor-pointer hover:bg-[#2C3A5A] transition'}
          breakClassName={'px-3 py-1'}
          pageLinkClassName={'text-white'}
          previousLinkClassName={'text-white'}
          nextLinkClassName={'text-white'}
          breakLinkClassName={'text-white'}
        />
      </section>

      <footer className="w-full bg-[#000000] p-4 flex justify-center items-center text-gray-400 mt-5">
        <p>© 2024 BROSTEL. All Rights Reserved.</p>
      </footer>

      <Toaster />
    </div>
  );
};

export default HomePage;
