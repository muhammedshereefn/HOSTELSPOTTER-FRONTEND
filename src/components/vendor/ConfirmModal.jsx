// ConfirmModal.js

import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';

const ConfirmModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Confirm Delete"
      className="flex items-center justify-center min-h-screen"
      overlayClassName="fixed inset-0 bg-black bg-opacity-75"
    >
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-white max-w-sm w-full relative">
        <h2 className="text-2xl font-bold mb-4">Confirm Delete</h2>
        <p className="mb-4">Are you sure you want to delete this property?</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-600 text-white hover:bg-gray-700 font-bold py-2 px-4 rounded transition duration-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white hover:bg-red-700 font-bold py-2 px-4 rounded transition duration-300"
          >
            Confirm Delete
          </button>
        </div>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-500"
        >
          <FaTimes size={20} />
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
