import React, { useState } from 'react';

const FacilityModal = ({ isOpen, onClose, facilities, onSelectFacility, onAddCustomFacility }) => {
    const [customFacility, setCustomFacility] = useState('');
  
    if (!isOpen) return null;
  
    const handleAddCustomFacility = () => {
      if (customFacility.trim()) {
        onAddCustomFacility(customFacility.trim());
        setCustomFacility('');
      }
    };
  
    return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-white p-4 rounded-lg shadow-lg w-1/2 max-w-md">
          <h3 className="text-lg font-semibold mb-4">Select or Add Facilities</h3>
          <div className="space-y-2 mb-4">
            {facilities.map((facility, index) => (
              <button
                key={index}
                onClick={() => onSelectFacility(facility)}
                className="block w-full py-2 px-4 text-left bg-gray-200 rounded hover:bg-gray-300"
              >
                {facility}
              </button>
            ))}
          </div>
          <div className="mb-4">
            <input
              type="text"
              value={customFacility}
              onChange={(e) => setCustomFacility(e.target.value)}
              placeholder="Type a custom facility"
              className="w-full py-2 px-3 border border-gray-300 rounded"
            />
            <button
              onClick={handleAddCustomFacility}
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Add Custom Facility
            </button>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
};

export default FacilityModal;
