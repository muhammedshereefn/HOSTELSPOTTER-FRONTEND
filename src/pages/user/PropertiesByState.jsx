import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axios';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight, FaChevronDown, FaHistory, FaRegUserCircle, FaSearch } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';

const PropertiesByState = () => {
  const { state } = useParams();
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [minRent, setMinRent] = useState('');
  const [maxRent, setMaxRent] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [isOpen, setIsOpen] = useState(false); 
  const [currentPage, setCurrentPage] = useState(0);
  const propertiesPerPage = 16;

  const facilitiesList = ['Wi-Fi','Cleaning Staff','Study Table','CCTV','Play Ground', 'Laundry','AC', 'Cafeteria', 'Parking', 'Gym', 'Security', 'Power Backup'];

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axiosInstance.get(`/users/properties/by-state/${state}`);
        setProperties(response.data);
        setFilteredProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, [state]);

  useEffect(() => {
    let filtered = properties;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(property => property.category === selectedCategory);
    }

    if (minRent !== '' && maxRent !== '') {
      filtered = filtered.filter(property => property.rent >= minRent && property.rent <= maxRent);
    }

    if (searchTerm !== '') {
      filtered = filtered.filter(property =>
        property.hostelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedFacilities.length > 0) {
      filtered = filtered.filter(property =>
        selectedFacilities.every(facility => property.facilities.includes(facility))
      );
    }

    setFilteredProperties(filtered);
  }, [selectedCategory, minRent, maxRent, searchTerm, selectedFacilities, properties]);

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleCheckboxChange = (facility) => {
    setSelectedFacilities(prevFacilities =>
      prevFacilities.includes(facility)
        ? prevFacilities.filter(f => f !== facility)
        : [...prevFacilities, facility]
    );
  };

  const offset = currentPage * propertiesPerPage;
  const currentProperties = filteredProperties.slice(offset, offset + propertiesPerPage);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className="min-h-screen text-white flex flex-col items-center bg-[#1E2530]">
      <header className="w-full p-4 flex justify-between items-center shadow-md bg-gray-800">
        <h1 className="text-2xl font-bold text-[#BEF264]"><span className='text-white'>BRO</span>STEL</h1>
        <div className="flex items-center space-x-4">
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
        </div>
      </header>

      <section className="w-full px-8 py-12 flex flex-col items-center">
        <div className="w-full max-w-6xl mb-8 flex justify-between items-center">
          <h2 className="text-3xl font-bold uppercase text-[#BEF264]">
            <span className='text-white'>Available Properties</span> {state}
          </h2>
          <button
            className="hidden md:block px-4 py-2 bg-[#BEF264] text-[#1B213B] rounded-lg font-bold hover:bg-[#A0C1B8]"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>

        <div className="bg-gray-600 rounded-2xl p-4 mb-8">
  <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 items-center">
    {/* Facility Filter */}
    <div className="relative w-full md:w-auto">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center px-4 py-2 rounded-lg bg-[#2C3554] text-white w-full"
      >
        <FaChevronDown className="mr-2" />
        Filter Facilities
      </button>
      {isOpen && (
        <div className="absolute mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
          {facilitiesList.map((facility, index) => (
            <label key={index} className="block px-4 py-2 text-black hover:bg-gray-200">
              <input
                type="checkbox"
                className="mr-2"
                checked={selectedFacilities.includes(facility)}
                onChange={() => handleCheckboxChange(facility)}
              />
              {facility}
            </label>
          ))}
        </div>
      )}
    </div>

    {/* Category Filter Buttons */}
    <div className="flex flex-wrap justify-center space-x-2 w-full md:w-auto">
      {['All', 'Gents', 'Ladies', 'Mixed'].map((category) => (
        <button
          key={category}
          className={`px-4 py-2 mt-2 rounded-lg font-bold w-full md:w-auto ${selectedCategory === category ? 'bg-[#BEF264] text-[#1B213B]' : 'bg-[#2C3554] text-white'}`}
          onClick={() => handleCategoryFilter(category)}
        >
          {category}
        </button>
      ))}
    </div>

    {/* Rent Price Range Filter */}
    <div className="flex flex-wrap justify-center space-x-2 w-full md:w-auto">
      <input
        type="text"
        placeholder="₹ Min Rent"
        value={minRent}
        onChange={(e) => setMinRent(e.target.value)}
        className="px-4 py-2 mt-2 rounded-lg bg-[#2C3554] text-white text-center w-full md:w-40"
      />
      <input
        type="text"
        placeholder="₹ Max Rent"
        value={maxRent}
        onChange={(e) => setMaxRent(e.target.value)}
        className="px-4 py-2 mt-2 rounded-lg bg-[#2C3554] text-white text-center w-full md:w-40"
      />
    </div>

    {/* Search Filter */}
    <div className="relative flex items-center justify-center w-full md:w-auto">
      <FaSearch className="absolute left-3 text-white" />
      <input
        type="text"
        placeholder="Name, City or District"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-10 pr-4 py-2 rounded-full bg-[#2C3554] text-white text-center w-full md:w-80"
      />
    </div>
  </div>
</div>


        {/* Property Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-6xl">
          {currentProperties.map(property => (
            <div key={property._id} className="bg-[#1E293B] rounded-xl shadow-lg hover:shadow-2xl transform transition-all duration-300 overflow-hidden">
              <Slider {...sliderSettings}>
                {property.hostelImages.map((image, index) => (
                  <div key={index}>
                    <img src={image} alt={property.hostelName} className="w-full h-64 object-cover transition duration-300 transform hover:scale-105" />
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

        {/* Pagination */}
        <ReactPaginate
          previousLabel={
            <span className="flex items-center space-x-2">
              <FaArrowLeft />
              <span >Previous</span>
            </span>
          }
          nextLabel={
            <span className="flex items-center space-x-2">
              <span className='text-gray-300'>Next</span>
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
    </div>
  );
};

export default PropertiesByState;
