import React from 'react';

export default function CheckoutWizard({ activeStep = 0 }) {
  return (
    <div className="mb-5 flex flex-wrap">
      {['User Login', 'Payment Method', 'Place Order'].map((step, index) => (
        <div
          key={step}
          className={`flex-1 border-b-2  
          text-center 
       ${
         index <= activeStep
           ? 'border-sky-600  text-sky-600 font-bold'
           : 'border-gray-400 text-gray-400 font-bold'
       }
          
       `}
        >
          {step}
        </div>
      ))}
    </div>
  );
}
