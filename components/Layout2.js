import { signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
// import React from 'react';
import React, { useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Menu } from '@headlessui/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Store } from '../utils/Store';
import DropdownLink from './DropdownLink';

export default function Layout({ title, children }) {
  const { status, data: session } = useSession();

  const { state, dispatch } = useContext(Store);
  const { favorites } = state;
  const [favoritesItemsCount, setFavoritesItemsCount] = useState(0);
  useEffect(() => {
    setFavoritesItemsCount(
      favorites.favoritesItems.reduce((a, c) => a + c.quantity, 0)
    );
  }, [favorites.favoritesItems]);

  const logoutClickHandler = () => {
    Cookies.remove('favorites');
    dispatch({ type: 'FAVORITES_RESET' });
    signOut({ callbackUrl: '/login' });
  };
  return (
    <>
      <Head>
        {<title>{title ? title + '- Sign Trans' : 'Sign Trans'}</title>}
        <meta name="description" content="Sign Translation Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer position="bottom-center" limit={1} />

      <div className="flex min-h-screen flex-col justify-between ">
        <header className="sticky top-0 z-50 bg-white">
          <nav className="flex h-14 items-center px-4 justify-between shadow-2xl ">
            <Link href="/">
              <a className="text-sky-600 hover:scale-110  text-3xl font-extrabold leading-tight">
                Sign Trans
              </a>
              {/* <a className="text-4x font-bold">Sign Translators</a> */}
            </Link>

            <div>
              <Link href="/favorites">
                <a className="p-2">
                  Favorites
                  {favoritesItemsCount > 0 && (
                    <span className="ml-1 rounded-full bg-sky-600 px-2 py-1 text-xs font-bold text-white">
                      {favoritesItemsCount}
                    </span>
                  )}
                </a>
              </Link>

              {status === 'loading' ? (
                'Loading'
              ) : session?.user ? (
                <Menu as="div" className="relative inline-block">
                  <Menu.Button className="text-sky-600">
                    {session.user.name}
                  </Menu.Button>
                  <Menu.Items className="rounded-2xl border border-slate-300 shadow-2xl shadow-slate-600 absolute right-0 w-56 origin-top-right bg-white  shadow-lg ">
                    <Menu.Item>
                      <DropdownLink className="dropdown-link" href="/profile">
                        Profile
                      </DropdownLink>
                    </Menu.Item>
                    <Menu.Item>
                      <DropdownLink
                        className="dropdown-link"
                        href="/hire-order-history"
                      >
                        Hire History
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
                      <a
                        className="dropdown-link"
                        href="#"
                        onClick={logoutClickHandler}
                      >
                        Logout
                      </a>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              ) : (
                <Link href="/login">
                  <a className="p-2">Login</a>
                </Link>
              )}
            </div>
          </nav>
        </header>

        <main className="container m-auto mt-4 px-4">{children}</main>

        <footer className="text-xs font-bold flex h-10 justify-center items-center shadow-inner">
          <p>Copyright © 2022 Sign Trans</p>
        </footer>
      </div>
    </>
  );
}
