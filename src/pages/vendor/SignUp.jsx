// // // src/pages/vendor/SignUp.jsx
// // import axios from 'axios';
// // import { Link, useNavigate } from 'react-router-dom';
// // import { Formik, Form, Field, ErrorMessage } from 'formik';
// // import * as Yup from 'yup';
// // import { useEffect } from 'react';
// // import toast, { Toaster } from 'react-hot-toast';

// // const SignUpSchema = Yup.object().shape({
// //   name: Yup.string().required('Name is required'),
// //   email: Yup.string()
// //     .email('Invalid email address')
// //     .required('Email is required'),
// //   password: Yup.string()
// //     .required('Password is required')
// //     .min(6, 'Password must be at least 6 characters long'),
// //   confirmPassword: Yup.string()
// //     .oneOf([Yup.ref('password'), null], 'Passwords must match')
// //     .required('Confirm password is required'),
// //   contact: Yup.string().required('Contact is required'),
// // });

// // const VendorSignUp = () => {
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const token = localStorage.getItem('vendorToken');
// //     if (token) {
// //       navigate('/vendor');
// //     }
// //   }, [navigate]);

// //   const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
// //     try {
// //       const response = await axios.post('http://localhost:5000/api/vendors/signup', values);
// //       navigate('/vendor/otp', { state: { email: values.email } });
// //     } catch (error) {
// //       if (error.response && error.response.status === 409) {
// //         setFieldError('email', 'Email is already registered');
// //         toast.error('Email is already registered');
// //       } else {
// //         setFieldError('email', 'Unknown error occurred. Please try again.');
// //         toast.error('Unknown error occurred. Please try again.');
// //       }
// //     } finally {
// //       setSubmitting(false);
// //     }
// //   };

