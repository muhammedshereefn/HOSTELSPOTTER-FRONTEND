import React, { useState } from 'react';

const PoliciesModal = ({ isOpen, onClose, policies, onSelectPolicy, onAddCustomPolicy }) => {
    const [customPolicy, setCustomPolicy] = useState('');

    if (!isOpen) return null;

    const handleAddCustomPolicy = () => {
      if (customPolicy.trim()) {
        onAddCustomPolicy(customPolicy.trim());
        setCustomPolicy('');
      }
    };

    return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-white p-4 rounded-lg shadow-lg w-1/2 max-w-md">
          <h3 className="text-lg font-semibold mb-4">Select or Add Policies</h3>
          <div className="space-y-2 mb-4">
            {policies.map((policy, index) => (
              <button
                key={index}
                onClick={() => onSelectPolicy(policy)}
                className="block w-full py-2 px-4 text-left bg-gray-200 rounded hover:bg-gray-300"
              >
                {policy}
              </button>
            ))}
          </div>
          <div className="mb-4">
            <input
              type="text"
              value={customPolicy}
              onChange={(e) => setCustomPolicy(e.target.value)}
              placeholder="Type a custom policy"
              className="w-full py-2 px-3 border border-gray-300 rounded"
            />
            <button
              onClick={handleAddCustomPolicy}
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Add Custom Policy
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

export default PoliciesModal;
