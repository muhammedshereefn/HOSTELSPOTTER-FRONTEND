import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axios';
import { FaBed } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from 'react-modal';
import { Toaster } from 'react-hot-toast';
import { toast } from 'react-hot-toast';


const SlotBooking = () => {
  const { propertyId, roomType, bedQuantity } = useParams();
  const [selectedDate, setSelectedDate] = useState(new Date()); 
  const [selectedBeds, setSelectedBeds] = useState([]);
  const [useWallet, setUseWallet] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const toggleBedSelection = (index) => {
    const newSelectedBeds = Array.from({ length: index + 1 }, (_, i) => i);
    setSelectedBeds(newSelectedBeds);
  };

  const handleWalletChange = () => {
    setIsModalOpen(true);  
  };

  const handleConfirmWallet = () => {
    setUseWallet(true);
    setIsModalOpen(false);  
  };

  const handleCancelWallet = () => {
    setUseWallet(false);
    setIsModalOpen(false); 
  };


  const handlePayment = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/signIn');
      return;
    }

    const amount = selectedBeds.length * 1000; 

    try {
      if (useWallet) {
        // Handle wallet payment
        const walletResponse = await axiosInstance.post('/users/pay-with-wallet', {
          amount,
          propertyId,
          roomType,
          selectedBeds,
          bookingDate: selectedDate
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (walletResponse.status === 200) {
          navigate(`/propertyDetails/${propertyId}`, { state: { bookingSuccess: true } });
        }
      } else {
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
              selectedBeds,
              bookingDate: selectedDate
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
      }
    } catch (error) {
      console.error(error);
      toast.error('Payment failed! Please choose your bed again.');;
    }
  };

  return (
    <div className="bg-[1E2530] text-white p-6 rounded-lg shadow-lg">
      
      <div className="mb-6 p-4 bg-gray-800 rounded-lg shadow-inner">
        <h3 className="text-xl font-semibold mb-2">Advance Booking <span className='text-red-400'>Instructions</span></h3>
        <p className="text-sm text-gray-300">
          Secure your preferred hostel bed by making an advance booking with a first month's rent of <strong>₹1000 per bed</strong>. This ensures that no one else can book your chosen bed. You can cancel your advance booking within <strong>1 hour</strong> to receive a full refund to your wallet. After 1 hour, the booking cannot be canceled.
        </p>
      </div>
      <Toaster position="top-right" reverseOrder={false} />

      <div className="mb-6 p-4 bg-gray-800 rounded-lg shadow-inner">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg uppercase font-semibold">{roomType}</h2>
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-1 bg-[#BEF264] text-[#1B213B] rounded-lg font-bold hover:bg-[#A0C1B8]"
            >
              Back
            </button>
          </div>
          <div className="flex items-center">
            <h3 className="text-md font-semibold mr-4 uppercase">Select Booking Date</h3>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              minDate={new Date()} 
              className="p-2 rounded-lg bg-gray-700 text-white"
            />
          </div>
        </div>
      </div>


      <div className="grid grid-cols-3 gap-4 mb-6">
        {Array.from({ length: bedQuantity }, (_, index) => (
          <button
            key={index}
            onClick={() => toggleBedSelection(index)}
            className={`bg-gray-800 p-3 rounded-lg text-center ${
              selectedBeds.includes(index) ? 'bg-green-500' : 'bg-gray-600'
            }`}
          >
             <FaBed className="text-3xl" />
            <div className="text-lg">Bed {index + 1}</div>
          </button>
        ))}
      </div>
      <div className="mb-6 flex items-center">
        <input
          type="checkbox"
          checked={useWallet}
          onChange={handleWalletChange}
          className="mr-2"
        />
        <label className="text-sm">Pay with Wallet</label>
      </div>
      <button
        onClick={handlePayment}
        className="bg-[#BEF264] uppercase text-sm font-bold text-black py-3 px-6 rounded-lg hover:bg-[#93c33f] focus:outline-none focus:ring-2 shadow-md"
      >
        {useWallet ? 'Pay with Wallet' : 'Pay with Razorpay'}
      </button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Confirm Wallet Payment"
        className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md mx-auto mt-20 text-white"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-2xl font-bold mb-4">Confirm Wallet Payment</h2>
        <p className="mb-4">Are you sure you want to pay with your wallet?</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleCancelWallet}
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmWallet}
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700"
          >
            Confirm
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default SlotBooking;
