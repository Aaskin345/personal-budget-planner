import axios from 'axios';
import Link from 'next/link';
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
import React, { useEffect, useReducer } from 'react';
import Layout3 from '../../components/Layout3';
import { getError } from '../../utils/error';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, summary: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}
function AdminDashboardScreen() {
  const [{ loading, error, summary }, dispatch] = useReducer(reducer, {
    loading: true,
    summary: { salesData: [] },
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/summary`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    fetchData();
  }, []);
  const data = {
    labels: summary.salesData.map((x) => x._id),
    datasets: [
      {
        label: 'Expenses',
        backgroundColor: '#9fd7e9',
        data: summary.salesData.map((x) => x.totalExpenses),
      },
    ],
  };

  return (
    <Layout3 title="Admin Dashboard">
      <div className="grid  md:grid-cols-4 md:gap-5">
        <div className="bg-white rounded-lg shadow-md">
          <ul className="flex flex-col py-4">
            <li className="px-6 py-2">
              <Link
                href="/admin/dashboard"
                className="text-green-400 hover:text-green-900 font-medium"
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
        <div className="md:col-span-3">
          <h1 className="mb-4 text-3xl font-extrabold text-sky-600">
            Admin Dashboard
          </h1>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-4">
                <Link href="/admin/dashboard">
                  <div className="card: rounded-lg border border-slate-300 shadow-xl m-5 p-5 hover:scale-110 shadow-2xl shadow-sky-900 hover:bg-gray-100">
                    <p className="text-2xl text-sky-600">
                      Total Expenses:$&nbsp;{summary.expensesPrice}{' '}
                    </p>
                  </div>
                </Link>
                <Link href="/admin/expenses">
                  <div className="card: rounded-lg border border-slate-300 shadow-xl m-5 p-5 hover:scale-110 shadow-2xl shadow-sky-900 hover:bg-gray-100">
                    <p> {summary.expensePrice} </p>
                    <p>Expenses</p>
                    <div className="text-sky-600">View expenses</div>
                  </div>
                </Link>

                <Link href="/admin/users">
                  <div className="card: rounded-lg border border-slate-300 shadow-xl m-5 p-5 hover:scale-110 shadow-2xl shadow-sky-900">
                    <p className="text-2xl text-sky-600">
                      {summary.usersCount}{' '}
                    </p>
                    <p>Users</p>
                    <div className="text-sky-600">View users</div>
                  </div>
                </Link>
              </div>
              <h2 className="text-xl text-sky-400 font-bold">Expense Report</h2>
              <Bar
                options={{
                  legend: { display: true, position: 'right' },
                }}
                data={data}
              />
            </div>
          )}
        </div>
      </div>
    </Layout3>
  );
}

AdminDashboardScreen.auth = { adminOnly: true };
export default AdminDashboardScreen;
