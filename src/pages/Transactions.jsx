// import Sidebar from '../components/Sidebar';
// import { useAuth } from '../context/AuthContext';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useState, useEffect } from 'react';
// import { useDashboard } from '../context/DashboardContext';
// import { 
//   FaEdit, 
//   FaTrash, 
//   FaPlus, 
//   FaSort, 
//   FaFilter, 
//   FaSearch, 
//   FaCalendarAlt, 
//   FaMoneyBillWave,
//   FaShoppingCart,
//   FaUtensils,
//   FaExchangeAlt,
//   FaGamepad,
//   FaDollarSign,
//   FaArrowUp,
//   FaArrowDown,
//   FaEye,
//   FaTimes,
//   FaChevronDown,
//   FaChevronUp,
//   FaChevronLeft,
//   FaChevronRight
// } from 'react-icons/fa';
// import TransactionForm from '../components/TransactionForm';
// import DeleteConfirmation from '../components/DeleteConfirmation';


// const Transactions = () => {
//   const { user } = useAuth();
//   const { 
//     transactions, 
//     isLoading, 
//     error, 
//     refreshData,
//     addTransaction: contextAddTransaction,
//     updateTransaction: contextUpdateTransaction,
//     deleteTransaction: contextDeleteTransaction
//   } = useDashboard();
  
//   const [activeTab, setActiveTab] = useState('All Transactions');
//   const [filteredTransactions, setFilteredTransactions] = useState([]);
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [showEditForm, setShowEditForm] = useState(false);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//   const [selectedTransaction, setSelectedTransaction] = useState(null);
//   const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
//   const [filters, setFilters] = useState({
//     category: '',
//     startDate: '',
//     endDate: '',
//     minAmount: '',
//     maxAmount: '',
//     searchQuery: ''
//   });
//   const [showFilters, setShowFilters] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const transactionsPerPage = 7;

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         duration: 0.6,
//         staggerChildren: 0.1
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         duration: 0.5,
//         ease: "easeOut"
//       }
//     }
//   };

//   const cardVariants = {
//     hidden: { scale: 0.95, opacity: 0 },
//     visible: {
//       scale: 1,
//       opacity: 1,
//       transition: {
//         duration: 0.4,
//         ease: "easeOut"
//       }
//     }
//   };

//   // Calculate pagination
//   const indexOfLastTransaction = currentPage * transactionsPerPage;
//   const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
//   const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);
//   const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);

//   // Change page
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   // Reset to first page whenever filters change
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [filters, activeTab, sortConfig]);

//   // Category icons mapping
//   const getCategoryIcon = (category) => {
//     const iconMap = {
//       shopping: FaShoppingCart,
//       food: FaUtensils,
//       transfer: FaExchangeAlt,
//       entertainment: FaGamepad,
//       salary: FaDollarSign
//     };
//     const IconComponent = iconMap[category.toLowerCase()] || FaDollarSign;
//     return <IconComponent className="w-4 h-4" />;
//   };

//   // Get category color
//   const getCategoryColor = (category) => {
//     const colorMap = {
//       shopping: 'bg-purple-100 text-purple-800',
//       food: 'bg-orange-100 text-orange-800',
//       transfer: 'bg-blue-100 text-blue-800',
//       entertainment: 'bg-pink-100 text-pink-800',
//       salary: 'bg-green-100 text-green-800'
//     };
//     return colorMap[category.toLowerCase()] || 'bg-gray-100 text-gray-800';
//   };

//   // Wrap the context functions to ensure proper updates
//   const addTransaction = async (data) => {
//     const result = await contextAddTransaction(data);
//     if (result.success) {
//       await refreshData();
//     }
//     return result;
//   };

//   const updateTransaction = async (data) => {
//     const result = await contextUpdateTransaction(selectedTransaction.id, data);
//     if (result.success) {
//       await refreshData();
//     }
//     return result;
//   };

//   const deleteTransaction = async () => {
//     const result = await contextDeleteTransaction(selectedTransaction.id);
//     if (result.success) {
//       await refreshData();
//     }
//     return result;
//   };

//   useEffect(() => {
//     refreshData();
//   }, []);

//   useEffect(() => {
//     if (transactions) {
//       let filtered = [...transactions];
      
//       if (activeTab === 'Debit') {
//         filtered = filtered.filter(t => t.type === 'debit');
//       } else if (activeTab === 'Credit') {
//         filtered = filtered.filter(t => t.type === 'credit');
//       }
      
//       if (filters.category) {
//         filtered = filtered.filter(t => t.category === filters.category);
//       }
//       if (filters.startDate) {
//         filtered = filtered.filter(t => new Date(t.date) >= new Date(filters.startDate));
//       }
//       if (filters.endDate) {
//         filtered = filtered.filter(t => new Date(t.date) <= new Date(filters.endDate));
//       }
//       if (filters.minAmount) {
//         filtered = filtered.filter(t => t.amount >= Number(filters.minAmount));
//       }
//       if (filters.maxAmount) {
//         filtered = filtered.filter(t => t.amount <= Number(filters.maxAmount));
//       }
//       if (filters.searchQuery) {
//         const query = filters.searchQuery.toLowerCase();
//         filtered = filtered.filter(t => 
//           t.transaction_name.toLowerCase().includes(query) ||
//           t.category.toLowerCase().includes(query)
//         );
//       }
      
//       if (sortConfig.key) {
//         filtered.sort((a, b) => {
//           if (a[sortConfig.key] < b[sortConfig.key]) {
//             return sortConfig.direction === 'asc' ? -1 : 1;
//           }
//           if (a[sortConfig.key] > b[sortConfig.key]) {
//             return sortConfig.direction === 'asc' ? 1 : -1;
//           }
//           return 0;
//         });
//       }
      
//       setFilteredTransactions(filtered);
//     }
//   }, [activeTab, transactions, sortConfig, filters]);

//   const handleSort = (key) => {
//     let direction = 'asc';
//     if (sortConfig.key === key && sortConfig.direction === 'asc') {
//       direction = 'desc';
//     }
//     setSortConfig({ key, direction });
//   };

//   const handleEdit = (transaction) => {
//     setSelectedTransaction({
//       ...transaction,
//       transaction_name: transaction.transaction_name,
//       type: transaction.type,
//       category: transaction.category,
//       amount: transaction.amount,
//       date: transaction.date
//     });
//     setShowEditForm(true);
//   };

//   const handleDelete = (transaction) => {
//     setSelectedTransaction(transaction);
//     setShowDeleteConfirm(true);
//   };

//   const handleAdd = () => {
//     setShowAddForm(true);
//   };

