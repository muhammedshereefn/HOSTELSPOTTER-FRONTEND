import React, { useState, useEffect } from 'react';
import axios from 'axios';
import vendorAxiosInstance from '../../api/vendor/axios';

const AdminKycReview = () => {
  const [vendors, setVendors] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get('/api/vendor/all');
        setVendors(response.data);
      } catch (error) {
        setMessage('Failed to fetch vendors. Please try again.');
      }
    };
    fetchVendors();
  }, []);

  const handleKycStatusChange = async (vendorId, status) => {
    try {
      await vendorAxiosInstance.post('/api/vendor/kyc/status', { vendorId, kycStatus: status });
      setMessage(`KYC status updated to ${status}`);
      setVendors((prevVendors) =>
        prevVendors.map((vendor) =>
          vendor._id === vendorId ? { ...vendor, kycStatus: status } : vendor
        )
      );
    } catch (error) {
      setMessage('Failed to update KYC status. Please try again.');
    }
  };

  return (
    <div>
      <h2>Admin KYC Review</h2>
      {message && <p>{message}</p>}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>KYC Image</th>
            <th>KYC Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((vendor) => (
            <tr key={vendor._id}>
              <td>{vendor.name}</td>
              <td>{vendor.email}</td>
              <td>
                {vendor.kycImage ? (
                  <a href={`/uploads/${vendor.kycImage}`} target="_blank" rel="noopener noreferrer">
                    View Image
                  </a>
                ) : (
                  'No Image'
                )}
              </td>
              <td>{vendor.kycStatus}</td>
              <td>
                {vendor.kycStatus === 'pending' && (
                  <>
                    <button onClick={() => handleKycStatusChange(vendor._id, 'approved')}>Approve</button>
                    <button onClick={() => handleKycStatusChange(vendor._id, 'rejected')}>Reject</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminKycReview;
