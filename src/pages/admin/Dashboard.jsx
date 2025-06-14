// // src/pages/admin/Dashboard.jsx
// import { useState, useEffect } from "react";
// import Sidebar from "../../components/Sidebar";
// import { useAuth } from "../../context/AuthContext";
// import {
//   ChartBarIcon,
//   UsersIcon,
//   CreditCardIcon,
//   ArrowTrendingUpIcon,
//   BanknotesIcon,
//   ClockIcon
// } from "@heroicons/react/24/solid";
// import { BarChart, PieChart } from "../../components/Charts";

// const Dashboard = () => {
//   const { user, isAdmin } = useAuth();
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     activeUsers: 0,
//     totalTransactions: 0,
//     revenue: 0,
//     pendingRequests: 0
//   });

//   useEffect(() => {
//     // Simulate fetching admin stats
//     const fetchStats = async () => {
//       // In a real app, you would fetch this from your API
//       setTimeout(() => {
//         setStats({
//           totalUsers: 1243,
//           activeUsers: 892,
//           totalTransactions: 5678,
//           revenue: 125430.78,
//           pendingRequests: 23
//         });
//       }, 800);
//     };

//     if (isAdmin) {
//       fetchStats();
//     }
//   }, [isAdmin]);

//   if (!isAdmin) {
//     return (
//       <div className="flex min-h-screen bg-gray-50">
//         <Sidebar />
//         <div className="flex-1 ml-64 p-8">
//           <div className="bg-white rounded-xl shadow-md p-6">
//             <h2 className="text-2xl font-bold text-gray-800">Unauthorized Access</h2>
//             <p className="text-gray-600 mt-2">
//               You don't have permission to access this page.
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       <Sidebar />
//       <div className="flex-1 ml-64 p-8">
//         <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>
        
//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-500">Total Users</p>
//                 <h3 className="text-2xl font-bold text-gray-800 mt-1">{stats.totalUsers}</h3>
//               </div>
//               <div className="p-3 rounded-full bg-blue-100 text-blue-500">
//                 <UsersIcon className="h-6 w-6" />
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-500">Active Users</p>
//                 <h3 className="text-2xl font-bold text-gray-800 mt-1">{stats.activeUsers}</h3>
//               </div>
//               <div className="p-3 rounded-full bg-green-100 text-green-500">
//                 <ArrowTrendingUpIcon className="h-6 w-6" />
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-500">Transactions</p>
//                 <h3 className="text-2xl font-bold text-gray-800 mt-1">{stats.totalTransactions}</h3>
//               </div>
//               <div className="p-3 rounded-full bg-purple-100 text-purple-500">
//                 <CreditCardIcon className="h-6 w-6" />
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-amber-500">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-500">Revenue</p>
//                 <h3 className="text-2xl font-bold text-gray-800 mt-1">${stats.revenue.toLocaleString()}</h3>
//               </div>
//               <div className="p-3 rounded-full bg-amber-100 text-amber-500">
//                 <BanknotesIcon className="h-6 w-6" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Charts Section */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//           <div className="bg-white rounded-xl shadow-md p-6">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">User Growth</h3>
//             <div className="h-64">
//               <BarChart 
//                 data={{
//                   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
//                   datasets: [
//                     {
//                       label: 'New Users',
//                       data: [120, 190, 170, 220, 250, 300],
//                       backgroundColor: '#4F46E5',
//                     }
//                   ]
//                 }}
//               />
//             </div>
//           </div>

//           <div className="bg-white rounded-xl shadow-md p-6">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">Transaction Types</h3>
//             <div className="h-64">
//               <PieChart 
//                 data={{
//                   labels: ['Deposits', 'Withdrawals', 'Transfers', 'Payments'],
//                   datasets: [
//                     {
//                       data: [300, 150, 100, 200],
//                       backgroundColor: [
//                         '#4F46E5',
//                         '#10B981',
//                         '#F59E0B',
//                         '#EC4899'
//                       ],
//                     }
//                   ]
//                 }}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Recent Activity */}
//         <div className="bg-white rounded-xl shadow-md p-6">
//           <div className="flex items-center justify-between mb-6">
//             <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
//             <button className="text-sm text-blue-500 hover:text-blue-700">View All</button>
//           </div>
          
