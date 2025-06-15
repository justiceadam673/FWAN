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
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../FireBaseConfig";

const RevenueChart = ({ farmerId }) => {
  const [chartData, setChartData] = useState([]);
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
    if (!farmerId) return;

    const fetchRevenueData = async () => {
      const offersQuery = query(
        collection(db, "offers"),
        where("farmerId", "==", farmerId),
        where("status", "==", "Paid")
      );

      const querySnapshot = await getDocs(offersQuery);
      const paidOffers = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        let month = "UNK";

        // Check for both possible timestamp formats
        if (data.paymentDate?.toDate) {
          month = data.paymentDate
            .toDate()
            .toLocaleString("default", { month: "short" })
            .toUpperCase();
        } else if (data.timestamp?.toDate) {
          month = data.timestamp
            .toDate()
            .toLocaleString("default", { month: "short" })
            .toUpperCase();
        } else if (data.date?.toDate) {
          month = data.date
            .toDate()
            .toLocaleString("default", { month: "short" })
            .toUpperCase();
        } else if (typeof data.date === "string") {
          // Handle string dates if needed
          const dateObj = new Date(data.date);
          if (!isNaN(dateObj)) {
            month = dateObj
              .toLocaleString("default", { month: "short" })
              .toUpperCase();
          }
        }

        return {
          id: doc.id,
          ...data,
          month,
          amount: parseFloat(data.totalValue) || 0,
        };
      });

      // Group by month and sum amounts
      const monthlyData = paidOffers.reduce((acc, offer) => {
        if (!acc[offer.month]) {
          acc[offer.month] = { month: offer.month, amount: 0 };
        }
        acc[offer.month].amount += offer.amount;
        return acc;
      }, {});

      // Convert to array, filter out invalid months, and sort
      const sortedData = Object.values(monthlyData)
        .filter((item) => monthOrder.includes(item.month))
        .sort(
          (a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
        );

      setChartData(sortedData);
      setMonths(sortedData.map((item) => item.month));
    };

    fetchRevenueData();
  }, [farmerId]);

  const handleMonthSelect = (month) => {
    setSelectedMonth(month);
    setShowDropdown(false);
  };

  const filteredData =
    selectedMonth === "All Months"
      ? chartData
      : chartData.filter((item) => item.month === selectedMonth);

  return (
    <div className='bg-gray-200 rounded-xl p-[20px] w-full relative'>
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

      <ResponsiveContainer
        width='100%'
        height={300}
        className='p-[10px] text-[12px] lg:text-md'
      >
        <BarChart data={filteredData}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='month' stroke='#cb3f27' />
          <YAxis tickFormatter={(value) => `₦${value.toLocaleString()}`} />
          <Tooltip
            formatter={(value) => [`₦${value.toLocaleString()}`, "Revenue"]}
          />
          <Legend />
          <Bar
            dataKey='amount'
            fill='green'
            radius={[8, 8, 0, 0]}
            name='Revenue'
            barSize={30}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
