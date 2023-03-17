import { useState, useEffect } from 'react';
import Layout2 from '../components/Layout2';
import axios from 'axios';
import Notification from '../components/Notification';
import dynamic from 'next/dynamic';
function Home() {
  const [budget, setBudget] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [category, setCategory] = useState('');
  const [notification, setNotification] = useState(null);
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

  const remainingBudget =
    budget - expenses.reduce((total, expense) => total + expense.amount, 0);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const expense = { category, name, amount };

    try {
      const res = await axios.post('/api/expense/expenses', expense);
      const newExpense = res.data;
      setExpenses([...expenses, newExpense]);
      setCategory('');
      setName('');
      setAmount('');
    } catch (error) {
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
    } catch (error) {
      console.log(error);
    }
  };
  const handleNotificationClose = () => {
    setNotification('');
  };
  return (
    <>
      <Layout2 title="budget tracker">
        <div className="container  text-teal-400 font-semibold ">
          {notification && (
            <Notification
              message={notification}
              onClose={handleNotificationClose}
            />
          )}
        </div>

        <div className=" bg-white pl-28 pr-28 shadow-md ">
          <h1 className="text-center font-bold text-4xl">Budget Tracker</h1>
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
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 px-2 py-1"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="amount" className="mb-1 font-semibold">
                Amount
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="border border-gray-300 px-2 py-1"
              />
            </div>

            <div className="flex flex-col mb-4">
              <label htmlFor="category" className="mb-1 font-semibold">
                Category
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
                <option value="Shopping">Fees</option>
                <option value="Shopping">Shopping</option>
                <option value="Other">Leisure</option>
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
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Add Expense
            </button>
          </form>

          <h2 className="text-xl font-bold mt-8 mb-4">Expenses</h2>
          <table className="w-full">
            <thead>
              <tr className="text-left font-bold">
                <th className=" text-left p-2 mr-2">Name</th>
                <th className="text-left p-2">Amount</th>
                <th className="p-2">Category</th>
                <th className="p-2">Date</th>
              </tr>
            </thead>
            <ul>
              {expenses.map((expense) => (
                <li
                  key={expense._id}
                  className="border-b border-gray-300 py-2 flex justify-between"
                >
                  <span>{expense.name}</span>
                  <span>{expense.amount}</span>
                  <span>{expense.category}</span>
                  <span>{expense.date}</span>
                  <div>
                    <button
                      onClick={() => handleDelete(expense._id)}
                      className="bg-red-500 rounded-full text-center mr-5 p-2"
                    >
                      Publish
                    </button>
                    <button
                      onClick={() => handleDelete(expense._id)}
                      className="bg-red-500 rounded-full text-center mr-5 p-2"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </table>
          <h2 className="text-xl font-bold mt-4 mb-3">Remaining Budget:</h2>
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
      </Layout2>
    </>
  );
}
export default dynamic(() => Promise.resolve(Home), { ssr: false });
