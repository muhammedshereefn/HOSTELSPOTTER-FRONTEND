import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const VendorKycUpload = () => {
  const { vendorId } = useParams(); 
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setMessage('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('kycImage', selectedFile);

    try {
      await axios.post(`http://localhost:5000/api/vendor/kyc/upload/${vendorId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('KYC image uploaded successfully. Your application has been sent to admin for approval.');
    } catch (error) {
      setMessage('Failed to upload KYC image. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-700 shadow-text">Upload KYC Image</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-2xl flex flex-col items-center">
        <input type="file" onChange={handleFileChange} className="mb-4" />
        <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded shadow-lg transform active:translate-y-1">
          Upload
        </button>
      </form>
      {message && <p className="mt-4 text-gray-600">{message}</p>}
    </div>
  );
};

export default VendorKycUpload;
