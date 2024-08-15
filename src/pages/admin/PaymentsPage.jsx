import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/admin/Sidebar';

const PaymentsPage = () => {
  console.log("PaymentsPage rendered");
  const [revenues, setRevenues] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 7;

  useEffect(() => {
    const fetchRevenues = async () => {
      try {
        const response = await axios.get('https://watch-vogue.shop/api/admin/revenues', {
          params: { page: currentPage, limit }
        });
        setRevenues(response.data.revenues);
        setTotalPages(Math.ceil(response.data.totalCount / limit));
      } catch (error) {
        console.error('Error fetching revenues:', error);
      }
    };

    fetchRevenues();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex h-screen bg-white text-black">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-2xl font-extrabold mb-6 text-black drop-shadow-lg">COMPANY REVENUE LIST</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-100 rounded-lg shadow-lg overflow-hidden">
            <thead className="bg-[#000000] text-white">
              <tr>
                <th className="py-4 px-6 text-left">ID</th>
                <th className="py-4 px-6 text-left">Amount</th>
                <th className="py-4 px-6 text-left">Type</th>
                <th className="py-4 px-6 text-left">Created At</th>
                <th className="py-4 px-6 text-left">Vendor Name</th> {/* Add this line */}
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {revenues.map((revenue, index) => (
                <tr key={revenue._id} className="border-b border-gray-400 hover:bg-gray-200 transition duration-200">
                  <td className="py-4 px-6">{index + 1}</td>
                  <td className="py-4 px-6">{revenue.amount}</td>
                  <td className="py-4 px-6">{revenue.type}</td>
                  <td className="py-4 px-6">{new Date(revenue.createdAt).toLocaleDateString()}</td>
                  <td className="py-4 px-6">{revenue.vendorName}</td> {/* Add this line */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-6">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`px-4 py-2 mx-1 ${currentPage === index + 1 ? 'bg-black text-white' : 'bg-gray-200 text-black'} rounded-lg`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default PaymentsPage;
