/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
// import React from 'react';
import React, { useContext } from 'react';
import { Store } from '../utils/Store';

export default function TranslatorItem({ translator }) {
  const { state, dispatch } = useContext(Store);

  const addToFavoritesHandler = () => {
    const existItem = state.favorites.favoritesItem.find(
      (x) => x.slug === translator.slug
    );
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (1 < quantity) {
      alert('Sorry. Product is out of stock');
      return;
    }

    dispatch({
      type: 'FAVORITES_ADD_ITEM',
      payload: { ...translator, quantity: 1 },
    });
  };

  return (
    <div className="card">
      <Link href={`/translator/${translator.slug}`}>
        <a>
          <img
            src={translator.image}
            alt={translator.name}
            className="scaling border-sky-600 rounded-t-2xl"
          />
        </a>
      </Link>
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/translator/${translator.slug}`}>
          <a>
            <h2 className="mb border-b border-sky-600 text-lg">
              {translator.name}
            </h2>
          </a>
        </Link>
        <p className="font-bold text-sky-600 mb-2"> Ksh {translator.price}</p>
        <p className="border-b border-sky-600 mb-2 text-xs">
          {translator.category}
        </p>

        <button
          className="hover:bg-sky-600 active:bg-sky-700 focus:fill focus:fill-red-300"
          type="button"
          onClick={addToFavoritesHandler}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
