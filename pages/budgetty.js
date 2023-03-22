import { useState, useEffect } from 'react';
import Layout3 from '../components/Layout3';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [budget, setBudget] = useState(0);
  const [budgetAmount, setBudgetAmount] = useState(null);
  const [updatedBudget, setUpdatedBudget] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState('');
  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const response = await axios.get('/api/budget');
        setBudgetAmount(response.data.budget);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBudget();

    const storedExpenses = JSON.parse(localStorage.getItem('expenses'));
    if (storedExpenses) {
      setExpenses(storedExpenses);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const expense = { category, name, amount, date };
    const remainingBudget =
      budgetAmount -
      expenses.reduce((total, expense) => total + expense.amount, 0);

    if (remainingBudget < amount) {
      toast.error('Cannot add expense. Remaining budget is insufficient.');
      setCategory('');
      setName('');
      setAmount('');
      setDate('');
      return;
    }

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
    e.preventDefault();
    if (budget === 0 || !budget) {
      toast.error('Please enter a valid budget amount!');
      return;
    }
    try {
      await axios.post('/api/budget', {
        budget: budget,
      });
      setBudgetAmount(budget);
      setBudget(0);
      toast.success('Budget added successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Error adding budget');
    }
  };

  const handleBudgetChange = (e) => {
    setBudget(parseInt(e.target.value));
  };
  const handleUpdateBudget = async (e) => {
    e.preventDefault();
    if (!updatedBudget || updatedBudget <= 0) {
      toast.error('Please enter a valid budget amount');
      return;
    }

    try {
      await axios.put('/api/budget', {
        budget: updatedBudget,
      });
      setBudgetAmount(updatedBudget);
      setUpdatedBudget(0);
      toast.success('Budget updated successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Error updating budget');
    }
  };

  const handleUpdateBudgetChange = (e) => {
    setUpdatedBudget(parseInt(e.target.value));
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

  const remainingBudget =
    budgetAmount -
    expenses.reduce((total, expense) => total + expense.amount, 0);
  if (remainingBudget < 0) {
    toast.error('You have exceeded your budget!');
  }

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

              <button
                className="bg-blue-500 text-white px-4 py-2 mt-3 rounded"
                onClick={handleAddBudget}
              >
                Add Budget
              </button>
              <div className="flex justify-between mt-3">
                <label
                  htmlFor="updated-budget"
                  className="block font-bold mb-1 w-3/5"
                >
                  Want to Update your Budget?
                  <br />
                  Enter updated budget:
                </label>
                <div className="flex w-2/5">
                  <input
                    type="number"
                    id="updated-budget"
                    className="border border-gray-400 p-2 flex-1"
                    value={updatedBudget}
                    onChange={handleUpdateBudgetChange}
                  />
                  <button
                    className="bg-blue-500 text-white px-4 py-2 ml-2 rounded"
                    onClick={handleUpdateBudget}
                    disabled={!updatedBudget || updatedBudget === 0}
                  >
                    Update Budget
                  </button>
                </div>
              </div>

              {budgetAmount && (
                <div
                  className="card text-center font-semibold mt-3 pl-5 items-center"
                  style={{ maxWidth: '400px' }}
                >
                  <p className="text-center text-green-500">
                    Your budget is: {budgetAmount}
                  </p>
                </div>
              )}
            </div>
          </form>
          <form onSubmit={handleSubmit}>
            <h2 className="text-xl font-bold mb-2">Add Expense</h2>

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
          <h1 className="mt-3 text-2xl font-bold">Expense List</h1>
          <div className="overflow-x-scroll">
            <div className="mt-8 mb-4">
              <h2 className="text-xl font-bold">Expenses by Name</h2>
              <table className="min-w-full">
                <tbody>
                  {Object.entries(
                    expenses.reduce((acc, expense) => {
                      if (!acc[expense.name]) {
                        acc[expense.name] = [];
                      }
                      acc[expense.name].push(expense);
                      return acc;
                    }, {})
                  ).map(([name, expenses]) => (
                    <tr key={name}>
                      <td className="font-bold py-2 pr-4">{name}:</td>
                      <td>
                        <ul className="list-disc pl-6">
                          {expenses.map((expense) => (
                            <>
                              <li key={expense._id}>{expense.amount}</li>
                              <button
                                onClick={() => handleDelete(expense._id)}
                                className="text-sm text-white text-centre p-2 m-2 bg-red-500 hover:bg-red-700 rounded-md"
                              >
                                Delete
                              </button>
                            </>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 mb-4">
              <h2 className="text-xl font-bold">Expenses by Amount</h2>
              <table className="min-w-full">
                <tbody>
                  {Object.entries(
                    expenses.reduce((acc, expense) => {
                      if (!acc[expense.amount]) {
                        acc[expense.amount] = [];
                      }
                      acc[expense.amount].push(expense);
                      return acc;
                    }, {})
                  ).map(([amount, expenses]) => (
                    <tr key={amount}>
                      <td className="font-bold py-2 pr-4">{amount}:</td>
                      <td>
                        <ul className="list-disc pl-6">
                          {expenses.map((expense) => (
                            <>
                              <li key={expense._id}>{expense.name}</li>
                              <button
                                onClick={() => handleDelete(expense._id)}
                                className="text-sm text-white text-centre p-2 m-2 bg-red-500 hover:bg-red-700 rounded-md"
                              >
                                Delete
                              </button>
                            </>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-8 mb-4">
              <h2 className="text-xl font-bold">Expenses by Category</h2>
              <table className="min-w-full">
                <tbody>
                  {Object.entries(
                    expenses.reduce((acc, expense) => {
                      if (!acc[expense.category]) {
                        acc[expense.category] = [];
                      }
                      acc[expense.category].push(expense);
                      return acc;
                    }, {})
                  ).map(([category, expenses]) => (
                    <tr key={category}>
                      <td className="font-bold py-2 pr-4">{category}:</td>
                      <td>
                        <ul className="list-disc pl-6">
                          {expenses.map((expense) => (
                            <li key={expense._id}>
                              {expense.name} - {expense.amount}
                              <button
                                onClick={() => handleDelete(expense._id)}
                                className="text-sm text-white text-centre p-2 m-2 bg-red-500 hover:bg-red-700 rounded-md"
                              >
                                Delete
                              </button>
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
