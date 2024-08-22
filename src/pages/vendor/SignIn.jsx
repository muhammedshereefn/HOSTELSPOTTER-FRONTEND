// src/pages/vendor/SignIn.jsx
import vendorAxiosInstance from '../../api/vendor/axios';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const VendorSignIn = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('vendorToken');
    if (token) {
      navigate('/vendor/home');
    }
  }, [navigate]);

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const response = await vendorAxiosInstance.post('/vendors/signin', values);
      const { accessToken, refreshToken } = response.data;

      localStorage.setItem('vendorToken', accessToken);
      localStorage.setItem('vendorRefreshToken', refreshToken);
      navigate('/vendor/home', { state: { message: 'Successfully logged in!' } });
    } catch (error) {
      if (error.response) {
        if (error.response.status === 403) {
          // Vendor is blocked
          toast.error('Vendor is blocked');
        } else if (error.response.status === 401) {
          setFieldError('email', ''); // Clear any existing errors
          setFieldError('password', 'Invalid email or password');
          toast.error('Invalid email or password');
        } else {
          setFieldError('email', 'Unknown error occurred. Please try again.');
          toast.error('Unknown error occurred. Please try again.');
        }
      } else {
        setFieldError('email', 'Unknown error occurred. Please try again.');
        toast.error('Unknown error occurred. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#101820FF', minHeight: '100vh' }}>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex p-2">
        <div className="w-2/4 p-5">
          <Link to="/">
            <h5 className="text-[#F2AA4CFF] w-fit cursor-pointer md:pl-20 font-semibold text-2xl hover:text-[#a43434]">
              BROSTEL<span className="text-white">vendor</span>
            </h5>
          </Link>
        </div>
      </div>
      <div className="flex p-2 h-[80vh] sm:h-full align-middle justify-center">
        <div className="hidden my-auto mx-20 md:block sm:w-2/5 p-5 pb-14">
          <h2 className="text-white text-3xl font-medium">
            Sign In to{" "}
            <span className="text-[#F2AA4CFF] opacity-85">Vendor Portal</span>{" "}
          </h2>
          <p className="text-white opacity-85 text-sm mt-2">
            Sign in to manage your hostel and PG listings effortlessly. 🏠
          </p>
        </div>
        <div className="my-auto w-full sm:w-3/5 p-5">
          <div className="mt-1 sm:mx-auto sm:w-full sm:max-w-sm">
            <h1 className="text-2xl text-white font-medium text-center sm:text-start mb-20 sm:mb-0">
              Sign In
            </h1>
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={SignInSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-6 mt-7">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-[#F2AA4CFF]"
                    >
                      Your Email address
                    </label>
                    <div className="mt-2">
                      <Field
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="email : testVendor@gmail.com"
                        className="w-full placeholder:text-sm text-white bg-[#ffffff0f] border-1 border-slate-500 px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:border-blue-500"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-[#F2AA4CFF]"
                    >
                      Password
                    </label>
                    <div className="mt-2">
                      <Field
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        placeholder="Password : 111111"
                        className="w-full placeholder:text-sm text-white bg-[#ffffff0f] border-1 border-slate-500 px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:border-blue-500"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  </div>
                  <div className="pt-5">
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-[#F2AA4CFF] px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-hoverColor focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Signing in...' : 'Sign in'}
                    </button>
                  </div>
                  <div className="flex text-sm items-center justify-center">
                    <h1 className="text-white text-md mx-2">Don't have an account?</h1>
                    <Link to="/vendor/signUp">
                      <h1 className="text-md font-medium text-[#F2AA4CFF] cursor-pointer hover:text-[#8fb848]">
                        Signup
                      </h1>
                    </Link>
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

export default VendorSignIn;