//   const handleDeleteConfirmed = async () => {
//     await deleteTransaction();
//     setShowDeleteConfirm(false);
//     setSelectedTransaction(null);
//   };

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const resetFilters = () => {
//     setFilters({
//       category: '',
//       startDate: '',
//       endDate: '',
//       minAmount: '',
//       maxAmount: '',
//       searchQuery: ''
//     });
//   };

//   const formatDate = (dateString) => {
//     const options = { 
//       day: 'numeric', 
//       month: 'short', 
//       hour: '2-digit', 
//       minute: '2-digit' 
//     };
//     return new Date(dateString).toLocaleDateString('en-US', options);
//   };

//   // Loading state with beautiful animation
//   if (isLoading) {
//     return (
//       <div className="flex bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
//         <Sidebar />
//         <div className="flex-1 flex flex-col ml-64">
//           <motion.nav 
//             className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20 p-6"
//             initial={{ y: -50, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.6, ease: "easeOut" }}
//           >
//             <div className="flex justify-between items-center">
//               <div>
//                 <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//                   Transactions
//                 </h1>
//                 <p className="text-slate-600 mt-1">Loading your financial data...</p>
//               </div>
//               <div className="h-10 w-40 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-lg animate-pulse"></div>
//             </div>
//           </motion.nav>
//           <div className="flex-1 flex items-center justify-center">
//             <motion.div 
//               className="flex flex-col items-center space-y-4"
//               initial={{ scale: 0.8, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               transition={{ duration: 0.6 }}
//             >
//               <div className="relative">
//                 <motion.div
//                   className="w-16 h-16 border-4 border-indigo-200 rounded-full"
//                   animate={{ rotate: 360 }}
//                   transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//                 />
//                 <motion.div
//                   className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-indigo-600 rounded-full"
//                   animate={{ rotate: 360 }}
//                   transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//                 />
//               </div>
//               <p className="text-slate-600 font-medium">Loading transactions...</p>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Error state with retry animation
//   if (error) {
//     return (
//       <div className="flex bg-gradient-to-br from-slate-50 to-red-50 min-h-screen">
//         <Sidebar />
//         <div className="flex-1 flex flex-col ml-64">
//           <motion.nav 
//             className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20 p-6"
//             initial={{ y: -50, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.6 }}
//           >
//             <div className="flex justify-between items-center">
//               <div>
//                 <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//                   Transactions
//                 </h1>
//                 <p className="text-slate-600 mt-1">Something went wrong</p>
//               </div>
//               <motion.button 
//                 onClick={handleAdd}
//                 className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
//                 whileHover={{ scale: 1.05, y: -2 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <FaPlus className="w-4 h-4" />
//                 <span>Add Transaction</span>
//               </motion.button>
//             </div>
//           </motion.nav>
//           <div className="flex-1 flex items-center justify-center">
//             <motion.div 
//               className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md"
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               transition={{ duration: 0.5 }}
//             >
//               <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <FaTimes className="w-8 h-8 text-red-600" />
//               </div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Data</h3>
//               <p className="text-gray-600 mb-6">{error}</p>
//               <motion.button 
//                 onClick={refreshData}
//                 className="px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 Try Again
//               </motion.button>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
//       <Sidebar />
//       <div className="flex-1 flex flex-col ml-64">
//         {/* Enhanced Navbar */}
//         <motion.nav 
//           className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20 p-6"
//           initial={{ y: -50, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.6, ease: "easeOut" }}
//         >
//           <div className="flex justify-between items-center">
//             <motion.div
//               initial={{ x: -30, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               transition={{ delay: 0.2, duration: 0.5 }}
//             >
//               <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
//                 Transactions
//               </h1>
//               <p className="text-slate-600 mt-1 font-medium">Manage your financial transactions with ease</p>
//             </motion.div>
//             <motion.button 
//               onClick={handleAdd}
//               className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 group"
//               whileHover={{ scale: 1.05, y: -2 }}
//               whileTap={{ scale: 0.95 }}
//               initial={{ x: 30, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               transition={{ delay: 0.3, duration: 0.5 }}
//             >
//               <motion.div
//                 animate={{ rotate: 0 }}
//                 whileHover={{ rotate: 90 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <FaPlus className="w-4 h-4" />
//               </motion.div>
//               <span>Add Transaction</span>
//             </motion.button>
//           </div>
//         </motion.nav>

//         <div className='m-4'>
//            {filteredTransactions.length > 0 && (
//             <motion.div 
//               className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.3, duration: 0.5 }}
//             >
//               <motion.div 
//                 className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6"
//                 whileHover={{ scale: 1.02, y: -5 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm font-medium text-slate-600">Total Transactions</p>
//                     <motion.p 
//                       className="text-3xl font-bold text-slate-900"
//                       initial={{ scale: 0 }}
//                       animate={{ scale: 1 }}
//                       transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
//                     >
//                       {filteredTransactions.length}
//                     </motion.p>
//                   </div>
//                   <motion.div 
//                     className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center"
//                     animate={{ rotate: 360 }}
//                     transition={{ delay: 0.5, duration: 2, ease: "easeInOut" }}
//                   >
//                     <FaEye className="w-6 h-6 text-white" />
//                   </motion.div>
//                 </div>
//               </motion.div>

//               <motion.div 
//                 className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6"
//                 whileHover={{ scale: 1.02, y: -5 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm font-medium text-slate-600">Total Credit</p>
//                     <motion.p 
//                       className="text-3xl font-bold text-green-600"
//                       initial={{ scale: 0 }}
//                       animate={{ scale: 1 }}
//                       transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
//                     >
//                       ${filteredTransactions
//                         .filter(t => t.type === 'credit')
//                         .reduce((sum, t) => sum + t.amount, 0)
//                         .toLocaleString()}
//                     </motion.p>
//                   </div>
//                   <motion.div 
//                     className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center"
//                     animate={{ y: [-2, 2, -2] }}
//                     transition={{ delay: 0.6, duration: 2, repeat: Infinity }}
//                   >
//                     <FaArrowUp className="w-6 h-6 text-white" />
//                   </motion.div>
//                 </div>
//               </motion.div>

//               <motion.div 
//                 className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6"
//                 whileHover={{ scale: 1.02, y: -5 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm font-medium text-slate-600">Total Debit</p>
//                     <motion.p 
//                       className="text-3xl font-bold text-red-600"
//                       initial={{ scale: 0 }}
//                       animate={{ scale: 1 }}
//                       transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
//                     >
//                       ${filteredTransactions
//                         .filter(t => t.type === 'debit')
//                         .reduce((sum, t) => sum + Math.abs(t.amount), 0)
//                         .toLocaleString()}
//                     </motion.p>
//                   </div>
//                   <motion.div 
//                     className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center"
//                     animate={{ y: [2, -2, 2] }}
//                     transition={{ delay: 0.7, duration: 2, repeat: Infinity }}
//                   >
//                     <FaArrowDown className="w-6 h-6 text-white" />
//                   </motion.div>
//                 </div>
//               </motion.div>
//             </motion.div>
//           )}
//         </div>

//         {/* Main Content */}
//         <motion.div 
//           className="flex-1 p-6"
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//         >
//           <motion.div 
//             className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden"
//             variants={cardVariants}
//           >
//             {/* Enhanced Search and Filter Bar */}
//             <motion.div 
//               className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-indigo-100"
//               variants={itemVariants}
//             >
//               <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//                 <div className="relative flex-1 max-w-md">
//                   <motion.div 
//                     className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
//                     animate={{ x: 0 }}
//                     whileHover={{ x: 2 }}
//                   >
//                     <FaSearch className="text-indigo-400" />
//                   </motion.div>
//                   <input
//                     type="text"
//                     name="searchQuery"
//                     value={filters.searchQuery}
//                     onChange={handleFilterChange}
//                     placeholder="Search transactions..."
//                     className="pl-12 pr-4 py-3 w-full border-2 border-indigo-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition-all duration-300 bg-white/80 backdrop-blur-sm"
//                   />
//                 </div>
//                 <div className="flex space-x-3">
//                   <motion.button
//                     onClick={() => setShowFilters(!showFilters)}
//                     className={`px-4 py-3 flex items-center text-sm rounded-xl font-medium transition-all duration-300 ${
//                       showFilters 
//                         ? 'bg-indigo-600 text-white shadow-lg' 
//                         : 'bg-white text-indigo-600 hover:bg-indigo-50 border-2 border-indigo-200'
//                     }`}
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     <motion.div
//                       animate={{ rotate: showFilters ? 180 : 0 }}
//                       transition={{ duration: 0.3 }}
//                     >
//                       <FaFilter className="mr-2" />
//                     </motion.div>
//                     Filters
//                     {showFilters ? <FaChevronUp className="ml-2" /> : <FaChevronDown className="ml-2" />}
//                   </motion.button>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Enhanced Filters Panel */}
//             <AnimatePresence>
//               {showFilters && (
//                 <motion.div 
//                   className="p-6 bg-gradient-to-r from-slate-50 to-indigo-50 border-b border-indigo-100"
//                   initial={{ opacity: 0, height: 0 }}
//                   animate={{ opacity: 1, height: 'auto' }}
//                   exit={{ opacity: 0, height: 0 }}
//                   transition={{ duration: 0.4, ease: "easeInOut" }}
//                 >
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
//                     <motion.div
//                       initial={{ y: 20, opacity: 0 }}
//                       animate={{ y: 0, opacity: 1 }}
//                       transition={{ delay: 0.1 }}
//                     >
//                       <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
//                       <select
//                         name="category"
//                         value={filters.category}
//                         onChange={handleFilterChange}
//                         className="w-full px-4 py-3 border-2 border-indigo-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition-all duration-300 bg-white/80"
//                       >
//                         <option value="">All Categories</option>
//                         <option value="shopping">🛍️ Shopping</option>
//                         <option value="food">🍽️ Food</option>
//                         <option value="transfer">💸 Transfer</option>
//                         <option value="entertainment">🎮 Entertainment</option>
//                         <option value="salary">💰 Salary</option>
//                       </select>
//                     </motion.div>
                    
//                     <motion.div
//                       initial={{ y: 20, opacity: 0 }}
//                       animate={{ y: 0, opacity: 1 }}
//                       transition={{ delay: 0.2 }}
//                     >
//                       <label className="block text-sm font-semibold text-slate-700 mb-2">Start Date</label>
//                       <div className="relative">
//                         <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                           <FaCalendarAlt className="text-indigo-400" />
//                         </div>
//                         <input
//                           type="date"
//                           name="startDate"
//                           value={filters.startDate}
//                           onChange={handleFilterChange}
//                           className="w-full pl-12 pr-4 py-3 border-2 border-indigo-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition-all duration-300 bg-white/80"
//                         />
//                       </div>
//                     </motion.div>
                    
//                     <motion.div
//                       initial={{ y: 20, opacity: 0 }}
//                       animate={{ y: 0, opacity: 1 }}
//                       transition={{ delay: 0.3 }}
//                     >
//                       <label className="block text-sm font-semibold text-slate-700 mb-2">End Date</label>
//                       <div className="relative">
//                         <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                           <FaCalendarAlt className="text-indigo-400" />
//                         </div>
//                         <input
//                           type="date"
//                           name="endDate"
//                           value={filters.endDate}
//                           onChange={handleFilterChange}
//                           className="w-full pl-12 pr-4 py-3 border-2 border-indigo-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition-all duration-300 bg-white/80"
//                         />
//                       </div>
//                     </motion.div>
                    
//                     <motion.div
//                       initial={{ y: 20, opacity: 0 }}
//                       animate={{ y: 0, opacity: 1 }}
//                       transition={{ delay: 0.4 }}
//                     >
//                       <label className="block text-sm font-semibold text-slate-700 mb-2">Amount Range</label>
//                       <div className="flex space-x-2">
//                         <div className="relative flex-1">
//                           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                             <FaMoneyBillWave className="text-indigo-400 text-xs" />
//                           </div>
//                           <input
//                             type="number"
//                             name="minAmount"
//                             placeholder="Min"
//                             value={filters.minAmount}
//                             onChange={handleFilterChange}
//                             className="w-full pl-10 pr-3 py-3 border-2 border-indigo-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition-all duration-300 bg-white/80"
//                           />
//                         </div>
//                         <div className="relative flex-1">
//                           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                             <FaMoneyBillWave className="text-indigo-400 text-xs" />
//                           </div>
//                           <input
//                             type="number"
//                             name="maxAmount"
//                             placeholder="Max"
//                             value={filters.maxAmount}
//                             onChange={handleFilterChange}
//                             className="w-full pl-10 pr-3 py-3 border-2 border-indigo-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition-all duration-300 bg-white/80"
//                           />
//                         </div>
//                       </div>
//                     </motion.div>
//                   </div>
                  
//                   <motion.div 
//                     className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
//                     initial={{ y: 20, opacity: 0 }}
//                     animate={{ y: 0, opacity: 1 }}
//                     transition={{ delay: 0.5 }}
//                   >
//                     <motion.button
//                       onClick={resetFilters}
//                       className="text-sm text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200"
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                     >
//                       Clear all filters
//                     </motion.button>
//                     <motion.button
//                       onClick={() => setShowFilters(false)}
//                       className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all duration-300"
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                     >
//                       Apply Filters
//                     </motion.button>
//                   </motion.div>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             {/* Enhanced Transaction Tabs */}
//             <motion.div 
//               className="px-6 pt-6 flex space-x-1 border-b border-indigo-100"
//               variants={itemVariants}
//             >
//               {['All Transactions', 'Debit', 'Credit'].map((tab, index) => (
//                 <motion.button
//                   key={tab}
//                   onClick={() => setActiveTab(tab)}
//                   className={`px-6 py-3 text-sm font-semibold relative rounded-t-xl transition-all duration-300 ${
//                     activeTab === tab
//                       ? 'text-indigo-600 bg-indigo-50'
//                       : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
//                   }`}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   initial={{ y: 20, opacity: 0 }}
//                   animate={{ y: 0, opacity: 1 }}
//                   transition={{ delay: index * 0.1 }}
//                 >
//                   {tab}
//                   {activeTab === tab && (
//                     <motion.div 
//                       className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-t-lg"
//                       layoutId="underline"
//                       transition={{ duration: 0.3 }}
//                     />
//                   )}
//                 </motion.button>
//               ))}
//             </motion.div>

//             {/* Enhanced Transactions Display */}
//             {filteredTransactions.length === 0 ? (
//               <motion.div 
//                 className="p-12 text-center"
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.5 }}
//               >
//                 <motion.div 
//                   className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center"
//                   animate={{ 
//                     scale: [1, 1.1, 1],
//                     rotate: [0, 5, -5, 0]
//                   }}
//                   transition={{ 
//                     duration: 2,
//                     repeat: Infinity,
//                     repeatType: "reverse"
//                   }}
//                 >
//                   <FaMoneyBillWave className="w-12 h-12 text-indigo-400" />
//                 </motion.div>
//                 <h3 className="text-2xl font-bold text-slate-900 mb-2">No transactions found</h3>
//                 <p className="text-slate-600 mb-8 max-w-md mx-auto">
//                   {Object.values(filters).some(Boolean) 
//                     ? "No transactions match your current filters. Try adjusting your search criteria." 
//                     : "Start building your financial history by adding your first transaction."}
//                 </p>
//                 {Object.values(filters).some(Boolean) ? (
//                   <motion.button
//                     onClick={resetFilters}
//                     className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
//                     whileHover={{ scale: 1.05, y: -2 }}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     Clear Filters
//                   </motion.button>
//                 ) : (
//                   <motion.button
//                     onClick={handleAdd}
//                     className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 mx-auto"
//                     whileHover={{ scale: 1.05, y: -2 }}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     <FaPlus className="w-4 h-4" />
//                     <span>Add Your First Transaction</span>
//                   </motion.button>
//                 )}
//               </motion.div>
//             ) : (
//               <div className="overflow-x-auto">
//                 <table className="min-w-full">
//                   <thead>
//                     <tr className="bg-gradient-to-r from-slate-50 to-indigo-50">
//                       <th 
//                         className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider cursor-pointer hover:bg-indigo-100 transition-colors duration-200 group"
//                         onClick={() => handleSort('transaction_name')}
//                       >
//                         <div className="flex items-center space-x-2">
//                           <span>Transaction Name</span>
//                           <motion.div
//                             animate={{ rotate: sortConfig.key === 'transaction_name' && sortConfig.direction === 'desc' ? 180 : 0 }}
//                             transition={{ duration: 0.2 }}
//                           >
//                             <FaSort className="text-xs opacity-50 group-hover:opacity-100 transition-opacity" />
//                           </motion.div>
//                         </div>
//                       </th>
//                       <th 
//                         className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider cursor-pointer hover:bg-indigo-100 transition-colors duration-200 group"
//                         onClick={() => handleSort('category')}
//                       >
//                         <div className="flex items-center space-x-2">
//                           <span>Category</span>
//                           <motion.div
//                             animate={{ rotate: sortConfig.key === 'category' && sortConfig.direction === 'desc' ? 180 : 0 }}
//                             transition={{ duration: 0.2 }}
//                           >
//                             <FaSort className="text-xs opacity-50 group-hover:opacity-100 transition-opacity" />
//                           </motion.div>
//                         </div>
//                       </th>
//                       <th 
//                         className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider cursor-pointer hover:bg-indigo-100 transition-colors duration-200 group"
//                         onClick={() => handleSort('type')}
//                       >
//                         <div className="flex items-center space-x-2">
//                           <span>Type</span>
//                           <motion.div
//                             animate={{ rotate: sortConfig.key === 'type' && sortConfig.direction === 'desc' ? 180 : 0 }}
//                             transition={{ duration: 0.2 }}
//                           >
//                             <FaSort className="text-xs opacity-50 group-hover:opacity-100 transition-opacity" />
//                           </motion.div>
//                         </div>
//                       </th>
//                       <th 
//                         className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider cursor-pointer hover:bg-indigo-100 transition-colors duration-200 group"
//                         onClick={() => handleSort('date')}
//                       >
//                         <div className="flex items-center space-x-2">
//                           <span>Date</span>
//                           <motion.div
//                             animate={{ rotate: sortConfig.key === 'date' && sortConfig.direction === 'desc' ? 180 : 0 }}
//                             transition={{ duration: 0.2 }}
//                           >
//                             <FaSort className="text-xs opacity-50 group-hover:opacity-100 transition-opacity" />
//                           </motion.div>
//                           {sortConfig.key === 'date' && (
//                             <motion.span 
//                               className="text-indigo-600 font-bold"
//                               initial={{ scale: 0 }}
//                               animate={{ scale: 1 }}
//                               transition={{ duration: 0.2 }}
//                             >
//                               {sortConfig.direction === 'asc' ? '↑' : '↓'}
//                             </motion.span>
//                           )}
//                         </div>
//                       </th>
//                       <th 
//                         className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider cursor-pointer hover:bg-indigo-100 transition-colors duration-200 group"
//                         onClick={() => handleSort('amount')}
//                       >
//                         <div className="flex items-center space-x-2">
//                           <span>Amount</span>
//                           <motion.div
//                             animate={{ rotate: sortConfig.key === 'amount' && sortConfig.direction === 'desc' ? 180 : 0 }}
//                             transition={{ duration: 0.2 }}
//                           >
//                             <FaSort className="text-xs opacity-50 group-hover:opacity-100 transition-opacity" />
//                           </motion.div>
//                           {sortConfig.key === 'amount' && (
//                             <motion.span 
//                               className="text-indigo-600 font-bold"
//                               initial={{ scale: 0 }}
//                               animate={{ scale: 1 }}
//                               transition={{ duration: 0.2 }}
//                             >
//                               {sortConfig.direction === 'asc' ? '↑' : '↓'}
//                             </motion.span>
//                           )}
//                         </div>
//                       </th>
//                       <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
//                         Actions
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-slate-100">
//                     <AnimatePresence mode="popLayout">
//                       {currentTransactions.map((transaction, index) => (
//                         <motion.tr 
//                           key={transaction.id}
//                           layout
//                           initial={{ opacity: 0, y: 20, scale: 0.95 }}
//                           animate={{ opacity: 1, y: 0, scale: 1 }}
//                           exit={{ opacity: 0, y: -20, scale: 0.95 }}
//                           transition={{ 
//                             delay: index * 0.05, 
//                             duration: 0.4,
//                             ease: "easeOut"
//                           }}
//                           className="hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-300 group"
//                           whileHover={{ scale: 1.01 }}
//                         >
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <div className="flex items-center space-x-3">
//                               <motion.div 
//                                 className={`w-10 h-10 rounded-full flex items-center justify-center ${getCategoryColor(transaction.category)}`}
//                                 whileHover={{ scale: 1.1, rotate: 5 }}
//                                 transition={{ duration: 0.2 }}
//                               >
//                                 {getCategoryIcon(transaction.category)}
//                               </motion.div>
//                               <div>
//                                 <div className="text-sm font-semibold text-slate-900 group-hover:text-indigo-900 transition-colors">
//                                   {transaction.transaction_name}
//                                 </div>
//                               </div>
//                             </div>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <motion.span 
//                               className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getCategoryColor(transaction.category)}`}
//                               whileHover={{ scale: 1.05 }}
//                               transition={{ duration: 0.2 }}
//                             >
//                               {transaction.category}
//                             </motion.span>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <motion.div 
//                               className="flex items-center space-x-2"
//                               whileHover={{ scale: 1.05 }}
//                               transition={{ duration: 0.2 }}
//                             >
//                               <motion.div
//                                 animate={{ 
//                                   rotate: transaction.type === 'credit' ? 0 : 180 
//                                 }}
//                                 transition={{ duration: 0.3 }}
//                               >
//                                 {transaction.type === 'credit' ? (
//                                   <FaArrowUp className="w-3 h-3 text-green-600" />
//                                 ) : (
//                                   <FaArrowDown className="w-3 h-3 text-red-600" />
//                                 )}
//                               </motion.div>
//                               <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                                 transaction.type === 'credit' 
//                                   ? 'bg-green-100 text-green-800' 
//                                   : 'bg-red-100 text-red-800'
//                               }`}>
//                                 {transaction.type}
//                               </span>
//                             </motion.div>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <div className="flex items-center space-x-2 text-sm text-slate-600">
//                               <FaCalendarAlt className="w-3 h-3 text-slate-400" />
//                               <span>{formatDate(transaction.date)}</span>
//                             </div>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <motion.div 
//                               className={`text-lg font-bold flex items-center space-x-1 ${
//                                 transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
//                               }`}
//                               whileHover={{ scale: 1.05 }}
//                               transition={{ duration: 0.2 }}
//                             >
//                               <span>{transaction.type === 'credit' ? '+' : '-'}</span>
//                               <FaDollarSign className="w-4 h-4" />
//                               <span>{Math.abs(transaction.amount).toLocaleString()}</span>
//                             </motion.div>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
//                             <div className="flex space-x-2">
//                               <motion.button
//                                 onClick={() => handleEdit(transaction)}
//                                 className="p-2 text-indigo-600 hover:text-indigo-900 hover:bg-indigo-100 rounded-full transition-all duration-200"
//                                 whileHover={{ scale: 1.1, rotate: 5 }}
//                                 whileTap={{ scale: 0.9 }}
//                                 aria-label="Edit transaction"
//                               >
//                                 <FaEdit className="w-4 h-4" />
//                               </motion.button>
//                               <motion.button
//                                 onClick={() => handleDelete(transaction)}
//                                 className="p-2 text-red-600 hover:text-red-900 hover:bg-red-100 rounded-full transition-all duration-200"
//                                 whileHover={{ scale: 1.1, rotate: 5 }}
//                                 whileTap={{ scale: 0.9 }}
//                                 aria-label="Delete transaction"
//                               >
//                                 <FaTrash className="w-4 h-4" />
//                               </motion.button>
//                             </div>
//                           </td>
//                         </motion.tr>
//                       ))}
//                     </AnimatePresence>
//                   </tbody>
//                 </table>

