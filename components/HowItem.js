import Image from 'next/image';
import React from 'react';

export default function HowItem({ how }) {
  return (
    <>
      <div className="flex">
        <Image
          src={how.image}
          alt={how.image}
          className="shadow-md"
          width="400"
          height="300"
        />
      </div>
    </>
  );
}
