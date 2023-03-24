import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTwitter,
  faInstagram,
  faWhatsapp,
  faSms,
} from '@fortawesome/free-brands-svg-icons';

import Layout from '../components/Layout';

import Image from 'next/image';

export default function Home() {
  return (
    <header className="gradient h-14 sticky top-0 z-1">
      <Layout title="Home Page">
        <div className="">
          <div className="gradient">
            {/* <!--Hero--> */}
            <div className="pt-14">
              <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
                {/* <!--Left Col--> */}
                <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
                  <div className="text-white uppercase tracking-loose w-full">
                    Budget with a reason
                  </div>
                  <h1 className="text-white my-4 text-5xl font-bold leading-tight">
                    Spend as per what is important in your life
                  </h1>
                  <div className="text-white leading-normal text-2xl mb-8">
                    PureBudgets is a virtual program to keep you in track with
                    your budget.It has a time tested-budgetting method
                  </div>
                </div>
                {/* <!--Right Col--> */}
                <div className="w-full md:w-3/5 py-6 text-center">
                  <Image
                    className="w-full md:w-4/5 z-1"
                    src="/images/hero2.png"
                    alt=""
                    width="400"
                    height="300"
                  />
                </div>
              </div>
            </div>
            <div className="relative -mt-12 lg:-mt-24">
              <svg
                viewBox="0 0 1428 174"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <g
                    transform="translate(-2.000000, 44.000000)"
                    fill="#FFFFFF"
                    fillRule="nonzero"
                  >
                    <path
                      d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496"
                      opacity="0.100000001"
                    ></path>
                    <path
                      d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
                      opacity="0.100000001"
                    ></path>
                    <path
                      d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z"
                      id="Path-4"
                      opacity="0.200000003"
                    ></path>
                  </g>
                  <g
                    transform="translate(-4.000000, 76.000000)"
                    fill="#FFFFFF"
                    fillRule="nonzero"
                  >
                    <path d="M0.457,34.035 C57.086,53.198 98.208,65.809 123.822,71.865 C181.454,85.495 234.295,90.29 272.033,93.459 C311.355,96.759 396.635,95.801 461.025,91.663 C486.76,90.01 518.727,86.372 556.926,80.752 C595.747,74.596 622.372,70.008 636.799,66.991 C663.913,61.324 712.501,49.503 727.605,46.128 C780.47,34.317 818.839,22.532 856.324,15.904 C922.689,4.169 955.676,2.522 1011.185,0.432 C1060.705,1.477 1097.39,3.129 1121.236,5.387 C1161.703,9.219 1208.621,17.821 1235.4,22.304 C1285.855,30.748 1354.351,47.432 1440.886,72.354 L1441.191,104.352 L1.121,104.031 L0.457,34.035 Z"></path>
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <Image
              src="/images/budget1.jpeg"
              alt="Expenses"
              width="100"
              height="100"
              className="w-20 h-20 mb-4"
            />
            <h2 className="text-lg font-bold text-gray-800 mb-2">
              Track Your Expenses
            </h2>
            <p className="text-base text-gray-600 text-center">
              Keep track of your expenses and categorize them for easy analysis.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src="/images/budget2.png"
              alt="Budget"
              width="100"
              height="100"
              className="w-20 h-20 mb-4"
            />
            <h2 className="text-lg font-bold text-gray-800 mb-2">
              Create a Budget
            </h2>
            <p className="text-base text-gray-600 text-center ">
              Set a budget for each expense and track your progress throughout.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src="/images/budget3.png"
              alt="Report"
              width="100"
              height="100"
              className="w-20 h-20 mb-4"
            />
            <h2 className="text-lg font-bold text-gray-800 mb-2">
              Generate Reports
            </h2>
            <p className="text-base text-gray-600 text-center">
              Get insights into your spending habits with detailed reports and
              charts.
            </p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            What Our Users Are Saying
          </h2>
          <div className="grid grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <p className="text-gray-700 mb-4">
                I love using this budgeting site! It is so easy to use and has
                helped me save so much money.
              </p>
              <p className="text-gray-600 font-bold">- Sarah K.</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <p className="text-gray-700 mb-4">
                The budgeting site has been a game-changer for me. I can finally
                see where my money is going and make better decisions about my
                spending.
              </p>
              <p className="text-gray-600 font-bold">- John P.</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <p className="text-gray-700 mb-4">
                This app is amazing! I have been able to save up for a down
                payment on a house thanks to the budgeting tools.
              </p>
              <p className="text-gray-600 font-bold">- Emily S.</p>
            </div>
          </div>
        </div>
        <section className="bg-gray-100 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Reach Us Today
            </h2>
            <div className="flex items-center justify-center space-x-4">
              <a href="#" className="text-gray-600 hover:text-sky-800">
                <span className="sr-only">Twitter</span>
                <FontAwesomeIcon icon={faTwitter} className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-600 hover:text-pink-800">
                <span className="sr-only">Instagram</span>
                <FontAwesomeIcon icon={faInstagram} className="w-6 h-6" />
              </a>
              <a
                href="https://wa.me/+254706012216"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-green-800"
              >
                <span className="sr-only">WhatsApp</span>
                <FontAwesomeIcon icon={faWhatsapp} className="w-6 h-6" />
              </a>
              <a href="sms:+254706012216">
                <FontAwesomeIcon
                  icon={faSms}
                  className="text-purple-500 hover:text-purple-600 w-8 h-8 mx-auto"
                />
                <div className="text-sm mt-1">SMS</div>
              </a>
            </div>
          </div>
        </section>
      </Layout>
    </header>
  );
}
