import React from 'react';

export default function HowItem({ how }) {
  return (
    <>
      <div className="flex">
        <img src={how.image} alt={how.image} className="" />
      </div>
    </>
  );
}
