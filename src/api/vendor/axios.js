import axios from 'axios';

// Function to refresh auth token
const refreshVendorAuthToken = async () => {
  console.log("Vendor token refresh initiated");

  const refreshToken = localStorage.getItem('vendorRefreshToken');

  try {
    const response = await axios.post('https://watch-vogue.shop/api/vendors/refresh-token', { refreshToken });
    const { accessToken, refreshToken: newRefreshToken } = response.data;

    console.log(accessToken, 'Vendor new access token');
    console.log(refreshToken, 'Vendor new refresh token');

    localStorage.setItem('vendorAccessToken', accessToken);
    localStorage.setItem('vendorRefreshToken', newRefreshToken);

    return accessToken;
  } catch (error) {
    console.error('Failed to refresh vendor token', error);
    localStorage.removeItem('vendorAccessToken');
    localStorage.removeItem('vendorRefreshToken');
    window.location.href = '/vendor/signin';
    throw error;
  }
};

// Create Axios instance
const vendorAxiosInstance = axios.create({
  baseURL: 'https://watch-vogue.shop/api',
  withCredentials: true, 
});

console.log("Vendor axios instance created");

// Request interceptor to add the access token to headers
vendorAxiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem('vendorAccessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh on 401 errors
vendorAxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshVendorAuthToken();
        axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return vendorAxiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('Vendor token refresh failed', refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default vendorAxiosInstance;
