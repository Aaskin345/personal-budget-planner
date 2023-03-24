import { signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import React, { useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Menu } from '@headlessui/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Store } from '../utils/Store';
import DropdownLink from './DropdownLink';

export default function Layout({ title, children }) {
  const { status, data: session } = useSession();

  const { dispatch } = useContext(Store);

  const logoutClickHandler = () => {
    Cookies.remove('favorites');
    dispatch({ type: 'FAVORITES_RESET' });
    signOut({ callbackUrl: '/login' });
  };

  useEffect(() => {
    const debounce = (fn) => {
      let frame;
      return (...params) => {
        if (frame) {
          cancelAnimationFrame(frame);
        }
        frame = requestAnimationFrame(() => {
          fn(...params);
        });
      };
    };

    const storeScroll = () => {
      document.documentElement.dataset.scroll = window.scrollY;
    };

    document.addEventListener('scroll', debounce(storeScroll), {
      passive: true,
    });

    storeScroll();
  });

  return (
    <>
      <Head>
        {<title>{title ? title + '- Pure Budgets' : 'Pure Budgets'}</title>}
        <meta name="description" content="Sign Translation Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer position="bottom-center" limit={1} />

      <div className="flex min-h-full flex-col justify-between  overflow-x: hidden;">
        <header className="navbar px-2 lg:px-4">
          <nav className="flex h-14 items-center px-4 justify-between shadow-2xl w-full lg:w-auto">
            <Link
              href="/"
              className=" mx-1 lg:mx-3hover:scale-110 text-3xl {{ Request::is('/') ? '' : 'text-xl' }}font-extrabold leading-tight text-green-500"
            >
              Pure Budgets
            </Link>
            <Link
              href="/how"
              className=" mx-1 lg:mx-3hover:scale-110 text-2xl {{ Request::is('/how') ? '' : 'text-xl' }}font-bold leading-tight text-green-400"
            >
              How it works
            </Link>
            <Link
              href="/what"
              className=" mx-1 lg:mx-3hover:scale-110 text-2xl {{ Request::is('/what') ? '' : 'text-xl' }}font-bold leading-tight text-green-400"
            >
              What to expect
            </Link>

            <div>
              <span className="text-sky-600">
                {status === 'loading' ? (
                  'Loading'
                ) : session?.user ? (
                  <Menu as="div" className="relative inline-block">
                    <Menu.Button className="text-sky-600 hover:bg-green-800 hover:rounded-full text-center p-3 active scale-75 transition duration-100 text-2xl">
                      {session.user.name}
                    </Menu.Button>
                    <Menu.Items className="rounded-2xl border border-slate-300 shadow-2xl shadow-slate-600 absolute right-0 w-56 origin-top-right bg-white ">
                      <Menu.Item>
                        <DropdownLink className="dropdown-link" href="/profile">
                          Profile
                        </DropdownLink>
                      </Menu.Item>

                      {session.user.isAdmin && (
                        <Menu.Item>
                          <DropdownLink
                            className="dropdown-link"
                            href="/admin/dashboard"
                          >
                            Admin Dashboard
                          </DropdownLink>
                        </Menu.Item>
                      )}

                      <Menu.Item>
                        <button
                          className="dropdown-link"
                          href="#"
                          onClick={logoutClickHandler}
                        >
                          Logout
                        </button>
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
                ) : (
                  <>
                    <Link href="/login">
                      <button className="bg-green-500 px-2 lg:px-4 py-2 lg:py-3 text-center text-white hover:bg-green-600 rounded-full p-3 m-3 active:scale-90 transition duration-150">
                        Login
                      </button>
                    </Link>
                    <Link href="/register">
                      <button className="px-2 lg:px-4 bg-green-500 text-center py-2 lg:py-3 text-white hover:bg-green-600 rounded-full p-3 m-3 active:scale-90 transition duration-150">
                        Sign up
                      </button>
                    </Link>
                    <style>{`
                      @media only screen and (max-width: 640px) {
                        button {
                       font-size: 0.8rem;
                        padding: 0.5rem 1rem;
                           }
                           }
                      `}</style>
                  </>
                )}
              </span>
            </div>
          </nav>
        </header>
        <main className="">{children}</main>

        <footer className="text-xs font-bold flex h-10 justify-center items-center shadow-inner text-center px-2 lg:px-4">
          <p>Copyright © 2023 Pure Budgets</p>
        </footer>
      </div>
    </>
  );
}
