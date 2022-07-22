import Head from 'next/head';
import Link from 'next/link';
// import React from 'react';
import React, { useContext, useEffect, useState } from 'react';
import { Store } from '../utils/Store';

export default function Layout({ title, children }) {
  const { state } = useContext(Store);
  const { favorites } = state;
  const [favoritesItemsCount, setFavoritesItemsCount] = useState(0);
  useEffect(() => {
    setFavoritesItemsCount(
      favorites.favoritesItems.reduce((a, c) => a + c.quantity, 0)
    );
  }, [favorites.favoritesItems]);
  return (
    <>
      <Head>
        {<title>{title ? title + '- Sign Trans' : 'Sign Trans'}</title>}
        <meta name="description" content="Sign Translation Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex min-h-screen flex-col justify-between ">
        <header>
          <nav className="flex h-14 border border-gray-300 shadow-2xl shadow-slate-600 items-center px-4 justify-between shadow-2xl">
            <Link href="/">
              <a className="text-lg font-bold">Sign Translators</a>
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
              <Link href="/login">
                <a className="p-2">Login</a>
              </Link>
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
