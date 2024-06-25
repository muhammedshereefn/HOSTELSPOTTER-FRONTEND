import { useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';

const ForgotPassword = ({ setEmailSubmitted }) => {
  const [email, setEmail] = useState('');

  const handleSendOTP = async () => {
    try {
      await axios.post('http://localhost:5000/api/users/send-otp', { email });
      toast.success('OTP sent to your email.');
      setEmailSubmitted(true);
    } catch (error) {
      toast.error('Failed to send OTP. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <Toaster position="top-center" />
      <div className="max-w-md w-full p-8 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Forgot Password</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mt-1 px-3 py-2 text-white bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        <button
          onClick={handleSendOTP}
          className="w-full mt-4 px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Send OTP
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
