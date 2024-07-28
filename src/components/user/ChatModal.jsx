import React, { useState, useEffect, useRef } from 'react';

const ChatModal = ({ property, isOpen, onClose }) => {
  const [chatLog, setChatLog] = useState([]);
  const [currentStep, setCurrentStep] = useState('initial');
  const chatEndRef = useRef(null);

  const steps = {
    initial: {
      question: 'Please choose a question:',
      options: [
        'How to contact the owner?',
        'How to book the hostel?',
        'What is the hostel name?',
        'Who is the hostel owner?',
        'What are the owner details?',
        'Show hostel images',
        'What facilities are available?'
      ],
    },
    ownerInfo: {
      question: 'Owner Information:',
      options: [
        'What is the owner contact number?',
        'What is the owner email?'
      ],
    },
    hostelDetails: {
      question: 'Hostel Details:',
      options: [
        'Show hostel images',
        'What facilities are available?'
      ],
    },
  };

  const handleQuestionClick = (question) => {
    let answer = '';
    let nextStep = 'initial';
    switch (question) {
      case 'How to contact the owner?':
        answer = 'To contact the owner, please click the contact button. The owner will reach out to you directly.';
        nextStep = 'initial';
        break;
      case 'How to book the hostel?':
        answer = 'To book the hostel, please contact the owner. The owner will guide you through the booking process.';
        nextStep = 'initial';
        break;
      case 'What is the hostel name?':
        answer = `The hostel name is ${property.hostelName}`;
        nextStep = 'hostelDetails';
        break;
      case 'Who is the hostel owner?':
        answer = `The owner of the hostel is ${property.ownerName}`;
        nextStep = 'ownerInfo';
        break;
      case 'What are the owner details?':
        answer = 'To get the owner details, please click the contact button. The owner will reach out to you directly.';
        nextStep = 'ownerInfo';
        break;
      case 'What is the owner contact number?':
        answer = 'To get the owner contact number, please click the contact button. The owner will reach out to you directly.';
        nextStep = 'initial';
        break;
      case 'What is the owner email?':
        answer = 'To get the owner email, please click the contact button. The owner will reach out to you directly.';
        nextStep = 'initial';
        break;
      case 'Show hostel images':
        answer = property.hostelImages.map((image, index) => (
          <img key={index} src={image} alt={`Hostel ${index}`} className="w-full h-auto object-cover mt-2" />
        ));
        nextStep = 'initial';
        break;
      case 'What facilities are available?':
        answer = `Facilities: ${property.facilities.join(', ')}`;
        nextStep = 'initial';
        break;
      default:
        answer = 'Sorry, I do not understand the question.';
        nextStep = 'initial';
    }

    setChatLog([...chatLog, { question, answer }]);
    setCurrentStep(nextStep);
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatLog]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg flex items-center justify-center p-4">
        <div className="bg-white text-black p-6 rounded-3xl shadow-lg w-full max-w-4xl h-auto max-h-[90vh] flex flex-col md:flex-row">
          <div className="w-full md:w-1/3 border-b md:border-r border-gray-300 p-4 overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">{steps[currentStep].question}</h2>
            <div className="space-y-2">
              {steps[currentStep].options.map((option, index) => (
                <button
                  key={index}
                  className="block w-full text-left py-2 px-4 bg-gray-200 rounded hover:bg-gray-300"
                  onClick={() => handleQuestionClick(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          <div className="w-full md:w-2/3 p-4 overflow-y-auto">
            <div className="flex justify-between mb-4">
              <h2 className="text-lg font-semibold">Chat with Property</h2>
              <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M14.348 5.652a.5.5 0 00-.707 0L10 9.293 6.36 5.652a.5.5 0 00-.707.707L9.293 10 5.652 13.64a.5.5 0 00.707.707L10 10.707l3.64 3.64a.5.5 0 00.707-.707L10.707 10l3.64-3.64a.5.5 0 000-.707z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div className="overflow-y-auto h-72 md:h-full bg-gray-100 rounded p-4">
              {chatLog.map((log, index) => (
                <div key={index} className="mb-4">
                  <p className="font-semibold mb-1">Q: {log.question}</p>
                  <p className="ml-4">A: {log.answer}</p>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
