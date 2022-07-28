import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useReducer } from 'react';
import Layout from '../../components/Layout';
import { getError } from '../../utils/error';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        translators: action.payload,
        error: '',
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}
export default function AdminTranslatorsScreen() {
  const [{ loading, error, translators }, dispatch] = useReducer(reducer, {
    loading: true,
    translators: [],
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/translators`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    fetchData();
  }, []);
  return (
    <Layout title="Admin Translators">
      <div className="grid md:grid-cols-4 md:gap-5">
        <div>
          <ul>
            <li>
              <Link href="/admin/dashboard">
                <a className="hover:font-bold">Dashboard</a>
              </Link>
            </li>
            <li className="hover:font-bold">
              <Link href="/admin/orders">Hire Orders</Link>
            </li>
            <li className="font-bold text-sky-600">
              <Link href="/admin/translators">Sign Translators</Link>
            </li>
            <li className="hover:font-bold">
              <Link href="/admin/users">Users</Link>
            </li>
          </ul>
        </div>
        <div className="overflow-x-auto md:col-span-3">
          <h1 className="mb-4 text-3xl text-sky-600">Sign Translators</h1>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="px-5 text-left">ID</th>
                    <th className="p-5 text-left">NAME</th>
                    <th className="p-5 text-left">PRICE</th>
                    <th className="p-5 text-left">CATEGORY</th>
                    {/* <th className="p-5 text-left">COUNT</th> */}
                    <th className="p-5 text-left">RATING</th>
                    <th className="p-5 text-left">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {translators.map((translator) => (
                    <tr key={translator._id} className="border-b">
                      <td className=" p-5 ">
                        {translator._id.substring(20, 24)}
                      </td>
                      <td className=" p-5 ">{translator.name}</td>
                      <td className=" p-5 ">Ksh&nbsp;{translator.price}</td>
                      <td className=" p-5 ">{translator.category}</td>

                      <td className=" p-5 ">{translator.rating}</td>
                      <td className=" p-5 ">
                        <Link href={`/admin/translator/${translator._id}`}>
                          Edit
                        </Link>
                        &nbsp;
                        <button>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

AdminTranslatorsScreen.auth = { adminOnly: true };
