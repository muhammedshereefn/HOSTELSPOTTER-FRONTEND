// import axios from 'axios';

// const axiosInstace = axios.create({
//     baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
// })

// export default axiosInstace;


import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api/users',
  withCredentials: true, // If you need to send cookies with your requests
});

export default axiosInstance;

