import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SubscribeButton from '../../components/vendor/SubscribeButton';
import CustomAlert from '../../components/vendor/CustomAlert';
import { io } from 'socket.io-client';


const SubscriptionLanding = () => {
  const navigate = useNavigate();
  const [alert, setAlert] = useState({ message: '', type: '', visible: false });


  useEffect(() => {
    const checkPremiumStatus = async () => {
      try {
        const token = localStorage.getItem('vendorToken');
        if (!token) {
          navigate('/vendor/signIn');
          return;
        }

        const response = await fetch('https://watch-vogue.shop/api/vendors/check-block-status', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch premium status');
        }

        const data = await response.json();
        const { getPremium } = data;

        if (getPremium !== false) {
          navigate('/vendor/home'); 
        }
      } catch (error) {
        console.error('Error checking premium status:', error);
      }
    };

    checkPremiumStatus();

    const socket = io('https://watch-vogue.shop');

    socket.on('newBooking', ({ userName, bedQuantity, hostelName }) => {
      setAlert({
        message: `New Booking! ${userName} booked ${bedQuantity} beds in ${hostelName}`,
        type: 'success',
        visible: true,
      });   
        });

    socket.on('bookingCancelled', ({ userName, bedQuantity, hostelName }) => {
      setAlert({
        message: `Booking Cancelled! ${userName} cancelled ${bedQuantity} beds in ${hostelName}`,
        type: 'error',
        visible: true,
      });
 });

    return () => {
      socket.disconnect();
    };
  }, [navigate]);

  // Benefits of the subscription
  const benefits = [
    "Priority support",
    "Boost your property",
    "Enhanced visibility",
    "Advanced analytics",
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center relative">
      {/* Yellowish blend light effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-yellow-500 to-transparent opacity-20 blur-lg pointer-events-none"></div>
      
      <header className="w-full p-4 flex justify-between items-center shadow-md px-8 sm:pl-14 bg-black">
      {alert.visible && (
        <CustomAlert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ ...alert, visible: false })}
        />
      )}
        <h1 className="text-2xl font-bold text-white">
          <span className='text-gray-200'>BRO</span>STEL <span className='text-yellow-500 text-base'>premium</span>
        </h1>
        
        <button onClick={() => navigate(-1)} className="bg-gray-800 text-white py-2 px-4 rounded-lg shadow-md transition duration-300 hover:bg-gray-600">Back</button>
      </header>
      <main className="flex flex-col items-center mt-12 text-left px-4 w-full max-w-6xl">
        <h2 className="text-4xl font-bold mb-6 text-white shadow-md">Subscribe and Boost Your Business</h2>
        <div className="bg-gray-900 p-8 rounded-lg shadow-2xl w-full max-w-4xl transform transition duration-300 relative">
          {/* Inner yellowish blend light effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-yellow-500 to-transparent opacity-20 blur-lg rounded-lg pointer-events-none"></div>
          
          <p className="text-lg mb-4">Get the most out of our platform with a subscription. Enjoy premium features, priority support, and more.</p>
          <SubscribeButton />
          <span className='pl-3'>Starting from ₹129.00​</span>
          <h3 className="text-2xl font-bold mb-4 text-white mt-6">Benefits of Subscription</h3>
          <ul className="space-y-4">
            {benefits.map((benefit, index) => (
              <li key={index} className="bg-gray-700 p-4 rounded-lg shadow-md flex items-center space-x-3 hover:shadow-lg transition duration-300">
                <span className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-white py-1 px-3 rounded-full">{index + 1}</span>
                <span className="text-lg text-gray-300">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default SubscriptionLanding;
