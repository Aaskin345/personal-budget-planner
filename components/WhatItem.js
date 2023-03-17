import Link from 'next/link';
import React from 'react';

export default function WhatItem({ what }) {
  return (
    <>
      <div className="card hover:bg-green-200 hover:scale-105 transition transform-duration-200 ease-out">
        <Link href="/what/${what.slug}">
          <img src={what.image} alt={what.name} className="rounded-shadow" />
        </Link>
      </div>
      <div className="flex flex-col item-centre justify-center p-5 hover:bg-gray-200">
        <Link href="/what/${what.slug}">
          <h2 className="text-ls text-gray-500">{what.name}</h2>
        </Link>
        <p>{what.description}</p>
      </div>
    </>
  );
}
