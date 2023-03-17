import Link from 'next/link';

const Nav = () => {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-blue-500 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <a className="text-white font-bold text-xl">Budget Tracker</a>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <Link href="/">
            <a className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-200 mr-4">
              Home
            </a>
          </Link>
          <Link href="/AddExpense">
            <a className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-200 mr-4">
              Budgets
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
