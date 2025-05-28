// src/pages/admin/Dashboard.jsx
import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { useAuth } from "../../context/AuthContext";
import {
  ChartBarIcon,
  UsersIcon,
  CreditCardIcon,
  ArrowTrendingUpIcon,
  BanknotesIcon,
  ClockIcon
} from "@heroicons/react/24/solid";
import { BarChart, PieChart } from "../../components/Charts";

const Dashboard = () => {
  const { user, isAdmin } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalTransactions: 0,
    revenue: 0,
    pendingRequests: 0
  });

  useEffect(() => {
    // Simulate fetching admin stats
    const fetchStats = async () => {
      // In a real app, you would fetch this from your API
      setTimeout(() => {
        setStats({
          totalUsers: 1243,
          activeUsers: 892,
          totalTransactions: 5678,
          revenue: 125430.78,
          pendingRequests: 23
        });
      }, 800);
    };

    if (isAdmin) {
      fetchStats();
    }
  }, [isAdmin]);

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 ml-64 p-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800">Unauthorized Access</h2>
            <p className="text-gray-600 mt-2">
              You don't have permission to access this page.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Users</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">{stats.totalUsers}</h3>
              </div>
              <div className="p-3 rounded-full bg-blue-100 text-blue-500">
                <UsersIcon className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Active Users</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">{stats.activeUsers}</h3>
              </div>
              <div className="p-3 rounded-full bg-green-100 text-green-500">
                <ArrowTrendingUpIcon className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Transactions</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">{stats.totalTransactions}</h3>
              </div>
              <div className="p-3 rounded-full bg-purple-100 text-purple-500">
                <CreditCardIcon className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-amber-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Revenue</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">${stats.revenue.toLocaleString()}</h3>
              </div>
              <div className="p-3 rounded-full bg-amber-100 text-amber-500">
                <BanknotesIcon className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">User Growth</h3>
            <div className="h-64">
              <BarChart 
                data={{
                  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                  datasets: [
                    {
                      label: 'New Users',
                      data: [120, 190, 170, 220, 250, 300],
                      backgroundColor: '#4F46E5',
                    }
                  ]
                }}
              />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Transaction Types</h3>
            <div className="h-64">
              <PieChart 
                data={{
                  labels: ['Deposits', 'Withdrawals', 'Transfers', 'Payments'],
                  datasets: [
                    {
                      data: [300, 150, 100, 200],
                      backgroundColor: [
                        '#4F46E5',
                        '#10B981',
                        '#F59E0B',
                        '#EC4899'
                      ],
                    }
                  ]
                }}
              />
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
            <button className="text-sm text-blue-500 hover:text-blue-700">View All</button>
          </div>
          
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="p-2 rounded-full bg-blue-100 text-blue-500 mr-4">
                  <ClockIcon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">New user registration</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
                <button className="text-sm text-gray-400 hover:text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;