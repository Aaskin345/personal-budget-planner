import { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
export default function ExpensesLineGraph() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/admin/expenses/totalExpenses');
        setData(response.data);
      } catch (error) {
        setError('Error loading expenses data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading expenses data...</div>;
  if (error) return <div>{error}</div>;
  if (!data) return null;

  const chartData = {
    labels: data.map((day) => day._id),
    datasets: [
      {
        label: 'Total Expenses',
        data: data.map((day) => day.total),
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        lineTension: 0.1,
      },
    ],
  };

  return (
    <div>
      <Line data={chartData} />
    </div>
  );
}
