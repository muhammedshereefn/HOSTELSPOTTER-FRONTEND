



import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../features/user/userSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast,{Toaster} from "react-hot-toast";

// Validation schema using Yup
const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  contact: Yup.string().matches(/^[0-9]{10}$/, "Contact number must be 10 digits").required("Contact is required")
});

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  useEffect(()=>{
    if(error){
      toast.error(error.message || "User alredy exists")
    }
  },[error])

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await dispatch(signUp(values)).unwrap();
      localStorage.setItem('email', values.email);
      navigate('/otp');
    } catch (error) {
      console.error('Signup error:', error);
      setSubmitting(false);
    }
  };

  return (
    <>
    <Toaster/>
      <div className="flex p-2">
        <div className="w-2/4 p-5">
          <Link to='/'>
            <h5 className="text-[#ffffff] w-fit cursor-pointer md:pl-20 font-semibold text-2xl hover:text-[#8fb848]">
              BRO<span className="text-[#BEF264]">STEL</span>
            </h5>
          </Link>
        </div>
      </div>
      <div className="flex p-2 h-[80vh] sm:h-full align-middle justify-center">
        <div className="hidden my-auto mx-20 md:block sm:w-2/5 p-5 pb-14">
          <h2 className="text-white text-3xl font-medium">
            Sign Up to{" "}
            <span className="text-[#BEF264] opacity-85">findYourHostels</span>{" "}
          </h2>
          <p className="text-white opacity-85 text-sm mt-2">
            Sign up to our hostel and PG platform and explore accommodation options with ease. 🏠 Get hands-on experience in finding the perfect place without any hassle!
          </p>
          {/* <p className="text-white text-xs opacity-75 mt-3">
            Already have an account?{" "}
            <Link to='/Signin'>
              <span className="text-indigo-300 cursor-pointer hover:text-indigo-200">
                Sign in
              </span>
            </Link>
          </p> */}
        </div>
        <div className="my-auto w-full sm:w-3/5 p-5">
          <div className="mt-1 sm:mx-auto sm:w-full sm:max-w-sm">
            <h1 className="text-2xl text-white font-medium text-center sm:text-start mb-20 sm:mb-0">
              Register Now
            </h1>
            <Formik
              initialValues={{ name: '', email: '', password: '', contact: '' }}
              validationSchema={SignupSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-6 mt-7">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-white">Your Name</label>
                    <div className="mt-2">
                      <Field
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Enter Username"
                        className="w-full placeholder:text-sm text-white bg-[#ffffff0f] border-1 border-slate-500 px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:border-blue-500"
                      />
                      <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">Your Email address</label>
                    <div className="mt-2">
                      <Field
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="abc@gmail.com"
                        className="w-full placeholder:text-sm text-white bg-[#ffffff0f] border-1 border-slate-500 px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:border-blue-500"
                      />
                      <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                  </div>
                  <div className="flex">
                    <div className="mr-1">
                      <label htmlFor="contact" className="block text-sm font-medium leading-6 text-white">Your Mobile number</label>
                      <div className="mt-2">
                        <Field
                          id="contact"
                          name="contact"
                          type="text"
                          autoComplete="contact"
                          placeholder="+91"
                          className="w-full placeholder:text-sm text-white bg-[#ffffff0f] border-1 border-slate-500 px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:border-blue-500"
                        />
                        <ErrorMessage name="contact" component="div" className="text-red-500 text-sm mt-1" />
                      </div>
                    </div>
                    <div className="ml-1">
                      <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">Your Password</label>
                      <div className="mt-2">
                        <Field
                          id="password"
                          name="password"
                          type="password"
                          autoComplete="password"
                          placeholder="password"
                          className="w-full placeholder:text-sm text-white bg-[#ffffff0f] border-1 border-slate-500 px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:border-blue-500"
                        />
                        <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                      </div>
                    </div>
                  </div>
                  <div className="pt-5">
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-[#BEF264] px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-hoverColor focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      disabled={isSubmitting || loading}
                    >
                      {loading ? 'Sending OTP...' : 'Send OTP'}
                    </button>
                  </div>
                  <p className="text-white text-xs opacity-75 mt-3 pb-16">
            Already have an account?{" "}
            <Link to='/Signin'>
              <span className="text-indigo-300 cursor-pointer hover:text-indigo-200">
                Sign in
              </span>
            </Link>
          </p>
                  {/* {error && <p className="text-red-500">{error}</p>} */}
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;



//resonsne


// import { useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { signUp } from "../../features/user/userSlice";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import toast, { Toaster } from "react-hot-toast";

// // Validation schema using Yup
// const SignupSchema = Yup.object().shape({
//   name: Yup.string().required("Name is required"),
//   email: Yup.string().email("Invalid email address").required("Email is required"),
//   password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
//   contact: Yup.string().matches(/^[0-9]{10}$/, "Contact number must be 10 digits").required("Contact is required")
// });

// const Signup = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { loading, error } = useSelector((state) => state.user);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       navigate('/');
//     }
//   }, [navigate]);

//   useEffect(() => {
//     if (error) {
//       toast.error(error.message || "User already exists");
//     }
//   }, [error]);

//   const handleSubmit = async (values, { setSubmitting }) => {
//     try {
//       await dispatch(signUp(values)).unwrap();
//       localStorage.setItem('email', values.email);
//       navigate('/otp');
//     } catch (error) {
//       console.error('Signup error:', error);
//       setSubmitting(false);
//     }
//   };

//   return (
//     <>
//       <Toaster />
//       <div className="flex p-2">
//         <div className="w-2/4 p-5">
//           <Link to='/'>
//             <h5 className="text-[#ffffff] w-fit cursor-pointer md:pl-20 font-semibold text-2xl hover:text-[#8fb848]">
//               BRO<span className="text-[#BEF264]">stel</span>
//             </h5>
//           </Link>
//         </div>
//       </div>
//       <div className="flex p-2 h-[80vh] sm:h-full align-middle justify-center pl-16">
//         <div className="hidden md:flex flex-col items-start justify-center w-2/5 p-5">
//           <h2 className="text-white text-3xl font-medium mb-4">
//             Sign Up to{" "}
//             <span className="text-[#BEF264] opacity-85">findYourHostels</span>{" "}
//           </h2>
//           <p className="text-white opacity-85 text-sm">
//             Sign up to our hostel and PG platform and explore accommodation options with ease. 🏠 Get hands-on experience in finding the perfect place without any hassle!
//           </p>
//           <p className="text-white text-xs opacity-75 mt-3">
//             Already have an account?{" "}
//             <Link to='/Signin'>
//               <span className="text-indigo-300 cursor-pointer hover:text-indigo-200">
//                 Sign in
//               </span>
//             </Link>
//           </p>
//         </div>
//         <div className="my-auto w-full sm:w-3/5 p-5">
//           <div className="mt-1 sm:mx-auto sm:w-full sm:max-w-sm">
//             <h1 className="text-2xl text-white font-medium text-center sm:text-start mb-20 sm:mb-0">
//               Register Now
//             </h1>
//             <Formik
//               initialValues={{ name: '', email: '', password: '', contact: '' }}
//               validationSchema={SignupSchema}
//               onSubmit={handleSubmit}
//             >
//               {({ isSubmitting }) => (
//                 <Form className="space-y-6 mt-7">
//                   <div>
//                     <label htmlFor="name" className="block text-sm font-medium leading-6 text-white">Your Name</label>
//                     <div className="mt-2">
//                       <Field
//                         id="name"
//                         name="name"
//                         type="text"
//                         autoComplete="name"
//                         placeholder="Enter Username"
//                         className="w-full placeholder:text-sm text-white bg-[#ffffff0f] border border-slate-500 px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:border-blue-500"
//                       />
//                       <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
//                     </div>
//                   </div>
//                   <div>
//                     <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">Your Email address</label>
//                     <div className="mt-2">
//                       <Field
//                         id="email"
//                         name="email"
//                         type="email"
//                         autoComplete="email"
//                         placeholder="abc@gmail.com"
//                         className="w-full placeholder:text-sm text-white bg-[#ffffff0f] border border-slate-500 px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:border-blue-500"
//                       />
//                       <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
//                     </div>
//                   </div>
//                   <div className="flex flex-col sm:flex-row">
//                     <div className="sm:mr-1 mb-4 sm:mb-0">
//                       <label htmlFor="contact" className="block text-sm font-medium leading-6 text-white">Your Mobile number</label>
//                       <div className="mt-2">
//                         <Field
//                           id="contact"
//                           name="contact"
//                           type="text"
//                           autoComplete="contact"
//                           placeholder="+91"
//                           className="w-full placeholder:text-sm text-white bg-[#ffffff0f] border border-slate-500 px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:border-blue-500"
//                         />
//                         <ErrorMessage name="contact" component="div" className="text-red-500 text-sm mt-1" />
//                       </div>
//                     </div>
//                     <div className="sm:ml-1">
//                       <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">Your Password</label>
//                       <div className="mt-2">
//                         <Field
//                           id="password"
//                           name="password"
//                           type="password"
//                           autoComplete="password"
//                           placeholder="password"
//                           className="w-full placeholder:text-sm text-white bg-[#ffffff0f] border border-slate-500 px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:border-blue-500"
//                         />
//                         <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
//                       </div>
//                     </div>
//                   </div>
//                   <div className="pt-5">
//                     <button
//                       type="submit"
//                       className="flex w-full justify-center rounded-md bg-[#BEF264] px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-hoverColor focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                       disabled={isSubmitting || loading}
//                     >
//                       {loading ? 'Sending OTP...' : 'Send OTP'}
//                     </button>
//                   </div>
//                 </Form>
//               )}
//             </Formik>
//           </div>
//         </div>
//       </div>
//       {/* Mobile view sign-in link */}
//       <div className="text-center mt-4 md:hidden">
//         <p className="text-white text-xs opacity-75">
//           Already have an account?{" "}
//           <Link to='/Signin'>
//             <span className="text-indigo-300 cursor-pointer hover:text-indigo-200">
//               Sign in
//             </span>
//           </Link>
//         </p>
//       </div>
//     </>
//   );
// };

// export default Signup;

