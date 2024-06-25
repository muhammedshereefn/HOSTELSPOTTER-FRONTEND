
// src/App.jsx
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/user/Home';
import Signin from './pages/user/Signin';
import Signup from './pages/user/Signup';
import Otp from './pages/user/Otp';

import VendorSignIn from './pages/vendor/SignIn';
import VendorSignUp from './pages/vendor/SignUp';
import VendorOtp from './pages/vendor/Otp';
import VendorHome from './pages/vendor/VendorHome';
import AdminSignin from './pages/admin/AdminSignin';
import AdminDashboard from './pages/admin/AdminDashboard';

import UserList from './pages/admin/UserList';
import VendorsList from './pages/admin/VendorList';
import LandingPage from './pages/user/LandingPage';



const App = () => {
  // const token = localStorage.getItem('token');

  return (
    <Router>
      <Routes>
      <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signIn" element={<Signin />} />
        <Route path="/signUp" element={<Signup />} />
        <Route path="/otp" element={<Otp />} />


        {/* VENDOR */}
        <Route path='/vendor/signIn' element={<VendorSignIn/>}/>
        <Route path='/vendor/signUp' element={<VendorSignUp/>}/>
        <Route path='/vendor/otp' element={<VendorOtp/>}/>
        <Route path='/vendor/home' element={<VendorHome/>}/>


        {/* ADMIN */}
        <Route path='/admin/signin' element={<AdminSignin/>}/>
        <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
        <Route path='/admin/userlist' element={<UserList/>}/>
        <Route path='/admin/vendorlist' element={<VendorsList/>}/>


      </Routes>
    </Router>
  );
};

export default App;
