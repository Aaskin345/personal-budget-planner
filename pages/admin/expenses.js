import ExpenseChart from '../../components/ExpenseChart';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import Link from 'next/link';
import Layout3 from '../../components/Layout3';
Chart.register(CategoryScale);

function Expenses({ expenses }) {
  return (
    <Layout3 title="Admin Dashboard">
      <div className="grid  md:grid-cols-4 md:gap-5">
        <ul>
          <li>
            <Link href="/admin/dashboard">
              <a className="font-bold text-sky-600">Dashboard</a>
            </Link>
          </li>

          <li className="hover:font-bold">
            <Link href="/admin/expenses">Expenses</Link>
          </li>
          <li className="hover:font-bold">
            <Link href="/admin/translators">Satisfied Users </Link>
          </li>
          <li className="hover:font-bold">
            <Link href="/admin/users">Users</Link>
          </li>
        </ul>
      </div>
      <h1 className=" container pt-6 flex text-centre mb-4 text-3xl text-green-600 ">
        Expenses
      </h1>
      <ExpenseChart data={expenses} />
    </Layout3>
  );
}
export default Expenses;
