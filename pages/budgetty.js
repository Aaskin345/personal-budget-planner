import { useState, useEffect } from 'react';
import Layout3 from '../components/Layout3';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Notification from '../components/Notification';
export default function Home() {
  const [budget, setBudget] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [category, setCategory] = useState('');
  const [notification, setNotification] = useState('');
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState('');
  useEffect(() => {
    const storedBudget = localStorage.getItem('budget');
    const storedExpenses = JSON.parse(localStorage.getItem('expenses'));
    if (storedBudget) {
      setBudget(Number(storedBudget));
    }

    if (storedExpenses) {
      setExpenses(storedExpenses);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('budget', budget);
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [budget, expenses]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const expense = { category, name, amount, date };

    try {
      const res = await axios.post('/api/expense/expenses', expense);
      const newExpense = res.data;
      setExpenses([...expenses, newExpense]);
      setCategory('');
      setName('');
      setAmount('');
      setDate('');
      toast.success('Expense added successfully!');
    } catch (error) {
      toast.error('Failed to add expense.');
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('/api/expense/expenses');
        setExpenses(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchExpenses();
  }, []);

  const handleAddBudget = async (e) => {
    e.preventDefault;
    try {
      await axios.post('/api/budget', {
        budget: budget,
      });

      setBudget(0);
    } catch (err) {
      console.error(err);
    }
    if (budget <= 0) {
      setError('Please enter a valid budget amount');
      return;
    }

    setBudget(parseInt(budget));
    setError('');
    setNotification(`Budget 0f ${budget} Added`);
  };
  const handleBudgetChange = (e) => {
    setBudget(parseInt(e.target.value));
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/expense/${id}`);
      const newExpenses = expenses.filter((expense) => expense._id !== id);
      setExpenses(newExpenses);
      toast.success('Expense deleted successfully!');
    } catch (error) {
      console.log(error);
      toast.error('Failed to delete expense.');
    }
  };
  const handleNotificationClose = () => {
    setNotification('');
  };
  const remainingBudget =
    budget - expenses.reduce((total, expense) => total + expense.amount, 0);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/expense/download');
      const blob = new Blob([response.data], {
        type: 'application/vnd.ms-excel',
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'expenses.xlsx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
    toast.success('Downloaded successfully!');
  };
  return (
    <>
      <ToastContainer />
      <Layout3 title="budget tracker">
        <div className="container  text-teal-400 font-semibold ">
          {notification && (
            <Notification
              message={notification}
              onClose={handleNotificationClose}
            />
          )}
        </div>

        <div className=" bg-white pl-28 pr-28 shadow-md ">
          <h1 className="text-center font-bold text-4xl text-cyan-400">
            Budget Tracker
          </h1>
          <form className="mt-8">
            <div className="mb-5">
              <label htmlFor="budget" className="block font-bold mb-1">
                Enter your budget:
              </label>
              <input
                type="number"
                id="budget"
                className="border border-gray-400 p-2 w-full"
                value={budget}
                onChange={handleBudgetChange}
              />
              {error && <p className="text-red-500">{error}</p>}
              <button
                className="bg-blue-500 text-white px-4 py-2 mt-3 rounded"
                onClick={handleAddBudget}
              >
                Add Budget
              </button>
            </div>
          </form>
          <form onSubmit={handleSubmit}>
            <h2 className="text-xl font-bold mb-2">Add Expense</h2>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <div className="flex flex-col mb-2">
              <label htmlFor="name" className="mb-1 font-semibold">
                Expense Name:
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full pl-10 py-2 text-base leading-5 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="amount" className="mb-1 font-semibold">
                Expense Amount:
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="block w-full pl-10 py-2 text-base leading-5 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
              />
            </div>

            <div className="flex flex-col mb-4">
              <label htmlFor="category" className="mb-1 font-semibold">
                Expense Category:
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border border-gray-300 px-2 py-1"
              >
                <option value="">-- Select a category --</option>
                <option value="Food">Food</option>
                <option value="Transportation">Transportation</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Shopping">Shopping</option>
                <option value="Fees">Fees</option>
                <option value="Loans">Loans</option>
                <option value="Leisure">Leisure</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="date" className="mb-1 font-semibold">
                Date:
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border border-gray-300 px-2 py-1"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add Expense
            </button>
          </form>
          <div className="overflow-x-auto overflow-x-scroll">
            <h2 className="text-xl font-bold mt-8 mb-4">Expenses</h2>
            <table className="min-w-full">
              <tbody>
                {expenses.map((expense) => (
                  <li
                    key={expense._id}
                    className="border-b border-gray-300 py-2 flex justify-between"
                  >
                    <td className="p-5">{expense.name}</td>
                    <td className="p-5">{expense.amount}</td>
                    <td className="p-5">{expense.category}</td>
                    <td className="p-5">{expense.date}</td>
                    <div>
                      <button
                        onClick={() => handleDelete(expense._id)}
                        className="bg-red-500 text-white px-4 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </tbody>
            </table>
          </div>
          <h2 className="font-semibold text-lg inline-block">
            Remaining Budget:
          </h2>
          <p
            className={`text-xl font-bold ${
              remainingBudget < 0 ? 'text-red-500' : 'text-green-500'
            }`}
          >
            ${remainingBudget.toFixed(2)}
          </p>
          {remainingBudget < 0 && (
            <p className="text-red-500 mt-2">
              You are over budget by ${Math.abs(remainingBudget).toFixed(2)}
            </p>
          )}
        </div>
        <div className="mt-4 flex">
          <button
            onClick={handleDownload}
            disabled={loading}
            className="bg-green-500 text-white px-4 py-2 rounded mr-4"
          >
            {loading ? 'Downloading...' : 'Download Your Expenses'}
          </button>
        </div>
        <div></div>
      </Layout3>
    </>
  );
}
