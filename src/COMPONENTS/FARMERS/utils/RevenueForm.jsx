import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../FireBaseConfig";

const RevenueForm = () => {
  const [month, setMonth] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "revenue"), {
        month: month.toUpperCase(),
        amount: parseInt(amount),
        timestamp: new Date().toISOString(),
      });
      alert("Revenue added successfully!");
      setMonth("");
      setAmount("");
    } catch (err) {
      console.error(err);
      alert("Error adding revenue.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='bg-white p-4 rounded-lg shadow-md w-full max-w-md mx-auto'
    >
      <h2 className='text-lg font-bold mb-4 text-center'>
        Add Monthly Revenue
      </h2>
      <input
        type='text'
        placeholder='Month (e.g. JAN)'
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        required
        className='w-full p-2 mb-3 border rounded'
      />
      <input
        type='number'
        placeholder='Amount (₦)'
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
        className='w-full p-2 mb-3 border rounded'
      />
      <button
        type='submit'
        className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700'
      >
        Submit
      </button>
    </form>
  );
};

export default RevenueForm;
