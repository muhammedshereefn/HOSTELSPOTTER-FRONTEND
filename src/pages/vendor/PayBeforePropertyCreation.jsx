// pages/PayBeforePropertyCreation.js
import { useNavigate } from 'react-router-dom';
import PayButton from '../../components/vendor/PayButton';
import { io } from 'socket.io-client';
import CustomAlert from '../../components/vendor/CustomAlert';
import { useEffect, useState } from 'react';



const PayBeforePropertyCreation = () => {
  const navigate = useNavigate();
  const [alert, setAlert] = useState({ message: '', type: '', visible: false });


  useEffect(()=>{
    
    const socket = io('http://localhost:5000');

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
  },[])
  const paymentInfo = `
    Start listing your property with us for just 49 INR! 

    Creating a property listing on our platform is an easy and affordable process. 
    Simply make a one-time payment of 49 INR to get started. 

    Once you've completed the payment, you'll gain access to our property creation page where you can provide all the necessary details about your property.

    We value your business and aim to provide a seamless experience. If you have any questions, our support team is here to help.
  `;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center relative">
            {alert.visible && (
        <CustomAlert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ ...alert, visible: false })}
        />
      )}
      {/* Yellowish blend light effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-yellow-500 to-transparent opacity-20 blur-lg pointer-events-none"></div>
      
      <header className="w-full p-4 flex justify-between items-center shadow-md px-8 sm:pl-14 bg-black">
        <h1 className="text-2xl font-bold text-white">
          <span className='text-gray-200'>BRO</span>STEL <span className='text-yellow-500 text-base'>pay</span>
        </h1>
        
        <button onClick={() => navigate(-1)} className="bg-gray-800 text-white py-2 px-4 rounded-lg shadow-md transition duration-300 hover:bg-gray-600">Back</button>
      </header>
      <main className="flex flex-col items-center mt-12 text-left px-4 w-full max-w-6xl">
        {/* <h2 className="text-4xl font-bold mb-6 text-white shadow-md">Pay Before Creating a Property Listing</h2> */}
        <div className="bg-gray-900 p-8 rounded-lg shadow-2xl w-full max-w-4xl transform transition duration-300 relative">
          {/* Inner yellowish blend light effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-yellow-500 to-transparent opacity-20 blur-lg rounded-lg pointer-events-none"></div>
          
          <p className="text-lg mb-4 whitespace-pre-wrap">{paymentInfo}</p>
          <PayButton />
        </div>
      </main>
    </div>
  );
};

export default PayBeforePropertyCreation;
