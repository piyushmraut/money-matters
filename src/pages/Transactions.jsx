// import { useState, useEffect } from "react";
// import Sidebar from "../components/Sidebar";
// import { useAuth } from "../context/AuthContext";

// const Transactions = () => {
//   const { user } = useAuth();
//   const [activeTab, setActiveTab] = useState("all");
//   const [transactions, setTransactions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [totals, setTotals] = useState({ credit: 0, debit: 0 });
//   const [last7Days, setLast7Days] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
        
//         // Fetch all transactions
//         const transactionsResponse = await fetch(
//           "https://bursting-gelding-24.hasura.app/api/rest/all-transactions",
//           {
//             headers: {
//               "content-type": "application/json",
//               "x-hasura-admin-secret": "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF"
//             }
//           }
//         );
//         const transactionsData = await transactionsResponse.json();
//         setTransactions(transactionsData.transactions || []);

//         // Fetch credit/debit totals
//         const totalsResponse = await fetch(
//           "https://bursting-gelding-24.hasura.app/api/rest/credit-debit-totals",
//           {
//             headers: {
//               "content-type": "application/json",
//               "x-hasura-admin-secret": "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF"
//             }
//           }
//         );
//         const totalsData = await totalsResponse.json();
//         setTotals(totalsData.totals || { credit: 0, debit: 0 });

//         // Fetch last 7 days data
//         const last7DaysResponse = await fetch(
//           "https://bursting-gelding-24.hasura.app/api/rest/daywise-totals-7-days",
//           {
//             headers: {
//               "content-type": "application/json",
//               "x-hasura-admin-secret": "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF"
//             }
//           }
//         );
//         const last7DaysData = await last7DaysResponse.json();
//         setLast7Days(last7DaysData.last_7_days_transactions || []);

//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const filteredTransactions = () => {
//     switch (activeTab) {
//       case "credit":
//         return transactions.filter((t) => t.type === "credit");
//       case "debit":
//         return transactions.filter((t) => t.type === "debit");
//       default:
//         return transactions;
//     }
//   };

//   const formatDate = (dateString) => {
//     const options = { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" };
//     return new Date(dateString).toLocaleDateString("en-US", options);
//   };

//   if (loading) {
//     return (
//       <div className="flex">
//         <Sidebar />
//         <div className="flex-1 ml-64 p-8">
//           <div className="flex justify-center items-center h-64">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex">
//         <Sidebar />
//         <div className="flex-1 ml-64 p-8">
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
//             Error: {error}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="flex-1 ml-64 p-8">
//         <h1 className="text-3xl font-bold text-gray-800 mb-8">Transactions</h1>