//           <div className="space-y-4">
//             {[1, 2, 3, 4, 5].map((item) => (
//               <div key={item} className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
//                 <div className="p-2 rounded-full bg-blue-100 text-blue-500 mr-4">
//                   <ClockIcon className="h-5 w-5" />
//                 </div>
//                 <div className="flex-1">
//                   <p className="text-sm font-medium text-gray-800">New user registration</p>
//                   <p className="text-xs text-gray-500">2 hours ago</p>
//                 </div>
//                 <button className="text-sm text-gray-400 hover:text-gray-600">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                     <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
//                   </svg>
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import { useAuth } from '../../context/AuthContext';
import { useDashboard } from '../../context/DashboardContext';
import { FaTrash, FaEdit, FaArrowUp, FaArrowDown, FaPlus } from 'react-icons/fa';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { motion } from 'framer-motion';
import TransactionForm from '../../components/TransactionForm';
import DeleteConfirmation from '../../components/DeleteConfirmation';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const { user, isAdmin } = useAuth();
  const {
    transactions,
    totals,
    graphData,
    isLoading,
    error,
    isAdmin: dashboardIsAdmin,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    refreshData
  } = useDashboard();

  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const updatedGraphData = {
    labels: graphData.labels,
    datasets: graphData.datasets.map(dataset => ({
      ...dataset,
      borderRadius: 8,
      borderSkipped: false,
      barPercentage: 0.7,
      categoryPercentage: 0.8,
      hoverBackgroundColor: dataset.label === 'Credit' ? '#FBBF24' : '#60A5FA'
    }))
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 14,
            family: "'Inter', sans-serif"
          },
          color: '#4B5563'
        }
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
              }).format(context.parsed.y);
            }
            return label;
          }
        },
        backgroundColor: 'rgba(31, 41, 55, 0.9)',
        titleFont: {
          size: 14,
          weight: 'bold',
          family: "'Inter', sans-serif"
        },
        bodyFont: {
          size: 12,
          family: "'Inter', sans-serif"
        },
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        boxPadding: 6,
        usePointStyle: true
      }
    },
    animation: {
      duration: 1000,
      easing: 'easeOutQuart',
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(229, 231, 235, 0.5)',
          drawBorder: false
        },
        ticks: {
          callback: function (value) {
            return '$' + value;
          },
          font: {
            size: 12,
            family: "'Inter', sans-serif"
          },
          color: '#6B7280',
          padding: 8
        }
      },
      x: {
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          font: {
            size: 12,
            family: "'Inter', sans-serif"
          },
          color: '#6B7280'
        }
      }
    },
    layout: {
      padding: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleAddTransaction = async (data) => {
    try {
      await addTransaction(data);
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const handleUpdateTransaction = async (data) => {
    try {
      await updateTransaction(selectedTransaction.id, data);
      setShowEditForm(false);
      setSelectedTransaction(null);
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };

  const handleDeleteTransaction = async () => {
    try {
      await deleteTransaction(selectedTransaction.id);
      setShowDeleteConfirm(false);
      setSelectedTransaction(null);
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  const handleEditClick = (transaction) => {
    setSelectedTransaction(transaction);
    setShowEditForm(true);
  };

  const handleDeleteClick = (transaction) => {
    setSelectedTransaction(transaction);
    setShowDeleteConfirm(true);
  };

  const SkeletonLoader = () => (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 min-h-screen p-8">
        <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
          {!isAdmin && (
            <div className="h-10 w-36 bg-gray-200 rounded-lg animate-pulse"></div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {[1, 2].map((item) => (
            <div key={item} className="bg-white p-6 rounded-xl shadow flex items-center justify-between animate-pulse">
              <div>
                <div className="h-4 w-24 bg-gray-200 rounded mb-2 animate-pulse"></div>
                <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="h-16 w-16 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-xl shadow mb-6 animate-pulse">
          <div className="h-6 w-48 bg-gray-200 rounded mb-4 animate-pulse"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center justify-between p-4 border-b animate-pulse">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                {!isAdmin && (
                  <div className="flex space-x-2">
                    <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow mb-6 animate-pulse">
          <div className="flex justify-between items-center mb-4">
            <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
            <div className="flex space-x-4">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-gray-200 rounded-full mr-2 animate-pulse"></div>
                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-gray-200 rounded-full mr-2 animate-pulse"></div>
                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
          <div className="h-6 w-64 bg-gray-200 rounded mb-4 animate-pulse"></div>
          <div className="h-80 w-full bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
      </div>
    </div>
  );

  if (isLoading && !transactions.length) {
    return <SkeletonLoader />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-6 bg-white p-4 shadow-sm sticky top-0 z-10"
        >
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          {!isAdmin && (
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 shadow-md hover:shadow-lg"
            >
              <FaPlus className="text-sm" />
              <span>Add Transaction</span>
            </button>
          )}
        </motion.div>

        <div className="p-6 bg-gray-50">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
          >
            <motion.div
              variants={item}
              className="bg-white p-6 rounded-xl shadow flex items-center justify-between border-l-4 border-orange-500"
            >
              <div>
                <p className="text-sm text-gray-500">Credit</p>
                <p className="text-3xl font-bold text-orange-600">${totals.credit || 0}</p>
              </div>
               <svg width="183" height="161" viewBox="0 0 183 161" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M87.3449 7.06946C108.555 7.06946 106.134 44.5272 121.446 55.9454C141.713 71.0576 176.577 63.5739 176.577 89.5103C176.577 135.04 131.355 151.535 82.0727 151.535C32.7906 151.535 -9.25948 126.283 5.41459 80.873C20.0874 35.4628 38.064 7.06946 87.3449 7.06946Z" fill="#E9EEF7" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M89.5133 161C133.904 161 170.107 159.744 170.107 158.207C170.107 156.669 133.902 155.415 89.5133 155.415C45.1241 155.415 8.91943 156.67 8.91943 158.207C8.91943 159.743 45.1241 161 89.5133 161Z" fill="#D1DEED" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M70.7022 131.49C57.8518 131.49 47.4351 133.838 47.4351 136.734C47.4351 139.63 57.8518 141.979 70.7022 141.979C83.5526 141.979 93.9707 139.63 93.9707 136.734C93.9707 133.838 83.5539 131.49 70.7022 131.49Z" fill="#D0A485" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M71.1969 116.37C84.0485 116.37 94.4653 118.717 94.4653 121.614C94.4653 124.512 84.0485 126.858 71.1969 126.858C58.3452 126.858 47.9297 124.51 47.9297 121.614C47.9297 118.718 58.3465 116.37 71.1969 116.37Z" fill="#D0A485" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M69.8973 102.224C82.7477 102.224 93.1645 104.572 93.1645 107.469C93.1645 110.367 82.7477 112.713 69.8973 112.713C57.0469 112.713 46.6289 110.364 46.6289 107.469C46.6289 104.574 57.0469 102.224 69.8973 102.224Z" fill="#BADAF9" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M75.233 124.437C62.3826 124.437 51.9658 126.784 51.9658 129.682C51.9658 132.579 62.3826 134.926 75.233 134.926C88.0834 134.926 98.5014 132.578 98.5014 129.682C98.5014 126.786 88.0846 124.437 75.233 124.437Z" fill="#D0A485" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M66.6669 109.316C79.5173 109.316 89.9353 111.665 89.9353 114.56C89.9353 117.455 79.5173 119.805 66.6669 119.805C53.8165 119.805 43.3984 117.458 43.3984 114.56C43.3984 111.663 53.8152 109.316 66.6669 109.316Z" fill="#BADAF9" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M65.3663 95.1709C78.2167 95.1709 88.6335 97.5186 88.6335 100.415C88.6335 103.311 78.2167 105.66 65.3663 105.66C52.5159 105.66 42.0991 103.312 42.0991 100.415C42.0991 97.5174 52.5159 95.1709 65.3663 95.1709Z" fill="#BADAF9" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M70.7035 147.897C57.8519 147.897 47.4351 145.549 47.4351 142.653V136.734C47.4351 139.63 57.8519 141.979 70.7035 141.979C83.5551 141.979 93.9707 139.63 93.9707 136.734V142.653C93.9707 145.549 83.5539 147.897 70.7035 147.897Z" fill="#86644E" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M71.1981 132.776C84.0485 132.776 94.4653 130.428 94.4653 127.532V121.613C94.4653 124.511 84.0485 126.858 71.1981 126.858C58.3477 126.858 47.9297 124.511 47.9297 121.613V127.532C47.9297 130.428 58.3465 132.776 71.1981 132.776Z" fill="#86644E" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M69.8971 118.631C82.7475 118.631 93.1642 116.283 93.1642 113.387V107.468C93.1642 110.364 82.7475 112.713 69.8971 112.713C57.0467 112.713 46.6299 110.364 46.6299 107.468V113.387C46.6299 116.283 57.0467 118.631 69.8971 118.631Z" fill="#619FDF" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M75.233 140.844C62.3826 140.844 51.9658 138.496 51.9658 135.6V129.681C51.9658 132.578 62.3826 134.926 75.233 134.926C88.0834 134.926 98.5014 132.578 98.5014 129.681V135.6C98.5014 138.496 88.0846 140.844 75.233 140.844Z" fill="#86644E" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M66.6669 125.723C79.5173 125.723 89.934 123.375 89.934 120.479V114.56C89.934 117.458 79.5173 119.805 66.6669 119.805C53.8165 119.805 43.3984 117.458 43.3984 114.56V120.479C43.3984 123.375 53.8152 125.723 66.6669 125.723Z" fill="#619FDF" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M65.3663 111.578C78.2167 111.578 88.6335 109.23 88.6335 106.334V100.415C88.6335 103.312 78.2167 105.66 65.3663 105.66C52.5159 105.66 42.0991 103.312 42.0991 100.415V106.334C42.0991 109.23 52.5159 111.578 65.3663 111.578Z" fill="#619FDF" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M55.7507 97.8991C55.1788 98.3753 54.5799 99.0478 54.4007 99.9523L51.2161 100.017L51.0332 101.399L54.4572 101.33C54.9788 102.811 57.1436 103.654 60.0865 103.592C63.119 103.531 64.8102 102.525 66.3737 101.128C67.7469 99.805 68.7999 99.319 70.3315 99.2883C71.8336 99.2577 72.9382 99.7277 72.8044 100.744C72.6866 101.632 71.9159 102.478 71.1513 103.042L74.4587 103.397C75.1901 102.847 75.913 101.918 76.0921 101.014L79.5161 100.944L79.7002 99.5608L76.0369 99.6356C75.5865 98.0537 73.2486 97.1738 70.1855 97.2364C67.0634 97.3002 65.279 98.0967 63.4663 99.794C62.1483 100.933 61.2266 101.556 59.8448 101.585C58.674 101.609 57.5069 101.154 57.6321 100.209C57.7401 99.3902 58.4629 98.6845 58.9697 98.2538L55.7519 97.8979L55.7507 97.8991Z" fill="white" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M70.3131 87.9387C57.4627 87.9387 47.0459 90.2877 47.0459 93.1839C47.0459 96.0802 57.4627 98.4279 70.3131 98.4279C83.1635 98.4279 93.5803 96.0802 93.5803 93.1839C93.5803 90.2877 83.1635 87.9387 70.3131 87.9387Z" fill="#BADAF9" />
                <path d="M70.8077 83.3072C83.6578 83.3072 94.0749 80.9594 94.0749 78.0632C94.0749 75.167 83.6578 72.8192 70.8077 72.8192C57.9576 72.8192 47.5405 75.167 47.5405 78.0632C47.5405 80.9594 57.9576 83.3072 70.8077 83.3072Z" fill="#BADAF9" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M69.5067 58.673C82.3583 58.673 92.7751 61.0207 92.7751 63.9182C92.7751 66.8157 82.3583 69.1622 69.5067 69.1622C56.6551 69.1622 46.2383 66.8145 46.2383 63.9182C46.2383 61.0219 56.6551 58.673 69.5067 58.673Z" fill="#BADAF9" />
                <path d="M74.8429 91.3751C87.693 91.3751 98.1101 89.0272 98.1101 86.1311C98.1101 83.2349 87.693 80.8871 74.8429 80.8871C61.9928 80.8871 51.5757 83.2349 51.5757 86.1311C51.5757 89.0272 61.9928 91.3751 74.8429 91.3751Z" fill="#BADAF9" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M66.2769 65.7651C79.1273 65.7651 89.5441 68.1128 89.5441 71.0091C89.5441 73.9054 79.1273 76.2543 66.2769 76.2543C53.4265 76.2543 43.0098 73.9054 43.0098 71.0091C43.0098 68.1128 53.4265 65.7651 66.2769 65.7651Z" fill="#BADAF9" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M64.9769 51.6212C77.8273 51.6212 88.2441 53.9689 88.2441 56.8652C88.2441 59.7615 77.8273 62.1092 64.9769 62.1092C52.1265 62.1092 41.7085 59.7615 41.7085 56.8652C41.7085 53.9689 52.1253 51.6212 64.9769 51.6212Z" fill="#BADAF9" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M70.3131 104.347C57.4627 104.347 47.0459 101.998 47.0459 99.1017V93.184C47.0459 96.0802 57.4627 98.4279 70.3131 98.4279C83.1635 98.4279 93.5803 96.0802 93.5803 93.184V99.1017C93.5803 101.998 83.1635 104.347 70.3131 104.347Z" fill="#619FDF" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M70.8077 89.225C83.6581 89.225 94.0749 86.8773 94.0749 83.9798V78.062C94.0749 80.9583 83.6581 83.306 70.8077 83.306C57.9573 83.306 47.5405 80.9583 47.5405 78.062V83.9798C47.5405 86.8773 57.9573 89.225 70.8077 89.225Z" fill="#619FDF" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M69.5067 75.081C82.3583 75.081 92.7751 72.7321 92.7751 69.8358V63.9181C92.7751 66.8144 82.3583 69.1621 69.5067 69.1621C56.6551 69.1621 46.2383 66.8144 46.2383 63.9181V69.8358C46.2383 72.7321 56.6563 75.081 69.5067 75.081Z" fill="#619FDF" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M74.8429 97.2941C61.9925 97.2941 51.5757 94.9451 51.5757 92.0488V86.1311C51.5757 89.0274 61.9925 91.3751 74.8429 91.3751C87.6933 91.3751 98.1101 89.0274 98.1101 86.1311V92.0488C98.1101 94.9451 87.6933 97.2941 74.8429 97.2941Z" fill="#619FDF" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M66.2769 82.172C79.1273 82.172 89.5441 79.8243 89.5441 76.928V71.009C89.5441 73.9053 79.1273 76.253 66.2769 76.253C53.4265 76.253 43.0098 73.9053 43.0098 71.009V76.928C43.0098 79.8243 53.4265 82.172 66.2769 82.172Z" fill="#619FDF" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M64.9757 68.0282C77.8273 68.0282 88.2441 65.6792 88.2441 62.783V56.8652C88.2441 59.7615 77.8273 62.1092 64.9757 62.1092C52.1241 62.1092 41.7085 59.7615 41.7085 56.8652V62.783C41.7085 65.6792 52.1253 68.0282 64.9757 68.0282Z" fill="#619FDF" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M55.3606 54.3482C54.7874 54.8244 54.1898 55.4981 54.0094 56.4026L50.8259 56.4676L50.6431 57.8507L54.0658 57.7808C54.5874 59.2621 56.7535 60.1039 59.6952 60.0438C62.7277 59.9824 64.4188 58.9761 65.9823 57.5795C67.3556 56.2566 68.4085 55.7706 69.9401 55.7387C71.441 55.708 72.5468 56.178 72.413 57.1942C72.294 58.0827 71.5233 58.9282 70.7599 59.4928L74.0661 59.8474C74.7975 59.2976 75.5204 58.3686 75.7008 57.4642L79.1236 57.3942L79.3076 56.0111L75.6443 56.086C75.1939 54.5053 72.8561 53.6241 69.7929 53.6867C66.6696 53.7518 64.8864 54.5482 63.0738 56.2443C61.7545 57.3832 60.834 58.0066 59.4509 58.0348C58.2802 58.0594 57.1118 57.6041 57.2382 56.6591C57.3475 55.8405 58.0691 55.1361 58.5759 54.7041L55.3593 54.3482H55.3606Z" fill="white" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M41.5222 136.617C30.9667 136.617 22.4092 138.546 22.4092 140.925C22.4092 143.303 30.9667 145.234 41.5222 145.234C52.0776 145.234 60.6352 143.303 60.6352 140.925C60.6352 138.546 52.0789 136.617 41.5222 136.617Z" fill="#BADAF9" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M44.1975 123.18C33.642 123.18 25.0845 125.109 25.0845 127.488C25.0845 129.866 33.642 131.795 44.1975 131.795C54.7529 131.795 63.3104 129.867 63.3104 127.488C63.3104 125.108 54.7529 123.18 44.1975 123.18Z" fill="#BADAF9" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M45.2443 130.823C34.6889 130.823 26.1313 132.753 26.1313 135.131C26.1313 137.509 34.6889 139.439 45.2443 139.439C55.7998 139.439 64.3573 137.509 64.3573 135.131C64.3573 132.753 55.801 130.823 45.2443 130.823Z" fill="#BADAF9" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M47.9187 117.386C37.3632 117.386 28.8057 119.316 28.8057 121.694C28.8057 124.072 37.3632 126.002 47.9187 126.002C58.4741 126.002 67.0316 124.072 67.0316 121.694C67.0316 119.316 58.4741 117.386 47.9187 117.386Z" fill="#BADAF9" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M41.5222 150.095C30.9667 150.095 22.4092 148.166 22.4092 145.787V140.925C22.4092 143.303 30.9667 145.232 41.5222 145.232C52.0776 145.232 60.6352 143.303 60.6352 140.925V145.787C60.6352 148.166 52.0789 150.095 41.5222 150.095Z" fill="#619FDF" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M44.1975 136.658C33.642 136.658 25.0845 134.728 25.0845 132.349V127.488C25.0845 129.866 33.642 131.795 44.1975 131.795C54.7529 131.795 63.3104 129.866 63.3104 127.488V132.349C63.3104 134.728 54.7529 136.658 44.1975 136.658Z" fill="#619FDF" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M45.2443 144.301C34.6889 144.301 26.1313 142.372 26.1313 139.993V135.132C26.1313 137.511 34.6889 139.44 45.2443 139.44C55.7998 139.44 64.3573 137.511 64.3573 135.132V139.993C64.3573 142.372 55.801 144.301 45.2443 144.301Z" fill="#619FDF" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M47.9187 130.864C37.3632 130.864 28.8057 128.936 28.8057 126.556V121.695C28.8057 124.074 37.3632 126.003 47.9187 126.003C58.4741 126.003 67.0316 124.074 67.0316 121.695V126.556C67.0316 128.936 58.4741 130.864 47.9187 130.864Z" fill="#619FDF" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M39.1534 119.523C38.6834 119.915 38.1913 120.467 38.044 121.209L35.4276 121.263L35.2778 122.398L38.0907 122.342C38.5202 123.558 40.2985 124.25 42.7161 124.201C45.2062 124.15 46.5954 123.324 47.8803 122.176C49.0082 121.09 49.8734 120.69 51.1313 120.664C52.3647 120.64 53.2728 121.025 53.1611 121.86C53.0642 122.59 52.4309 123.286 51.8026 123.748L54.5197 124.041C55.121 123.589 55.7138 122.826 55.8623 122.082L58.6739 122.024L58.8248 120.889L55.8144 120.95C55.445 119.651 53.5244 118.928 51.0086 118.979C48.4424 119.031 46.9783 119.686 45.4897 121.08C44.406 122.016 43.6488 122.529 42.5136 122.552C41.5527 122.572 40.593 122.197 40.6949 121.422C40.7844 120.749 41.3784 120.171 41.7945 119.816L39.1522 119.523H39.1534Z" fill="white" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M59.5884 134.075C59.5884 122.294 69.1387 112.744 80.9214 112.744C92.7041 112.744 102.253 122.294 102.253 134.075C102.253 145.857 92.7029 155.409 80.9214 155.409C69.14 155.409 59.5884 145.858 59.5884 134.075Z" fill="#619FDF" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M62.8159 134.076C62.8159 124.077 70.9218 115.973 80.9213 115.973C90.9209 115.973 99.0243 124.077 99.0243 134.076C99.0243 144.074 90.9196 152.181 80.9213 152.181C70.923 152.181 62.8159 144.075 62.8159 134.076Z" fill="#619FDF" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M90.3922 118.623C92.195 121.437 93.2406 124.784 93.2406 128.375C93.2406 138.375 85.1359 146.479 75.1364 146.479C71.6645 146.479 68.4197 145.501 65.6646 143.806C68.8811 148.829 74.5117 152.159 80.9203 152.159C90.9186 152.159 99.0233 144.053 99.0233 134.053C99.0233 127.527 95.5699 121.809 90.3922 118.623Z" fill="#98C4F1" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M65.987 135.731C65.987 126.905 73.1418 119.751 81.9681 119.751C87.1262 119.751 91.7148 122.196 94.6369 125.99C91.8781 121.199 86.7053 117.974 80.7789 117.974C71.9526 117.974 64.7979 125.129 64.7979 133.955C64.7979 137.622 66.0349 141 68.1114 143.697C66.7614 141.353 65.987 138.632 65.987 135.732V135.731Z" fill="#A7D1FB" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M82.4149 122.39V124.697C83.3403 124.847 84.0975 125.151 84.6866 125.615C85.2744 126.078 85.8353 126.788 86.3691 127.744L84.0754 129.027C83.3845 127.771 82.4824 127.144 81.3693 127.144C80.6784 127.144 80.1053 127.348 79.6512 127.757C79.1971 128.164 78.9689 128.673 78.9689 129.286C78.9689 129.843 79.153 130.306 79.5224 130.675C79.8832 131.036 80.6121 131.463 81.7105 131.957C82.6604 132.389 83.4446 132.796 84.0644 133.176C84.6841 133.556 85.1505 133.923 85.4634 134.276C86.3507 135.233 86.7937 136.39 86.7937 137.746C86.7937 139.102 86.3937 140.257 85.5935 141.277C84.8007 142.288 83.7428 142.971 82.4162 143.325V145.761H80.3569V143.395C78.8191 143.144 77.6459 142.615 76.8384 141.807C76.0309 140.998 75.4344 139.752 75.0503 138.064L77.6398 137.523C77.992 138.716 78.424 139.566 78.9345 140.077C79.4671 140.563 80.1777 140.806 81.0638 140.806C81.9498 140.806 82.6481 140.527 83.2286 139.971C83.8005 139.423 84.0877 138.711 84.0877 137.841C84.0877 137.064 83.8484 136.44 83.3697 135.97C83.1255 135.743 82.7684 135.486 82.2934 135.199C81.8185 134.913 81.2123 134.601 80.4747 134.263C78.9529 133.581 77.9527 132.954 77.4741 132.381C76.7132 131.525 76.3328 130.502 76.3328 129.309C76.3328 128.744 76.4223 128.219 76.604 127.732C76.7844 127.246 77.0446 126.804 77.3857 126.409C77.7269 126.013 78.1491 125.669 78.651 125.379C79.1517 125.089 79.7212 124.861 80.3569 124.697V122.39H82.4162H82.4149Z" fill="white" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M50.3925 143.932C61.8071 143.932 71.0616 146.018 71.0616 148.591C71.0616 151.165 61.8083 153.25 50.3925 153.25C38.9768 153.25 29.7222 151.164 29.7222 148.591C29.7222 146.019 38.9755 143.932 50.3925 143.932Z" fill="#BADAF9" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M50.3913 158.507C61.8071 158.507 71.0616 156.421 71.0616 153.849V148.591C71.0616 151.165 61.8083 153.251 50.3913 153.251C38.9743 153.251 29.7222 151.165 29.7222 148.591V153.849C29.7222 156.421 38.9755 158.507 50.3913 158.507Z" fill="#619FDF" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M41.8497 146.355C41.3416 146.779 40.809 147.378 40.6495 148.18L37.8219 148.238L37.6587 149.466L40.6998 149.405C41.1637 150.721 43.0868 151.468 45.7008 151.414C48.3946 151.359 49.8967 150.466 51.2859 149.225C52.5058 148.05 53.441 147.619 54.802 147.59C56.136 147.563 57.1178 147.98 56.9975 148.882C56.8932 149.672 56.2072 150.425 55.5297 150.925L58.4677 151.241C59.1194 150.752 59.76 149.928 59.9208 149.124L62.9619 149.061L63.1251 147.833L59.8705 147.899C59.4716 146.495 57.3939 145.713 54.6719 145.767C51.8983 145.825 50.314 146.532 48.7038 148.04C47.5318 149.051 46.7132 149.605 45.486 149.631C44.4453 149.653 43.4083 149.248 43.52 148.408C43.6157 147.681 44.2575 147.056 44.7079 146.672L41.8509 146.355H41.8497Z" fill="white" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M109.285 132.152C95.8974 132.152 85.0449 134.598 85.0449 137.616C85.0449 140.634 95.8974 143.08 109.285 143.08C122.673 143.08 133.527 140.634 133.527 137.616C133.527 134.598 122.674 132.152 109.285 132.152Z" fill="#D0A485" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M114.005 124.805C100.617 124.805 89.7646 127.251 89.7646 130.269C89.7646 133.286 100.617 135.732 114.005 135.732C127.393 135.732 138.247 133.286 138.247 130.269C138.247 127.251 127.394 124.805 114.005 124.805Z" fill="#D0A485" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M109.285 149.245C95.8974 149.245 85.0449 146.8 85.0449 143.782V137.616C85.0449 140.634 95.8974 143.08 109.285 143.08C122.673 143.08 133.527 140.634 133.527 137.616V143.782C133.527 146.8 122.673 149.245 109.285 149.245Z" fill="#619FDF" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M109.802 133.493C123.19 133.493 134.042 131.047 134.042 128.029V121.863C134.042 124.881 123.19 127.327 109.802 127.327C96.4137 127.327 85.5601 124.881 85.5601 121.863V128.029C85.5601 131.047 96.4137 133.493 109.802 133.493Z" fill="#86644E" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M114.005 141.898C100.617 141.898 89.7637 139.452 89.7637 136.434V130.269C89.7637 133.287 100.617 135.732 114.005 135.732C127.393 135.732 138.247 133.287 138.247 130.269V136.434C138.247 139.452 127.393 141.898 114.005 141.898Z" fill="#86644E" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M78.8853 137.494C67.8868 137.494 58.9722 139.504 58.9722 141.983C58.9722 144.462 67.8868 146.471 78.8853 146.471C89.8838 146.471 98.7972 144.461 98.7972 141.983C98.7972 139.505 89.8826 137.494 78.8853 137.494Z" fill="#BADAF9" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M81.6724 123.496C70.6752 123.496 61.7593 125.506 61.7593 127.984C61.7593 130.461 70.6752 132.472 81.6724 132.472C92.6697 132.472 101.584 130.463 101.584 127.984C101.584 125.505 92.6697 123.496 81.6724 123.496Z" fill="#BADAF9" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M82.762 131.457C71.7647 131.457 62.8501 133.467 62.8501 135.946C62.8501 138.425 71.7647 140.434 82.762 140.434C93.7593 140.434 102.674 138.424 102.674 135.946C102.674 133.468 93.7593 131.457 82.762 131.457Z" fill="#BADAF9" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M85.5491 117.459C74.5519 117.459 65.6372 119.469 65.6372 121.947C65.6372 124.425 74.5519 126.435 85.5491 126.435C96.5464 126.435 105.462 124.426 105.462 121.947C105.462 119.468 96.5476 117.459 85.5491 117.459Z" fill="#BADAF9" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M78.8841 151.534C67.8868 151.534 58.9722 149.524 58.9722 147.046V141.983C58.9722 144.461 67.8868 146.471 78.8841 146.471C89.8814 146.471 98.7972 144.461 98.7972 141.983V147.046C98.7972 149.524 89.8826 151.534 78.8841 151.534Z" fill="#619FDF" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M81.6722 137.536C70.6749 137.536 61.7603 135.526 61.7603 133.048V127.984C61.7603 130.463 70.6749 132.472 81.6722 132.472C92.6694 132.472 101.584 130.463 101.584 127.984V133.048C101.584 135.526 92.6694 137.536 81.6722 137.536Z" fill="#619FDF" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M82.762 145.499C71.7647 145.499 62.8501 143.489 62.8501 141.011V135.947C62.8501 138.425 71.7647 140.435 82.762 140.435C93.7593 140.435 102.674 138.425 102.674 135.947V141.011C102.674 143.489 93.7593 145.499 82.762 145.499Z" fill="#619FDF" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M85.5491 131.501C74.5519 131.501 65.6372 129.491 65.6372 127.013V121.948C65.6372 124.427 74.5519 126.436 85.5491 126.436C96.5464 126.436 105.462 124.427 105.462 121.948V127.013C105.462 129.491 96.5476 131.501 85.5491 131.501Z" fill="#619FDF" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M76.4175 119.685C75.9278 120.092 75.4148 120.669 75.2614 121.442L72.537 121.499L72.3799 122.682L75.3093 122.622C75.756 123.889 77.6079 124.61 80.1274 124.558C82.7243 124.506 84.1712 123.644 85.5089 122.449C86.6846 121.317 87.5841 120.901 88.8948 120.874C90.181 120.848 91.1259 121.25 91.0106 122.12C90.9099 122.881 90.2497 123.603 89.5968 124.087L92.4268 124.39C93.0527 123.919 93.6712 123.125 93.8259 122.351L96.7553 122.29L96.9124 121.106L93.778 121.171C93.3926 119.817 91.391 119.065 88.7709 119.119C86.0979 119.173 84.5725 119.856 83.0213 121.307C81.891 122.282 81.1043 122.816 79.9213 122.84C78.9198 122.861 77.9196 122.472 78.0276 121.663C78.1197 120.962 78.7382 120.36 79.1714 119.991L76.4187 119.685H76.4175Z" fill="white" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M97.7061 134.846C97.7061 122.573 107.657 112.622 119.93 112.622C132.204 112.622 142.153 122.573 142.153 134.846C142.153 147.12 132.204 157.069 119.93 157.069C107.657 157.069 97.7061 147.119 97.7061 134.846Z" fill="#619FDF" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M101.07 134.846C101.07 124.429 109.514 115.984 119.931 115.984C130.348 115.984 138.793 124.428 138.793 134.846C138.793 145.264 130.348 153.708 119.931 153.708C109.514 153.708 101.07 145.263 101.07 134.846Z" fill="#BADAF9" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M129.799 118.747C131.677 121.681 132.766 125.167 132.766 128.908C132.766 139.325 124.323 147.769 113.905 147.769C110.287 147.769 106.908 146.749 104.038 144.983C107.389 150.216 113.255 153.684 119.932 153.684C130.348 153.684 138.793 145.241 138.793 134.823C138.793 128.024 135.195 122.066 129.8 118.747H129.799Z" fill="#A3CFFB" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M104.374 136.572C104.374 127.377 111.828 119.923 121.023 119.923C126.399 119.923 131.178 122.47 134.221 126.422C131.346 121.431 125.957 118.072 119.784 118.072C110.588 118.072 103.135 125.527 103.135 134.721C103.135 138.541 104.423 142.061 106.587 144.87C105.18 142.428 104.375 139.594 104.375 136.572H104.374Z" fill="#A7D1FB" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M121.487 122.672V125.075C122.452 125.23 123.241 125.549 123.854 126.031C124.466 126.515 125.05 127.253 125.606 128.25L123.215 129.586C122.497 128.278 121.556 127.624 120.396 127.624C119.677 127.624 119.08 127.836 118.606 128.262C118.132 128.688 117.895 129.218 117.895 129.856C117.895 130.436 118.087 130.919 118.471 131.303C118.846 131.679 119.607 132.124 120.751 132.639C121.739 133.089 122.556 133.511 123.202 133.907C123.849 134.304 124.333 134.686 124.661 135.054C125.585 136.05 126.047 137.257 126.047 138.67C126.047 140.084 125.631 141.286 124.796 142.348C123.97 143.403 122.867 144.113 121.486 144.481V147.019H119.341V144.555C117.738 144.294 116.517 143.741 115.675 142.899C114.833 142.058 114.212 140.758 113.811 139.002L116.509 138.437C116.875 139.679 117.326 140.566 117.857 141.098C118.412 141.605 119.152 141.859 120.076 141.859C121 141.859 121.727 141.568 122.332 140.989C122.928 140.417 123.226 139.677 123.226 138.77C123.226 137.961 122.977 137.311 122.478 136.821C122.225 136.584 121.851 136.317 121.357 136.017C120.863 135.719 120.231 135.394 119.462 135.043C117.877 134.332 116.835 133.678 116.337 133.082C115.543 132.191 115.147 131.124 115.147 129.882C115.147 129.293 115.241 128.746 115.43 128.239C115.616 127.732 115.889 127.272 116.245 126.859C116.601 126.446 117.039 126.089 117.563 125.787C118.086 125.485 118.679 125.248 119.341 125.076V122.673H121.486L121.487 122.672Z" fill="white" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M88.1266 145.115C100.019 145.115 109.66 147.288 109.66 149.968C109.66 152.649 100.019 154.822 88.1266 154.822C76.2347 154.822 66.5923 152.649 66.5923 149.968C66.5923 147.288 76.2322 145.115 88.1266 145.115Z" fill="#BADAF9" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M88.1254 160.299C100.019 160.299 109.66 158.126 109.66 155.445V149.969C109.66 152.65 100.019 154.823 88.1254 154.823C76.2322 154.823 66.5923 152.65 66.5923 149.969V155.445C66.5923 158.126 76.2322 160.299 88.1254 160.299Z" fill="#619FDF" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M79.2264 147.64C78.6962 148.081 78.1427 148.704 77.9758 149.54L75.0292 149.6L74.8599 150.879L78.0286 150.814C78.5109 152.185 80.515 152.964 83.2382 152.908C86.0461 152.851 87.6096 151.921 89.0565 150.627C90.3279 149.404 91.3024 148.953 92.7198 148.924C94.1091 148.896 95.1326 149.33 95.0086 150.27C94.8994 151.094 94.1864 151.875 93.4795 152.398L96.5402 152.726C97.2177 152.218 97.8853 151.358 98.0522 150.521L101.221 150.456L101.39 149.176L97.9994 149.246C97.5846 147.783 95.4198 146.968 92.5848 147.025C89.6947 147.086 88.0441 147.822 86.3664 149.393C85.1453 150.447 84.2924 151.024 83.0148 151.051C81.93 151.073 80.85 150.652 80.9666 149.777C81.0672 149.018 81.7361 148.368 82.2036 147.967L79.2264 147.638V147.64Z" fill="white" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M88.5166 39.9601C88.5166 39.9601 87.4685 38.6887 86.9052 38.5108C86.3419 38.3328 85.2521 37.4885 85.1098 37.837C84.9674 38.1843 85.8424 38.7206 85.797 39.1183C85.7504 39.5159 83.0161 40.154 83.0333 40.575C83.0492 40.9959 83.6764 42.0121 84.7195 41.8955C85.7627 41.7789 88.4086 41.1506 88.951 41.4218C89.4947 41.693 88.5166 39.9614 88.5166 39.9614V39.9601Z" fill="#FFB17D" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M116.724 33.7772C115.179 35.8512 113.372 37.4896 111.514 38.7818C105.608 42.8894 99.2032 43.5018 99.2032 43.5018C97.6679 43.0097 92.9529 42.4967 90.1658 42.0487C88.9509 41.8536 88.1041 41.6695 88.0464 41.5063L88.1163 39.0788C88.1163 39.0788 98.3441 38.5376 100.038 37.7522C102.708 35.4511 105.067 32.464 106.606 30.1286C107.904 28.1576 109.357 26.7021 111.754 25.848C115.22 24.6122 121.52 27.3354 116.726 33.7759L116.724 33.7772Z" fill="#F47A44" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M112.035 37.2552L111.514 38.7831C105.608 42.8907 99.2034 43.5031 99.2034 43.5031C97.97 43.5031 92.9531 42.498 90.166 42.05C90.2752 42.0586 97.754 42.6428 99.4059 42.4722C101.07 42.3004 108.821 35.5837 108.821 35.5837L112.035 37.2552Z" fill="#EF6A30" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M105.358 114.175H116.661C117.471 113.625 116.444 108.256 116.444 108.256C116.444 108.256 113.358 107.086 112.826 109.466C112.291 111.844 108.897 112.6 107.099 112.892C105.871 113.092 105.482 113.767 105.359 114.176L105.358 114.175Z" fill="#284190" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M122.122 114.175H133.425C134.233 113.625 133.205 108.256 133.205 108.256C133.205 108.256 130.121 107.086 129.587 109.466C129.053 111.844 125.657 112.6 123.861 112.892C122.632 113.092 122.242 113.767 122.121 114.176L122.122 114.175Z" fill="#284190" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M108.399 59.3983C108.399 59.3983 108.907 65.737 109.505 73.3557C110.316 83.705 112.505 109.368 112.505 109.368C112.505 109.368 113.94 110.593 117.118 109.922C117.118 109.922 119.823 101.069 120.634 90.9653C120.647 90.7997 120.659 90.6328 120.673 90.4671C121.425 80.1804 122.594 58.5221 122.594 58.5221L108.4 59.3996L108.399 59.3983Z" fill="#4567C5" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M108.226 57.2078C108.226 57.2078 108.908 65.7358 109.505 73.3558L120.633 90.9641C120.645 90.7985 120.658 90.6316 120.671 90.4659C121.424 80.1792 122.593 58.5209 122.593 58.5209L108.225 57.2078H108.226Z" fill="#3B5BB2" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M111.469 57.2076C111.469 57.2076 119.541 77.3 122.122 84.915C123.959 90.3406 129.143 109.371 129.143 109.371C129.143 109.371 131.396 110.059 133.291 108.732C133.291 108.732 135.22 89.2876 131.324 83.8056C129.257 80.897 130.811 53.5701 122.431 53.3357C114.05 53.1013 111.468 57.2089 111.468 57.2089L111.469 57.2076Z" fill="#4567C5" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M115.075 27.5895C116.307 28.2375 117.51 28.278 118.552 28.0571C119.505 27.857 120.324 27.4361 120.908 27.063C121.506 26.6801 121.859 26.3475 121.859 26.3475C121.859 26.3475 121.816 26.2874 121.746 26.1683C121.382 25.5461 120.279 23.3064 120.769 19.7106C120.776 19.664 120.42 19.7303 119.881 19.8567C118.279 20.2359 115.059 21.1489 114.917 21.1894H114.912C114.912 21.1894 114.873 21.9467 114.739 23.3027C114.728 23.4218 114.715 23.547 114.703 23.6758C114.687 23.8341 114.669 24.0035 114.65 24.1765C114.501 25.5866 115.074 27.5895 115.074 27.5895H115.075Z" fill="#FFB17D" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M114.74 23.3028C117.131 23.8513 120.699 20.3206 120.699 20.3206C120.438 20.1255 120.164 19.9733 119.881 19.8567C118.279 20.2359 115.059 21.149 114.917 21.1895H114.912C114.912 21.1895 114.873 21.9467 114.739 23.3028H114.74Z" fill="#EF8161" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M114.006 21.4399C114.006 21.4399 115.023 21.8056 116.319 21.9799C118.213 22.2351 120.706 22.0842 121.49 19.7905C122.808 15.9296 124.493 13.6162 120.613 12.0392C118.535 11.1961 117.206 11.1507 116.303 11.4735C115.518 11.7508 115.056 12.3068 114.706 12.8554C113.952 14.0372 112.437 20.7649 114.006 21.4399Z" fill="#FFB17D" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M117.974 13.6174C118.939 14.0469 119.113 15.6657 119.13 16.1799C119.147 16.6953 119.216 17.1298 120.527 16.8217C120.741 16.7714 120.896 16.7861 121.003 16.8512C121.546 17.1727 120.852 18.7374 120.642 19.0749C120.642 19.0749 120.34 20.1966 121.01 20.7415C121.091 20.8066 122.406 21.3809 125.574 16.5321C126.073 15.7712 126.547 13.9696 125.779 12.319C127.013 7.93038 114.055 6.30184 112.388 9.29262C109.371 14.717 119.256 13.2333 117.975 13.6186L117.974 13.6174Z" fill="#284190" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M107.137 53.8242C107.311 56.1265 107.797 57.7759 108.864 57.7759C108.864 57.7759 113.606 59.445 119.275 59.4892C120.383 59.4965 121.95 59.2818 123.252 59.0645C124.581 58.8387 125.633 58.6129 125.633 58.6129C126.773 58.3491 128.03 57.6446 127.862 56.3462C127.765 55.6099 127.698 54.6526 127.653 53.5383C127.528 50.5291 127.549 46.381 127.534 42.4109C127.523 39.9724 127.499 37.6026 127.417 35.6035C127.417 35.6035 128.535 27.7491 127.293 26.4605C125.839 24.9535 121.566 24.4896 121.298 24.5473C121.218 24.5313 121.137 24.5105 121.055 24.4957C121.055 24.4957 117.415 26.5477 114.712 25.0296C114.712 25.0296 114.686 25.0345 114.636 25.0406C113.977 25.1449 110.69 25.9046 109.556 27.1036C109.165 27.5172 107.601 30.0527 107.558 32.8373C107.498 36.719 107.65 41.1285 107.65 41.1297C107.61 41.7605 107.542 42.5729 107.467 43.5007C107.389 44.4899 107.302 45.6067 107.227 46.7701C107.19 47.3567 107.156 47.9556 107.129 48.5557C107.044 50.4027 107.018 52.2632 107.136 53.8218L107.137 53.8242Z" fill="#F47A44" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M121.28 24.5521C121.28 24.5521 117.254 28.7063 114.374 27.8558C114.374 27.8558 113.99 27.2938 115.287 27.1146C116.583 26.9342 117.984 27.0078 121.28 24.5521Z" fill="#EF6A30" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M123.833 39.1515C123.833 39.1515 123.824 50.3856 127.653 53.5384C127.528 50.5292 127.549 46.3811 127.534 42.411L123.833 39.1503V39.1515Z" fill="#EF6A30" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M135.604 60.1813C135.604 60.1813 137.553 63.242 137.662 64.4128C137.736 65.2093 137.558 68.3498 137.16 68.3596C136.598 68.3755 136.039 66.4218 135.82 65.9149C135.603 65.4068 135.349 65.0092 135.133 65.0092C134.917 65.0092 135.604 66.9642 135.133 66.7482C134.662 66.531 133.865 64.7208 133.793 64.2864C133.721 63.8507 134.218 62.459 133.975 61.9117C133.732 61.3631 135.603 60.1813 135.603 60.1813H135.604Z" fill="#FFB17D" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M126.923 26.0359C126.923 26.0359 129.557 27.2803 131.767 36.4932C133.431 43.4381 136.62 61.1729 136.62 61.1729L133.923 62.2811C133.923 62.2811 124.051 39.6153 122.639 36.4281C121.227 33.241 126.924 26.0371 126.924 26.0371L126.923 26.0359Z" fill="#F47A44" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M115.194 11.2612C113.998 11.6417 113.496 12.2577 113.686 13.1107C115.121 14.2262 116.641 14.6275 118.245 14.3171C117.376 14.0581 116.359 13.0395 115.194 11.2625V11.2612Z" fill="#284190" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M125.294 13.2518C125.023 12.6947 125.072 12.3044 125.443 12.0823C126.331 12.2173 126.991 12.6235 127.427 13.3046C127.038 13.0812 126.328 13.0641 125.294 13.2518Z" fill="#284190" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M123.943 13.0702C124.094 13.8973 124.46 14.2827 125.043 14.2287C125.904 13.3709 126.301 12.3964 126.231 11.3042C125.985 11.8601 125.223 12.448 123.943 13.0702Z" fill="#284190" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M115.603 15.5995C115.257 15.3602 114.961 15.1135 114.596 14.8742C114.062 14.5244 113.802 14.8828 113.381 14.8141C113.483 14.7846 113.477 14.7539 113.602 14.6864C114.277 14.3256 114.72 14.5588 115.284 14.9982C115.597 15.2424 115.684 15.1749 115.604 15.5995H115.603Z" fill="#125AA2" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M114.578 15.2153C114.374 15.165 114.169 15.2889 114.119 15.4914C114.069 15.6939 114.193 15.8989 114.395 15.9492C114.599 15.9995 114.803 15.8756 114.853 15.6731C114.903 15.4706 114.779 15.2656 114.578 15.2153Z" fill="white" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M114.396 15.9491C114.193 15.8988 114.07 15.6939 114.12 15.4914C114.17 15.2877 114.375 15.1649 114.579 15.2153C114.664 15.2349 114.735 15.284 114.785 15.3478L114.758 15.3367C114.692 15.3208 114.626 15.3613 114.609 15.4263C114.593 15.4926 114.633 15.5589 114.698 15.5748C114.763 15.5908 114.831 15.5503 114.847 15.4852L114.849 15.4717C114.869 15.5343 114.871 15.6031 114.855 15.6718C114.805 15.8755 114.6 15.9995 114.396 15.9479V15.9491Z" fill="#125AA2" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M117.181 15.9896C117.6 15.938 117.975 15.8582 118.41 15.8178C119.043 15.7564 119.109 16.1957 119.513 16.3295C119.436 16.2559 119.456 16.2313 119.377 16.1135C118.947 15.4803 118.446 15.4803 117.744 15.6067C117.353 15.6766 117.309 15.576 117.181 15.9896Z" fill="#125AA2" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M118.266 16.1271C118.47 16.1774 118.592 16.3812 118.542 16.5837C118.492 16.7874 118.287 16.9101 118.084 16.8598C117.881 16.8095 117.758 16.6057 117.808 16.402C117.858 16.1995 118.063 16.0768 118.266 16.1271Z" fill="white" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M118.085 16.8609C118.289 16.9113 118.493 16.7873 118.543 16.5848C118.593 16.3811 118.47 16.1761 118.267 16.1258C118.182 16.105 118.096 16.1148 118.023 16.1479L118.052 16.1504C118.119 16.1663 118.158 16.2326 118.142 16.2989C118.126 16.3651 118.058 16.4044 117.993 16.3884C117.928 16.3725 117.888 16.305 117.904 16.24L117.909 16.2265C117.862 16.2731 117.828 16.3332 117.811 16.4019C117.76 16.6057 117.884 16.8106 118.087 16.8609H118.085Z" fill="#125AA2" />
                <path d="M115.588 18.2012C115.588 18.2012 115.581 18.2012 115.577 18.2012C115.403 18.1742 115.259 18.0772 115.15 17.9103C115.092 17.7766 115.14 17.5041 115.886 16.3996C115.909 16.3665 115.956 16.3566 115.993 16.38C116.027 16.4045 116.037 16.4511 116.014 16.4867C115.271 17.5851 115.269 17.7986 115.285 17.8379C115.363 17.957 115.47 18.0294 115.6 18.049C115.642 18.0551 115.67 18.0944 115.665 18.1361C115.659 18.1742 115.627 18.2012 115.589 18.2012H115.588Z" fill="#FB9674" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M114.243 19.1449C114.856 19.9573 115.582 20.0739 116.419 19.4947C115.472 19.4259 114.743 19.2701 114.243 19.1449Z" fill="white" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M37.0405 31.6211C37.0405 16.5273 49.2761 4.29175 64.3686 4.29175C79.4612 4.29175 91.698 16.5273 91.698 31.6211C91.698 46.7149 79.4624 58.9504 64.3686 58.9504C49.2749 58.9504 37.0405 46.7149 37.0405 31.6211Z" fill="#619FDF" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M41.1763 31.621C41.1763 18.8124 51.5599 8.42749 64.3686 8.42749C77.1773 8.42749 87.5634 18.8124 87.5634 31.621C87.5634 44.4297 77.1785 54.8146 64.3686 54.8146C51.5587 54.8146 41.1763 44.4309 41.1763 31.621Z" fill="#BADAF9" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M76.5036 11.8257C78.8133 15.4313 80.1522 19.718 80.1522 24.319C80.1522 37.1276 69.7686 47.5125 56.9587 47.5125C52.5099 47.5125 48.3545 46.2595 44.8237 44.0873C48.946 50.5217 56.1585 54.7876 64.3675 54.7876C77.1774 54.7876 87.5623 44.4027 87.5623 31.594C87.5623 23.2328 83.1381 15.9062 76.5036 11.8257Z" fill="#A3CFFB" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M45.2383 33.743C45.2383 22.4352 54.4046 13.269 65.7123 13.269C72.321 13.269 78.1982 16.4009 81.9425 21.262C78.4069 15.1245 71.781 10.9924 64.1893 10.9924C52.8816 10.9924 43.7153 20.1587 43.7153 31.4664C43.7153 36.1643 45.2985 40.4915 47.9591 43.9462C46.2287 40.9419 45.2396 37.4578 45.2396 33.7417L45.2383 33.743Z" fill="#D1E4F6" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M66.2832 16.6512V19.6064C67.4699 19.7967 68.4394 20.1906 69.1929 20.7821C69.9477 21.3749 70.6656 22.2843 71.3492 23.5103L68.4087 25.1535C67.5251 23.5459 66.3691 22.742 64.943 22.742C64.0582 22.742 63.3243 23.0034 62.7414 23.5262C62.1584 24.0478 61.8663 24.7019 61.8663 25.4861C61.8663 26.2004 62.1032 26.7919 62.5757 27.2656C63.0383 27.7283 63.9723 28.2744 65.3799 28.9089C66.5961 29.4611 67.6012 29.9815 68.3952 30.4687C69.1893 30.9559 69.7869 31.4259 70.1882 31.8776C71.3246 33.1036 71.8916 34.5861 71.8916 36.3239C71.8916 38.0616 71.3799 39.5404 70.3539 40.8462C69.339 42.1422 67.9829 43.0172 66.2832 43.4701V46.5909H63.6446V43.5609C61.6749 43.2381 60.1727 42.5607 59.137 41.5261C58.1012 40.4903 57.3378 38.8925 56.8457 36.7313L60.1629 36.0379C60.6146 37.5658 61.168 38.6568 61.8209 39.3097C62.5045 39.9332 63.4139 40.2436 64.5491 40.2436C65.6843 40.2436 66.5789 39.8878 67.3226 39.1735C68.0565 38.4703 68.4235 37.5597 68.4235 36.4453C68.4235 35.4501 68.1166 34.6511 67.5043 34.0486C67.1938 33.7565 66.7323 33.4288 66.1248 33.0619C65.5161 32.6949 64.7393 32.2948 63.7955 31.8641C61.8455 30.9891 60.5642 30.1852 59.9506 29.4513C58.9762 28.3566 58.489 27.0447 58.489 25.5168C58.489 24.7927 58.6043 24.119 58.8363 23.4955C59.067 22.8733 59.402 22.3076 59.8389 21.7995C60.2758 21.2927 60.817 20.8533 61.4601 20.4815C62.1032 20.1096 62.8322 19.8175 63.6458 19.6064V16.6512H66.2844H66.2832Z" fill="white" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M142.144 104.256H167.724C168.13 104.256 168.46 103.927 168.46 103.52C168.46 103.113 168.132 102.784 167.724 102.784H142.144C141.735 102.784 141.407 103.113 141.407 103.52C141.407 103.927 141.735 104.256 142.144 104.256ZM178.689 98.1656H181.735C182.14 98.1656 182.471 97.8367 182.471 97.4292C182.471 97.0218 182.142 96.6929 181.734 96.6929H178.688C178.282 96.6929 177.952 97.0218 177.952 97.4292C177.952 97.8367 178.281 98.1656 178.688 98.1656H178.689ZM173.817 104.256H176.255C176.66 104.256 176.99 103.927 176.99 103.52C176.99 103.113 176.66 102.784 176.253 102.784H173.817C173.41 102.784 173.081 103.113 173.081 103.52C173.081 103.927 173.409 104.256 173.817 104.256ZM147.016 98.1656H173.817C174.222 98.1656 174.552 97.8367 174.552 97.4292C174.552 97.0218 174.224 96.6929 173.816 96.6929H147.016C146.611 96.6929 146.279 97.0218 146.279 97.4292C146.279 97.8367 146.608 98.1656 147.016 98.1656Z" fill="#A3CFFB" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.775405 116.206H26.3572C26.7634 116.206 27.0935 115.877 27.0935 115.469C27.0935 115.062 26.7646 114.733 26.3572 114.733H0.775405C0.367962 114.733 0.0390625 115.062 0.0390625 115.469C0.0390625 115.877 0.367962 116.206 0.775405 116.206ZM37.3213 110.115H40.3673C40.7735 110.115 41.1036 109.786 41.1036 109.379C41.1036 108.971 40.7747 108.644 40.3673 108.644H37.3213C36.9151 108.644 36.5849 108.972 36.5849 109.379C36.5849 109.785 36.9138 110.115 37.3213 110.115ZM32.4492 116.206H34.8852C35.2902 116.206 35.6216 115.877 35.6216 115.469C35.6216 115.062 35.2914 114.733 34.8852 114.733H32.4492C32.0417 114.733 31.7128 115.062 31.7128 115.469C31.7128 115.877 32.0405 116.206 32.4492 116.206ZM5.64754 110.115H32.4492C32.8541 110.115 33.1843 109.786 33.1843 109.379C33.1843 108.971 32.8554 108.644 32.4479 108.644H5.64754C5.24132 108.644 4.91119 108.972 4.91119 109.379C4.91119 109.785 5.24009 110.115 5.64754 110.115Z" fill="#A3CFFB" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M28.9268 7.56223H54.5085C54.9147 7.56223 55.2436 7.23333 55.2436 6.82589C55.2436 6.41845 54.9147 6.08955 54.5085 6.08955H28.9268C28.5193 6.08955 28.1904 6.41845 28.1904 6.82589C28.1904 7.23333 28.5193 7.56223 28.9268 7.56223ZM65.4727 1.47146H68.5187C68.9236 1.47146 69.2538 1.14256 69.2538 0.735114C69.2538 0.328898 68.9249 0 68.5174 0H65.4714C65.0665 0 64.7351 0.328898 64.7351 0.735114C64.7351 1.14133 65.064 1.47146 65.4714 1.47146H65.4727ZM60.6005 7.56223H63.0378C63.4428 7.56223 63.7729 7.23333 63.7729 6.82589C63.7729 6.41845 63.4428 6.08955 63.0366 6.08955H60.6005C60.1931 6.08955 59.8642 6.41845 59.8642 6.82589C59.8642 7.23333 60.1919 7.56223 60.6005 7.56223ZM33.7989 1.47146H60.6005C61.0055 1.47146 61.3356 1.14256 61.3356 0.735114C61.3356 0.327671 61.0067 0 60.5993 0H33.7989C33.3939 0 33.0626 0.328898 33.0626 0.735114C33.0626 1.14133 33.3915 1.47146 33.7989 1.47146Z" fill="#A3CFFB" />
              </svg>
            </motion.div>

            <motion.div
              variants={item}
              className="bg-white p-6 rounded-xl shadow flex items-center justify-between border-l-4 border-blue-500"
            >
              <div>
                <p className="text-sm text-gray-500">Debit</p>
                <p className="text-3xl font-bold text-blue-600">${totals.debit || 0}</p>
              </div>
              <svg width="189" height="155" viewBox="0 0 189 155" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M88.8497 1.34216C110.929 1.34216 108.41 35.9144 124.35 46.4521C145.447 60.3994 181.743 53.4919 181.743 77.4301C181.743 119.457 134.662 134.68 83.3609 134.68C32.0598 134.68 -11.7163 111.372 3.55797 69.4592C18.8334 27.55 37.544 1.34216 88.8497 1.34216Z" fill="#E9EEF7" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M70.8847 140.351C107.757 140.351 137.646 143.571 137.646 147.545C137.646 151.519 107.756 154.736 70.8847 154.736C34.0138 154.736 4.12354 151.515 4.12354 147.545C4.12354 143.575 34.0126 140.351 70.8847 140.351Z" fill="white" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M139.22 125.151C128.918 125.151 120.57 127.033 120.57 129.353C120.57 131.674 128.918 133.559 139.22 133.559C149.522 133.559 157.87 131.676 157.87 129.353C157.87 127.03 149.519 125.151 139.22 125.151Z" fill="#BADAF9" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M141.827 112.039C131.529 112.039 123.177 113.921 123.177 116.245C123.177 118.57 131.529 120.448 141.827 120.448C152.126 120.448 160.481 118.565 160.481 116.245C160.481 113.926 152.131 112.039 141.827 112.039Z" fill="#BADAF9" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M142.851 119.497C132.549 119.497 124.201 121.38 124.201 123.703C124.201 126.026 132.549 127.906 142.851 127.906C153.153 127.906 161.502 126.023 161.502 123.703C161.502 121.384 153.15 119.497 142.851 119.497Z" fill="#BADAF9" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M145.46 106.388C135.161 106.388 126.81 108.271 126.81 110.591C126.81 112.91 135.161 114.793 145.46 114.793C155.758 114.793 164.109 112.91 164.109 110.591C164.109 108.271 155.761 106.388 145.46 106.388Z" fill="#BADAF9" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M139.22 138.301C128.918 138.301 120.57 136.421 120.57 134.098V129.355C120.57 131.679 128.918 133.561 139.22 133.561C149.522 133.561 157.87 131.678 157.87 129.355V134.098C157.87 136.422 149.519 138.301 139.22 138.301Z" fill="#619FDF" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M141.827 125.193C131.529 125.193 123.177 123.311 123.177 120.987V116.247C123.177 118.567 131.529 120.449 141.827 120.449C152.126 120.449 160.478 118.566 160.478 116.247V120.987C160.478 123.311 152.129 125.193 141.827 125.193Z" fill="#619FDF" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M142.851 132.65C132.549 132.65 124.201 130.767 124.201 128.447V123.703C124.201 126.024 132.549 127.906 142.851 127.906C153.153 127.906 161.502 126.023 161.502 123.703V128.447C161.502 130.767 153.15 132.65 142.851 132.65Z" fill="#619FDF" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M145.46 119.538C135.161 119.538 126.81 117.655 126.81 115.334V110.591C126.81 112.911 135.161 114.793 145.46 114.793C155.758 114.793 164.109 112.91 164.109 110.591V115.334C164.109 117.655 155.761 119.538 145.46 119.538Z" fill="#619FDF" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M108.231 136.856C97.9327 136.856 89.5811 138.738 89.5811 141.062C89.5811 143.387 97.9327 145.265 108.231 145.265C118.53 145.265 126.881 143.382 126.881 141.062C126.881 138.743 118.533 136.856 108.231 136.856Z" fill="#BADAF9" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M108.628 124.736C118.93 124.736 127.278 126.619 127.278 128.939C127.278 131.259 118.93 133.145 108.628 133.145C98.3262 133.145 89.978 131.263 89.978 128.939C89.978 126.615 98.3297 124.736 108.628 124.736Z" fill="#BADAF9" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M107.588 113.401C117.887 113.401 126.238 115.283 126.238 117.604C126.238 119.924 117.887 121.807 107.588 121.807C97.2897 121.807 88.938 119.924 88.938 117.604C88.938 115.283 97.2862 113.401 107.588 113.401Z" fill="#BADAF9" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M111.863 131.206C101.564 131.206 93.2139 133.089 93.2139 135.409C93.2139 137.728 101.564 139.611 111.863 139.611C122.161 139.611 130.512 137.729 130.512 135.409C130.512 133.088 122.164 131.206 111.863 131.206Z" fill="#BADAF9" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M104.997 119.086C115.299 119.086 123.647 120.968 123.647 123.289C123.647 125.609 115.299 127.491 104.997 127.491C94.6949 127.491 86.3467 125.609 86.3467 123.289C86.3467 120.968 94.6983 119.086 104.997 119.086Z" fill="#BADAF9" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M103.957 107.748C114.255 107.748 122.607 109.631 122.607 111.95C122.607 114.27 114.255 116.153 103.957 116.153C93.6583 116.153 85.3066 114.273 85.3066 111.95C85.3066 109.627 93.6548 107.748 103.957 107.748Z" fill="#BADAF9" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M108.231 150.01C97.9327 150.01 89.5811 148.128 89.5811 145.807V141.064C89.5811 143.384 97.9327 145.266 108.231 145.266C118.53 145.266 126.881 143.383 126.881 141.064V145.807C126.881 148.128 118.533 150.01 108.231 150.01Z" fill="#619FDF" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M108.628 137.89C118.93 137.89 127.278 136.007 127.278 133.684V128.94C127.278 131.264 118.93 133.146 108.628 133.146C98.3262 133.146 89.978 131.264 89.978 128.94V133.684C89.978 136.008 98.3297 137.89 108.628 137.89Z" fill="#619FDF" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M107.588 126.551C117.887 126.551 126.238 124.669 126.238 122.348V117.605C126.238 119.926 117.887 121.809 107.588 121.809C97.2897 121.809 88.938 119.926 88.938 117.605V122.348C88.938 124.669 97.2862 126.551 107.588 126.551Z" fill="#619FDF" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M111.863 144.355C101.564 144.355 93.2139 142.473 93.2139 140.152V135.409C93.2139 137.729 101.564 139.611 111.863 139.611C122.161 139.611 130.512 137.729 130.512 135.409V140.152C130.512 142.473 122.164 144.355 111.863 144.355Z" fill="#619FDF" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M104.997 132.236C115.299 132.236 123.647 130.354 123.647 128.033V123.29C123.647 125.611 115.299 127.492 104.997 127.492C94.6949 127.492 86.3467 125.611 86.3467 123.29V128.033C86.3467 130.354 94.6983 132.236 104.997 132.236Z" fill="#619FDF" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M103.957 120.897C114.255 120.897 122.607 119.015 122.607 116.695V111.951C122.607 114.272 114.255 116.154 103.957 116.154C93.6583 116.154 85.3066 114.271 85.3066 111.951V116.695C85.3066 119.015 93.6548 120.897 103.957 120.897Z" fill="#619FDF" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M136.906 108.473C136.447 108.853 135.968 109.394 135.825 110.119L133.276 110.17L133.128 111.279L135.871 111.221C136.292 112.408 138.023 113.083 140.385 113.035C142.814 112.988 144.17 112.18 145.423 111.061C146.524 110 147.367 109.613 148.595 109.585C149.8 109.561 150.686 109.938 150.577 110.752C150.481 111.463 149.865 112.141 149.252 112.597L151.905 112.881C152.49 112.44 153.068 111.693 153.212 110.968L155.957 110.913L156.104 109.805L153.167 109.866C152.808 108.596 150.932 107.891 148.478 107.942C145.973 107.993 144.546 108.631 143.09 109.993C142.033 110.903 141.293 111.407 140.188 111.426C139.25 111.447 138.312 111.08 138.415 110.325C138.501 109.668 139.079 109.102 139.487 108.757L136.906 108.473Z" fill="white" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M96.2484 109.935C95.7898 110.314 95.3104 110.855 95.1641 111.581L92.6147 111.632L92.4673 112.741L95.2129 112.686C95.6296 113.87 97.3652 114.548 99.7242 114.497C102.154 114.449 103.51 113.641 104.763 112.522C105.864 111.465 106.711 111.075 107.935 111.047C109.14 111.022 110.026 111.4 109.917 112.213C109.824 112.925 109.205 113.603 108.592 114.058L111.245 114.343C111.83 113.901 112.408 113.155 112.556 112.429L115.298 112.375L115.445 111.266L112.509 111.328C112.15 110.061 110.275 109.353 107.82 109.404C105.319 109.455 103.888 110.091 102.434 111.454C101.38 112.368 100.64 112.868 99.5315 112.888C98.5935 112.909 97.6589 112.546 97.7588 111.786C97.8447 111.133 98.4263 110.567 98.8303 110.219L96.253 109.935H96.2484Z" fill="white" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M62.1462 25.7828H169.274C172.823 25.7828 175.728 28.6886 175.728 32.241V93.7827C175.728 97.3316 172.823 100.237 169.274 100.237H62.1462C58.5961 100.237 55.688 97.3316 55.688 93.7827V32.241C55.688 28.6886 58.5973 25.7828 62.1462 25.7828Z" fill="#BADAF9" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M66.3079 72.0701H82.0721C82.9578 72.0701 83.6881 72.7956 83.6881 73.6861V77.8654C83.6881 78.7523 82.9578 79.4814 82.0721 79.4814H66.3079C65.4175 79.4814 64.6919 78.7523 64.6919 77.8654V73.6861C64.6919 72.7956 65.4175 72.0701 66.3079 72.0701ZM149.346 72.0701H165.11C166.001 72.0701 166.726 72.7956 166.726 73.6861V77.8654C166.726 78.7523 166.001 79.4814 165.11 79.4814H149.346C148.456 79.4814 147.73 78.7523 147.73 77.8654V73.6861C147.73 72.7956 148.456 72.0701 149.346 72.0701ZM121.664 72.0701H137.432C138.319 72.0701 139.044 72.7956 139.044 73.6861V77.8654C139.044 78.7523 138.319 79.4814 137.432 79.4814H121.664C120.777 79.4814 120.052 78.7523 120.052 77.8654V73.6861C120.052 72.7956 120.777 72.0701 121.664 72.0701ZM93.9854 72.0701H109.751C110.641 72.0701 111.367 72.7956 111.367 73.6861V77.8654C111.367 78.7523 110.641 79.4814 109.751 79.4814H93.9854C93.0996 79.4814 92.3706 78.7523 92.3706 77.8654V73.6861C92.3706 72.7956 93.0996 72.0701 93.9854 72.0701Z" fill="#A3CFFB" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M65.7123 87.7483H118.835C119.397 87.7483 119.855 88.2069 119.855 88.7687V91.8556C119.855 92.4164 119.397 92.8761 118.835 92.8761H65.7123C65.1505 92.8761 64.6919 92.4175 64.6919 91.8556V88.7687C64.6919 88.208 65.1505 87.7483 65.7123 87.7483Z" fill="#A3CFFB" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M129.982 87.7483H151.867C152.428 87.7483 152.887 88.2069 152.887 88.7687V91.8556C152.887 92.4164 152.429 92.8761 151.867 92.8761H129.982C129.422 92.8761 128.962 92.4175 128.962 91.8556V88.7687C128.962 88.208 129.42 87.7483 129.982 87.7483Z" fill="#A3CFFB" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M130.503 34.5687H165.068C165.955 34.5687 166.68 35.0273 166.68 35.5892V38.6761C166.68 39.238 165.955 39.6965 165.068 39.6965H130.503C129.616 39.6965 128.89 39.238 128.89 38.6761V35.5892C128.89 35.0285 129.616 34.5687 130.503 34.5687Z" fill="#A3CFFB" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M66.02 42.6221H84.4473C85.1764 42.6221 85.7754 43.2176 85.7754 43.9502V58.9551C85.7754 59.6876 85.1764 60.2867 84.4473 60.2867H66.02C65.2909 60.2867 64.6919 59.6876 64.6919 58.9551V43.9502C64.6919 43.2176 65.2909 42.6221 66.02 42.6221Z" fill="#A3CFFB" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M69.4392 107.224C68.8912 107.382 68.3712 107.607 67.8882 107.885C67.3948 108.172 66.9397 108.514 66.5288 108.908C66.451 108.987 66.3303 108.998 66.2409 108.946L64.4031 107.885L64.3927 107.878C64.2905 107.82 64.1698 107.809 64.0607 107.84C63.9446 107.868 63.8447 107.943 63.7844 108.049L63.7739 108.063L62.4841 110.302C62.4226 110.407 62.4087 110.534 62.44 110.648C62.4702 110.76 62.5422 110.86 62.6513 110.925L62.6606 110.932L64.4844 111.983C64.5773 112.037 64.6214 112.151 64.597 112.25C64.532 112.524 64.4774 112.801 64.4438 113.088C64.4124 113.365 64.3915 113.65 64.3915 113.936C64.3915 114.223 64.4113 114.511 64.4438 114.789C64.4774 115.073 64.532 115.353 64.597 115.623C64.626 115.736 64.5703 115.85 64.467 115.897L62.6501 116.948V116.951C62.541 117.013 62.469 117.116 62.4388 117.225C62.4063 117.341 62.4203 117.464 62.483 117.575L63.7844 119.823C63.8459 119.934 63.9446 120.005 64.0607 120.036C64.1698 120.067 64.2975 120.053 64.4031 119.992L64.4171 119.985L66.2409 118.931C66.3372 118.876 66.4545 118.894 66.5288 118.964C66.9397 119.358 67.3948 119.704 67.8882 119.992C68.3746 120.269 68.8982 120.494 69.4497 120.652C69.5565 120.683 69.6238 120.782 69.6238 120.885V123.003C69.6238 123.13 69.6784 123.242 69.7608 123.325C69.8432 123.407 69.9558 123.458 70.0789 123.458H72.6805C72.8035 123.458 72.9173 123.407 73.0021 123.325C73.0845 123.242 73.1356 123.13 73.1356 123.003V120.885C73.1356 120.772 73.2134 120.672 73.3202 120.648C73.8693 120.49 74.3882 120.268 74.8712 119.991C75.3645 119.703 75.8196 119.358 76.2306 118.963C76.313 118.884 76.4384 118.874 76.5313 118.935L78.3562 119.989C78.4619 120.051 78.5884 120.065 78.701 120.034C78.8136 120.002 78.9135 119.931 78.975 119.821L78.9855 119.807L80.2752 117.569C80.3368 117.462 80.3507 117.339 80.3194 117.223C80.2892 117.11 80.2172 117.011 80.1104 116.949L78.2761 115.888C78.1798 115.833 78.1368 115.723 78.1601 115.621C78.2285 115.35 78.2796 115.069 78.3144 114.786C78.3481 114.509 78.3655 114.226 78.3655 113.934C78.3655 113.643 78.3481 113.363 78.3144 113.082C78.2796 112.798 78.2285 112.521 78.1601 112.247C78.1322 112.135 78.1879 112.021 78.2866 111.973L80.1104 110.923C80.2172 110.861 80.2892 110.758 80.3194 110.645C80.3507 110.533 80.3368 110.408 80.2752 110.299L80.2683 110.285L78.9785 108.047C78.9135 107.94 78.8136 107.866 78.701 107.838C78.5884 107.807 78.4619 107.817 78.3562 107.879V107.882L76.5173 108.94C76.4221 108.998 76.2979 108.977 76.2225 108.902C75.815 108.508 75.3634 108.165 74.87 107.881C74.3836 107.6 73.86 107.375 73.3097 107.217C73.2041 107.187 73.1356 107.09 73.1356 106.985V104.866C73.1356 104.743 73.0833 104.63 73.0021 104.548C72.9173 104.462 72.8035 104.415 72.6805 104.415H70.0789C69.9558 104.415 69.8432 104.466 69.7608 104.548C69.6784 104.63 69.6238 104.743 69.6238 104.866V106.985C69.6238 107.101 69.5448 107.197 69.4392 107.221V107.224ZM68.5871 111.143C69.3034 110.428 70.289 109.987 71.3803 109.987C72.4715 109.987 73.4583 110.428 74.1734 111.143C74.8886 111.858 75.3332 112.847 75.3332 113.936C75.3332 115.025 74.8886 116.017 74.1734 116.733C73.4583 117.448 72.4727 117.889 71.3803 117.889C70.2878 117.889 69.3034 117.448 68.5871 116.733C67.872 116.018 67.4308 115.029 67.4308 113.936C67.4308 112.844 67.872 111.858 68.5871 111.143Z" fill="#A3CFFB" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M143.761 13.3994C143.44 13.4923 143.134 13.6223 142.855 13.7825C142.567 13.9509 142.3 14.1517 142.061 14.3816C142.013 14.4257 141.944 14.4326 141.89 14.4025L140.818 13.7825L140.811 13.7756C140.75 13.7419 140.681 13.7384 140.616 13.7547C140.551 13.7721 140.493 13.8127 140.456 13.8789L140.448 13.8847L139.695 15.193C139.657 15.2534 139.65 15.3289 139.667 15.3939C139.688 15.4589 139.728 15.5216 139.793 15.5553L139.798 15.5622L140.865 16.1787C140.919 16.2089 140.944 16.2739 140.93 16.3319C140.893 16.4933 140.861 16.6535 140.84 16.8218C140.82 16.9832 140.809 17.1504 140.809 17.3175C140.809 17.4847 140.82 17.653 140.84 17.8167C140.861 17.9816 140.892 18.1453 140.93 18.3032C140.947 18.3682 140.912 18.4367 140.856 18.4645L139.793 19.081C139.728 19.1193 139.688 19.1773 139.667 19.2423C139.649 19.3074 139.656 19.3828 139.695 19.4443L140.455 20.7585C140.492 20.8235 140.55 20.8642 140.615 20.8816C140.68 20.9025 140.756 20.8955 140.817 20.8572L140.824 20.8502L141.892 20.2338C141.947 20.2024 142.015 20.2129 142.059 20.2547C142.299 20.4869 142.566 20.6854 142.853 20.8537C143.138 21.0174 143.442 21.1486 143.764 21.2403C143.829 21.2612 143.866 21.3157 143.866 21.3773V22.616C143.866 22.688 143.896 22.7565 143.945 22.8041C143.992 22.8516 144.061 22.883 144.133 22.883H145.652C145.724 22.883 145.789 22.8516 145.841 22.8041C145.888 22.7565 145.919 22.688 145.919 22.616V21.3773C145.919 21.3123 145.964 21.2542 146.025 21.2403C146.347 21.1474 146.652 21.0174 146.932 20.8537C147.22 20.6865 147.487 20.488 147.726 20.2547C147.773 20.2106 147.849 20.2036 147.903 20.2407L148.968 20.8537C149.03 20.8909 149.105 20.8978 149.17 20.8816C149.235 20.8642 149.293 20.82 149.33 20.7585L149.337 20.7515L150.091 19.4409C150.129 19.3793 150.135 19.3074 150.119 19.2389C150.098 19.1739 150.057 19.1158 149.995 19.0775L148.92 18.4576C148.866 18.4262 148.838 18.3612 148.855 18.3032C148.893 18.1418 148.925 17.9816 148.945 17.8133C148.966 17.6519 148.975 17.4847 148.975 17.3175C148.975 17.1504 148.965 16.982 148.945 16.8183C148.925 16.6535 148.894 16.4898 148.855 16.3319C148.838 16.2634 148.873 16.1984 148.931 16.1705L149.995 15.5541C150.057 15.5169 150.098 15.4577 150.119 15.3927C150.136 15.3277 150.129 15.2523 150.091 15.1919L150.087 15.1838L149.33 13.8777C149.293 13.8116 149.235 13.7709 149.17 13.7535C149.105 13.7326 149.03 13.7396 148.968 13.7779L147.893 14.3978C147.838 14.4315 147.767 14.4187 147.722 14.3734C147.486 14.1447 147.22 13.9462 146.932 13.7779C146.647 13.613 146.343 13.483 146.022 13.3913C145.96 13.3739 145.918 13.3158 145.918 13.2543V12.0156C145.918 11.9436 145.888 11.8786 145.839 11.831C145.788 11.7834 145.723 11.7521 145.651 11.7521H144.132C144.06 11.7521 143.991 11.7834 143.944 11.831C143.896 11.8786 143.865 11.9436 143.865 12.0156V13.2543C143.865 13.3228 143.821 13.3774 143.759 13.3948V13.3983L143.761 13.3994ZM143.262 15.6888C143.68 15.2673 144.258 15.0108 144.894 15.0108C145.531 15.0108 146.11 15.2673 146.527 15.6888C146.945 16.1067 147.205 16.6813 147.205 17.321C147.205 17.9607 146.945 18.5365 146.527 18.9533C146.109 19.3712 145.531 19.6313 144.894 19.6313C144.258 19.6313 143.679 19.3712 143.262 18.9533C142.845 18.5353 142.584 17.9572 142.584 17.321C142.584 16.6848 142.844 16.1055 143.262 15.6888Z" fill="#A3CFFB" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M171.914 105.793C164.738 112.251 161.924 122.713 165.64 132.238C169.37 141.803 178.584 147.604 188.279 147.45C170.67 145.567 160.312 124.918 173.951 111.015L175.15 114.089L181.109 103.102L170.825 103L171.914 105.792L171.914 105.793Z" fill="#BADAF9" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M173.371 109.528C166.72 116.518 165.931 125.276 168.955 132.634C166.411 125.725 167.481 117.611 173.95 111.015L173.371 109.528H173.371Z" fill="#619FDF" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.6003 92.9643C10.8647 92.9643 9.45886 91.5573 9.45886 89.8229C9.45886 88.0884 10.8647 86.6837 12.6003 86.6837C14.3359 86.6837 15.7394 88.0908 15.7394 89.8229C15.7394 91.555 14.3324 92.9643 12.6003 92.9643ZM21.5092 91.4923V88.2266H19.4753C19.3046 87.4836 19.0167 86.7859 18.6313 86.152L20.0825 84.7044L17.7722 82.3941L16.3338 83.8313C15.7046 83.4378 15.0104 83.1429 14.2709 82.9618V80.9116H11.0029V82.9444C10.2599 83.1151 9.56103 83.403 8.92832 83.7895L7.48065 82.3419L5.17042 84.6521L6.60764 86.0893C6.21409 86.7162 5.91921 87.4105 5.74275 88.15H3.69141V91.4191H5.72418C5.89483 92.1621 6.1839 92.8598 6.56585 93.4937L5.11818 94.9414L7.42841 97.2516L8.86679 95.8144C9.49717 96.2079 10.1879 96.5028 10.9298 96.6839V98.7341H14.1954V96.7013C14.9384 96.5272 15.6373 96.2393 16.27 95.8562L17.7177 97.3038L20.0279 94.9936L18.5907 93.5564C18.9842 92.9272 19.2826 92.2353 19.4602 91.4923H21.5104H21.5092Z" fill="#A3CFFB" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M162.456 17.0307C160.72 17.0307 159.317 15.6237 159.317 13.8893C159.317 12.1548 160.72 10.7501 162.456 10.7501C164.191 10.7501 165.597 12.1572 165.597 13.8893C165.597 15.6214 164.19 17.0307 162.456 17.0307ZM171.365 15.5587V12.293H169.332C169.161 11.55 168.873 10.8523 168.49 10.2184L169.938 8.77076L167.628 6.46052L166.19 7.89774C165.561 7.50419 164.866 7.20932 164.126 7.02822V4.97803H160.862V7.0108C160.119 7.18146 159.418 7.46936 158.787 7.85595L157.336 6.4048L155.026 8.71503L156.463 10.1523C156.073 10.7815 155.775 11.4769 155.597 12.2164H153.547V15.4855H155.58C155.75 16.2285 156.038 16.9262 156.425 17.5601L154.974 19.0078L157.285 21.318L158.721 19.8808C159.351 20.2709 160.046 20.5692 160.785 20.7468V22.797H164.054V20.7642C164.797 20.5936 165.495 20.3057 166.129 19.9226L167.577 21.3702L169.887 19.06L168.45 17.6228C168.84 16.9936 169.137 16.2982 169.316 15.5587H171.366H171.365Z" fill="#A3CFFB" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M20.5235 148.764C17.7025 147.771 17.4738 146.317 15.9541 145.605C14.4206 144.89 14.2464 143.616 15.7452 142.234C16.8504 143.117 18.2237 144.202 18.9482 143.627C19.4334 143.244 21.0808 143.268 21.4047 143.829C22.8396 147.162 24.8352 146.105 25.2287 147.62C25.2729 149.64 21.8191 149.219 20.5224 148.764H20.5235Z" fill="#163560" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M44.759 148.866C39.5499 148.78 35.655 148.719 33.8567 148.151C31.9168 147.538 32.3174 146.354 33.433 144.462C38.3414 146.721 37.033 143.996 39.3305 144.342C40.9418 145.642 43.3345 146.512 46.4969 146.953C47.8377 147.942 47.2944 148.822 44.759 148.866Z" fill="#163560" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M26.7568 22.4383C27.5881 22.4964 28.9034 22.3362 29.1356 22.0413C30.019 20.9187 30.632 19.745 30.8607 19.0055C30.6854 18.5156 30.5043 17.8933 30.3162 17.1434C27.1132 14.9666 26.6756 13.3541 29.0021 12.3104C29.4722 12.574 30.0573 13.3855 30.7516 14.7437C31.3053 14.7194 31.7302 14.4361 32.0135 13.8881C31.3529 11.5988 30.9222 9.73669 30.7237 8.30527C32.3014 5.95672 35.9978 5.62238 40.8887 6.25508C41.1151 7.55531 41.2997 8.93449 41.4471 10.3926C42.3132 11.1902 42.1994 14.1435 41.403 17.5462C41.8001 19.4838 40.6055 20.5414 37.8158 20.7155C37.7786 21.404 37.8402 22.2456 37.8843 22.3408C37.9562 22.4883 38.2024 22.6322 38.5448 22.7553C38.6412 25.949 34.7115 25.8422 26.7568 22.4372V22.4383Z" fill="#FFB27D" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M40.8883 6.25615C35.9974 5.62344 32.301 5.95895 30.7233 8.30633C30.9218 9.73659 31.3525 11.5987 32.0131 13.8915C31.7298 14.436 31.3038 14.7193 30.7512 14.7436C30.0569 13.3854 29.4718 12.5739 29.0017 12.3104C26.6752 13.354 27.1128 14.9665 30.3158 17.1433C30.505 17.8932 30.6862 18.5155 30.8603 19.0054C27.9754 18.3622 25.5618 15.7815 25.2229 14.6659C21.8585 8.03584 25.6094 5.23337 27.619 4.21292C28.5059 -2.35209 38.0371 3.4502 42.8155 0.283203C44.7147 2.90805 42.3673 6.19694 40.8895 6.25615H40.8883Z" fill="#22407A" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M70.2401 34.0684C67.8208 44.432 63.5707 52.4748 57.4839 58.1982C55.2933 57.5306 53.3464 56.0354 51.648 53.7008C51.7409 61.1991 51.5516 68.6616 51.0896 76.088C46.6479 78.1927 40.7551 78.0557 33.4053 75.677L30.424 72.0085C29.6566 71.8576 27.9187 72.7027 27.084 73.9937C20.1057 68.6685 15.3994 62.9417 12.6201 57.2543C13.3701 45.0356 15.029 35.3942 17.6005 28.33C18.9007 26.3309 21.9504 24.3701 26.7555 22.4395C34.7101 25.8444 38.6387 25.9512 38.5435 22.7575C40.8851 23.5238 43.9859 24.8832 47.8529 26.8301C51.0768 29.2808 53.8224 35.9166 56.0908 46.7457C59.7802 42.1217 63.6101 37.2203 67.5747 32.0391C68.4581 32.2887 69.3474 32.9667 70.2413 34.0684H70.2401ZM28.8173 68.6952C31.131 61.0865 29.854 51.6982 24.9839 40.5336C23.758 46.041 22.4322 51.4625 21.0124 56.7981C22.6656 57.5852 25.2672 61.5521 28.8161 68.6952H28.8173Z" fill="#699DEE" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M27.9514 78.6142C29.081 78.5248 30.899 77.5461 33.4066 75.677C40.7552 78.0558 46.6492 78.1928 51.0909 76.088C51.878 88.5877 48.8085 101.692 44.9067 116.3C41.0907 122.711 41.2509 127.218 39.2193 142.014C38.0898 142.822 36.2207 142.706 33.6156 141.665C32.7901 129.049 33.3625 120.698 36.634 115.989C36.1208 111.758 37.4594 101.361 37.5244 94.8334C35.1422 100.142 33.5064 107.316 30.4056 114.557C26.628 123.375 23.995 132.814 22.0029 141.425C19.8946 141.832 17.9199 141.592 16.0752 140.699C18.1904 126.55 20.5378 116.81 23.1115 111.483C23.0129 97.5674 24.3363 85.0712 27.0854 73.9926C27.5985 75.2998 27.8864 76.8403 27.9514 78.613V78.6142Z" fill="#22407A" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M33.4062 75.6769C30.8986 77.5459 29.0794 78.5246 27.951 78.614C27.886 76.8413 27.5981 75.3007 27.085 73.9935C27.9197 72.7037 29.6587 71.8574 30.4249 72.0083L33.4062 75.6769Z" fill="#FFB27D" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M51.6492 53.7007C51.4101 46.4206 50.825 40.4523 49.9009 35.797C52.2564 45.6846 54.5388 52.2461 56.7468 55.4839C58.1423 55.4398 59.9127 54.6109 62.0511 52.9995C60.6649 54.9058 59.1453 56.6379 57.4852 58.1981C55.2945 57.5306 53.3477 56.0353 51.6492 53.7007Z" fill="#4A75CB" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M30.4251 72.0085C29.9967 70.9509 29.4604 69.8457 28.8173 68.6952C31.131 61.0865 29.854 51.6982 24.9839 40.5336C32.0643 50.5999 34.0739 61.3326 31.0102 72.7271L30.4251 72.0085Z" fill="#4A75CB" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M34.6011 20.0422C35.3859 20.4288 36.4562 20.6552 37.8145 20.7167C37.7901 21.1788 37.8075 21.7093 37.8389 22.0379C36.4702 21.7743 35.3917 21.1103 34.6011 20.0422Z" fill="#F08261" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M33.9229 144.681C34.1864 143.818 34.2862 142.891 34.2212 141.895C36.2087 142.61 37.7261 142.733 38.7697 142.271C38.7186 143.007 38.8011 143.688 39.0228 144.314C37.2152 144.249 38.0407 146.44 33.9229 144.681ZM20.794 143.459C20.1683 143.29 19.286 143.362 18.9493 143.626C18.3004 144.142 17.1325 143.329 16.1016 142.517C16.2792 142.031 16.4266 141.493 16.5427 140.911C17.7849 141.432 19.0816 141.665 20.4411 141.609C20.4214 142.349 20.5409 142.965 20.794 143.457V143.459Z" fill="#FFB27D" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M27.8791 80.3903C27.958 79.7472 27.9813 79.1551 27.9511 78.6141C29.0806 78.5247 30.8986 77.5461 33.4062 75.677C34.0018 75.872 34.5869 76.0497 35.1616 76.211C33.3993 78.0488 30.9695 79.4384 27.8779 80.3903H27.8791Z" fill="#473D9E" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M70.2404 34.0684C70.3878 33.6992 70.9857 32.5487 71.5708 31.108C73.0266 30.3581 74.1863 28.7293 75.0524 26.2136C74.5323 24.5267 73.4364 23.4691 71.7635 23.0477C71.1993 25.1351 70.353 26.6652 69.2315 27.6473C69.5078 25.4706 69.1526 24.7891 68.1565 25.6006C68.2935 25.8781 68.3005 26.2298 68.1762 26.6547C67.5029 27.7564 67.5644 29.0091 68.3574 30.4126C68.0532 31.0488 67.7247 31.6896 67.5737 32.0379C68.4804 32.3293 69.3221 32.9585 70.2404 34.0672V34.0684Z" fill="#FFB27D" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M74.6622 0C82.5855 0 89.0066 6.42454 89.0066 14.3444C89.0066 22.2642 82.5867 28.6887 74.6622 28.6887C66.7378 28.6887 60.3179 22.2676 60.3179 14.3444C60.3179 6.42106 66.7389 0 74.6622 0Z" fill="#619FDF" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M74.6621 2.11169C81.4187 2.11169 86.8948 7.58776 86.8948 14.3443C86.8948 21.1009 81.4187 26.577 74.6621 26.577C67.9056 26.577 62.4307 21.1009 62.4307 14.3443C62.4307 7.58776 67.9067 2.11169 74.6621 2.11169Z" fill="white" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M74.6619 2.95679C80.9518 2.95679 86.0517 8.05672 86.0517 14.3443C86.0517 20.6318 80.9518 25.7352 74.6619 25.7352C68.372 25.7352 63.2744 20.6353 63.2744 14.3443C63.2744 8.05324 68.3709 2.95679 74.6619 2.95679Z" fill="#BADAF9" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M78.1265 8.47128C77.5414 8.1706 76.7137 7.87224 75.5806 7.83509V5.96252H73.852V7.97788C71.9759 8.3993 70.8638 9.74365 70.8638 11.4757C70.8638 13.2078 72.0816 14.176 73.7963 14.991C75.4227 15.6957 76.0043 16.2808 76.0043 17.1817C76.0043 18.0826 75.389 18.7524 74.1155 18.7524C73.0034 18.7524 71.9597 18.3658 71.2713 17.9583L70.7407 19.9365C71.4117 20.3266 72.5611 20.6795 73.6906 20.7132V22.7286H75.4227V20.5727C77.4183 20.1827 78.5851 18.735 78.5851 16.9344C78.5851 15.1338 77.6296 14.1076 75.5458 13.1695C74.1492 12.4811 73.3899 11.9854 73.3899 11.1739C73.3899 10.482 73.9925 9.7599 75.1766 9.7599C76.2005 9.7599 77.0654 10.1291 77.596 10.3961L78.1265 8.46895V8.47128Z" fill="white" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M69.2312 27.6474C69.5075 25.4706 69.1522 24.7892 68.1562 25.6007C68.2931 25.8781 68.3001 26.2299 68.1759 26.6548C67.6999 27.4314 67.5908 28.287 67.8474 29.2146C68.3779 29.0509 68.8399 28.5262 69.2312 27.6474Z" fill="#FCB88D" />
              </svg>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-xl shadow mb-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-700">
                {isAdmin ? 'Recent Transactions' : 'Recent Transactions'}
              </h2>
            </div>

            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center justify-between p-4 border-b animate-pulse">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                      <div className="space-y-1">
                        <div className="h-4 w-32 bg-gray-200 rounded"></div>
                        <div className="h-3 w-24 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                    <div className="h-4 w-20 bg-gray-200 rounded"></div>
                    {!isAdmin && (
                      <div className="flex space-x-2">
                        <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
                        <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : transactions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No transactions found</p>
              </div>
            ) : (
              <div className="overflow-hidden rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {isAdmin && (
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      )}
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      {!isAdmin && (
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {transactions
                      .slice(0, isAdmin ? 5: 5)
                      .map((transaction, index) => (
                        <motion.tr
                          key={transaction.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="hover:bg-gray-50 transition-colors duration-200"
                        >
                          {isAdmin && (
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {transaction.username || 'Unknown'}
                            </td>
                          )}
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${transaction.type === 'credit' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {transaction.type === 'credit' ? (
                                  <FaArrowUp className="text-sm" />
                                ) : (
                                  <FaArrowDown className="text-sm" />
                                )}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{transaction.transaction_name}</div>
                                <div className="text-sm text-gray-500">{transaction.category}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${transaction.type === 'credit' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(transaction.date)}
                          </td>
                          <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${transaction.type === 'credit' ? 'text-green-700' : 'text-red-700'}`}>
                            {transaction.type === 'credit' ? '+' : '-'}${transaction.amount}
                          </td>
                          {!isAdmin && (
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => handleEditClick(transaction)}
                                  className="text-blue-500 hover:text-blue-700 transition-colors duration-200 p-2 rounded-full hover:bg-blue-50"
                                  aria-label="Edit transaction"
                                >
                                  <FaEdit className="text-sm" />
                                </button>
                                <button
                                  onClick={() => handleDeleteClick(transaction)}
                                  className="text-red-500 hover:text-red-700 transition-colors duration-200 p-2 rounded-full hover:bg-red-50"
                                  aria-label="Delete transaction"
                                >
                                  <FaTrash className="text-sm" />
                                </button>
                              </div>
                            </td>
                          )}
                        </motion.tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 rounded-xl shadow"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Financial Overview</h2>
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Debit</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Credit</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              ${totals.debit || 0} spent & ${totals.credit || 0} earned this month
            </p>
            <div className="h-80 w-full">
              {isLoading ? (
                <div className="h-full w-full bg-gray-200 rounded-lg animate-pulse"></div>
              ) : (
                <Bar
                  data={updatedGraphData}
                  options={options}
                />
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {!isAdmin && (
        <>
          <TransactionForm
            isOpen={showAddForm}
            onClose={() => setShowAddForm(false)}
            onSubmit={handleAddTransaction}
          />

          <TransactionForm
            isOpen={showEditForm}
            onClose={() => {
              setShowEditForm(false);
              setSelectedTransaction(null);
            }}
            onSubmit={handleUpdateTransaction}
            initialData={selectedTransaction || {}}
            isEdit={true}
          />

          <DeleteConfirmation
            isOpen={showDeleteConfirm}
            onClose={() => {
              setShowDeleteConfirm(false);
              setSelectedTransaction(null);
            }}
            onConfirm={handleDeleteTransaction}
            transactionName={selectedTransaction?.transaction_name || ''}
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;