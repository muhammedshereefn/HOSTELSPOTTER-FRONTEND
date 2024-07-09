import { useEffect, useRef } from 'react';
import vendorAxiosInstance from '../../api/vendor/axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';

const OtpSchema = Yup.object().shape({
  otp: Yup.string().required('OTP is required'),
});

const VendorOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const otpInputRef = useRef(null); 

  useEffect(() => {
    const token = localStorage.getItem('vendorToken');
    if (token) {
      navigate('/vendor/kyc');
    }
  }, [navigate]);

  useEffect(() => {
    // Set focus on the OTP input field when the component mounts
    if (otpInputRef.current) {
      otpInputRef.current.focus();
    }
  }, []);

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const response = await vendorAxiosInstance.post('/vendors/verify-otp', {
        email,
        otp: values.otp,
      });
      
      const { accessToken, refreshToken } = response.data;
      localStorage.setItem('vendorToken', accessToken);
      localStorage.setItem('vendorRefreshToken', refreshToken);      navigate('/vendor/kyc', { replace: true });
    } catch (error) {
      setFieldError('otp', 'Invalid OTP');
      toast.error('Invalid OTP');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#101820FF', minHeight: '100vh' }}>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex p-2 h-full align-middle justify-center items-center">
        <div className="w-full sm:w-3/5 md:w-1/3 p-5">
          <div className="bg-[#202020] rounded-lg shadow-lg p-8">
            <h1 className="text-2xl text-white font-medium text-center mb-8">
              Verify OTP
            </h1>
            <Formik
              initialValues={{ otp: '' }}
              validationSchema={OtpSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-6">
                  <div>
                    <label
                      htmlFor="otp"
                      className="block text-sm font-medium leading-6 text-[#F2AA4CFF]"
                    >
                      OTP
                    </label>
                    <div className="mt-2">
                      <Field
                        innerRef={otpInputRef} // Set the reference to the Field component
                        id="otp"
                        name="otp"
                        type="text"
                        placeholder="Enter OTP"
                        className="w-full placeholder:text-sm text-white bg-[#ffffff0f] border border-slate-500 px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:border-blue-500"
                      />
                      <ErrorMessage
                        name="otp"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-[#F2AA4CFF] px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-hoverColor focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Verifying...' : 'Verify OTP'}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorOtp;
