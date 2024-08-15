import React from 'react';

const TutorialModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full relative">
        <button
          className="absolute top-2 right-2 text-gray-700 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-4">How to Get Latitude and Longitude</h2>
        <div className="aspect-w-16 aspect-h-9 mb-4">
          <iframe
            className="w-full h-full"
            src="public/WhatsApp Video 2024-08-15 at 09.52.29_9807a801.mp4"
            title="Tutorial Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <p>Follow the video instructions to find the latitude and longitude of your property.</p>
      </div>
    </div>
  );
};

export default TutorialModal;
