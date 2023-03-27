import { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useSession } from 'next-auth/react';

export default function ExpenseChart() {
  const [expenses, setExpenses] = useState(null);
  const { data: session, status } = useSession();
  const chartRef = useRef(null);
  useEffect(() => {
    if (session) {
      fetch('/api/expense/chart', {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setExpenses(data))
        .catch((error) => console.error(error));
    }
  }, [session]);

  useEffect(() => {
    if (expenses) {
      const labels = Object.keys(expenses);
      const datasets = [
        {
          label: 'Expenses',
          data: Object.values(expenses).map((expenses) =>
            expenses.reduce((total, expense) => total + expense.amount, 0)
          ),
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ];

      chartRef.current = new Chart(document.getElementById('expense-chart'), {
        type: 'bar',
        data: {
          labels,
          datasets,
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [expenses]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <p>You need to sign in to see the expenses chart.</p>;
  }

  return (
    <div>
      <canvas id="expense-chart" width="400" height="200"></canvas>
    </div>
  );
}
