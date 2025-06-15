import React from "react";
import { PaystackButton } from "react-paystack";

const PaymentOverlay = ({ email, amount, onClose }) => {
  const publicKey = "pk_test_f635f526efd6eec9028ffb64f9692db3a8189d89"; // Replace with your Paystack public key

  const componentProps = {
    email,
    amount: amount * 100, // Paystack uses kobo
    metadata: {
      custom_fields: [
        {
          display_name: "Buyer",
          variable_name: "buyer_email",
          value: email,
        },
      ],
    },
    publicKey,
    text: "Pay Now",
    onSuccess: () => {
      alert("Payment Successful!");
      onClose();
    },
    onClose: onClose,
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
      <div className='bg-white p-6 rounded-lg w-full max-w-md shadow-xl'>
        <h2 className='text-lg font-semibold mb-4'>Complete Your Payment</h2>
        <PaystackButton
          {...componentProps}
          className='bg-green-600 text-white px-4 py-2 rounded'
        />
        <button
          onClick={onClose}
          className='mt-4 text-sm text-gray-500 underline'
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PaymentOverlay;
