import React from 'react';
import Layout from '../components/Layout';
import WhatItem from '../components/WhatItem';
import Link from 'next/link';
import What from '../models/What';
import db from '../utils/db';

export default function Home({ whats }) {
  return (
    <Layout title="What to expect">
      <div className="container grid text-teal-500 text-center p-6 font-bold text-4xl">
        <h1>What to expect.</h1>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {whats.map((what) => (
          <WhatItem what={what} key={what.slug}></WhatItem>
        ))}
      </div>
      <div className="bg-slate-300">
        <div className=" ">
          <h1 className="container grid text-teal-500 text-center p-6 font-bold text-4xl">
            Get started.
          </h1>
          <p className="container grid text-slate-500 text-center p-4 font-bold text-base">
            Create an account with purebudgets today<br></br>and enjoy non-stop
            services<br></br> Start your great and endless financial story with
            us,
            <br></br>
            you are a mouse click away.{' '}
          </p>
          <Link href="/register">
            <button className=" text-white bg-green-500 text-centre font-semibold rounded-md p-6 ml-44 hover:bg-green-600 active:scale-90 transition duration-150 ">
              Sign up.
            </button>
          </Link>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Features</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-blue-500 mb-4 mx-auto"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a7 7 0 100 14 7 7 0 000-14zm0 12.25A5.25 5.25 0 1110 3.75a5.2 5.2 0 015.2 5.2 5.2 5.2 0 01-5.2 5.2z"
                clipRule="evenodd"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Budget Tracking
            </h3>
            <p className="text-gray-600">
              Keep track of your finances by easily creating budgets, setting
              limits and tracking your expenses all in one place.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-blue-500 mb-4 mx-auto"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 2a2 2 0 00-2 2v1H7a1 1 0 00-1 1v12a1 1 0 001 1h6a1 1 0 001-1V6a1 1 0 00-1-1h-1V4a2 2 0 00-2-2zm-2 5a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1zm1 3a1 1 0 100 2 1 1 0 000-2zm2 0a1 1 0 100 2 1 1 0 000-2zm-3 3a1 1 0 110-2 1 1 0 010 2z"
                clipRule="evenodd"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Goal Setting
            </h3>
            <p className="text-gray-600">
              Set financial goals and track your progress over time. Stay
              motivated and on track to achieve your financial dreams.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-blue-500 mb-4 mx-auto"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 2h14a1 1 0 011 1v14a1 1 0 01-1 1H3a1 1 0 01-1-1V3a1 1 0 011-1zm3 3v8h8V5H6zm1 1h6v6H7V6z"
                clipRule="evenodd"
              />
            </svg>
            <h3 className="text-xl font-medium text-gray-800 mb-2">
              Easy Budgeting
            </h3>
            <p className="text-gray-700 text-base">
              Our budgeting tool makes it easy to track your expenses and stay
              on top of your finances. Set monthly budgets and see how much you
              are spending in different categories.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-blue-500 mb-4 mx-auto"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 2a8 8 0 100 16 8 8 0 000-16zm3.828 11.657l.013-.013a1 1 0 00-1.44-1.392l-.013.013-3.027 3.027-1.416-1.415 3.027-3.027a1 1 0 00.013-1.386l-.013-.013a1 1 0 00-1.427-.025l-.014.013-3.027 3.027-1.415-1.416 3.027-3.027a1 1 0 00.023-1.427l-.023-.022a1 1 0 00-1.403-.018l-.014.013-4 4a1 1 0 00-.031 1.39l.031.035 4 4a1 1 0 001.407-1.407zM8.17 7.17a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm3.66 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm3.67 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"
                clipRule="evenodd"
              />
            </svg>
            <h3 className="text-xl font-medium text-gray-800 mb-2">
              Multiple Categories
            </h3>
            <p className="text-gray-700 text-base">
              Our butgetting tool has multiple ctaegories in which the user can
              choose on what to allocate the funds
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export async function getServerSideProps() {
  await db.connect();
  const whats = await What.find().lean();
  return {
    props: {
      whats: whats.map(db.convertDocToObj),
    },
  };
}
