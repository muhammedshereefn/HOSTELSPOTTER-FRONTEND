


import axios from 'axios';

// Function to refresh auth token
const refreshAuthToken = async () => {

  console.log("ethi");

  const refreshToken = localStorage.getItem('refreshToken');

  try {
    const response = await axios.post('http://localhost:5000/api/users/refresh-token', { refreshToken });
    const { accessToken, refreshToken: newRefreshToken } = response.data;




    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', newRefreshToken);

    return accessToken;
  } catch (error) {
    console.error('Failed to refresh token', error);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/signin';
    throw error;
  }
};

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true, 
});


// Request interceptor to add the access token to headers
axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh on 401 errors
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshAuthToken();
        axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed', refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);


export default axiosInstance;
