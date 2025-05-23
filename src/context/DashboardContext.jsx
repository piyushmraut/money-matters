import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [totals, setTotals] = useState({ credit: 0, debit: 0 });
  const [graphData, setGraphData] = useState({ 
    labels: [], 
    datasets: [
      {
        label: 'Debit',
        data: [],
        backgroundColor: '#ef4444',
      },
      {
        label: 'Credit',
        data: [],
        backgroundColor: '#10b981',
      }
    ] 
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        'https://bursting-gelding-24.hasura.app/api/rest/all-transactions',
        {
          headers: {
            'Content-Type': 'application/json',
            'x-hasura-admin-secret': 'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
            'x-hasura-role': 'user',
            'x-hasura-user-id': user?.id?.toString()
          },
          params: {
            limit: 100,
            offset: 0
          }
        }
      );
      setTransactions(response.data?.transactions || []);
    } catch (err) {
      setError('Failed to fetch transactions. Please try again later.');
      console.error('Error fetching transactions:', err.response?.data || err.message);
    }
  };

  const fetchTotals = async () => {
    try {
      const response = await axios.get(
        'https://bursting-gelding-24.hasura.app/api/rest/credit-debit-totals',
        {
          headers: {
            'Content-Type': 'application/json',
            'x-hasura-admin-secret': 'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
            'x-hasura-role': 'user',
            'x-hasura-user-id': user?.id?.toString()
          }
        }
      );
      
      const totalsData = response.data?.totals_credit_debit_transactions || [];
      const creditTotal = totalsData.find(item => item.type === 'credit')?.sum || 0;
      const debitTotal = totalsData.find(item => item.type === 'debit')?.sum || 0;
      
      setTotals({
        credit: creditTotal,
        debit: debitTotal
      });
    } catch (err) {
      setError('Failed to fetch totals. Please try again later.');
      console.error('Error fetching totals:', err.response?.data || err.message);
    }
  };

  const fetchGraphData = async () => {
    try {
      const response = await axios.get(
        'https://bursting-gelding-24.hasura.app/api/rest/daywise-totals-7-days',
        {
          headers: {
            'Content-Type': 'application/json',
            'x-hasura-admin-secret': 'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
            'x-hasura-role': 'user',
            'x-hasura-user-id': user?.id?.toString()
          }
        }
      );
      
      const rawData = response.data?.last_7_days_transactions_credit_debit_totals || [];
      
      const dailyData = {};
      rawData.forEach(item => {
        const date = new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        if (!dailyData[date]) {
          dailyData[date] = { credit: 0, debit: 0 };
        }
        if (item.type === 'credit') {
          dailyData[date].credit += item.sum;
        } else if (item.type === 'debit') {
          dailyData[date].debit += item.sum;
        }
      });
      
      const sortedDates = Object.keys(dailyData).sort((a, b) => 
        new Date(a) - new Date(b)
      );
      
      const creditData = sortedDates.map(date => dailyData[date].credit);
      const debitData = sortedDates.map(date => dailyData[date].debit);

      setGraphData({
        labels: sortedDates,
        datasets: [
          {
            label: 'Debit',
            data: debitData,
            backgroundColor: '#ef4444',
          },
          {
            label: 'Credit',
            data: creditData,
            backgroundColor: '#10b981',
          }
        ]
      });
    } catch (err) {
      setError('Failed to fetch graph data. Please try again later.');
      console.error('Error fetching graph data:', err.response?.data || err.message);
    }
  };

  const addTransaction = async (transactionData) => {
  try {
    // Validate required fields
    if (!transactionData.transaction_name || !transactionData.type || 
        !transactionData.amount || !transactionData.date) {
      return { success: false, error: 'Missing required fields' };
    }

    // Convert amount to integer (assuming API expects cents)
    const amount = Math.round(parseFloat(transactionData.amount));

    const response = await axios.post(
      'https://bursting-gelding-24.hasura.app/api/rest/add-transaction',
      {
        name: transactionData.transaction_name,
        type: transactionData.type,
        category: transactionData.category,
        amount: amount,
        date: transactionData.date,
        user_id: user.id
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-hasura-admin-secret': 'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
          'x-hasura-role': 'user',
          'x-hasura-user-id': user?.id?.toString()
        }
      }
    );
    
    await Promise.all([fetchTransactions(), fetchTotals(), fetchGraphData()]);
    return { success: true, data: response.data };
  } catch (err) {
    console.error('Error adding transaction:', err.response?.data || err.message);
    const errorMsg = err.response?.data?.error || 'Failed to add transaction';
    return { success: false, error: errorMsg };
  }
};

 const updateTransaction = async (id, transactionData) => {
  try {
    // Validate required fields
    if (!transactionData.transaction_name || !transactionData.type || 
        !transactionData.amount || !transactionData.date) {
      return { success: false, error: 'Missing required fields' };
    }

    // Convert amount to integer (assuming API expects cents)
    const amount = Math.round(parseFloat(transactionData.amount));

    const response = await axios.post(
      'https://bursting-gelding-24.hasura.app/api/rest/update-transaction',
      {
        id: id.toString(), // Ensure ID is string if API expects string
        name: transactionData.transaction_name,
        type: transactionData.type,
        category: transactionData.category,
        amount: amount,
        date: transactionData.date
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-hasura-admin-secret': 'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
          'x-hasura-role': 'user',
          'x-hasura-user-id': user?.id?.toString()
        }
      }
    );
    
    await Promise.all([fetchTransactions(), fetchTotals(), fetchGraphData()]);
    return { success: true, data: response.data };
  } catch (err) {
    console.error('Error updating transaction:', err.response?.data || err.message);
    const errorMsg = err.response?.data?.error || 'Failed to update transaction';
    return { success: false, error: errorMsg };
  }
};

  const deleteTransaction = async (id) => {
    try {
      const response = await axios.delete(
        'https://bursting-gelding-24.hasura.app/api/rest/delete-transaction',
        {
          data: { id },
          headers: {
            'Content-Type': 'application/json',
            'x-hasura-admin-secret': 'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
            'x-hasura-role': 'user',
            'x-hasura-user-id': user?.id?.toString()
          }
        }
      );
      
      await Promise.all([fetchTransactions(), fetchTotals(), fetchGraphData()]);
      return { success: true, data: response.data };
    } catch (err) {
      console.error('Error deleting transaction:', err.response?.data || err.message);
      const errorMsg = err.response?.data?.error || 'Failed to delete transaction';
      return { success: false, error: errorMsg };
    }
  };

  useEffect(() => {
    if (user?.id) {
      setIsLoading(true);
      setError(null);
      
      Promise.all([fetchTransactions(), fetchTotals(), fetchGraphData()])
        .catch(err => {
          console.error('Error in dashboard data fetching:', err);
          setError('Failed to load dashboard data. Please refresh the page.');
        })
        .finally(() => setIsLoading(false));
    }
  }, [user]);

  return (
    <DashboardContext.Provider value={{ 
      transactions, 
      totals, 
      graphData, 
      isLoading, 
      error,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      refreshData: () => {
        setIsLoading(true);
        setError(null);
        Promise.all([fetchTransactions(), fetchTotals(), fetchGraphData()])
          .catch(err => {
            console.error('Error refreshing data:', err);
            setError('Failed to refresh data. Please try again.');
          })
          .finally(() => setIsLoading(false));
      }
    }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);