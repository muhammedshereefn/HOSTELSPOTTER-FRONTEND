// components/property/PayButton.js
import vendorAxiosInstance from '../../api/vendor/axios';
import { useNavigate } from 'react-router-dom';

const PayButton = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('vendorToken'); // Adjust the token key as per your requirement

  if (!token) {
    navigate('/vendor/signIn'); // Adjust the sign-in route as per your requirement
    return;
  }

  const handlePayment = async () => {
    try {
      const response = await vendorAxiosInstance.post('/vendors/pay', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const { orderId, amount, currency } = response.data;

      const options = {
        key: import.meta.env.VITE_REACT_APP_RAZORPAY_KEY_ID,
        amount,
        currency,
        name: 'Property Listing Payment',
        description: 'Pay 49 INR for listing property',
        order_id: orderId,
        handler: async (response) => {
          const verifyResponse = await vendorAxiosInstance.post('/vendors/verify-payment', response, {
            headers: { Authorization: `Bearer ${token}` }
          });
          alert('Payment successful');
          navigate('/vendor/addProperty'); // Adjust the route as per your requirement
        },
        prefill: {
          name: 'User Name', // Adjust the user information as per your requirement
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
    <button onClick={handlePayment} className="bg-yellow-500 text-black py-2 px-4 rounded-lg shadow-md transition duration-300 hover:bg-yellow-700">
      Pay Now
    </button>
  );
};

export default PayButton;
