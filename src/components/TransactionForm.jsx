import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TransactionForm = ({ isOpen, onClose, onSubmit, initialData = {}, isEdit = false }) => {
  // Format initial date to include time if it exists
  const initialDate = initialData.date 
    ? new Date(initialData.date).toISOString().slice(0, 16)
    : new Date().toISOString().slice(0, 16);

  const [formData, setFormData] = useState({
    transaction_name: initialData.transaction_name || '',
    type: initialData.type || 'debit',
    category: initialData.category || '',
    amount: initialData.amount || '',
    date: initialDate
  });

  // Reset form when initialData changes (for edit mode)
  useEffect(() => {
    if (isEdit && initialData) {
      const editInitialDate = initialData.date 
        ? new Date(initialData.date).toISOString().slice(0, 16)
        : new Date().toISOString().slice(0, 16);

      setFormData({
        transaction_name: initialData.transaction_name || '',
        type: initialData.type || 'debit',
        category: initialData.category || '',
        amount: initialData.amount || '',
        date: editInitialDate
      });
    }
  }, [initialData, isEdit]);
  
  // ... rest of the component code
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

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
    
    // Basic validation
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
      await onSubmit(formData);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to submit transaction');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                {isEdit ? 'Update Transaction' : 'Add Transaction'}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Transaction Name*</label>
                  <input
                    type="text"
                    name="transaction_name"
                    value={formData.transaction_name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    placeholder="e.g. Grocery shopping"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type*</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                      required
                    >
                      <option value="debit">Debit (Expense)</option>
                      <option value="credit">Credit (Income)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Amount*</label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-gray-500">$</span>
                      <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category*</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="shopping">🛍️ Shopping</option>
                    <option value="food">🍕 Food</option>
                    <option value="transport">🚗 Transport</option>
                    <option value="entertainment">🎬 Entertainment</option>
                    <option value="salary">💰 Salary</option>
                    <option value="utilities">💡 Utilities</option>
                    <option value="health">🏥 Health</option>
                    <option value="other">❓ Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date & Time*</label>
                  <input
                    type="datetime-local"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    required
                  />
                </div>

                {error && (
                  <div className="p-3 bg-red-50 text-red-600 text-sm rounded-md border border-red-100">
                    {error}
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400 transition-colors duration-200 flex items-center justify-center min-w-32"
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
                    isEdit ? 'Update' : 'Add Transaction'
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TransactionForm;