// //   return (
// //     <div style={{ backgroundColor: '#101820FF', minHeight: '100vh' }}>
// //       <Toaster position="top-center" reverseOrder={false} />
// //       <div className="flex p-2">
// //         <div className="w-2/4 p-5">
// //           <Link to="/">
// //             <h5 className="text-[#F2AA4CFF] w-fit cursor-pointer md:pl-20 font-semibold text-2xl hover:text-[#8fb848]">
// //               BROSTEL<span className="text-white">vendor</span>
// //             </h5>
// //           </Link>
// //         </div>
// //       </div>
// //       <div className="flex p-2 h-[80vh] sm:h-full align-middle justify-center">
// //         <div className="hidden my-auto mx-20 md:block sm:w-2/5 p-5 pb-14">
// //           <h2 className="text-white text-3xl font-medium">
// //             Sign Up to{" "}
// //             <span className="text-[#F2AA4CFF] opacity-85">Vendor Portal</span>{" "}
// //           </h2>
// //           <p className="text-white opacity-85 text-sm mt-2">
// //             Create an account to manage your hostel and PG listings effortlessly. 🏠
// //           </p>
// //         </div>
// //         <div className="my-auto w-full sm:w-3/5 p-5">
// //           <div className="mt-1 sm:mx-auto sm:w-full sm:max-w-sm">
// //             <h1 className="text-2xl text-white font-medium text-center sm:text-start mb-20 sm:mb-0">
// //               Sign Up
// //             </h1>
// //             <Formik
// //               initialValues={{ name: '', email: '', password: '', confirmPassword: '', contact: '' }}
// //               validationSchema={SignUpSchema}
// //               onSubmit={handleSubmit}
// //             >
// //               {({ isSubmitting }) => (
// //                 <Form className="space-y-6 mt-7">
// //                   <div>
// //                     <label
// //                       htmlFor="name"
// //                       className="block text-sm font-medium leading-6 text-[#F2AA4CFF]"
// //                     >
// //                       Name
// //                     </label>
// //                     <div className="mt-2">
// //                       <Field
// //                         id="name"
// //                         name="name"
// //                         type="text"
// //                         placeholder="Your Name"
// //                         className="w-full placeholder:text-sm text-white bg-[#ffffff0f] border-1 border-slate-500 px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:border-blue-500"
// //                       />
// //                       <ErrorMessage
// //                         name="name"
// //                         component="div"
// //                         className="text-red-500 text-sm mt-1"
// //                       />
// //                     </div>
// //                   </div>
// //                   <div>
// //                     <label
// //                       htmlFor="email"
// //                       className="block text-sm font-medium leading-6 text-[#F2AA4CFF]"
// //                     >
// //                       Your Email address
// //                     </label>
// //                     <div className="mt-2">
// //                       <Field
// //                         id="email"
// //                         name="email"
// //                         type="email"
// //                         autoComplete="email"
// //                         placeholder="abc@gmail.com"
// //                         className="w-full placeholder:text-sm text-white bg-[#ffffff0f] border-1 border-slate-500 px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:border-blue-500"
// //                       />
// //                       <ErrorMessage
// //                         name="email"
// //                         component="div"
// //                         className="text-red-500 text-sm mt-1"
// //                       />
// //                     </div>
// //                   </div>
// //                   <div>
// //                     <label
// //                       htmlFor="password"
// //                       className="block text-sm font-medium leading-6 text-[#F2AA4CFF]"
// //                     >
// //                       Password
// //                     </label>
// //                     <div className="mt-2">
// //                       <Field
// //                         id="password"
// //                         name="password"
// //                         type="password"
// //                         autoComplete="current-password"
// //                         placeholder="Password"
// //                         className="w-full placeholder:text-sm text-white bg-[#ffffff0f] border-1 border-slate-500 px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:border-blue-500"
// //                       />
// //                       <ErrorMessage
// //                         name="password"
// //                         component="div"
// //                         className="text-red-500 text-sm mt-1"
// //                       />
// //                     </div>
// //                   </div>
// //                   <div>
// //                     <label
// //                       htmlFor="confirmPassword"
// //                       className="block text-sm font-medium leading-6 text-[#F2AA4CFF]"
// //                     >
// //                       Confirm Password
// //                     </label>
// //                     <div className="mt-2">
// //                       <Field
// //                         id="confirmPassword"
// //                         name="confirmPassword"
// //                         type="password"
// //                         placeholder="Confirm Password"
// //                         className="w-full placeholder:text-sm text-white bg-[#ffffff0f] border-1 border-slate-500 px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:border-blue-500"
// //                       />
// //                       <ErrorMessage
// //                         name="confirmPassword"
// //                         component="div"
// //                         className="text-red-500 text-sm mt-1"
// //                       />
// //                     </div>
// //                   </div>
// //                   <div>
// //                     <label
// //                       htmlFor="contact"
// //                       className="block text-sm font-medium leading-6 text-[#F2AA4CFF]"
// //                     >
// //                       Contact
// //                     </label>
// //                     <div className="mt-2">
// //                       <Field
// //                         id="contact"
// //                         name="contact"
// //                         type="text"
// //                         placeholder="Contact Number"
// //                         className="w-full placeholder:text-sm text-white bg-[#ffffff0f] border-1 border-slate-500 px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:border-blue-500"
// //                       />
// //                       <ErrorMessage
// //                         name="contact"
// //                         component="div"
// //                         className="text-red-500 text-sm mt-1"
// //                       />
// //                     </div>
// //                   </div>
// //                   <div className="pt-5">
// //                     <button
// //                       type="submit"
// //                       className="flex w-full justify-center rounded-md bg-[#F2AA4CFF] px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-hoverColor focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
// //                       disabled={isSubmitting}
// //                     >
// //                       {isSubmitting ? 'Signing up...' : 'Sign up'}
// //                     </button>
// //                   </div>
// //                   <div className="text-white text-xs opacity-75 mt-3">
// //                     Already have an account?{" "}
// //                     <Link to='/vendor/signIn'>
// //                       <span className="text-indigo-300 cursor-pointer hover:text-indigo-200">
// //                         Sign In
// //                       </span>
// //                     </Link>
// //                   </div>
// //                 </Form>
// //               )}
// //             </Formik>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default VendorSignUp;






// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { useEffect } from 'react';
// import toast, { Toaster } from 'react-hot-toast';

// const SignUpSchema = Yup.object().shape({
//   name: Yup.string().required('Name is required'),
//   email: Yup.string()
//     .email('Invalid email address')
//     .required('Email is required'),
//   password: Yup.string()
//     .required('Password is required')
//     .min(6, 'Password must be at least 6 characters long'),
//   confirmPassword: Yup.string()
//     .oneOf([Yup.ref('password'), null], 'Passwords must match')
//     .required('Confirm password is required'),
//   contact: Yup.string().required('Contact is required'),
// });

// const VendorSignUp = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('vendorToken');
//     if (token) {
//       navigate('/vendor/home');
//     }
//   }, [navigate]);

