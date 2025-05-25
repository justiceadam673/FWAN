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
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../FireBaseConfig";

const RevenueChart = () => {
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [months, setMonths] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("All Months");
  const [showDropdown, setShowDropdown] = useState(false);

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

  useEffect(() => {
    const fetchRevenue = async () => {
      const querySnapshot = await getDocs(collection(db, "revenue"));
      const revenueData = [];

      querySnapshot.forEach((doc) => {
        revenueData.push(doc.data());
      });

      revenueData.sort(
        (a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
      );

      const uniqueMonths = [...new Set(revenueData.map((r) => r.month))];

      setAllData(revenueData);
      setFilteredData(revenueData);
      setMonths(uniqueMonths);
    };

    fetchRevenue();
  }, []);

  const handleMonthSelect = (month) => {
    setSelectedMonth(month);
    setShowDropdown(false);

    if (month === "All Months") {
      setFilteredData(allData);
    } else {
      const filtered = allData.filter((item) => item.month === month);
      setFilteredData(filtered);
    }
  };

  return (
    <div className='bg-gray-200 rounded-xl p-4 w-full relative'>
      <div className='flex justify-end mb-2 relative'>
        <button
          className='bg-white px-4 py-1 rounded-md shadow border text-sm'
          onClick={() => setShowDropdown((prev) => !prev)}
        >
          {selectedMonth} ▾
        </button>

        {showDropdown && (
          <ul className='absolute right-0 top-10 z-10 bg-white shadow rounded border w-40'>
            <li
              onClick={() => handleMonthSelect("All Months")}
              className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
            >
              All Months
            </li>
            {months.map((month) => (
              <li
                key={month}
                onClick={() => handleMonthSelect(month)}
                className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
              >
                {month}
              </li>
            ))}
          </ul>
        )}
      </div>

      <ResponsiveContainer width='100%' height={300}>
        <BarChart data={filteredData}>
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
  );
};

export default RevenueChart;
