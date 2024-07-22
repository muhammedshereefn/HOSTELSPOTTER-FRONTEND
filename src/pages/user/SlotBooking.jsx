import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axios';
import { FaBed } from 'react-icons/fa';


const SlotBooking = () => {
  const { propertyId, roomType, bedQuantity } = useParams();
  const [selectedBeds, setSelectedBeds] = useState([]);
  const navigate = useNavigate();

  const toggleBedSelection = (index) => {
    const newSelectedBeds = Array.from({ length: index + 1 }, (_, i) => i);
    setSelectedBeds(newSelectedBeds);
  };

  const handlePayment = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/signIn');
      return;
    }

    const amount = selectedBeds.length * 1000; 

    try {
      const orderResponse = await axiosInstance.post('/users/pay', { amount }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const { orderId, currency } = orderResponse.data;

      const options = {
        key: import.meta.env.VITE_REACT_APP_RAZORPAY_KEY_ID,
        amount: amount * 100, 
        currency,
        name: 'Slot Booking Payment',
        description: `Pay for ${selectedBeds.length} bed(s) in ${roomType}`,
        order_id: orderId,
        handler: async (response) => {
          const verifyResponse = await axiosInstance.post('/users/verify-payment', {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            propertyId,
            roomType,
            selectedBeds
          }, {
            headers: { Authorization: `Bearer ${token}` }
          });

          if (verifyResponse.status === 200) {
            navigate(`/propertyDetails/${propertyId}`, { state: { bookingSuccess: true } }); 
          }
        },
        prefill: {
          name: 'User Name',
          email: 'user@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#F37254',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error(error);
      alert('Payment failed');
    }
  };

  return (
    <div className="bg-[1E2530] text-white p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold mb-4">{roomType}</h2>
      <div className="mb-6 p-4 bg-gray-800 rounded-lg shadow-inner">
        <h3 className="text-xl font-semibold mb-2">Advance Booking <span className='text-red-400'>Instructions</span></h3>
        <p className="text-sm text-gray-300">
          Secure your preferred hostel bed by making an advance booking with a first month's rent of <strong>₹1000 per bed</strong>. This ensures that no one else can book your chosen bed. You can cancel your advance booking within <strong>1 hour</strong> to receive a full refund to your wallet. After 1 hour, the booking cannot be canceled.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {Array.from({ length: bedQuantity }, (_, index) => (
          <button
            key={index}
            onClick={() => toggleBedSelection(index)}
            className={`bg-gray-800 p-4 rounded-lg text-center ${
              selectedBeds.includes(index) ? 'bg-green-500' : 'bg-gray-600'
            }`}
          >
             <FaBed className="text-3xl" />
            <div className="text-lg">Bed {index + 1}</div>
          </button>
        ))}
      </div>
      <button
        onClick={handlePayment}
        className="bg-[#BEF264] font-bold text-black py-3 px-6 rounded-lg hover:bg-[#93c33f] focus:outline-none focus:ring-2  shadow-md"
      >
        Pay for Selected Beds
      </button>
    </div>
  );
};

export default SlotBooking;