//   const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
//     try {
//       await axios.post('http://localhost:5000/api/vendors/signup', values);
//       navigate('/vendor/otp', { state: { email: values.email }, replace: true });
//     } catch (error) {
//       if (error.response && error.response.status === 409) {
//         setFieldError('email', 'Email is already registered');
//         toast.error('Email is already registered');
//       } else {
//         setFieldError('email', 'Unknown error occurred. Please try again.');
//         toast.error('Unknown error occurred. Please try again.');
//       }
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div style={{ backgroundColor: '#101820FF', minHeight: '100vh' }}>
//       <Toaster position="top-center" reverseOrder={false} />
//       <div className="flex p-2">
//         <div className="w-2/4 p-5">
//           <Link to="/">
//             <h5 className="text-[#F2AA4CFF] w-fit cursor-pointer md:pl-20 font-semibold text-2xl hover:text-[#8fb848]">
//               BROSTEL<span className="text-white">vendor</span>
//             </h5>
//           </Link>
//         </div>
//       </div>
//       <div className="flex p-2 h-[80vh] sm:h-full align-middle justify-center">
//         <div className="hidden my-auto mx-20 md:block sm:w-2/5 p-5 pb-14">
//           <h2 className="text-white text-3xl font-medium">
//             Sign Up to{" "}
//             <span className="text-[#F2AA4CFF] opacity-85">Vendor Portal</span>{" "}
//           </h2>
//           <p className="text-white opacity-85 text-sm mt-2">
//             Create an account to manage your hostel and PG listings effortlessly. 🏠
//           </p>
//         </div>
//         <div className="my-auto w-full sm:w-3/5 p-5">
//           <div className="mt-1 sm:mx-auto sm:w-full sm:max-w-sm">
//             <h1 className="text-2xl text-white font-medium text-center sm:text-start mb-20 sm:mb-0">
//               Sign Up
//             </h1>
//             <Formik
//               initialValues={{ name: '', email: '', password: '', confirmPassword: '', contact: '' }}
//               validationSchema={SignUpSchema}
//               onSubmit={handleSubmit}
//             >
//               {({ isSubmitting }) => (
//                 <Form className="space-y-6 mt-7">
//                   <div>
//                     <label
//                       htmlFor="name"
//                       className="block text-sm font-medium leading-6 text-[#F2AA4CFF]"
//                     >
//                       Name
//                     </label>
//                     <div className="mt-2">
//                       <Field
//                         id="name"
//                         name="name"
//                         type="text"
//                         placeholder="Your Name"
//                         className="w-full placeholder:text-sm text-white bg-[#ffffff0f] border-1 border-slate-500 px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:border-blue-500"
//                       />
//                       <ErrorMessage
//                         name="name"
//                         component="div"
//                         className="text-red-500 text-sm mt-1"
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <label
//                       htmlFor="email"
//                       className="block text-sm font-medium leading-6 text-[#F2AA4CFF]"
//                     >
//                       Your Email address
//                     </label>
//                     <div className="mt-2">
//                       <Field
//                         id="email"
//                         name="email"
//                         type="email"
//                         autoComplete="email"
//                         placeholder="abc@gmail.com"
//                         className="w-full placeholder:text-sm text-white bg-[#ffffff0f] border-1 border-slate-500 px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:border-blue-500"
//                       />
//                       <ErrorMessage
//                         name="email"
//                         component="div"
//                         className="text-red-500 text-sm mt-1"
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <label
//                       htmlFor="password"
//                       className="block text-sm font-medium leading-6 text-[#F2AA4CFF]"
//                     >
//                       Password
//                     </label>
//                     <div className="mt-2">
//                       <Field
//                         id="password"
//                         name="password"
//                         type="password"
//                         placeholder="******"
//                         className="w-full placeholder:text-sm text-white bg-[#ffffff0f] border-1 border-slate-500 px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:border-blue-500"
//                       />
//                       <ErrorMessage
//                         name="password"
//                         component="div"
//                         className="text-red-500 text-sm mt-1"
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <label
//                       htmlFor="confirmPassword"
//                       className="block text-sm font-medium leading-6 text-[#F2AA4CFF]"
//                     >
//                       Confirm Password
//                     </label>
//                     <div className="mt-2">
//                       <Field
//                         id="confirmPassword"
//                         name="confirmPassword"
//                         type="password"
//                         placeholder="******"
//                         className="w-full placeholder:text-sm text-white bg-[#ffffff0f] border-1 border-slate-500 px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:border-blue-500"
//                       />
//                       <ErrorMessage
//                         name="confirmPassword"
//                         component="div"
//                         className="text-red-500 text-sm mt-1"
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <label
//                       htmlFor="contact"
//                       className="block text-sm font-medium leading-6 text-[#F2AA4CFF]"
//                     >
//                       Contact
//                     </label>
//                     <div className="mt-2">
//                       <Field
//                         id="contact"
//                         name="contact"
//                         type="text"
//                         placeholder="Your Contact Number"
//                         className="w-full placeholder:text-sm text-white bg-[#ffffff0f] border-1 border-slate-500 px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:border-blue-500"
//                       />
//                       <ErrorMessage
//                         name="contact"
//                         component="div"
//                         className="text-red-500 text-sm mt-1"
//                       />
//                     </div>
//                   </div>
//                   <div className="pt-5">
//                     <button
//                       type="submit"
//                       className="flex w-full justify-center rounded-md bg-[#F2AA4CFF] px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-hoverColor focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                       disabled={isSubmitting}
//                     >
//                       {isSubmitting ? 'Signing up...' : 'Sign up'}
//                     </button>
//                   </div>
//                   <div className="flex text-sm items-center justify-center">
//                     <h1 className="text-white text-md mx-2">Already a Vendor?</h1>
//                     <Link to="/vendor/signIn">
//                       <h1 className="text-md font-medium text-[#F2AA4CFF] cursor-pointer hover:text-[#8fb848]">
//                         Signin
//                       </h1>
//                     </Link>
//                   </div>
//                 </Form>
//               )}
//             </Formik>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VendorSignUp;






