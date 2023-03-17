import React from 'react';

function Summary({ budget, expenses }) {
  const totalExpenses = expenses
    ? expenses.reduce((total, exp) => total + exp.amount, 0)
    : 0;

  const remainingBudget = budget - totalExpenses;

  return (
    <div className="bg-gray-200 p-4">
      <h2 className="text-xl font-bold mb-2">Summary</h2>
      <p className="text-gray-700">Total Budget: {budget}</p>
      <p className="text-gray-700">Total Expenses: {totalExpenses}</p>
      <p className="text-gray-700">Remaining Budget: {remainingBudget}</p>
    </div>
  );
}

export default Summary;
