import { useEffect } from 'react';
import { FaBell } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const CustomAlert = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const getColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getShadowColor = () => {
    switch (type) {
      case 'success':
        return 'shadow-green-500';
      case 'error':
        return 'shadow-red-500';
      default:
        return 'shadow-gray-500';
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={`fixed top-4 right-4 z-50 ${getColor()} text-white px-6 py-3 rounded-lg shadow-2xl ${getShadowColor()} flex items-center space-x-3`}
        style={{ boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(10px)' }}
      >
        <FaBell className="text-2xl animate-pulse" />
        <div className="flex-1">{message}</div>
        <button className="text-2xl hover:text-red-300 transition-transform transform hover:scale-110" onClick={onClose}>
          &times;
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export default CustomAlert;
