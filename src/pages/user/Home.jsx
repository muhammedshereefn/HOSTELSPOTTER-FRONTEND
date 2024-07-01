import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { FaRegUserCircle, FaRegComments, FaCheckCircle } from 'react-icons/fa';
import houseImage from '../../../public/vendor/3d-rendering-isometric-house (3).jpg'; // Update the path as necessary
import thumbsUpImage from '../../../public/vendor/3d-cartoon-portrait-person-practicing-law-profession.png'; // Update the path as necessary

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomePage = () => {

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

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/signin');
            return;
        }

        const checkBlockStatus = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users/check-block-status', {
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
                const response = await axios.get('http://localhost:5000/api/users/properties');
                setProperties(response.data);
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        };

        fetchProperties();
    }, [location.state, navigate, location.pathname]);

    return (
        <div className="min-h-screen text-white flex flex-col items-center">
            <header className="w-full p-4 flex justify-between items-center shadow-md px-8 sm:pl-14">
                <h1 className="text-2xl font-bold text-[#BEF264]"><span className='text-white'>BRO</span>STEL</h1>
                <div className="flex items-center space-x-4 sm:pr-16">
                    <button className="p-2 bg-[#BEF264] text-[#1B213B] rounded-full">
                        <FaRegComments className="text-xl" />
                    </button>
                    <button className="p-2 bg-[#BEF264] text-[#1B213B] rounded-full">
                        <FaRegUserCircle className="text-xl" />
                    </button>
                </div>
            </header>

            <main className="flex flex-col sm:flex-row items-center mt-12 text-left px-4 w-full sm:justify-between">
                <div className="flex flex-col items-start sm:w-1/2 space-y-4 pl-4 sm:pl-16">
                    <h2 className="text-4xl font-bold leading-tight">Find <span className='text-[#BEF264]'>Hostels</span> and <span className='text-[#BEF264]'>PGs</span> which suit you.</h2>
                    <p className="text-lg text-gray-400">Browse through hundreds of hostel/PG listings. Get started by selecting your preference below.</p>

                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full ">
                        <input
                            type="text"
                            placeholder="Eg: City, State, Landmark"
                            className="p-3 bg-[#2C3554] border border-[#3E4C75] rounded-lg w-full sm:w-72"
                        />
                        <select className="p-3 bg-[#2C3554] border border-[#3E4C75] rounded-lg w-full sm:w-48">
                            <option>Men</option>
                            <option>Women</option>
                            <option>Others</option>
                        </select>
                    </div>

                    <button className="p-3 bg-[#BEF264] text-[#1B213B] rounded-full w-40 font-bold">Explore</button>
                </div>

                <div className="flex justify-center items-center sm:w-1/2 mt-8 sm:mt-0 sm:px-8 hidden sm:block">
                    <img src={houseImage} alt="3D Rendering Cartoon House" className="rounded-s-full border-2 border-yellow-300 shadow-lg w-auto h-auto" />
                </div>
            </main>

            {/* New Section */}
            <section className="w-full  px-8 flex flex-col items-center">
                <div className="flex flex-col md:flex-row items-center md:justify-between w-full max-w-6xl">
                    <div className="w-full md:w-1/3 flex justify-center mt-12 md:mt-0 ">
                        <img src={thumbsUpImage} alt="Thumbs Up" className="w-full max-w-md h-auto" />
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

            {/* Properties Section */}
            <section className="w-full px-8 py-12 flex flex-col items-center">
    <h2 className="pb-10 text-3xl font-bold text-[#BEF264] mb-11 "><span className='text-white'>Available</span> Properties</h2>
    <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {properties.map(property => (
            <div key={property.id} className=" bg-[#2C3554] rounded-lg shadow-md overflow-hidden">
                <Slider {...sliderSettings}>
                    {property.hostelImages.map((image, index) => (
                        <div key={index}>
                            <img src={image} alt={property.hostelName} className="w-full h-64 object-cover transition duration-300 transform hover:scale-105" />
                        </div>
                    ))}
                </Slider>
                <div className="p-4">
                    <h3 className=" text-xl pt-5 font-bold text-[#ffffff] mb-2 uppercase underline">{property.hostelName}</h3>
                    <p className="text-gray-400 mb-2">{property.hostelLocation}</p>
                    <p className="text-[#ffffff] font-bold">RENT/month: <span className='text-[#BEF264]'>₹ </span>{property.rent}</p>
                    <p className="text-[#ffffff] font-bold">Deposit: <span className='text-[#BEF264]'>₹ </span>{property.deposite}</p>
                    
                    <p className="text-[#BEF264]">Room Quantity: <span className='text-white'>{property.roomQuantity}</span></p>
                    
                    <Link to={`/propertyDetails/${property._id}`}>
                                <button className="mt-4 bg-[#BEF264] text-[#000000] py-2 px-4 rounded-lg shadow-md transition duration-300 hover:bg-[#A0C1B8]">
                                    View Details
                                </button>
                            </Link>
                </div>
            </div>
        ))}
    </div>
</section>


            
            <Toaster />
        </div>
    );
};

export default HomePage;
