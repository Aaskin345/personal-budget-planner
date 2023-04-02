import axios from 'axios';
import { useState, useEffect } from 'react';
import Layout3 from '../../components/Layout3';
import Link from 'next/link';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const { data } = await axios.get('/api/admin/expenses');
        setExpenses(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchExpenses();
  }, []);

  return (
    <Layout3 title="Expenses">
      <div className="flex flex-col md:flex-row md:items-start md:justify-center md:space-x-5">
        <div className="bg-white rounded-lg shadow-md md:sticky md:top-0 md:h-full md:max-h-screen md:overflow-y-auto md:w-1/5">
          <ul className="flex flex-col py-4 md:w-full">
            <li className="px-6 py-2">
              <Link
                href="/admin/dashboard"
                className="text-green-400 hover:text-gray-900 font-medium"
              >
                Dashboard
              </Link>
            </li>
            <li className="px-6 py-2 text-green-400 hover:text-green-900 font-medium">
              <Link href="/admin/expenses">Expenses</Link>
            </li>

            <li className="px-6 py-2 text-green-400 hover:text-green-900 font-medium">
              <Link href="/admin/users">Users</Link>
            </li>
          </ul>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4 text-sky-500">Expenses</h1>
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Category</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => (
                  <tr key={expense._id}>
                    <td className="border px-4 py-2">{expense._id}</td>
                    <td className="border px-4 py-2">
                      {new Date(expense.createdAt).toLocaleDateString()}
                    </td>
                    <td className="border px-4 py-2">{expense.category}</td>
                    <td className="border px-4 py-2">{expense.name}</td>
                    <td className="border px-4 py-2">{expense.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout3>
  );
};

export default Expenses;
