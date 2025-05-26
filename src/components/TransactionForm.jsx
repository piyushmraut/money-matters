import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiDollarSign, FiCalendar, FiShoppingCart, FiCoffee, FiFilm, FiDollarSign as FiIncome, FiHome, FiHeart, FiPlus, FiCheck } from 'react-icons/fi';
import { FaMoneyBillWave, FaPiggyBank } from 'react-icons/fa';
import { MdDirectionsCar } from "react-icons/md";

const TransactionForm = ({ isOpen, onClose, onSubmit, initialData = {}, isEdit = false }) => {
  // Helper function to format date for datetime-local input
  const getInitialDate = () => {
    if (initialData.date) {
      const date = new Date(initialData.date);
      if (isNaN(date.getTime())) {
        // If invalid date, return current datetime
        const now = new Date();
        // Format as YYYY-MM-DDTHH:MM
        return now.toISOString().slice(0, 16);
      }
      // Format the existing date correctly for datetime-local input
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
     
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    }
    // For new transactions, use current datetime
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
   
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };
 
  const [formData, setFormData] = useState({
    transaction_name: initialData.transaction_name || '',
    type: initialData.type || 'debit',
    category: initialData.category || '',
    amount: initialData.amount || '',
    date: getInitialDate()
  });
 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
 
  // Update form when initialData changes (for edit mode)
  useEffect(() => {
    if (isEdit && initialData) {
      setFormData({
        transaction_name: initialData.transaction_name || '',
        type: initialData.type || 'debit',
        category: initialData.category || '',
        amount: initialData.amount || '',
        date: getInitialDate()
      });
    }
  }, [initialData, isEdit]);
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
   
    // Validation
    if (!formData.transaction_name.trim()) {
      setError('Transaction name is required');
      return;
    }
    if (!formData.amount || isNaN(formData.amount)) {
      setError('Amount must be a valid number');
      return;
    }
    if (!formData.date) {
      setError('Date and time are required');
      return;
    }
 
    setIsSubmitting(true);
    try {
      // Convert the datetime-local string to a proper ISO string
      const dateTimeString = formData.date;
      const date = new Date(dateTimeString);
     
      // Ensure the date is valid
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date');
      }
     
      // Format the date for submission (ISO string)
      const submissionData = {
        ...formData,
        date: date.toISOString()
      };
     
      await onSubmit(submissionData);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to submit transaction');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Category icons with animations
  const categoryIcons = {
    shopping: <FiShoppingCart className="inline mr-2" />,
    food: <FiCoffee className="inline mr-2" />,
    transport: <MdDirectionsCar className="inline mr-2" />,
    entertainment: <FiFilm className="inline mr-2" />,
    salary: <FaMoneyBillWave className="inline mr-2" />,
    utilities: <FiHome className="inline mr-2" />,
    health: <FiHeart className="inline mr-2" />,
    other: <FaPiggyBank className="inline mr-2" />
  };
 
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 w-full max-w-md shadow-2xl border border-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <motion.h2 
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
              >
                {isEdit ? 'Update Transaction' : 'Add New Transaction'}
              </motion.h2>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-colors duration-200 p-1 rounded-full hover:bg-gray-100"
              >
                <FiX className="h-6 w-6" />
              </motion.button>
            </div>
 
            <form onSubmit={handleSubmit}>
              <div className="space-y-5">
                {/* Transaction Name */}
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">Transaction Name*</label>
                  <div className="relative">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="relative"
                    >
                      <input
                        type="text"
                        name="transaction_name"
                        value={formData.transaction_name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 shadow-sm"
                        placeholder="e.g. Grocery shopping"
                        required
                      />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Type and Amount */}
                <motion.div 
                  className="grid grid-cols-2 gap-4"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type*</label>
                    <motion.div whileHover={{ scale: 1.02 }}>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 shadow-sm appearance-none bg-white"
                        required
                      >
                        <option value="debit" className="flex items-center">
                          <FiDollarSign className="inline mr-2" /> Expense
                        </option>
                        <option value="credit" className="flex items-center">
                          <FiIncome className="inline mr-2" /> Income
                        </option>
                      </select>
                    </motion.div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Amount*</label>
                    <motion.div whileHover={{ scale: 1.02 }} className="relative">
                      <span className="absolute left-4 top-3 text-gray-500">
                        <FiDollarSign className="h-5 w-5" />
                      </span>
                      <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 shadow-sm"
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                        required
                      />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Category */}
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category*</label>
                  <motion.div whileHover={{ scale: 1.02 }}>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 shadow-sm appearance-none bg-white"
                      required
                    >
                      <option value="">Select a category</option>
                      <option value="shopping" className="flex items-center">
                        {categoryIcons.shopping} Shopping
                      </option>
                      <option value="food" className="flex items-center">
                        {categoryIcons.food} Food
                      </option>
                      <option value="transport" className="flex items-center">
                        {categoryIcons.transport} Transport
                      </option>
                      <option value="entertainment" className="flex items-center">
                        {categoryIcons.entertainment} Entertainment
                      </option>
                      <option value="salary" className="flex items-center">
                        {categoryIcons.salary} Salary
                      </option>
                      <option value="utilities" className="flex items-center">
                        {categoryIcons.utilities} Utilities
                      </option>
                      <option value="health" className="flex items-center">
                        {categoryIcons.health} Health
                      </option>
                      <option value="other" className="flex items-center">
                        {categoryIcons.other} Other
                      </option>
                    </select>
                  </motion.div>
                </motion.div>

                {/* Date */}
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date & Time*</label>
                  <motion.div whileHover={{ scale: 1.02 }} className="relative">
                    <span className="absolute left-4 top-3 text-gray-500">
                      <FiCalendar className="h-5 w-5" />
                    </span>
                    <input
                      type="datetime-local"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 shadow-sm"
                      required
                    />
                  </motion.div>
                </motion.div>

                {/* Error Message */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-3 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 flex items-center"
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Buttons */}
              <motion.div 
                className="mt-8 flex justify-end space-x-3"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <motion.button
                  type="button"
                  onClick={onClose}
                  whileHover={{ scale: 1.03, backgroundColor: "#f3f4f6" }}
                  whileTap={{ scale: 0.98 }}
                  className="px-5 py-3 border border-gray-200 rounded-xl text-gray-700 transition-all duration-200 shadow-sm"
                  disabled={isSubmitting}
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-5 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-lg disabled:opacity-70 transition-all duration-200 flex items-center justify-center min-w-32 shadow-md"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {isEdit ? 'Updating...' : 'Adding...'}
                    </>
                  ) : (
                    <>
                      {isEdit ? (
                        <>
                          <FiCheck className="mr-2" /> Update
                        </>
                      ) : (
                        <>
                          <FiPlus className="mr-2" /> Add Transaction
                        </>
                      )}
                    </>
                  )}
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
 
export default TransactionForm;