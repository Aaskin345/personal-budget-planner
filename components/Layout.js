import { signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
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
        {<title>{title ? title + '- Sign Trans' : 'Sign Trans'}</title>}
        <meta name="description" content="Sign Translation Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer position="bottom-center" limit={1} />

      <div className="flex min-h-screen flex-col justify-between ">
        <header className="navbar">
          <nav className="flex h-14 items-center px-4 justify-between shadow-2xl ">
            <Link href="/">
              <a className="hover:scale-110 text-3xl font-extrabold leading-tight">
                Sign Trans
              </a>
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
              <span className="text-sky-600">
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
              </span>
            </div>
          </nav>
        </header>

        <main className="">{children}</main>

        <footer className="text-xs font-bold flex h-10 justify-center items-center shadow-inner">
          <p>Copyright © 2022 Sign Trans</p>
        </footer>
      </div>
    </>
  );
}
