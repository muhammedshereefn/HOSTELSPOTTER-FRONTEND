import React, { useState, useEffect } from 'react';
import vendorAxiosInstance from '../../api/vendor/axios';
import { toast } from 'react-hot-toast';

const PerformanceModal = ({ isOpen, onClose, vendorToken }) => {
  const [totalProperties, setTotalProperties] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);
  const [topBookedHostel, setTopBookedHostel] = useState({ name: '', count: 0 });
  const [worstBookedHostel, setWorstBookedHostel] = useState({ name: '', count: 0 });

  useEffect(() => {
    if (isOpen) {
      fetchProperties();
    }
  }, [isOpen]);

  const fetchProperties = async () => {
    try {
      const response = await vendorAxiosInstance.get('/vendors/propertiesList', {
        headers: {
          Authorization: `Bearer ${vendorToken}`,
        },
      });

      if (response.status === 200) {
        const properties = response.data;
        let revenue = 0;
        let totalBookingsCount = 0;
        let maxBookingCount = -1;
        let minBookingCount = Number.MAX_SAFE_INTEGER;
        let topBooked = {};
        let worstBooked = {};

        properties.forEach((property) => {
          const bookingCount = property.bookingCount || 0;
          totalBookingsCount += bookingCount;
          revenue += property.generatedIncome || 0;

          if (bookingCount > maxBookingCount) {
            maxBookingCount = bookingCount;
            topBooked = { name: property.hostelName, count: bookingCount };
          }

          if (bookingCount < minBookingCount) {
            minBookingCount = bookingCount;
            worstBooked = { name: property.hostelName, count: bookingCount };
          }
        });

        setTotalProperties(properties.length);
        setTotalRevenue(revenue);
        setTotalBookings(totalBookingsCount);
        setTopBookedHostel(topBooked);
        setWorstBookedHostel(worstBooked);
      } else {
        toast.error('Failed to fetch properties');
      }
    } catch (error) {
      console.error('Error fetching properties:', error);
      toast.error('An error occurred while fetching properties');
    }
  };

  return (
    isOpen ? (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-black bg-opacity-50 fixed inset-0"></div>
        <div className="bg-white rounded-lg shadow-lg z-10 p-8 max-w-md w-full mx-4">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Vendor Performance</h2>
          <div className="space-y-4">
            <div className="bg-gray-100 rounded-lg p-4 shadow-sm flex justify-between items-center">
              <span className="text-lg font-medium text-gray-700">Total Properties</span>
              <span className="text-2xl font-semibold text-blue-600">{totalProperties}</span>
            </div>
            <div className="bg-gray-100 rounded-lg p-4 shadow-sm flex justify-between items-center">
              <span className="text-lg font-medium text-gray-700">Total Revenue Generated</span>
              <span className="text-2xl font-semibold text-green-600">₹{totalRevenue}</span>
            </div>
            <div className="bg-gray-100 rounded-lg p-4 shadow-sm flex justify-between items-center">
              <span className="text-lg font-medium text-gray-700">Total Bookings</span>
              <span className="text-2xl font-semibold text-purple-600">{totalBookings}</span>
            </div>
            <div className="bg-gray-100 rounded-lg p-4 shadow-sm flex justify-between items-center">
              <span className="text-lg font-medium text-gray-700">Top Booked Hostel</span>
              <span className="text-xl font-semibold text-blue-600">{topBookedHostel.name} ({topBookedHostel.count})</span>
            </div>
            <div className="bg-gray-100 rounded-lg p-4 shadow-sm flex justify-between items-center">
              <span className="text-lg font-medium text-gray-700">Worst Booked Hostel</span>
              <span className="text-xl font-semibold text-red-600">{worstBookedHostel.name} ({worstBookedHostel.count})</span>
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    ) : null
  );
};

export default PerformanceModal;