//                 {/* Pagination */}
//                 {filteredTransactions.length > transactionsPerPage && (
//                   <motion.div 
//                     className="flex items-center justify-between px-6 py-4 bg-white border-t border-slate-100"
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.4 }}
//                   >
//                     <div className="text-sm text-slate-600">
//                       Showing <span className="font-semibold">{indexOfFirstTransaction + 1}</span> to{' '}
//                       <span className="font-semibold">
//                         {indexOfLastTransaction > filteredTransactions.length 
//                           ? filteredTransactions.length 
//                           : indexOfLastTransaction}
//                       </span>{' '}
//                       of <span className="font-semibold">{filteredTransactions.length}</span> transactions
//                     </div>
//                     <div className="flex space-x-2">
//                       <motion.button
//                         onClick={() => paginate(currentPage - 1)}
//                         disabled={currentPage === 1}
//                         className={`px-3 py-1 rounded-lg flex items-center space-x-1 text-sm ${
//                           currentPage === 1 
//                             ? 'text-slate-400 cursor-not-allowed' 
//                             : 'text-indigo-600 hover:bg-indigo-50'
//                         }`}
//                         whileHover={currentPage !== 1 ? { scale: 1.05 } : {}}
//                         whileTap={currentPage !== 1 ? { scale: 0.95 } : {}}
//                       >
//                         <FaChevronLeft className="w-3 h-3" />
//                         <span>Previous</span>
//                       </motion.button>
                      
