import React from 'react';
import Layout from '../components/Layout';
import HowItem from '../components/HowItem';
import Link from 'next/link';
import db from '../utils/db';
import How from '../models/How';
import Chart from '../components/Chart';
export default function Home({ hows }) {
  return (
    <Layout title="how it works">
      <Chart />
      <div className="">
        {hows.map((how) => (
          <HowItem how={how} key={how.slug}></HowItem>
        ))}
      </div>
      <div className=" container grid text-teal-500 text-center p-6 font-bold text-4xl">
        <h1>Become a purebudgetter</h1>
      </div>
      <div className="container grid text-gray-500 text-center p-3 font-semibold text-lg">
        <p>
          Take an example of an individual with a growing family ,the family
          needs <br></br>adequate catering hence the individual will opt{' '}
          <br></br>for a perfect budgetting to cater for everthing. <br></br>
          Purebudgets will help in managing the finances <br></br> well and stay
          on the same page with his family,<br></br> and spend on what is really
          important in life.
        </p>
        <Link href="/register">
          <button className=" grid bg-indigo-400 text-white  text-centre font-semibold rounded-full p-6 m-5 hover:bg-indigo-600 active:scale-90 transition duration-150">
            Create an account with purebudgets.
          </button>
        </Link>
      </div>

      <div className="bg-white py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-24">
        <div className="relative max-w-xl mx-auto">
          <svg
            className="absolute left-full transform translate-x-1/2"
            width={404}
            height={404}
            fill="none"
            viewBox="0 0 404 404"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="85737c0e-0916-41d7-917f-596dc7edfa27"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width={404}
              height={404}
              fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)"
            />
          </svg>
          <svg
            className="absolute right-full transform translate-x-1/2"
            width={404}
            height={404}
            fill="none"
            viewBox="0 0 404 404"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="85737c0e-0916-41d7-917f-596dc7edfa27"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width={404}
              height={404}
              fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)"
            />
          </svg>
          <div className="bg-white">
            <div className="py-12 sm:py-16 lg:py-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                  <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
                    How it Works
                  </h2>
                  <p className="mt-4 text-lg text-gray-600">
                    Our simple 3-step process makes budgeting easy and
                    hassle-free.
                  </p>
                </div>
                <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                        {/* Heroicon name: globe-alt */}
                        <svg
                          className="h-6 w-6"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 19V6l12-3v13"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <dt className="text-lg leading-6 font-medium text-gray-900">
                        Step 1
                      </dt>
                      <dd className="mt-2 text-base text-gray-500">
                        Sign up for a free account and log in.
                      </dd>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                        {/* Heroicon name: scale */}
                        <svg
                          className="h-6 w-6"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 10h16M4 14h16M4 18h16"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <dt className="text-lg leading-6 font-medium text-gray-900">
                        Step 2
                      </dt>
                      <dd className="mt-2 text-base text-gray-500">
                        Set up your budget and expenses
                      </dd>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                        {/* Heroicon name: annotation */}
                        <svg
                          className="h-6 w-6"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 14v5a2 2 0 01-2 2H7a2 2 0 01-2-2v-5m14-2l-3-3m0 0l-3 3m3-3v8"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <dt className="text-lg leading-6 font-medium text-gray-900">
                        Step 3
                      </dt>
                      <dd className="mt-2 text-base text-gray-500">
                        watch the website do its thing
                      </dd>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export async function getServerSideProps() {
  await db.connect();
  const hows = await How.find().lean();
  return {
    props: {
      hows: hows.map(db.convertDocToObj),
    },
  };
}