//         <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-lg font-semibold text-gray-700">
//               Transaction Summary
//             </h2>
//           </div>
//           <div className="grid grid-cols-3 gap-4 mb-6">
//             <div className="bg-blue-50 p-4 rounded-lg">
//               <p className="text-sm text-gray-500">Total Credit</p>
//               <p className="text-2xl font-bold text-green-500">
//                 ${totals.credit}
//               </p>
//             </div>
//             <div className="bg-blue-50 p-4 rounded-lg">
//               <p className="text-sm text-gray-500">Total Debit</p>
//               <p className="text-2xl font-bold text-red-500">
//                 ${totals.debit}
//               </p>
//             </div>
//             <div className="bg-blue-50 p-4 rounded-lg">
//               <p className="text-sm text-gray-500">Balance</p>
//               <p className="text-2xl font-bold text-indigo-500">
//                 ${totals.credit - totals.debit}
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-xl shadow-sm">
//           <div className="flex justify-between items-center mb-6">
//             <div className="flex space-x-4">
//               <button
//                 onClick={() => setActiveTab("all")}
//                 className={`px-4 py-2 rounded-md text-sm font-medium ${
//                   activeTab === "all"
//                     ? "bg-indigo-100 text-indigo-700"
//                     : "text-gray-500 hover:bg-gray-100"
//                 }`}
//               >
//                 All Transactions
//               </button>
//               <button
//                 onClick={() => setActiveTab("credit")}
//                 className={`px-4 py-2 rounded-md text-sm font-medium ${
//                   activeTab === "credit"
//                     ? "bg-indigo-100 text-indigo-700"
//                     : "text-gray-500 hover:bg-gray-100"
//                 }`}
//               >
//                 Credit
//               </button>
//               <button
//                 onClick={() => setActiveTab("debit")}
//                 className={`px-4 py-2 rounded-md text-sm font-medium ${
//                   activeTab === "debit"
//                     ? "bg-indigo-100 text-indigo-700"
//                     : "text-gray-500 hover:bg-gray-100"
//                 }`}
//               >
//                 Debit
//               </button>
//             </div>
//             <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm">
//               Add Transaction
//             </button>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Name
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Type
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Date
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Amount
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {filteredTransactions().length > 0 ? (
//                   filteredTransactions().map((transaction) => (
//                     <tr key={transaction.id}>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                         {transaction.name}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
//                         {transaction.type}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {formatDate(transaction.date)}
//                       </td>
//                       <td
//                         className={`px-6 py-4 whitespace-nowrap text-sm ${
//                           transaction.type === "credit"
//                             ? "text-green-500"
//                             : "text-red-500"
//                         }`}
//                       >
//                         {transaction.type === "credit" ? "+" : "-"}$
//                         {transaction.amount}
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
//                       No transactions found
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Transactions;

// import React, { useState, useEffect } from "react";
// import Sidebar from "../components/Sidebar";
// import { useAuth } from "../context/AuthContext";
// import { FiDownload, FiFilter, FiSearch, FiChevronDown, FiChevronUp, FiPlus } from "react-icons/fi";
// // import AddTransactionModal from "../components/AddTransactionModal";

// const API_ENDPOINTS = {
//   ALL_TRANSACTIONS: "https://bursting-gelding-24.hasura.app/api/rest/all-transactions",
//   CREDIT_DEBIT_TOTALS: "https://bursting-gelding-24.hasura.app/api/rest/credit-debit-totals",
//   LAST_7_DAYS: "https://bursting-gelding-24.hasura.app/api/rest/daywise-totals-7-days"
// };

// const Transactions = () => {
//   const { user } = useAuth();
//   const [activeTab, setActiveTab] = useState("all");
//   const [sortConfig, setSortConfig] = useState({ key: "date", direction: "desc" });
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [transactions, setTransactions] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [pagination, setPagination] = useState({ limit: 10, offset: 0 });
//   const [totals, setTotals] = useState({ credit: 0, debit: 0 });
//   const [last7DaysTotals, setLast7DaysTotals] = useState([]);

//   const fetchTransactions = async () => {
//     setIsLoading(true);
//     try {
//       const response = await fetch(`${API_ENDPOINTS.ALL_TRANSACTIONS}?limit=${pagination.limit}&offset=${pagination.offset}`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           "x-hasura-admin-secret": "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF"
//         }
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to fetch transactions: ${response.status}`);
//       }

//       const data = await response.json();
//       setTransactions(data.transactions || []);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fetchTotals = async () => {
//     try {
//       const response = await fetch(API_ENDPOINTS.CREDIT_DEBIT_TOTALS, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           "x-hasura-admin-secret": "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF"
//         }
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to fetch totals: ${response.status}`);
//       }

//       const data = await response.json();
//       setTotals(data.totals || { credit: 0, debit: 0 });
//     } catch (err) {
//       console.error("Error fetching totals:", err);
//       // Fallback to calculating from transactions
//       const creditTotal = transactions
//         .filter(t => t.type === "credit")
//         .reduce((sum, t) => sum + t.amount, 0);
        
//       const debitTotal = transactions
//         .filter(t => t.type === "debit")
//         .reduce((sum, t) => sum + t.amount, 0);
        
//       setTotals({ credit: creditTotal, debit: debitTotal });
//     }
//   };

//   const fetchLast7DaysTotals = async () => {
//     try {
//       const response = await fetch(API_ENDPOINTS.LAST_7_DAYS, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           "x-hasura-admin-secret": "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF"
//         }
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to fetch last 7 days totals: ${response.status}`);
//       }

//       const data = await response.json();
//       setLast7DaysTotals(data.last_7_days_transactions || []);
//     } catch (err) {
//       console.error("Error fetching last 7 days totals:", err);
//       setLast7DaysTotals([]);
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         await fetchTransactions();
//         await fetchTotals();
//         await fetchLast7DaysTotals();
//       } catch (err) {
//         setError(err.message);
//       }
//     };
    
//     fetchData();
//   }, [pagination]);

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       day: "numeric",
//       month: "short",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const filteredTransactions = transactions
//     .filter(transaction => {
//       if (activeTab === "all") return true;
//       return transaction.type === activeTab;
//     })
//     .filter(transaction => {
//       if (!searchTerm) return true;
//       return (
//         transaction.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         transaction.type?.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     })
//     .sort((a, b) => {
//       if (sortConfig.key === "date") {
//         const dateA = new Date(a.date);
//         const dateB = new Date(b.date);
//         return sortConfig.direction === "asc" ? dateA - dateB : dateB - dateA;
//       } else if (sortConfig.key === "amount") {
//         return sortConfig.direction === "asc" ? a.amount - b.amount : b.amount - a.amount;
//       } else {
//         return 0;
//       }
//     });

//   const requestSort = (key) => {
//     let direction = "asc";
//     if (sortConfig.key === key && sortConfig.direction === "asc") {
//       direction = "desc";
//     }
//     setSortConfig({ key, direction });
//   };

//   const getSortIcon = (key) => {
//     if (sortConfig.key !== key) return null;
//     return sortConfig.direction === "asc" ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />;
//   };

//   const handlePagination = (direction) => {
//     if (direction === "next") {
//       setPagination(prev => ({ ...prev, offset: prev.offset + prev.limit }));
//     } else {
//       setPagination(prev => ({ ...prev, offset: Math.max(0, prev.offset - prev.limit) }));
//     }
//   };

//   if (isLoading && pagination.offset === 0) {
//     return (
//       <div className="flex">
//         <Sidebar />
//         <div className="flex-1 ml-64 p-8">
//           <div className="flex justify-center items-center h-64">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex">
//         <Sidebar />
//         <div className="flex-1 ml-64 p-8">
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
//             <strong className="font-bold">Error: </strong>
//             <span className="block sm:inline">{error}</span>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="flex-1 ml-64 p-8">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-800">Transactions</h1>
//           <div className="flex items-center space-x-4">
//             <button 
//               className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
//               onClick={() => setIsModalOpen(true)}
//             >
//               <FiPlus className="mr-2" />
//               Add Transaction
//             </button>
//             <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
//               <FiDownload className="mr-2" />
//               Export
//             </button>
//             <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
//               <FiFilter className="mr-2" />
//               Filter
//             </button>
//           </div>
//         </div>

//         {/* Summary Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <div className="bg-white p-6 rounded-lg shadow">
//             <h3 className="text-lg font-medium text-gray-500">Total Balance</h3>
//             <p className="text-2xl font-bold text-gray-800">
//               ${(totals.credit - totals.debit).toLocaleString()}
//             </p>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow">
//             <h3 className="text-lg font-medium text-gray-500">Total Credit</h3>
//             <p className="text-2xl font-bold text-green-600">
//               ${totals.credit.toLocaleString()}
//             </p>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow">
//             <h3 className="text-lg font-medium text-gray-500">Total Debit</h3>
//             <p className="text-2xl font-bold text-red-600">
//               ${totals.debit.toLocaleString()}
//             </p>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow overflow-hidden mb-6">
//           <div className="flex border-b border-gray-200">
//             <button
//               className={`px-6 py-4 font-medium ${activeTab === "all" ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-500"}`}
//               onClick={() => setActiveTab("all")}
//             >
//               All Transactions
//             </button>
//             <button
//               className={`px-6 py-4 font-medium ${activeTab === "debit" ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-500"}`}
//               onClick={() => setActiveTab("debit")}
//             >
//               Debit
//             </button>
//             <button
//               className={`px-6 py-4 font-medium ${activeTab === "credit" ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-500"}`}
//               onClick={() => setActiveTab("credit")}
//             >
//               Credit
//             </button>
//           </div>

//           <div className="p-4 border-b border-gray-200">
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <FiSearch className="text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                 placeholder="Search transactions..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                     onClick={() => requestSort("name")}
//                   >
//                     <div className="flex items-center">
//                       Transaction Name
//                       {getSortIcon("name")}
//                     </div>
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                     onClick={() => requestSort("type")}
//                   >
//                     <div className="flex items-center">
//                       Category
//                       {getSortIcon("type")}
//                     </div>
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                     onClick={() => requestSort("date")}
//                   >
//                     <div className="flex items-center">
//                       Date
//                       {getSortIcon("date")}
//                     </div>
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                     onClick={() => requestSort("amount")}
//                   >
//                     <div className="flex items-center">
//                       Amount
//                       {getSortIcon("amount")}
//                     </div>
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {filteredTransactions.length > 0 ? (
//                   filteredTransactions.map((transaction) => (
//                     <tr key={transaction.id} className="hover:bg-gray-50">
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center">
//                           <div className="ml-4">
//                             <div className="text-sm font-medium text-gray-900">{transaction.name}</div>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-gray-500 capitalize">{transaction.type}</div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-gray-500">{formatDate(transaction.date)}</div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div
//                           className={`text-sm font-medium ${
//                             transaction.type === "credit" ? "text-green-600" : "text-red-600"
//                           }`}
//                         >
//                           {transaction.type === "credit" ? "+" : "-"}${Math.abs(transaction.amount).toLocaleString()}
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
//                       No transactions found matching your criteria
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           <div className="px-6 py-4 bg-gray-50 flex items-center justify-between border-t border-gray-200">
//             <div className="flex-1 flex justify-between items-center">
//               <button
//                 onClick={() => handlePagination("prev")}
//                 disabled={pagination.offset === 0}
//                 className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
//                   pagination.offset === 0 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-50"
//                 }`}
//               >
//                 Previous
//               </button>
//               <span className="text-sm text-gray-700">
//                 Showing <span className="font-medium">{pagination.offset + 1}</span> to{" "}
//                 <span className="font-medium">{Math.min(pagination.offset + pagination.limit, pagination.offset + filteredTransactions.length)}</span>
//               </span>
//               <button
//                 onClick={() => handlePagination("next")}
//                 disabled={filteredTransactions.length < pagination.limit}
//                 className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
//                   filteredTransactions.length < pagination.limit ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-50"
//                 }`}
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         </div>

       
//       </div>
//     </div>
//   );
// };

// export default Transactions;


// import React, { useState, useEffect } from "react";
// import Sidebar from "../components/Sidebar";
// import { useAuth } from "../context/AuthContext";
// import { FiDownload, FiFilter, FiSearch, FiChevronDown, FiChevronUp, FiPlus } from "react-icons/fi";
// import AddTransactionModal from "../components/AddTransactionModal";

// const API_ENDPOINTS = {
//   ALL_TRANSACTIONS: "https://bursting-gelding-24.hasura.app/api/rest/all-transactions",
//   CREDIT_DEBIT_TOTALS: "https://bursting-gelding-24.hasura.app/api/rest/credit-debit-totals",
//   LAST_7_DAYS: "https://bursting-gelding-24.hasura.app/api/rest/daywise-totals-7-days",
//   ADD_TRANSACTION: "https://bursting-gelding-24.hasura.app/api/rest/add-transaction"
// };

// const Transactions = () => {
//   const { user } = useAuth();
//   const [activeTab, setActiveTab] = useState("all");
//   const [sortConfig, setSortConfig] = useState({ key: "date", direction: "desc" });
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [transactions, setTransactions] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [pagination, setPagination] = useState({ limit: 10, offset: 0 });
//   const [totals, setTotals] = useState({ credit: 0, debit: 0 });
//   const [last7DaysTotals, setLast7DaysTotals] = useState([]);

//   const fetchTransactions = async () => {
//     setIsLoading(true);
//     try {
//       const response = await fetch(`${API_ENDPOINTS.ALL_TRANSACTIONS}?limit=${pagination.limit}&offset=${pagination.offset}`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           "x-hasura-admin-secret": "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF"
//         }
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to fetch transactions: ${response.status}`);
//       }

//       const data = await response.json();
//       setTransactions(data.transactions || []);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fetchTotals = async () => {
//     try {
//       const response = await fetch(API_ENDPOINTS.CREDIT_DEBIT_TOTALS, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           "x-hasura-admin-secret": "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF"
//         }
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to fetch totals: ${response.status}`);
//       }

//       const data = await response.json();
//       setTotals(data.totals || { credit: 0, debit: 0 });
//     } catch (err) {
//       console.error("Error fetching totals:", err);
//       // Fallback to calculating from transactions
//       const creditTotal = transactions
//         .filter(t => t.type === "credit")
//         .reduce((sum, t) => sum + t.amount, 0);
        
//       const debitTotal = transactions
//         .filter(t => t.type === "debit")
//         .reduce((sum, t) => sum + t.amount, 0);
        
//       setTotals({ credit: creditTotal, debit: debitTotal });
//     }
//   };

//   const fetchLast7DaysTotals = async () => {
//     try {
//       const response = await fetch(API_ENDPOINTS.LAST_7_DAYS, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           "x-hasura-admin-secret": "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF"
//         }
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to fetch last 7 days totals: ${response.status}`);
//       }

//       const data = await response.json();
//       setLast7DaysTotals(data.last_7_days_transactions || []);
//     } catch (err) {
//       console.error("Error fetching last 7 days totals:", err);
//       setLast7DaysTotals([]);
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         await fetchTransactions();
//         await fetchTotals();
//         await fetchLast7DaysTotals();
//       } catch (err) {
//         setError(err.message);
//       }
//     };
    
//     fetchData();
//   }, [pagination]);

//   const refreshData = () => {
//     fetchTransactions();
//     fetchTotals();
//     fetchLast7DaysTotals();
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       day: "numeric",
//       month: "short",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const filteredTransactions = transactions
//     .filter(transaction => {
//       if (activeTab === "all") return true;
//       return transaction.type === activeTab;
//     })
//     .filter(transaction => {
//       if (!searchTerm) return true;
//       return (
//         transaction.transaction_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         transaction.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         transaction.type?.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     })
//     .sort((a, b) => {
//       if (sortConfig.key === "date") {
//         const dateA = new Date(a.date);
//         const dateB = new Date(b.date);
//         return sortConfig.direction === "asc" ? dateA - dateB : dateB - dateA;
//       } else if (sortConfig.key === "amount") {
//         return sortConfig.direction === "asc" ? a.amount - b.amount : b.amount - a.amount;
//       } else {
//         return 0;
//       }
//     });

//   const requestSort = (key) => {
//     let direction = "asc";
//     if (sortConfig.key === key && sortConfig.direction === "asc") {
//       direction = "desc";
//     }
//     setSortConfig({ key, direction });
//   };

//   const getSortIcon = (key) => {
//     if (sortConfig.key !== key) return null;
//     return sortConfig.direction === "asc" ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />;
//   };

//   const handlePagination = (direction) => {
//     if (direction === "next") {
//       setPagination(prev => ({ ...prev, offset: prev.offset + prev.limit }));
//     } else {
//       setPagination(prev => ({ ...prev, offset: Math.max(0, prev.offset - prev.limit) }));
//     }
//   };

//   if (isLoading && pagination.offset === 0) {
//     return (
//       <div className="flex">
//         <Sidebar />
//         <div className="flex-1 ml-64 p-8">
//           <div className="flex justify-center items-center h-64">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex">
//         <Sidebar />
//         <div className="flex-1 ml-64 p-8">
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
//             <strong className="font-bold">Error: </strong>
//             <span className="block sm:inline">{error}</span>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="flex-1 ml-64 p-8">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-800">Transactions</h1>
//           <div className="flex items-center space-x-4">
//             <button 
//               className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
//               onClick={() => setIsModalOpen(true)}
//             >
//               <FiPlus className="mr-2" />
//               Add Transaction
//             </button>
//             <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
//               <FiDownload className="mr-2" />
//               Export
//             </button>
//             <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
//               <FiFilter className="mr-2" />
//               Filter
//             </button>
//           </div>
//         </div>


//         <div className="bg-white rounded-xl shadow overflow-hidden mb-6">
//           <div className="flex border-b border-gray-200">
//             <button
//               className={`px-6 py-4 font-medium ${activeTab === "all" ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-500"}`}
//               onClick={() => setActiveTab("all")}
//             >
//               All Transactions
//             </button>
//             <button
//               className={`px-6 py-4 font-medium ${activeTab === "debit" ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-500"}`}
//               onClick={() => setActiveTab("debit")}
//             >
//               Debit
//             </button>
//             <button
//               className={`px-6 py-4 font-medium ${activeTab === "credit" ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-500"}`}
//               onClick={() => setActiveTab("credit")}
//             >
//               Credit
//             </button>
//           </div>

//           <div className="p-4 border-b border-gray-200">
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <FiSearch className="text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                 placeholder="Search transactions..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                     onClick={() => requestSort("transaction_name")}
//                   >
//                     <div className="flex items-center">
//                       Transaction Name
//                       {getSortIcon("transaction_name")}
//                     </div>
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                     onClick={() => requestSort("category")}
//                   >
//                     <div className="flex items-center">
//                       Category
//                       {getSortIcon("category")}
//                     </div>
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                     onClick={() => requestSort("date")}
//                   >
//                     <div className="flex items-center">
//                       Date
//                       {getSortIcon("date")}
//                     </div>
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                     onClick={() => requestSort("amount")}
//                   >
//                     <div className="flex items-center">
//                       Amount
//                       {getSortIcon("amount")}
//                     </div>
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {filteredTransactions.length > 0 ? (
//                   filteredTransactions.map((transaction) => (
//                     <tr key={transaction.id} className="hover:bg-gray-50">
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center">
//                           <div className="ml-4">
//                             <div className="text-sm font-medium text-gray-900">
//                               {transaction.transaction_name || "Unnamed Transaction"}
//                             </div>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-gray-500 capitalize">
//                           {transaction.category || transaction.type}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-gray-500">{formatDate(transaction.date)}</div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div
//                           className={`text-sm font-medium ${
//                             transaction.type === "credit" ? "text-green-600" : "text-red-600"
//                           }`}
//                         >
//                           {transaction.type === "credit" ? "+" : "-"}${Math.abs(transaction.amount).toLocaleString()}
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
//                       No transactions found matching your criteria
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           <div className="px-6 py-4 bg-gray-50 flex items-center justify-between border-t border-gray-200">
//             <div className="flex-1 flex justify-between items-center">
//               <button
//                 onClick={() => handlePagination("prev")}
//                 disabled={pagination.offset === 0}
//                 className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
//                   pagination.offset === 0 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-50"
//                 }`}
//               >
//                 Previous
//               </button>
//               <span className="text-sm text-gray-700">
//                 Showing <span className="font-medium">{pagination.offset + 1}</span> to{" "}
//                 <span className="font-medium">{Math.min(pagination.offset + pagination.limit, pagination.offset + filteredTransactions.length)}</span>
//               </span>
//               <button
//                 onClick={() => handlePagination("next")}
//                 disabled={filteredTransactions.length < pagination.limit}
//                 className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
//                   filteredTransactions.length < pagination.limit ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-50"
//                 }`}
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         </div>

//         <AddTransactionModal 
//           isOpen={isModalOpen} 
//           onClose={() => setIsModalOpen(false)}
//           onTransactionAdded={refreshData}
//           apiEndpoint={API_ENDPOINTS.ADD_TRANSACTION}
//         />
//       </div>
//     </div>
//   );
// };

// export default Transactions;

import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";
import { FiDownload, FiFilter, FiSearch, FiChevronDown, FiChevronUp, FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import AddTransactionModal from "../components/AddTransactionModal";
import EditTransactionModal from "../components/EditTransactionModal";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";



const API_ENDPOINTS = {
  ALL_TRANSACTIONS: "https://bursting-gelding-24.hasura.app/api/rest/all-transactions",
  CREDIT_DEBIT_TOTALS: "https://bursting-gelding-24.hasura.app/api/rest/credit-debit-totals",
  LAST_7_DAYS: "https://bursting-gelding-24.hasura.app/api/rest/daywise-totals-7-days",
  ADD_TRANSACTION: "https://bursting-gelding-24.hasura.app/api/rest/add-transaction",
  UPDATE_TRANSACTION: "https://bursting-gelding-24.hasura.app/api/rest/update-transaction",
  DELETE_TRANSACTION: "https://bursting-gelding-24.hasura.app/api/rest/delete-transaction"
};

const Transactions = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("all");
  const [sortConfig, setSortConfig] = useState({ key: "date", direction: "desc" });
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ limit: 10, offset: 0 });
  const [totals, setTotals] = useState({ credit: 0, debit: 0 });
  const [last7DaysTotals, setLast7DaysTotals] = useState([]);

const fetchTransactions = async () => {
  setIsLoading(true);
  try {
    const response = await fetch(`${API_ENDPOINTS.ALL_TRANSACTIONS}?limit=${pagination.limit}&offset=${pagination.offset}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
        "x-hasura-role": "user",
        "x-hasura-user-id": "1" // Replace with actual user ID from auth context
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch transactions: ${response.status}`);
    }

    const data = await response.json();
    setTransactions(data.transactions || []);
  } catch (err) {
    setError(err.message);
  } finally {
    setIsLoading(false);
  }
};

  const fetchTotals = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.CREDIT_DEBIT_TOTALS, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-hasura-admin-secret": "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF"
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch totals: ${response.status}`);
      }

      const data = await response.json();
      setTotals(data.totals || { credit: 0, debit: 0 });
    } catch (err) {
      console.error("Error fetching totals:", err);
      // Fallback to calculating from transactions
      const creditTotal = transactions
        .filter(t => t.type === "credit")
        .reduce((sum, t) => sum + t.amount, 0);
        
      const debitTotal = transactions
        .filter(t => t.type === "debit")
        .reduce((sum, t) => sum + t.amount, 0);
        
      setTotals({ credit: creditTotal, debit: debitTotal });
    }
  };

  const fetchLast7DaysTotals = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.LAST_7_DAYS, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-hasura-admin-secret": "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF"
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch last 7 days totals: ${response.status}`);
      }

      const data = await response.json();
      setLast7DaysTotals(data.last_7_days_transactions || []);
    } catch (err) {
      console.error("Error fetching last 7 days totals:", err);
      setLast7DaysTotals([]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchTransactions();
        await fetchTotals();
        await fetchLast7DaysTotals();
      } catch (err) {
        setError(err.message);
      }
    };
    
    fetchData();
  }, [pagination]);

  const refreshData = () => {
    fetchTransactions();
    fetchTotals();
    fetchLast7DaysTotals();
  };

  const handleEdit = (transaction) => {
    setCurrentTransaction(transaction);
    setIsEditModalOpen(true);
  };

  const handleDelete = (transaction) => {
    setCurrentTransaction(transaction);
    setIsDeleteModalOpen(true);
  };

 const confirmDelete = async () => {
  try {
    const response = await fetch(API_ENDPOINTS.DELETE_TRANSACTION, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
        "x-hasura-role": "user",
        "x-hasura-user-id": "1" // Replace with actual user ID from auth context
      },
      body: JSON.stringify({
        id: currentTransaction.id
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to delete transaction: ${response.status}`);
    }

    refreshData();
    setIsDeleteModalOpen(false);
  } catch (err) {
    setError(err.message);
  }
};

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const filteredTransactions = transactions
    .filter(transaction => {
      if (activeTab === "all") return true;
      return transaction.type === activeTab;
    })
    .filter(transaction => {
      if (!searchTerm) return true;
      return (
        transaction.transaction_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.type?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
    .sort((a, b) => {
      if (sortConfig.key === "date") {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortConfig.direction === "asc" ? dateA - dateB : dateB - dateA;
      } else if (sortConfig.key === "amount") {
        return sortConfig.direction === "asc" ? a.amount - b.amount : b.amount - a.amount;
      } else {
        return 0;
      }
    });

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />;
  };

  const handlePagination = (direction) => {
    if (direction === "next") {
      setPagination(prev => ({ ...prev, offset: prev.offset + prev.limit }));
    } else {
      setPagination(prev => ({ ...prev, offset: Math.max(0, prev.offset - prev.limit) }));
    }
  };

  if (isLoading && pagination.offset === 0) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 ml-64 p-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 ml-64 p-8">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Transactions</h1>
          <div className="flex items-center space-x-4">
            <button 
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              onClick={() => setIsModalOpen(true)}
            >
              <FiPlus className="mr-2" />
              Add Transaction
            </button>
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              <FiDownload className="mr-2" />
              Export
            </button>
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              <FiFilter className="mr-2" />
              Filter
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow overflow-hidden mb-6">
          <div className="flex border-b border-gray-200">
            <button
              className={`px-6 py-4 font-medium ${activeTab === "all" ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-500"}`}
              onClick={() => setActiveTab("all")}
            >
              All Transactions
            </button>
            <button
              className={`px-6 py-4 font-medium ${activeTab === "debit" ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-500"}`}
              onClick={() => setActiveTab("debit")}
            >
              Debit
            </button>
            <button
              className={`px-6 py-4 font-medium ${activeTab === "credit" ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-500"}`}
              onClick={() => setActiveTab("credit")}
            >
              Credit
            </button>
          </div>

          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort("transaction_name")}
                  >
                    <div className="flex items-center">
                      Transaction Name
                      {getSortIcon("transaction_name")}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort("category")}
                  >
                    <div className="flex items-center">
                      Category
                      {getSortIcon("category")}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort("date")}
                  >
                    <div className="flex items-center">
                      Date
                      {getSortIcon("date")}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort("amount")}
                  >
                    <div className="flex items-center">
                      Amount
                      {getSortIcon("amount")}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {transaction.transaction_name || "Unnamed Transaction"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 capitalize">
                          {transaction.category || transaction.type}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{formatDate(transaction.date)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div
                          className={`text-sm font-medium ${
                            transaction.type === "credit" ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {transaction.type === "credit" ? "+" : "-"}${Math.abs(transaction.amount).toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(transaction)}
                            className="text-indigo-600 hover:text-indigo-900"
                            title="Edit"
                          >
                            <FiEdit2 />
                          </button>
                          <button
                            onClick={() => handleDelete(transaction)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                      No transactions found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 bg-gray-50 flex items-center justify-between border-t border-gray-200">
            <div className="flex-1 flex justify-between items-center">
              <button
                onClick={() => handlePagination("prev")}
                disabled={pagination.offset === 0}
                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                  pagination.offset === 0 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                Previous
              </button>
              <span className="text-sm text-gray-700">
                Showing <span className="font-medium">{pagination.offset + 1}</span> to{" "}
                <span className="font-medium">{Math.min(pagination.offset + pagination.limit, pagination.offset + filteredTransactions.length)}</span>
              </span>
              <button
                onClick={() => handlePagination("next")}
                disabled={filteredTransactions.length < pagination.limit}
                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                  filteredTransactions.length < pagination.limit ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>

        <AddTransactionModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
          onTransactionAdded={refreshData}
          apiEndpoint={API_ENDPOINTS.ADD_TRANSACTION}
        />

        <EditTransactionModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onTransactionUpdated={refreshData}
          transaction={currentTransaction}
          apiEndpoint={API_ENDPOINTS.UPDATE_TRANSACTION}
        />

        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDelete}
          transactionName={currentTransaction?.transaction_name || "this transaction"}
        />
      </div>
    </div>
  );
};

export default Transactions;
