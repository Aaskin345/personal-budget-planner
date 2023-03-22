import React from 'react';
import Image from 'next/image';
export default function WhatItem({ what }) {
  return (
    <>
      <div className="card hover:bg-green-200 hover:scale-105 transition transform-duration-200 ease-out">
        <Image
          src={what.image}
          alt={what.name}
          className="rounded-shadow"
          width="200"
          height="200"
        />
      </div>
      <div className="flex flex-col item-centre justify-center p-5 hover:bg-gray-200">
        <h2 className="text-ls text-gray-500">{what.name}</h2>

        <p>{what.description}</p>
      </div>
    </>
  );
}