import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const SignUpSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
  contact: Yup.string().required('Contact is required'),
});

const VendorSignUp = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('vendorToken');
    if (token) {
      navigate('/vendor/home');
    }
  }, [navigate]);

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      await axios.post('http://localhost:5000/api/vendors/signup', values);
      navigate('/vendor/otp', { state: { email: values.email }, replace: true });
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setFieldError('email', 'Email is already registered');
        toast.error('Email is already registered');
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
            <h5 className="text-[#F2AA4CFF] w-fit cursor-pointer md:pl-20 font-semibold text-2xl hover:text-[#8fb848]">
              BROSTEL<span className="text-white">vendor</span>
            </h5>
          </Link>
        </div>
      </div>
      <div className="flex p-2 h-[80vh] sm:h-full align-middle justify-center">
        <div className="hidden my-auto mx-20 md:block sm:w-2/5 p-5 pb-14">
          <h2 className="text-white text-3xl font-medium">
            Sign Up to{" "}
            <span className="text-[#F2AA4CFF] opacity-85">Vendor Portal</span>{" "}
          </h2>
          <p className="text-white opacity-85 text-sm mt-2">
            Create an account to manage your hostel and PG listings effortlessly.
          </p>
        </div>
        <div className="my-auto w-full sm:w-3/5 p-3">
          <div className="mt-1 sm:mx-auto sm:w-full sm:max-w-sm">
            <h1 className="text-2xl text-white font-medium text-center sm:text-start mb-20 sm:mb-0">
              Sign Up
            </h1>
            <Formik
              initialValues={{ name: '', email: '', password: '', confirmPassword: '', contact: '' }}
              validationSchema={SignUpSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-6 mt-7">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium leading-6 text-[#F2AA4CFF]"
                    >
                      Name
                    </label>
                    <div className="mt-2">
                      <Field
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Your Name"
                        className="w-full placeholder:text-sm text-white bg-[#ffffff0f] border-1 border-slate-500 px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:border-blue-500"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  </div>
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
                  <div className="flex space-x-4">
                    <div className="w-1/2">
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
                          placeholder="******"
                          className="w-full placeholder:text-sm text-white bg-[#ffffff0f] border-1 border-slate-500 px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:border-blue-500"
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                    </div>
                    <div className="w-1/2">
                      <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium leading-6 text-[#F2AA4CFF]"
                      >
                        Confirm Password
                      </label>
                      <div className="mt-2">
                        <Field
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          placeholder="******"
                          className="w-full placeholder:text-sm text-white bg-[#ffffff0f] border-1 border-slate-500 px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:border-blue-500"
                        />
                        <ErrorMessage
                          name="confirmPassword"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="contact"
                      className="block text-sm font-medium leading-6 text-[#F2AA4CFF]"
                    >
                      Contact
                    </label>
                    <div className="mt-2">
                      <Field
                        id="contact"
                        name="contact"
                        type="text"
                        placeholder="Your Contact Number"
                        className="w-full placeholder:text-sm text-white bg-[#ffffff0f] border-1 border-slate-500 px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:border-blue-500"
                      />
                      <ErrorMessage
                        name="contact"
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
                      {isSubmitting ? 'Signing up...' : 'Sign up'}
                    </button>
                  </div>
                  <div className="flex text-sm items-center justify-center">
                    <h1 className="text-white text-md mx-2">Already a Vendor?</h1>
                    <Link to="/vendor/signIn">
                      <h1 className="text-md font-medium text-[#F2AA4CFF] cursor-pointer hover:text-[#8fb848]">
                        Signin
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

export default VendorSignUp;
