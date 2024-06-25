
// import { useState, useRef, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from '../../api/axios'; // Axios instance

// const Otp = () => {
//   const [inputs, setInputs] = useState(Array(6).fill(''));
//   const [timer, setTimer] = useState(60); // 1-minute timer
//   const [canResend, setCanResend] = useState(false);
//   const [inputDisabled, setInputDisabled] = useState(false); 
//   const inputRefs = useRef([]);
//   const navigate = useNavigate();


//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       navigate('/');
//     }
//   }, [])

//   useEffect(() => {
//     startTimer();
//   }, []);



//   const startTimer = () => {
//     setInputDisabled(false)
//     const countdown = setInterval(() => {
//       setTimer((prevTimer) => {
//         if (prevTimer > 1) return prevTimer - 1;
//         clearInterval(countdown);
//         setCanResend(true);
//         setInputDisabled(true)
//         return 0;
//       });
//     }, 1000);
//   };

//   const handleInput = (e, index) => {
//     const { value } = e.target;
//     if (value) {
//       if (index < inputs.length - 1) {
//         inputRefs.current[index + 1].focus();
//       }
//     }
//     setInputs((prevInputs) => {
//       const newInputs = [...prevInputs];
//       newInputs[index] = value;
//       return newInputs;
//     });
//   };

//   const handleKeyDown = (e, index) => {
//     if (e.key === 'Delete' || e.key === 'Backspace') {
//       if (index > 0 || (index === 0 && inputs[0] !== '')) {
//         inputRefs.current[index === 0 ? index : index - 1].focus();
//         setInputs((prevInputs) => {
//           const newInputs = [...prevInputs];
//           newInputs[index] = '';
//           return newInputs;
//         });
//       }
//     }
//   };

//   const handleResendOtp = async () => {
//     const email = localStorage.getItem('email'); 
//     try {
//       const response = await axios.post('http://localhost:5000/api/users/resend-otp', { email });
//       console.log(response.data);
//       setInputs(Array(6).fill('')); // Clear the input fields
//       setTimer(60); // Reset the timer
//       setCanResend(false); // Disable the "Resend OTP" button
//       inputRefs.current[0].focus(); // Focus the first input
//       startTimer(); // Restart the timer
//     } catch (error) {
//       console.error('Error resending OTP:', error);
//     }
//   };

//   const handleOtpVerification = async () => {
//     const otp = inputs.join('');
//     try {
//       const response = await axios.post('http://localhost:5000/api/users/verify-otp', {
//         email: localStorage.getItem('email'),
//         otp
//       });
//       if (response.status === 200) {
//         navigate('/signin');
//       }
//     } catch (error) {
//       console.error('OTP verification error:', error);
//     }
//   };

//   return (
//     <div className='max-w-md sm:mx-auto text-center mt-[27vh] sm:mt-[20vh] sm:bg-slate-600 sm:bg-opacity-15 mx-2 px-4 sm:px-8 py-10 rounded-xl shadow'>
//       <header className="mb-8">
//         <h1 className="text-2xl font-bold mb-1 text-slate-200">Email OTP Verification</h1>
//         <p className="text-[15px] text-slate-400">Enter the 6-digit verification code that was sent to your Email ID</p>
//       </header>
//       <form id="otp-form">
//         <div className='flex items-center justify-center gap-3'>
//           {inputs.map((value, index) => (
//             <input
//               className="w-11 h-10 sm:w-14 sm:h-14 text-center text-sm sm:text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
//               key={index}
//               type="text"
//               value={value}
//               onChange={(e) => handleInput(e, index)}
//               onKeyDown={(e) => handleKeyDown(e, index)}
//               ref={(ref) => {
//                 inputRefs.current[index] = ref;
//               }}
//               maxLength={1}
//               disabled={inputDisabled} // Disable input fields based on state
//             />
//           ))}
//         </div>
//         <div className="max-w-[260px] mx-auto mt-4">
//           <button
//             type="button"
//             onClick={handleOtpVerification}
//             className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-[#BEF264] px-3.5 py-2.5 text-sm font-medium text-black shadow-sm shadow-indigo-950/10 hover:bg-hoverColor focus:outline-none focus:ring focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
//           >
//             Verify Account
//           </button>
//         </div>
//         <div className="countdown-text mt-5">
//           {/* <p className='text-xs text-slate-400'>
//             Time Remaining: {timer < 10 ? `0:0${timer}` : `0:${timer}`}
//           </p> */}
//            <p className="text-sm text-slate-300">Didn't receive the code?</p>
//           <button
//             type="button"
//             onClick={handleResendOtp}
//             disabled={!canResend}
//             style={{ color: canResend ? 'blue' : 'grey' }}
//           >
    
