import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import HALO from 'vanta/dist/vanta.halo.min';

const LandingPage = () => {
  const navigate = useNavigate();
  const vantaRef = useRef(null);

  useEffect(() => {
    const vantaEffect = HALO({
      el: vantaRef.current,
      THREE,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      baseColor: 0x0d0d0d, // very dark background
      backgroundColor: 0x1a1a1a, // dark color
      amplitudeFactor: 2.00, // customize as needed
      size: 2.50, // customize as needed
    });

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  return (
    <div ref={vantaRef} className="min-h-screen flex items-center justify-center bg-dark-blue">
      <div className="flex flex-col md:flex-row max-w-5xl mx-auto rounded-2xl shadow-2xl overflow-hidden bg-white bg-opacity-10 backdrop-blur-lg glass-container">
        <div className="w-full md:w-1/2 p-8 bg-gradient-to-br to-indigo-800 text-white flex flex-col justify-center">
          <h1 className="text-4xl font-extrabold mb-6">Welcome to <span className="text-[#aeed40]">BRO</span>STEL</h1>
          <p className="text-lg mb-8">
            Browse through hundreds of hostel and PG listings tailored for students. Discover the perfect place to stay or list your property with ease. Get started by selecting your preference below.
          </p>
        </div>
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center space-y-6 bg-white bg-opacity-10 backdrop-blur-lg border-l border-opacity-30">
          <button
            onClick={() => navigate('/signin')}
            className="w-full bg-black text-white font-semibold py-3 px-6 rounded-full shadow-md hover:bg-blue-700 transition duration-300"
          >
            Find a Hostel
          </button>
          <button
            onClick={() => navigate('/vendor/signin')}
            className="w-full bg-white text-black font-semibold py-3 px-6 rounded-full shadow-md hover:bg-yellow-500 transition duration-300"
          >
            List Your Hostel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