//                       {/* Page numbers */}
//                       <div className="flex space-x-1">
//                         {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
//                           <motion.button
//                             key={number}
//                             onClick={() => paginate(number)}
//                             className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm ${
//                               currentPage === number
//                                 ? 'bg-indigo-600 text-white shadow-md'
//                                 : 'text-slate-600 hover:bg-slate-100'
//                             }`}
//                             whileHover={{ scale: 1.1 }}
//                             whileTap={{ scale: 0.95 }}
//                           >
//                             {number}
//                           </motion.button>
//                         ))}
//                       </div>
                      
//                       <motion.button
//                         onClick={() => paginate(currentPage + 1)}
//                         disabled={currentPage === totalPages}
//                         className={`px-3 py-1 rounded-lg flex items-center space-x-1 text-sm ${
//                           currentPage === totalPages 
//                             ? 'text-slate-400 cursor-not-allowed' 
//                             : 'text-indigo-600 hover:bg-indigo-50'
//                         }`}
//                         whileHover={currentPage !== totalPages ? { scale: 1.05 } : {}}
//                         whileTap={currentPage !== totalPages ? { scale: 0.95 } : {}}
//                       >
//                         <span>Next</span>
//                         <FaChevronRight className="w-3 h-3" />
//                       </motion.button>
//                     </div>
//                   </motion.div>
//                 )}
//               </div>
//             )}
//           </motion.div>
//         </motion.div>
//       </div>

