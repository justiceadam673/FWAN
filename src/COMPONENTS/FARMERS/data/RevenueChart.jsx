// src/components/RevenueChart.jsx
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../FireBaseConfig";

const RevenueChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchRevenue = async () => {
      const querySnapshot = await getDocs(collection(db, "revenue"));
      const revenueData = [];
      querySnapshot.forEach((doc) => {
        revenueData.push(doc.data());
      });
      // Sort by month order
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
    fetchRevenue();
  }, []);

  return (
    <div className='bg-yellow-400 rounded-xl p-4 w-full'>
      <div className='flex justify-end mb-2'>
        <button className='bg-white px-4 py-1 rounded-md shadow border text-sm'>
          Monthly ▾
        </button>
      </div>
      <ResponsiveContainer width='100%' height={300}>
        <BarChart data={data}>
          <XAxis dataKey='month' stroke='#cb3f27' />
          <YAxis tickFormatter={(value) => `₦${value.toLocaleString()}`} />
          <Tooltip formatter={(value) => `₦${value.toLocaleString()}`} />
          <Legend />
          <Bar dataKey='amount' fill='#1e1c87' name='Revenue' barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
