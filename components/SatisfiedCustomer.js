/* eslint-disable @next/next/no-img-element */

import React from 'react';

export default function SatisfiedCustomer({ customer }) {
  return (
    <div className="card">
      <img
        src={customer.image}
        alt={customer.name}
        className="scaling border-sky-600 rounded-t-2xl"
      />
    </div>
  );
}