//       {/* Enhanced Modals */}
//       <AnimatePresence>
//         {showAddForm && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.3 }}
//           >
//             <TransactionForm
//               isOpen={showAddForm}
//               onClose={() => setShowAddForm(false)}
//               onSubmit={addTransaction}
//             />
//           </motion.div>
//         )}

//         {showEditForm && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.3 }}
//           >
//             <TransactionForm
//               isOpen={showEditForm}
//               onClose={() => {
//                 setShowEditForm(false);
//                 setSelectedTransaction(null);
//               }}
//               onSubmit={updateTransaction}
//               initialData={selectedTransaction || {}}
//               isEdit={true}
//             />
//           </motion.div>
//         )}

//         {showDeleteConfirm && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.3 }}
//           >
//             <DeleteConfirmation
//               isOpen={showDeleteConfirm}
//               onClose={() => {
//                 setShowDeleteConfirm(false);
//                 setSelectedTransaction(null);
//               }}
//               onConfirm={handleDeleteConfirmed}
//               transactionName={selectedTransaction?.transaction_name || ''}
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default Transactions;

import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { 
  FaEdit, 
  FaTrash, 
  FaPlus, 
  FaSort, 
  FaFilter, 
  FaSearch, 
  FaCalendarAlt, 
  FaMoneyBillWave,
  FaShoppingCart,
  FaUtensils,
  FaExchangeAlt,
  FaGamepad,
  FaDollarSign,
  FaArrowUp,
  FaArrowDown,
  FaEye,
  FaTimes,
  FaChevronDown,
  FaChevronUp,
  FaChevronLeft,
  FaChevronRight,
  FaBars
} from 'react-icons/fa';
import TransactionForm from '../components/TransactionForm';
import DeleteConfirmation from '../components/DeleteConfirmation';

