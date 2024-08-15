import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import vendorAxiosInstance from '../../api/vendor/axios';
import toast, { Toaster } from 'react-hot-toast';

const VendorKycUpload = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [vendorId, setVendorId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('vendorToken');
    if (!token) {
      navigate('/vendor/signIn');
    } else {
      try {
        const decodedToken = parseJwt(token);
        setVendorId(decodedToken.vendorId);

        // Fetch vendor KYC status
        vendorAxiosInstance.get(`/vendors/${decodedToken.vendorId}`)
          .then(response => {
            if (response.data.kycImage) {
              navigate('/vendor/home'); 
            }
          })
          .catch(error => {
            console.error('Error fetching vendor details:', error);
          });
      } catch (error) {
        console.error('Error decoding token:', error);
        navigate('/vendor/signIn');
      }
    }
  }, [navigate]);

  const parseJwt = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      throw new Error('Invalid token');
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    toast.success('KYC document selected successfully');
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select a file');
      return;
    }

    if (!vendorId) {
      toast.error('Please add vendor ID');
      return;
    }

    const formData = new FormData();
    formData.append('kycDocument', selectedFile);
    formData.append('vendorId', vendorId);

    try {
      const response = await vendorAxiosInstance.post('/vendors/upload-kyc', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('vendorToken')}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        toast.success('KYC document uploaded successfully');
        navigate('/vendor/home');
      } else {
        toast.error('Failed to upload KYC document');
      }
    } catch (error) {
      toast.error('An error occurred while uploading KYC document');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="absolute top-0 left-0 p-5 w-full flex justify-between items-center">
        <Link to="/">
          <h5 className="text-[#F2AA4CFF] font-semibold text-3xl hover:text-[#8fb848]">
            BROSTEL<span className="text-white">vendor</span>
          </h5>
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center w-full max-w-md p-8 bg-gray-800 shadow-lg rounded-3xl">
        <h2 className="text-3xl font-semibold text-white mb-6">Upload Your <span className="text-[#F2AA4CFF]">KYC Document</span></h2>
        <p className="text-white mb-6 text-center">Please upload your KYC document to complete the verification process.</p>
        
        {/* Instructions */}
        <div className="w-full mb-6">
          <h3 className="text-lg font-semibold text-white mb-2">Upload Instructions:</h3>
          <ul className="text-sm text-gray-300">
            <li>Upload a quality image of your Adhar or PAN document.</li>
            <li>Ensure the file is below 5MB in size.</li>
            <li>Acceptable formats: .png, .jpg, .jpeg, .pdf</li>
          </ul>
        </div>

        <input 
          type="file" 
          id="kycDocument" 
          name="kycDocument" 
          accept=".png, .jpg, .jpeg, .pdf"
          onChange={handleFileChange}
          className="w-full py-2 px-3 mb-4 text-black rounded bg-gray-200 focus:outline-none focus:shadow-outline"
        />
        <button 
          onClick={handleFileUpload}
          className="w-full py-2 px-4 bg-[#F2AA4CFF] hover:bg-[#e39a3b] text-black font-bold rounded focus:outline-none focus:shadow-outline"
        >
          Upload
        </button>
        <p className="text-center text-white text-xs mt-6">
          &copy;2023 BROSTEL. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default VendorKycUpload;
