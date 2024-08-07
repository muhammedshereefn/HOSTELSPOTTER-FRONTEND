import { useEffect, useState } from 'react';
import { FaUserAlt, FaCube, FaMoneyBillWave, FaUsers } from 'react-icons/fa';
import Sidebar from '../../components/admin/Sidebar';
import axios from 'axios';
import 'tailwindcss/tailwind.css';
import { useNavigate } from 'react-router-dom';
import Chart from 'react-apexcharts';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    totalProperties: 0,
    totalVendors: 0,
    totalPremiumVendors: 0,
    totalPropertyRevenue: 0,
    totalSubscriptionRevenue: 0,
    monthlyPropertyRevenue: [],
    monthlySubscriptionRevenue: [],
    bookingCountsByState: []

  });

  const navigate = useNavigate();
  const adminToken = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!adminToken) {
      navigate('/admin/signin');
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get('https://watch-vogue.shop/api/admin/dashboard-counts', {
          headers: { Authorization: `Bearer ${adminToken}` }
        });
        setDashboardData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, [adminToken, navigate]);

  if (!adminToken) {
    return null;
  }
  
  const totalRevenue = dashboardData.totalSubscriptionRevenue + dashboardData.totalPropertyRevenue;

  const countsChartData = {
    series: [{
      name: 'Counts',
      data: [
        dashboardData.totalUsers,
        dashboardData.totalProperties,
        dashboardData.totalVendors,
        dashboardData.totalPremiumVendors,
      ],
    }],
    options: {
      chart: {
        type: 'bar',
        height: '100%',
      },
      plotOptions: {
        bar: {
          horizontal: false,
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: ['Total Users', 'Total Properties', 'Total Vendors', 'Total Premium Vendors'],
      },
      yaxis: {
        title: {
          text: 'Counts',
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val;
          },
        },
      },
    },
  };

  const revenueChartData = {
    series: [{
      name: 'Revenue',
      data: [
        dashboardData.totalSubscriptionRevenue,
        dashboardData.totalPropertyRevenue,
      ],
    }],
    options: {
      chart: {
        type: 'line',
        height: '100%',
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        categories: ['Subscription Revenue', 'Property Revenue'],
      },
      yaxis: {
        title: {
          text: 'Revenue (₹)',
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return `₹${val.toLocaleString()}`;
          },
        },
      },
    },
  };

  const monthlyRevenueChartData = {
    series: [
      {
        name: 'Property Revenue',
        data: dashboardData.monthlyPropertyRevenue.map(item => item.total),
      },
      {
        name: 'Subscription Revenue',
        data: dashboardData.monthlySubscriptionRevenue.map(item => item.total),
      },
    ],
    options: {
      chart: {
        type: 'line',
        height: '100%',
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        categories: dashboardData.monthlyPropertyRevenue.map(item => item.month),
      },
      yaxis: {
        title: {
          text: 'Revenue (₹)',
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return `₹${val.toLocaleString()}`;
          },
        },
      },
    },
  };

  const bookingCountsChartData = {
    series: [{
      name: 'Booking Counts',
      data: dashboardData.bookingCountsByState.map(item => item.totalBookings),
    }],
    options: {
      chart: {
        type: 'bar',
        height: '100%',
      },
      plotOptions: {
        bar: {
          horizontal: false,
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: dashboardData.bookingCountsByState.map(item => item.state),
      },
      yaxis: {
        title: {
          text: 'Booking Counts',
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val;
          },
        },
      },
    },
  };

  return (
    <div className="flex h-screen bg-white text-black">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-extrabold drop-shadow-lg">DASHBOARD</h2>
          <div className="flex items-center">
            <div className="mr-4">
              <span className="flag-icon flag-icon-in"></span>
            </div>
          </div>
        </header>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-gray-200 p-6 rounded-xl flex items-center justify-between shadow-2xl">
            <div>
              <h4 className="text-xl font-bold">Total Users</h4>
              <p className="text-4xl font-extrabold">{dashboardData.totalUsers}</p>
            </div>
            <FaUserAlt className="text-5xl text-gray-700" />
          </div>
          <div className="bg-gray-200 p-6 rounded-xl flex items-center justify-between shadow-2xl">
            <div>
              <h4 className="text-xl font-bold">Total Properties</h4>
              <p className="text-4xl font-extrabold">{dashboardData.totalProperties}</p>
            </div>
            <FaCube className="text-5xl text-gray-700" />
          </div>

          <div className="bg-gray-200 p-6 rounded-xl flex items-center justify-between shadow-2xl">
            <div>
              <h4 className="text-xl font-bold">Total Vendors</h4>
              <p className="text-4xl font-extrabold">{dashboardData.totalVendors}</p>
            </div>
            <FaUsers className="text-5xl text-gray-700" />
          </div>
          <div className="bg-gray-200 p-6 rounded-xl flex items-center justify-between shadow-2xl">
            <div>
              <h4 className="text-xl font-bold">Total Premium Vendors</h4>
              <p className="text-4xl font-extrabold">{dashboardData.totalPremiumVendors}</p>
            </div>
            <FaUsers className="text-5xl text-gray-700" />
          </div>
          <div className="bg-gray-200 p-6 rounded-xl flex items-center justify-between shadow-2xl">
            <div>
              <h4 className="text-xl font-bold">Subscription Revenue</h4>
              <p className="text-4xl font-extrabold">₹{dashboardData.totalSubscriptionRevenue.toLocaleString()}</p>
            </div>
            <FaMoneyBillWave className="text-5xl text-gray-700" />
          </div>
          <div className="bg-gray-200 p-6 rounded-xl flex items-center justify-between shadow-2xl">
            <div>
              <h4 className="text-xl font-bold">Property Revenue</h4>
              <p className="text-4xl font-extrabold">₹{dashboardData.totalPropertyRevenue.toLocaleString()}</p>
            </div>
            <FaMoneyBillWave className="text-5xl text-gray-700" />
          </div>
          <div className="bg-gray-200 w-96 p-6 pl- rounded-xl flex items-center justify-between shadow-2xl">
            <div>
              <h4 className="text-xl font-bold">Total Revenue</h4>
              <p className="text-4xl font-extrabold">₹{totalRevenue.toLocaleString()}</p>
            </div>
            <FaMoneyBillWave className="text-5xl text-gray-700" />
          </div>
        </section>
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
  <div className="bg-gray-200 p-6 rounded-xl shadow-2xl h-full">
    <h4 className="text-xl font-bold mb-4">Users and Vendors</h4>
    <div className="w-full h-96">
      <Chart options={countsChartData.options} series={countsChartData.series} type="bar" height="100%" />
    </div>
  </div>
  <div className="bg-gray-200 p-6 rounded-xl shadow-2xl h-full">
    <h4 className="text-xl font-bold mb-4">Booking Counts by State</h4>
    <div className="w-full h-96">
      <Chart options={bookingCountsChartData.options} series={bookingCountsChartData.series} type="bar" height="100%" />
    </div>
  </div>
</section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-200 p-6 rounded-xl shadow-2xl mb-6">
            <h4 className="text-xl font-bold mb-4">Revenue</h4>
            <div className="w-full h-96">
              <Chart options={revenueChartData.options} series={revenueChartData.series} type="line" height="100%" />
            </div>
          </div>
          <div className="bg-gray-200 p-6 rounded-xl shadow-2xl mb-6">
            <h4 className="text-xl font-bold mb-4">Monthly Revenue</h4>
            <div className="w-full h-96">
              <Chart options={monthlyRevenueChartData.options} series={monthlyRevenueChartData.series} type="line" height="100%" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
