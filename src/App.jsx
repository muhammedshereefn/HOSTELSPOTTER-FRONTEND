
// src/App.jsx
//
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
import VendorKycUpload from './pages/vendor/VendorKycUpload';
import VendorKYCApproval from './components/admin/VendorKYCApproval';
// import AddPropertyForm from './pages/vendor/PropertyListingForm';
import PropertyListingForm from './pages/vendor/PropertyListingForm';
import PropertyList from './pages/vendor/PropertyList';
import VendorProperties from './pages/admin/VendorProperties';
import PropertyDetailsPage from './pages/user/PropertyDetailsPage';
import EditProperty from './pages/vendor/EditProperty';
import SubscriptionLanding from './pages/vendor/SubscriptionLanding';
import VendorChatPage from './pages/vendor/VendorChat';
import PayBeforePropertyCreation from './pages/vendor/PayBeforePropertyCreation';
import ProfilePage from './pages/user/ProfilePage';
import SlotBooking from './pages/user/SlotBooking';
import BookingHistoryPage from './pages/user/BookingHistoryPage';
import BookingList from './pages/vendor/BookingList';
import UserBookingHistory from './pages/admin/UserBookingHistory';
import VendorProfile from './pages/vendor/VendorProfile';
import PropertiesByState from './pages/user/PropertiesByState';
import PaymentsPage from './pages/admin/PaymentsPage';
import NotFound from './pages/NotFound';
import UserChatPage from './pages/user/UserChatPage';



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
        <Route path="/propertyDetails/:id" element={<PropertyDetailsPage />} />
        <Route path="/slot-booking/:propertyId/:roomType/:bedQuantity" element={<SlotBooking />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/bookingHistory" element={<BookingHistoryPage />} />
        <Route path="/properties/:state" element={<PropertiesByState />} />
        <Route path="/chat" element={<UserChatPage />} />





        {/* VENDOR */}
        <Route path='/vendor/signIn' element={<VendorSignIn/>}/>
        <Route path='/vendor/signUp' element={<VendorSignUp/>}/>
        <Route path='/vendor/otp' element={<VendorOtp/>}/>
        <Route path='/vendor/kyc' element={<VendorKycUpload/>}/>
        <Route path='/vendor/home' element={<VendorHome/>}/>
        <Route path='/vendor/addProperty' element={<PropertyListingForm/>}/>
        <Route path='/vendor/propertiesList' element={<PropertyList/>}/>
        <Route path="/property/edit/:id" element={<EditProperty />} />
        <Route path="/vendor/subscription" element={<SubscriptionLanding />} />
        <Route path='/vendor/chat' element={<VendorChatPage/>}/>
        <Route path='/vendor/propertyPayment' element={<PayBeforePropertyCreation/>}/>
        <Route path='/property/:hostelName/bookings' element={<BookingList />} />
        <Route path="/vendor/profile" element={<VendorProfile />} />



        {/* ADMIN */}
        <Route path='/admin/signin' element={<AdminSignin/>}/>
        <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
        <Route path='/admin/userlist' element={<UserList/>}/>
        <Route path='/admin/vendorlist' element={<VendorsList/>}/>
        <Route path='/admin/kyc/:vendorId' element={<VendorKYCApproval/>}/>
        <Route path='/admin/vendor-properties/:vendorId' element={<VendorProperties/>}/>
        <Route path="/admin/user/:userId/booking-history" element={<UserBookingHistory />} />
        <Route path="/admin/payments" element={<PaymentsPage />} />


        <Route path="*" element={<NotFound />} />


      </Routes>
    </Router>
  );
};

export default App;
