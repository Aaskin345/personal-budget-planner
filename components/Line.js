import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { getSession, useSession } from 'next-auth/react';

export default function Expenses() {
  const [session, loading] = useSession();
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    if (!loading && session) {
      // Fetch expenses data from the server
      fetch('/api/expense/chart')
        .then((res) => res.json())
        .then((data) => setExpenses(data));

      // Listen for real-time updates to the expenses data
      // eslint-disable-next-line no-undef
      socket.on('expensesUpdated', (data) => {
        setExpenses(data);
      });
    }
  }, [session, loading]);

  // Convert expenses data to a format that Chart.js can use
  const chartData = {
    labels: expenses.map((expense) =>
      new Date(expense.date).toLocaleDateString()
    ),
    datasets: [
      {
        label: 'Expenses',
        data: expenses.map((expense) => expense.amount),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  return (
    <>
      {!loading && !session && <p>You need to sign in to view this page</p>}
      {!loading && session && (
        <>
          <h1>Expenses</h1>
          <Line data={chartData} />
        </>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
