import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../../FireBaseConfig";

const RevenueDashboard = () => {
  const [data, setData] = useState([]);
  const [month, setMonth] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    fetchRevenue();
  }, []);

  const fetchRevenue = async () => {
    const querySnapshot = await getDocs(collection(db, "revenue"));
    const revenueData = [];
    querySnapshot.forEach((doc) => {
      revenueData.push(doc.data());
    });

    const monthOrder = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];
    revenueData.sort(
      (a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
    );

    setData(revenueData);
  };

  const handleAddRevenue = async (e) => {
    e.preventDefault();
    if (!month || !amount) return alert("Fill both fields!");

    try {
      await addDoc(collection(db, "revenue"), {
        month: month.toUpperCase(),
        amount: parseFloat(amount),
        timestamp: serverTimestamp(),
      });
      alert("Revenue added successfully");
      setMonth("");
      setAmount("");
      fetchRevenue(); // refresh chart
    } catch (error) {
      console.error("Error adding revenue:", error);
      alert("Failed to add revenue");
    }
  };

  return (
    <div className='bg-gray-100 p-6 rounded-xl w-full  mx-auto'>
      {/* Form */}
      <form
        onSubmit={handleAddRevenue}
        className='flex flex-col sm:flex-row max-w-4xl gap-4 mb-6'
      >
        <input
          type='text'
          placeholder='Month (e.g. JAN)'
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className='p-2 border rounded-md w-full sm:w-1/3'
        />
        <input
          type='number'
          placeholder='Amount (e.g. 20000)'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className='p-2 border rounded-md w-full sm:w-1/3'
        />
        <button
          type='submit'
          className='bg-blue-600 text-white px-4 py-2 rounded-md w-full sm:w-auto'
        >
          Add Revenue
        </button>
      </form>

      {/* Chart */}
      <div className='bg-white rounded-xl p-4'>
        <ResponsiveContainer width='100%' height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='month' stroke='#cb3f27' />
            <YAxis
              tickFormatter={(value) =>
                typeof value === "number" ? `₦${value.toLocaleString()}` : value
              }
            />
            <Tooltip
              formatter={(value) =>
                typeof value === "number" ? `₦${value.toLocaleString()}` : value
              }
            />
            <Legend />
            <Bar dataKey='amount' fill='#1e1c87' name='Revenue' barSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueDashboard;
