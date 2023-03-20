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
    labels: summary.salesData.map((x) => x._id), // 2022/01 2022/03
    datasets: [
      {
        label: 'Expenses',
        backgroundColor: '#9fd7e9',
        data: summary.salesData.map((x) => x.expensePrice),
      },
    ],
  };
  return (
    <Layout3 title="Admin Dashboard">
      <div className="grid  md:grid-cols-4 md:gap-5">
        <div>
          <ul>
            <li>
              <Link href="/admin/dashboard" className="font-bold text-sky-600">
                Dashboard
              </Link>
            </li>

            <li className="hover:font-bold">
              <Link href="/admin/expenses">Expenses</Link>
            </li>
            <li className="hover:font-bold">
              <Link href="/admin/translators">Satisfied Users </Link>
            </li>
            <li className="hover:font-bold">
              <Link href="/admin/users">Users</Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <h1 className="mb-4 text-3xl text-sky-600">Admin Dashboard</h1>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-4">
                <Link href="/admin/orders">
                  <div className="card: rounded-lg border border-slate-300 shadow-xl m-5 p-5 hover:scale-110 shadow-2xl shadow-sky-900 hover:bg-gray-100">
                    <p className="text-2xl text-sky-600">
                      Ksh&nbsp;{summary.OrdersPrice}{' '}
                    </p>
                    <p>Sales</p>
                    <div className="text-sky-600">View sales</div>
                  </div>
                </Link>
                <Link href="/admin/expenses">
                  <div className="card: rounded-lg border border-slate-300 shadow-xl m-5 p-5 hover:scale-110 shadow-2xl shadow-sky-900 hover:bg-gray-100">
                    <p> {summary.expensePrice} </p>
                    <p>Expenses</p>
                    <div className="text-sky-600">View Total expenses</div>
                  </div>
                </Link>
                <Link href="/admin/translators">
                  <div className="card: rounded-lg border border-slate-300 shadow-xl m-5 p-5 hover:scale-110 shadow-2xl shadow-sky-900 hover:bg-gray-100">
                    <p className="text-2xl text-sky-600">
                      {summary.translatorsCount}{' '}
                    </p>
                    <p>Satisfied Users</p>
                    <div className="text-sky-600">View Satisfied Users</div>
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
              <h2 className="text-xl text-sky-600 font-bold">Sales Report</h2>
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
