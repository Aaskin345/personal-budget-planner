import Head from 'next/head';
import {
  CheckCircleIcon,
  GlobeAltIcon,
  LightningBoltIcon,
} from '@heroicons/react/outline';

const HowItWorks = () => {
  return (
    <>
      <Head>
        <title>How It Works - Pure Bugets</title>
      </Head>

      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            <div>
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                <CheckCircleIcon className="h-6 w-6" />
              </div>
              <div className="mt-5">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Step 1: Set Your Budget
                </h3>
                <p className="mt-2 text-base text-gray-500">
                  Start by setting a budget for yourself. Decide how much you
                  want to spend each month on different categories such as rent,
                  groceries, transportation, and entertainment.
                </p>
              </div>
            </div>

            <div className="mt-10 lg:mt-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                <GlobeAltIcon className="h-6 w-6" />
              </div>
              <div className="mt-5">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Step 2: Track Your Spending
                </h3>
                <p className="mt-2 text-base text-gray-500">
                  Use our app to track your spending throughout the month.
                  Easily add your transactions and categorize them to see how
                  much you're spending in each category and how it compares to
                  your budget.
                </p>
              </div>
            </div>

            <div className="mt-10 lg:mt-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                <LightningBoltIcon className="h-6 w-6" />
              </div>
              <div className="mt-5">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Step 3: Adjust Your Budget
                </h3>
                <p className="mt-2 text-base text-gray-500">
                  Based on your spending, adjust your budget as needed. If you
                  find that you're spending too much in one category, try to cut
                  back or find ways to save. If you have extra money in one
                  category, you can reallocate it to another category or save it
                  for later.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;
