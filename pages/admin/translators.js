import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useReducer } from 'react';
import { toast } from 'react-toastify';
import Layout2 from '../../components/Layout2';
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
    case 'CREATE_REQUEST':
      return { ...state, loadingCreate: true };
    case 'CREATE_SUCCESS':
      return { ...state, loadingCreate: false };
    case 'CREATE_FAIL':
      return { ...state, loadingCreate: false };
    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true };
    case 'DELETE_SUCCESS':
      return { ...state, loadingDelete: false, successDelete: true };
    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false };
    case 'DELETE_RESET':
      return { ...state, loadingDelete: false, successDelete: false };

    default:
      state;
  }
}
export default function AdminTranslatorsScreen() {
  const router = useRouter();

  const [
    {
      loading,
      error,
      translators,
      loadingCreate,
      successDelete,
      loadingDelete,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    translators: [],
    error: '',
  });

  const createHandler = async () => {
    if (!window.confirm('Are you sure?')) {
      return;
    }
    try {
      dispatch({ type: 'CREATE_REQUEST' });
      const { data } = await axios.post(`/api/admin/translators`);
      dispatch({ type: 'CREATE_SUCCESS' });
      toast.success('created successfully');
      router.push(`/admin/translator/${data.translator._id}`);
    } catch (err) {
      dispatch({ type: 'CREATE_FAIL' });
      toast.error(getError(err));
    }
  };

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

    if (successDelete) {
      dispatch({ type: 'DELETE_RESET' });
    } else {
      fetchData();
    }
  }, [successDelete]);

  const deleteHandler = async (translatorId) => {
    if (!window.confirm('Are you sure?')) {
      return;
    }
    try {
      dispatch({ type: 'DELETE_REQUEST' });
      await axios.delete(`/api/admin/translators/${translatorId}`);
      dispatch({ type: 'DELETE_SUCCESS' });
      toast.success('Deleted successfully');
    } catch (err) {
      dispatch({ type: 'DELETE_FAIL' });
      toast.error(getError(err));
    }
  };
  return (
    <Layout2 title="Admin Translators">
      <div className="grid md:grid-cols-4 md:gap-5">
        <div>
          <ul>
            <li>
              <Link
                href="/admin/dashboard"
                className="hover:font-bold text-green-500"
              >
                Dashboard
              </Link>
            </li>
            <li className="hover:font-bold text-green-500">
              <Link href="/admin/expenses">Expenses</Link>
            </li>
            <li className="font-bold text-green-800">
              <Link href="/admin/translators">Satisfied Users</Link>
            </li>
            <li className="hover:font-bold text-green-500">
              <Link href="/admin/users">Users</Link>
            </li>
          </ul>
        </div>
        <div className="overflow-x-auto md:col-span-3">
          <div className="flex justify-between">
            <h1 className="mb-4 text-3xl text-green-600">Satisfied Users</h1>
            {loadingDelete && <div>Deleting item...</div>}
            <button
              disabled={loadingCreate}
              onClick={createHandler}
              className="rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 w-24"
            >
              {loadingCreate ? 'Loading' : 'Create'}
            </button>
          </div>

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

                      <td className=" p-5 ">
                        <Link href={`/admin/translator/${translator._id}`}>
                          <span className="pr-2 text-green-700 hover:font-bold">
                            Edit
                          </span>
                        </Link>
                        &nbsp;
                        <button
                          type="button"
                          onClick={() => deleteHandler(translator._id)}
                          className="text-rose-700 hover:font-bold"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout2>
  );
}

AdminTranslatorsScreen.auth = { adminOnly: true };
