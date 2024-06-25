import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';

const SigninSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Signin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/home');
    }
  }, [navigate]);

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/signin', values);
      const { token } = response.data;

      localStorage.setItem('token', token);
      navigate('/home', { state: { message: 'Successfully logged in!' } });
    } catch (error) {
      if (error.response) {
        if (error.response.status === 403) {
          // User is blocked
          toast.error('User is blocked');
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
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex p-2">
        <div className="w-2/4 p-5">
          <Link to="/">
            <h5 className="text-[#ffffff] w-fit cursor-pointer md:pl-20 font-semibold text-2xl hover:text-[#8fb848]">
              BRO<span className="text-[#BEF264]">stel</span>
            </h5>
          </Link>
        </div>
      </div>
      <div className="flex p-2 h-[80vh] sm:h-full align-middle justify-center">
        <div className="hidden my-auto mx-20 md:block sm:w-2/5 p-5 pb-14">
          <h2 className="text-white text-3xl font-medium">
            Sign In to{" "}
            <span className="text-[#BEF264] opacity-85">findYourHostels</span>{" "}
          </h2>
          <p className="text-white opacity-85 text-sm mt-2">
            Sign in to our hostel and PG platform and manage your accommodation preferences effortlessly. 🏠
          </p>
        </div>
        <div className="my-auto w-full sm:w-3/5 p-5">
          <div className="mt-1 sm:mx-auto sm:w-full sm:max-w-sm">
            <h1 className="text-2xl text-white font-medium text-center sm:text-start mb-20 sm:mb-0">
              Sign In
            </h1>
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={SigninSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-6 mt-7">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      Your Email address
                    </label>
                    <div className="mt-2">
                      <Field
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="abc@gmail.com"
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
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      Password
                    </label>
                    <div className="mt-2">
                      <Field
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        placeholder="Password"
                        className="w-full placeholder:text-sm text-white bg-[#ffffff0f] border-1 border-slate-500 px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:border-blue-500"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    <div className="text-xs m-3 float-right">
                      <Link to="/forgot-password" className="text-sm text-green-500 hover:text-green-400">
                        Forgot Password?
                      </Link>
                    </div>
                  </div>
                  <div className="pt-5">
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-[#BEF264] px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-hoverColor focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Signing in...' : 'Sign in'}
                    </button>
                  </div>
                  <div className="text-white text-xs opacity-75 mt-3">
                    Don't have an account?{" "}
                    <Link to='/signUp'>
                      <span className="text-indigo-300 cursor-pointer hover:text-indigo-200">
                        Sign Up
                      </span>
                    </Link>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