//             Resend OTP
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Otp;












import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios'; // Axios instance
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Otp = () => {
  const [inputs, setInputs] = useState(Array(6).fill(''));
  const [timer, setTimer] = useState(60); // 1-minute timer
  const [canResend, setCanResend] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(false); 
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, [])

  useEffect(() => {
    startTimer();
  }, []);

  const startTimer = () => {
    setInputDisabled(false);
    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 1) return prevTimer - 1;
        clearInterval(countdown);
        setCanResend(true);
        setInputDisabled(true);
        return 0;
      });
    }, 1000);
  };

  const handleInput = (e, index) => {
    const { value } = e.target;
    if (value) {
      if (index < inputs.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
    setInputs((prevInputs) => {
      const newInputs = [...prevInputs];
      newInputs[index] = value;
      return newInputs;
    });
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Delete' || e.key === 'Backspace') {
      if (index > 0 || (index === 0 && inputs[0] !== '')) {
        inputRefs.current[index === 0 ? index : index - 1].focus();
        setInputs((prevInputs) => {
          const newInputs = [...prevInputs];
          newInputs[index] = '';
          return newInputs;
        });
      }
    }
  };

  const handleResendOtp = async () => {
    const email = localStorage.getItem('email'); 
    try {
      const response = await axios.post('http://localhost:5000/api/users/resend-otp', { email });
      console.log(response.data);
      setInputs(Array(6).fill('')); // Clear the input fields
      setTimer(60); // Reset the timer
      setCanResend(false); // Disable the "Resend OTP" button
      inputRefs.current[0].focus(); // Focus the first input
      startTimer(); // Restart the timer
      toast.success('OTP resent successfully');
    } catch (error) {
      console.error('Error resending OTP:', error);
      toast.error('Failed to resend OTP. Please try again.');
    }
  };

  const handleOtpVerification = async () => {
    const otp = inputs.join('');
    try {
      const response = await axios.post('http://localhost:5000/api/users/verify-otp', {
        email: localStorage.getItem('email'),
        otp
      });
      if (response.status === 200) {
        navigate('/signin');
        toast.success('OTP verified successfully');
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      toast.error('Invalid OTP. Please try again.');
    }
  };

  return (
    <div className='max-w-md sm:mx-auto text-center mt-[27vh] sm:mt-[20vh] sm:bg-slate-600 sm:bg-opacity-15 mx-2 px-4 sm:px-8 py-10 rounded-xl shadow'>
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-1 text-slate-200">Email OTP Verification</h1>
        <p className="text-[15px] text-slate-400">Enter the 6-digit verification code that was sent to your Email ID</p>
      </header>
      <form id="otp-form">
        <div className='flex items-center justify-center gap-3'>
          {inputs.map((value, index) => (
            <input
              className="w-11 h-10 sm:w-14 sm:h-14 text-center text-sm sm:text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              key={index}
              type="text"
              value={value}
              onChange={(e) => handleInput(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(ref) => {
                inputRefs.current[index] = ref;
              }}
              maxLength={1}
              disabled={inputDisabled} // Disable input fields based on state
            />
          ))}
        </div>
        <div className="max-w-[260px] mx-auto mt-4">
          <button
            type="button"
            onClick={handleOtpVerification}
            className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-[#BEF264] px-3.5 py-2.5 text-sm font-medium text-black shadow-sm shadow-indigo-950/10 hover:bg-hoverColor focus:outline-none focus:ring focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
          >
            Verify Account
          </button>
        </div>
        <div className="countdown-text mt-5">
           { <p className='text-xs text-slate-400'>
             Time Remaining: {timer < 10 ? `0:0${timer}` : `0:${timer}`}
           </p> }
           <p className="text-sm text-slate-300">Didn't receive the code?</p>
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={!canResend}
            style={{ color: canResend ? 'blue' : 'grey' }}
          >
            Resend OTP
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Otp;
