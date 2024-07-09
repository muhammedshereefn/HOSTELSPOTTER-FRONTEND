import vendorAxiosInstance from '../../api/vendor/axios';
import { Navigate, useNavigate } from 'react-router-dom';

const SubscribeButton = () => {

    const navigate = useNavigate();

    const token = localStorage.getItem('vendorToken');
      if (!token) {
        Navigate('/vendor/signIn');
        return;
      }

    const handleSubscription = async () => {
        try {
            const response = await vendorAxiosInstance.post('/vendors/subscribe', {}, { headers: { Authorization: `Bearer ${token}` } });
            const { orderId, amount, currency } = response.data;

            const options = {
                key: import.meta.env.VITE_REACT_APP_RAZORPAY_KEY_ID,
                amount,
                currency,
                name: 'Vendor Subscription',
                description: 'Subscribe for 129 INR',
                order_id: orderId,
                handler: async (response) => {
                    const verifyResponse = await vendorAxiosInstance.post('/vendors/verify-subscription', response, { headers: { Authorization: `Bearer ${token}` } });
                    alert('Subscription successful');
                    navigate('/vendor/home')
                    
                },
                
                prefill: {
                    name: 'Vendor Name',
                    email: 'vendor@example.com',
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
            alert('Subscription failed');
        }
    };

    return <button onClick={handleSubscription} className="bg-gradient-to-r from-red-500 to-red-700 text-white py-3 px-6 rounded-full shadow-lg transition duration-300 hover:from-red-700 hover:to-red-500 transform hover:scale-105">Subscribe Now</button>;
};

export default SubscribeButton;