const Transactions = () => {
  const { user } = useAuth();
  const { 
    transactions, 
    isLoading, 
    error, 
    refreshData,
    addTransaction: contextAddTransaction,
    updateTransaction: contextUpdateTransaction,
    deleteTransaction: contextDeleteTransaction
  } = useDashboard();
  
  const [activeTab, setActiveTab] = useState('All Transactions');
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [filters, setFilters] = useState({
    category: '',
    startDate: '',
    endDate: '',
    minAmount: '',
    maxAmount: '',
    searchQuery: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const transactionsPerPage = 7;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  // Calculate pagination
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);
  const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Reset to first page whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, activeTab, sortConfig]);

  // Category icons mapping
  const getCategoryIcon = (category) => {
    const iconMap = {
      shopping: FaShoppingCart,
      food: FaUtensils,
      transfer: FaExchangeAlt,
      entertainment: FaGamepad,
      salary: FaDollarSign
    };
    const IconComponent = iconMap[category.toLowerCase()] || FaDollarSign;
    return <IconComponent className="w-4 h-4" />;
  };

  // Get category color
  const getCategoryColor = (category) => {
    const colorMap = {
      shopping: 'bg-purple-100 text-purple-800',
      food: 'bg-orange-100 text-orange-800',
      transfer: 'bg-blue-100 text-blue-800',
      entertainment: 'bg-pink-100 text-pink-800',
      salary: 'bg-green-100 text-green-800'
    };
    return colorMap[category.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  // Wrap the context functions to ensure proper updates
  const addTransaction = async (data) => {
    const result = await contextAddTransaction(data);
    if (result.success) {
      await refreshData();
    }
    return result;
  };

  const updateTransaction = async (data) => {
    const result = await contextUpdateTransaction(selectedTransaction.id, data);
    if (result.success) {
      await refreshData();
    }
    return result;
  };

  const deleteTransaction = async () => {
    const result = await contextDeleteTransaction(selectedTransaction.id);
    if (result.success) {
      await refreshData();
    }
    return result;
  };

  useEffect(() => {
    refreshData();
  }, []);

  useEffect(() => {
    if (transactions) {
      let filtered = [...transactions];
      
      if (activeTab === 'Debit') {
        filtered = filtered.filter(t => t.type === 'debit');
      } else if (activeTab === 'Credit') {
        filtered = filtered.filter(t => t.type === 'credit');
      }
      
      if (filters.category) {
        filtered = filtered.filter(t => t.category === filters.category);
      }
      if (filters.startDate) {
        filtered = filtered.filter(t => new Date(t.date) >= new Date(filters.startDate));
      }
      if (filters.endDate) {
        filtered = filtered.filter(t => new Date(t.date) <= new Date(filters.endDate));
      }
      if (filters.minAmount) {
        filtered = filtered.filter(t => t.amount >= Number(filters.minAmount));
      }
      if (filters.maxAmount) {
        filtered = filtered.filter(t => t.amount <= Number(filters.maxAmount));
      }
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        filtered = filtered.filter(t => 
          t.transaction_name.toLowerCase().includes(query) ||
          t.category.toLowerCase().includes(query)
        );
      }
      
      if (sortConfig.key) {
        filtered.sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? 1 : -1;
          }
          return 0;
        });
      }
      
      setFilteredTransactions(filtered);
    }
  }, [activeTab, transactions, sortConfig, filters]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleEdit = (transaction) => {
    setSelectedTransaction({
      ...transaction,
      transaction_name: transaction.transaction_name,
      type: transaction.type,
      category: transaction.category,
      amount: transaction.amount,
      date: transaction.date
    });
    setShowEditForm(true);
  };

  const handleDelete = (transaction) => {
    setSelectedTransaction(transaction);
    setShowDeleteConfirm(true);
  };

  const handleAdd = () => {
    setShowAddForm(true);
  };

  const handleDeleteConfirmed = async () => {
    await deleteTransaction();
    setShowDeleteConfirm(false);
    setSelectedTransaction(null);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      category: '',
      startDate: '',
      endDate: '',
      minAmount: '',
      maxAmount: '',
      searchQuery: ''
    });
  };

  const formatDate = (dateString) => {
    const options = { 
      day: 'numeric', 
      month: 'short', 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Shimmer Loading Component
  const ShimmerRow = () => (
    <tr className="animate-pulse">
      <td className="px-4 py-4 sm:px-6 whitespace-nowrap">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-gray-200"></div>
          <div className="ml-4">
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
          </div>
        </div>
      </td>
      <td className="px-4 py-4 sm:px-6 whitespace-nowrap">
        <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
      </td>
      <td className="px-4 py-4 sm:px-6 whitespace-nowrap">
        <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
      </td>
      <td className="px-4 py-4 sm:px-6 whitespace-nowrap">
        <div className="h-4 w-24 bg-gray-200 rounded"></div>
      </td>
      <td className="px-4 py-4 sm:px-6 whitespace-nowrap">
        <div className="h-4 w-20 bg-gray-200 rounded"></div>
      </td>
      <td className="px-4 py-4 sm:px-6 whitespace-nowrap">
        <div className="flex space-x-2">
          <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
          <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
        </div>
      </td>
    </tr>
  );

  // Shimmer Card Component
  const ShimmerCard = () => (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
          <div className="h-6 w-32 bg-gray-200 rounded"></div>
        </div>
        <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  );

  // Loading state with shimmer UI
  if (isLoading) {
    return (
      <div className="flex bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 flex flex-col md:ml-64">
          {/* Mobile header */}
          <motion.nav 
            className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20 p-4 md:p-6"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <button 
                  onClick={() => setSidebarOpen(true)}
                  className="mr-4 md:hidden text-gray-600 hover:text-gray-900"
                >
                  <FaBars className="w-5 h-5" />
                </button>
                <div>
                  <div className="h-6 w-32 bg-gray-200 rounded"></div>
                  <div className="h-4 w-48 bg-gray-200 rounded mt-1"></div>
                </div>
              </div>
              <div className="h-10 w-32 bg-gray-200 rounded-lg"></div>
            </div>
          </motion.nav>

          {/* Shimmer Cards */}
          <div className="m-4">
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <ShimmerCard />
              <ShimmerCard />
              <ShimmerCard />
            </div>
          </div>

          {/* Shimmer Table */}
          <div className="m-4 flex-1">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
              {/* Shimmer Tabs */}
              <div className="px-4 py-4 sm:px-6 flex overflow-x-auto">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="h-10 w-32 bg-gray-200 rounded-lg mr-2"></div>
                ))}
              </div>

              {/* Shimmer Table Header */}
              <div className="px-4 py-4 sm:px-6 bg-gradient-to-r from-slate-50 to-indigo-50">
                <div className="grid grid-cols-6 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div key={item} className="h-4 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>

              {/* Shimmer Table Rows */}
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="bg-white divide-y divide-gray-200">
                  {[1, 2, 3, 4, 5, 6, 7].map((item) => (
                    <ShimmerRow key={item} />
                  ))}
                </tbody>
              </table>

              {/* Shimmer Pagination */}
              <div className="px-4 py-4 sm:px-6 bg-white border-t border-gray-200">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <div className="h-4 w-48 bg-gray-200 rounded"></div>
                  <div className="flex space-x-2">
                    <div className="h-8 w-24 bg-gray-200 rounded-lg"></div>
                    <div className="flex space-x-1">
                      {[1, 2, 3].map((item) => (
                        <div key={item} className="h-8 w-8 bg-gray-200 rounded-lg"></div>
                      ))}
                    </div>
                    <div className="h-8 w-24 bg-gray-200 rounded-lg"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state with retry animation
  if (error) {
    return (
      <div className="flex bg-gradient-to-br from-slate-50 to-red-50 min-h-screen">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 flex flex-col md:ml-64">
          <motion.nav 
            className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20 p-4 md:p-6"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <button 
                  onClick={() => setSidebarOpen(true)}
                  className="mr-4 md:hidden text-gray-600 hover:text-gray-900"
                >
                  <FaBars className="w-5 h-5" />
                </button>
                <div>
                  <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Transactions
                  </h1>
                  <p className="text-slate-600 mt-1 text-sm md:text-base">Something went wrong</p>
                </div>
              </div>
              <motion.button 
                onClick={handleAdd}
                className="px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaPlus className="w-3 h-3 md:w-4 md:h-4" />
                <span className="text-sm md:text-base">Add Transaction</span>
              </motion.button>
            </div>
          </motion.nav>
          <div className="flex-1 flex items-center justify-center p-4">
            <motion.div 
              className="bg-white rounded-2xl shadow-xl p-6 md:p-8 text-center max-w-md w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaTimes className="w-6 h-6 md:w-8 md:h-8 text-red-600" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">Error Loading Data</h3>
              <p className="text-gray-600 text-sm md:text-base mb-6">{error}</p>
              <motion.button 
                onClick={refreshData}
                className="px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 text-sm md:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Try Again
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Enhanced Navbar */}
        <motion.nav 
          className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20 p-4 md:p-6"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex items-center"
            >
              <button 
                onClick={() => setSidebarOpen(true)}
                className="mr-4 md:hidden text-gray-600 hover:text-gray-900"
              >
                <FaBars className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Transactions
                </h1>
                <p className="text-slate-600 mt-1 text-sm md:text-base font-medium">Manage your financial transactions with ease</p>
              </div>
            </motion.div>
            <motion.button 
              onClick={handleAdd}
              className="px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 group text-sm md:text-base"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <motion.div
                animate={{ rotate: 0 }}
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.3 }}
              >
                <FaPlus className="w-3 h-3 md:w-4 md:h-4" />
              </motion.div>
              <span>Add Transaction</span>
            </motion.button>
          </div>
        </motion.nav>

        {/* Stats Cards - Responsive Grid */}
        <div className='m-2 md:m-4'>
          {filteredTransactions.length > 0 && (
            <motion.div 
              className="mt-4 md:mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <motion.div 
                className="bg-white/90 backdrop-blur-sm rounded-xl md:rounded-2xl shadow-lg border border-white/20 p-4 md:p-6"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs md:text-sm font-medium text-slate-600">Total Transactions</p>
                    <motion.p 
                      className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                    >
                      {filteredTransactions.length}
                    </motion.p>
                  </div>
                  <motion.div 
                    className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center"
                    animate={{ rotate: 360 }}
                    transition={{ delay: 0.5, duration: 2, ease: "easeInOut" }}
                  >
                    <FaEye className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white" />
                  </motion.div>
                </div>
              </motion.div>

              <motion.div 
                className="bg-white/90 backdrop-blur-sm rounded-xl md:rounded-2xl shadow-lg border border-white/20 p-4 md:p-6"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs md:text-sm font-medium text-slate-600">Total Credit</p>
                    <motion.p 
                      className="text-xl md:text-2xl lg:text-3xl font-bold text-green-600"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                    >
                      ${filteredTransactions
                        .filter(t => t.type === 'credit')
                        .reduce((sum, t) => sum + t.amount, 0)
                        .toLocaleString()}
                    </motion.p>
                  </div>
                  <motion.div 
                    className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center"
                    animate={{ y: [-2, 2, -2] }}
                    transition={{ delay: 0.6, duration: 2, repeat: Infinity }}
                  >
                    <FaArrowUp className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white" />
                  </motion.div>
                </div>
              </motion.div>

              <motion.div 
                className="bg-white/90 backdrop-blur-sm rounded-xl md:rounded-2xl shadow-lg border border-white/20 p-4 md:p-6"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs md:text-sm font-medium text-slate-600">Total Debit</p>
                    <motion.p 
                      className="text-xl md:text-2xl lg:text-3xl font-bold text-red-600"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
                    >
                      ${filteredTransactions
                        .filter(t => t.type === 'debit')
                        .reduce((sum, t) => sum + Math.abs(t.amount), 0)
                        .toLocaleString()}
                    </motion.p>
                  </div>
                  <motion.div 
                    className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center"
                    animate={{ y: [2, -2, 2] }}
                    transition={{ delay: 0.7, duration: 2, repeat: Infinity }}
                  >
                    <FaArrowDown className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white" />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>

        {/* Main Content */}
        <motion.div 
          className="flex-1 p-2 md:p-4 lg:p-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="bg-white/90 backdrop-blur-sm rounded-xl md:rounded-2xl shadow-xl border border-white/20 overflow-hidden"
            variants={cardVariants}
          >
            {/* Enhanced Search and Filter Bar */}
            <motion.div 
              className="p-4 md:p-6 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-indigo-100"
              variants={itemVariants}
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 md:gap-4">
                <div className="relative flex-1 max-w-md">
                  <motion.div 
                    className="absolute inset-y-0 left-0 pl-3 md:pl-4 flex items-center pointer-events-none"
                    animate={{ x: 0 }}
                    whileHover={{ x: 2 }}
                  >
                    <FaSearch className="text-indigo-400 w-3 h-3 md:w-4 md:h-4" />
                  </motion.div>
                  <input
                    type="text"
                    name="searchQuery"
                    value={filters.searchQuery}
                    onChange={handleFilterChange}
                    placeholder="Search transactions..."
                    className="pl-10 md:pl-12 pr-4 py-2 md:py-3 w-full border-2 border-indigo-200 rounded-lg md:rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition-all duration-300 bg-white/80 backdrop-blur-sm text-sm md:text-base"
                  />
                </div>
                <div className="flex space-x-2 md:space-x-3">
                  <motion.button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`px-3 py-2 md:px-4 md:py-3 flex items-center text-xs md:text-sm rounded-lg md:rounded-xl font-medium transition-all duration-300 ${
                      showFilters 
                        ? 'bg-indigo-600 text-white shadow-lg' 
                        : 'bg-white text-indigo-600 hover:bg-indigo-50 border-2 border-indigo-200'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      animate={{ rotate: showFilters ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FaFilter className="mr-1 md:mr-2 w-3 h-3 md:w-4 md:h-4" />
                    </motion.div>
                    Filters
                    {showFilters ? <FaChevronUp className="ml-1 md:ml-2 w-3 h-3 md:w-4 md:h-4" /> : <FaChevronDown className="ml-1 md:ml-2 w-3 h-3 md:w-4 md:h-4" />}
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Enhanced Filters Panel */}
            <AnimatePresence>
              {showFilters && (
                <motion.div 
                  className="p-4 md:p-6 bg-gradient-to-r from-slate-50 to-indigo-50 border-b border-indigo-100"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-4 md:mb-6">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <label className="block text-xs md:text-sm font-semibold text-slate-700 mb-1 md:mb-2">Category</label>
                      <select
                        name="category"
                        value={filters.category}
                        onChange={handleFilterChange}
                        className="w-full px-3 py-2 md:px-4 md:py-3 border-2 border-indigo-200 rounded-lg md:rounded-xl text-xs md:text-sm focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition-all duration-300 bg-white/80"
                      >
                        <option value="">All Categories</option>
                        <option value="shopping">🛍️ Shopping</option>
                        <option value="food">🍽️ Food</option>
                        <option value="transfer">💸 Transfer</option>
                        <option value="entertainment">🎮 Entertainment</option>
                        <option value="salary">💰 Salary</option>
                      </select>
                    </motion.div>
                    
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <label className="block text-xs md:text-sm font-semibold text-slate-700 mb-1 md:mb-2">Start Date</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaCalendarAlt className="text-indigo-400 w-3 h-3 md:w-4 md:h-4" />
                        </div>
                        <input
                          type="date"
                          name="startDate"
                          value={filters.startDate}
                          onChange={handleFilterChange}
                          className="w-full pl-9 md:pl-12 pr-3 py-2 md:py-3 border-2 border-indigo-200 rounded-lg md:rounded-xl text-xs md:text-sm focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition-all duration-300 bg-white/80"
                        />
                      </div>
                    </motion.div>
                    
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <label className="block text-xs md:text-sm font-semibold text-slate-700 mb-1 md:mb-2">End Date</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaCalendarAlt className="text-indigo-400 w-3 h-3 md:w-4 md:h-4" />
                        </div>
                        <input
                          type="date"
                          name="endDate"
                          value={filters.endDate}
                          onChange={handleFilterChange}
                          className="w-full pl-9 md:pl-12 pr-3 py-2 md:py-3 border-2 border-indigo-200 rounded-lg md:rounded-xl text-xs md:text-sm focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition-all duration-300 bg-white/80"
                        />
                      </div>
                    </motion.div>
                    
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <label className="block text-xs md:text-sm font-semibold text-slate-700 mb-1 md:mb-2">Amount Range</label>
                      <div className="flex space-x-1 md:space-x-2">
                        <div className="relative flex-1">
                          <div className="absolute inset-y-0 left-0 pl-2 md:pl-3 flex items-center pointer-events-none">
                            <FaMoneyBillWave className="text-indigo-400 text-xs w-2 h-2 md:w-3 md:h-3" />
                          </div>
                          <input
                            type="number"
                            name="minAmount"
                            placeholder="Min"
                            value={filters.minAmount}
                            onChange={handleFilterChange}
                            className="w-full pl-7 md:pl-10 pr-2 md:pr-3 py-2 md:py-3 border-2 border-indigo-200 rounded-lg md:rounded-xl text-xs md:text-sm focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition-all duration-300 bg-white/80"
                          />
                        </div>
                        <div className="relative flex-1">
                          <div className="absolute inset-y-0 left-0 pl-2 md:pl-3 flex items-center pointer-events-none">
                            <FaMoneyBillWave className="text-indigo-400 text-xs w-2 h-2 md:w-3 md:h-3" />
                          </div>
                          <input
                            type="number"
                            name="maxAmount"
                            placeholder="Max"
                            value={filters.maxAmount}
                            onChange={handleFilterChange}
                            className="w-full pl-7 md:pl-10 pr-2 md:pr-3 py-2 md:py-3 border-2 border-indigo-200 rounded-lg md:rounded-xl text-xs md:text-sm focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition-all duration-300 bg-white/80"
                          />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                  
                  <motion.div 
                    className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 md:gap-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <motion.button
                      onClick={resetFilters}
                      className="text-xs md:text-sm text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Clear all filters
                    </motion.button>
                    <motion.button
                      onClick={() => setShowFilters(false)}
                      className="px-4 py-2 md:px-6 md:py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg md:rounded-xl text-xs md:text-sm font-medium hover:shadow-lg transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Apply Filters
                    </motion.button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Enhanced Transaction Tabs */}
            <motion.div 
              className="px-4 pt-4 md:px-6 md:pt-6 flex space-x-1 border-b border-indigo-100 overflow-x-auto"
              variants={itemVariants}
            >
              {['All Transactions', 'Debit', 'Credit'].map((tab, index) => (
                <motion.button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 md:px-6 md:py-3 text-xs md:text-sm font-semibold relative rounded-t-lg md:rounded-t-xl transition-all duration-300 whitespace-nowrap ${
                    activeTab === tab
                      ? 'text-indigo-600 bg-indigo-50'
                      : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-t-lg"
                      layoutId="underline"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.button>
              ))}
            </motion.div>

            {/* Enhanced Transactions Display */}
            {filteredTransactions.length === 0 ? (
              <motion.div 
                className="p-6 md:p-12 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div 
                  className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 mx-auto mb-4 md:mb-6 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <FaMoneyBillWave className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-indigo-400" />
                </motion.div>
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-slate-900 mb-2">No transactions found</h3>
                <p className="text-slate-600 text-sm md:text-base mb-6 max-w-md mx-auto">
                  {Object.values(filters).some(Boolean) 
                    ? "No transactions match your current filters. Try adjusting your search criteria." 
                    : "Start building your financial history by adding your first transaction."}
                </p>
                {Object.values(filters).some(Boolean) ? (
                  <motion.button
                    onClick={resetFilters}
                    className="px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg md:rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 text-sm md:text-base"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Clear Filters
                  </motion.button>
                ) : (
                  <motion.button
                    onClick={handleAdd}
                    className="px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg md:rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 mx-auto text-sm md:text-base"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaPlus className="w-3 h-3 md:w-4 md:h-4" />
                    <span>Add Your First Transaction</span>
                  </motion.button>
                )}
              </motion.div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-slate-50 to-indigo-50">
                      <th 
                        className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider cursor-pointer hover:bg-indigo-100 transition-colors duration-200 group"
                        onClick={() => handleSort('transaction_name')}
                      >
                        <div className="flex items-center space-x-1 md:space-x-2">
                          <span>Name</span>
                          <motion.div
                            animate={{ rotate: sortConfig.key === 'transaction_name' && sortConfig.direction === 'desc' ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <FaSort className="text-xs opacity-50 group-hover:opacity-100 transition-opacity" />
                          </motion.div>
                        </div>
                      </th>
                      <th 
                        className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider cursor-pointer hover:bg-indigo-100 transition-colors duration-200 group"
                        onClick={() => handleSort('category')}
                      >
                        <div className="flex items-center space-x-1 md:space-x-2">
                          <span>Category</span>
                          <motion.div
                            animate={{ rotate: sortConfig.key === 'category' && sortConfig.direction === 'desc' ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <FaSort className="text-xs opacity-50 group-hover:opacity-100 transition-opacity" />
                          </motion.div>
                        </div>
                      </th>
                      <th 
                        className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider cursor-pointer hover:bg-indigo-100 transition-colors duration-200 group"
                        onClick={() => handleSort('type')}
                      >
                        <div className="flex items-center space-x-1 md:space-x-2">
                          <span>Type</span>
                          <motion.div
                            animate={{ rotate: sortConfig.key === 'type' && sortConfig.direction === 'desc' ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <FaSort className="text-xs opacity-50 group-hover:opacity-100 transition-opacity" />
                          </motion.div>
                        </div>
                      </th>
                      <th 
                        className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider cursor-pointer hover:bg-indigo-100 transition-colors duration-200 group"
                        onClick={() => handleSort('date')}
                      >
                        <div className="flex items-center space-x-1 md:space-x-2">
                          <span>Date</span>
                          <motion.div
                            animate={{ rotate: sortConfig.key === 'date' && sortConfig.direction === 'desc' ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <FaSort className="text-xs opacity-50 group-hover:opacity-100 transition-opacity" />
                          </motion.div>
                          {sortConfig.key === 'date' && (
                            <motion.span 
                              className="text-indigo-600 font-bold"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.2 }}
                            >
                              {sortConfig.direction === 'asc' ? '↑' : '↓'}
                            </motion.span>
                          )}
                        </div>
                      </th>
                      <th 
                        className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider cursor-pointer hover:bg-indigo-100 transition-colors duration-200 group"
                        onClick={() => handleSort('amount')}
                      >
                        <div className="flex items-center space-x-1 md:space-x-2">
                          <span>Amount</span>
                          <motion.div
                            animate={{ rotate: sortConfig.key === 'amount' && sortConfig.direction === 'desc' ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <FaSort className="text-xs opacity-50 group-hover:opacity-100 transition-opacity" />
                          </motion.div>
                          {sortConfig.key === 'amount' && (
                            <motion.span 
                              className="text-indigo-600 font-bold"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.2 }}
                            >
                              {sortConfig.direction === 'asc' ? '↑' : '↓'}
                            </motion.span>
                          )}
                        </div>
                      </th>
                      <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-100">
                    <AnimatePresence mode="popLayout">
                      {currentTransactions.map((transaction, index) => (
                        <motion.tr 
                          key={transaction.id}
                          layout
                          initial={{ opacity: 0, y: 20, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -20, scale: 0.95 }}
                          transition={{ 
                            delay: index * 0.05, 
                            duration: 0.4,
                            ease: "easeOut"
                          }}
                          className="hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-300 group"
                          whileHover={{ scale: 1.01 }}
                        >
                          <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2 md:space-x-3">
                              <motion.div 
                                className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center ${getCategoryColor(transaction.category)}`}
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                transition={{ duration: 0.2 }}
                              >
                                {getCategoryIcon(transaction.category)}
                              </motion.div>
                              <div>
                                <div className="text-xs md:text-sm font-semibold text-slate-900 group-hover:text-indigo-900 transition-colors">
                                  {transaction.transaction_name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">
                            <motion.span 
                              className={`px-2 py-1 md:px-3 md:py-1 inline-flex text-xs leading-4 md:leading-5 font-semibold rounded-full ${getCategoryColor(transaction.category)}`}
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.2 }}
                            >
                              {transaction.category}
                            </motion.span>
                          </td>
                          <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">
                            <motion.div 
                              className="flex items-center space-x-1 md:space-x-2"
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.2 }}
                            >
                              <motion.div
                                animate={{ 
                                  rotate: transaction.type === 'credit' ? 0 : 180 
                                }}
                                transition={{ duration: 0.3 }}
                              >
                                {transaction.type === 'credit' ? (
                                  <FaArrowUp className="w-2 h-2 md:w-3 md:h-3 text-green-600" />
                                ) : (
                                  <FaArrowDown className="w-2 h-2 md:w-3 md:h-3 text-red-600" />
                                )}
                              </motion.div>
                              <span className={`px-2 py-1 md:px-3 md:py-1 inline-flex text-xs leading-4 md:leading-5 font-semibold rounded-full ${
                                transaction.type === 'credit' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {transaction.type}
                              </span>
                            </motion.div>
                          </td>
                          <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-1 md:space-x-2 text-xs md:text-sm text-slate-600">
                              <FaCalendarAlt className="w-2 h-2 md:w-3 md:h-3 text-slate-400" />
                              <span>{formatDate(transaction.date)}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">
                            <motion.div 
                              className={`text-sm md:text-lg font-bold flex items-center space-x-1 ${
                                transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                              }`}
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.2 }}
                            >
                              <span>{transaction.type === 'credit' ? '+' : '-'}</span>
                              <FaDollarSign className="w-3 h-3 md:w-4 md:h-4" />
                              <span>{Math.abs(transaction.amount).toLocaleString()}</span>
                            </motion.div>
                          </td>
                          <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-xs md:text-sm text-slate-500">
                            <div className="flex space-x-1 md:space-x-2">
                              <motion.button
                                onClick={() => handleEdit(transaction)}
                                className="p-1 md:p-2 text-indigo-600 hover:text-indigo-900 hover:bg-indigo-100 rounded-full transition-all duration-200"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                whileTap={{ scale: 0.9 }}
                                aria-label="Edit transaction"
                              >
                                <FaEdit className="w-3 h-3 md:w-4 md:h-4" />
                              </motion.button>
                              <motion.button
                                onClick={() => handleDelete(transaction)}
                                className="p-1 md:p-2 text-red-600 hover:text-red-900 hover:bg-red-100 rounded-full transition-all duration-200"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                whileTap={{ scale: 0.9 }}
                                aria-label="Delete transaction"
                              >
                                <FaTrash className="w-3 h-3 md:w-4 md:h-4" />
                              </motion.button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>

                {/* Pagination */}
                {filteredTransactions.length > transactionsPerPage && (
                  <motion.div 
                    className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 bg-white border-t border-slate-100"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="text-xs md:text-sm text-slate-600">
                      Showing <span className="font-semibold">{indexOfFirstTransaction + 1}</span> to{' '}
                      <span className="font-semibold">
                        {indexOfLastTransaction > filteredTransactions.length 
                          ? filteredTransactions.length 
                          : indexOfLastTransaction}
                      </span>{' '}
                      of <span className="font-semibold">{filteredTransactions.length}</span> transactions
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <motion.button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-2 py-1 md:px-3 md:py-1 rounded-lg flex items-center space-x-1 text-xs md:text-sm ${
                          currentPage === 1 
                            ? 'text-slate-400 cursor-not-allowed' 
                            : 'text-indigo-600 hover:bg-indigo-50'
                        }`}
                        whileHover={currentPage !== 1 ? { scale: 1.05 } : {}}
                        whileTap={currentPage !== 1 ? { scale: 0.95 } : {}}
                      >
                        <FaChevronLeft className="w-2 h-2 md:w-3 md:h-3" />
                        <span>Previous</span>
                      </motion.button>
                      
                      {/* Page numbers */}
                      <div className="flex space-x-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                          <motion.button
                            key={number}
                            onClick={() => paginate(number)}
                            className={`w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded-lg text-xs md:text-sm ${
                              currentPage === number
                                ? 'bg-indigo-600 text-white shadow-md'
                                : 'text-slate-600 hover:bg-slate-100'
                            }`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {number}
                          </motion.button>
                        ))}
                      </div>
                      
                      <motion.button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-2 py-1 md:px-3 md:py-1 rounded-lg flex items-center space-x-1 text-xs md:text-sm ${
                          currentPage === totalPages 
                            ? 'text-slate-400 cursor-not-allowed' 
                            : 'text-indigo-600 hover:bg-indigo-50'
                        }`}
                        whileHover={currentPage !== totalPages ? { scale: 1.05 } : {}}
                        whileTap={currentPage !== totalPages ? { scale: 0.95 } : {}}
                      >
                        <span>Next</span>
                        <FaChevronRight className="w-2 h-2 md:w-3 md:h-3" />
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Modals */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <TransactionForm
              isOpen={showAddForm}
              onClose={() => setShowAddForm(false)}
              onSubmit={addTransaction}
            />
          </motion.div>
        )}

        {showEditForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <TransactionForm
              isOpen={showEditForm}
              onClose={() => {
                setShowEditForm(false);
                setSelectedTransaction(null);
              }}
              onSubmit={updateTransaction}
              initialData={selectedTransaction || {}}
              isEdit={true}
            />
          </motion.div>
        )}

        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <DeleteConfirmation
              isOpen={showDeleteConfirm}
              onClose={() => {
                setShowDeleteConfirm(false);
                setSelectedTransaction(null);
              }}
              onConfirm={handleDeleteConfirmed}
              transactionName={selectedTransaction?.transaction_name || ''}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Transactions;