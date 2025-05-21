import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";

const Transactions = () => {
  const { user } = useAuth();

  const transactions = [
    {
      id: 1,
      name: "Spotify Subscription",
      type: "Shopping",
      date: "28 Jan, 12.30 AM",
      amount: -150,
    },
    {
      id: 2,
      name: "Mobile Service",
      type: "Service",
      date: "25 Jan, 10.40 PM",
      amount: -150,
    },
    {
      id: 3,
      name: "Emilly Wilson",
      type: "Transfer",
      date: "20 Jan, 10.40 PM",
      amount: 780,
    },
    {
      id: 4,
      name: "Netflix Subscription",
      type: "Entertainment",
      date: "15 Jan, 09.15 PM",
      amount: -200,
    },
    {
      id: 5,
      name: "Salary Deposit",
      type: "Income",
      date: "05 Jan, 08.00 AM",
      amount: 5000,
    },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Transactions</h1>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-700">
              All Transactions
            </h2>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm">
              Add Transaction
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {transaction.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.date}
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-sm ${
                        transaction.amount > 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {transaction.amount > 0 ? "+" : ""}$
                      {Math.abs(transaction.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
