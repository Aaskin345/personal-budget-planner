import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

export default function ExpenseChart() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('/api/expense/chart');
      setChartData(response.data);
    };
    fetchData();
  }, []);

  return (
    <LineChart width={800} height={400} data={chartData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="date"
        tickFormatter={(date) => new Date(date).toLocaleDateString()}
      />

      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="Food" stroke="#8884d8" />
      <Line type="monotone" dataKey="Transportation" stroke="#82ca9d" />
      <Line type="monotone" dataKey="Entertainment" stroke="#ffc658" />
      <Line type="monotone" dataKey="Fees" stroke="#ff0000" />
      <Line type="monotone" dataKey="Loans" stroke="#0088FE" />
      <Line type="monotone" dataKey="Shopping" stroke="#00C49F" />
      <Line type="monotone" dataKey="Leisure" stroke="#FFBB28" />
      <Line type="monotone" dataKey="Other" stroke="#FF8042" />
    </LineChart>
  );
}
