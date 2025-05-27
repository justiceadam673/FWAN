import React from "react";

const formatCurrency = (value) => {
  const num = parseFloat(value?.toString()?.replace(/[^\d.]/g, ""));
  if (isNaN(num)) return value;
  return `₦${num.toLocaleString("en-NG", { minimumFractionDigits: 2 })}`;
};

const FarmersHistoryTable = ({ offer, status, isMobile }) => {
  if (!offer) return null;

  const { id, buyerName, product, quantity, priceOffered, totalValue, date } =
    offer;

  const displayDate =
    date?.toDate?.().toLocaleDateString() || "Invalid or Missing Date";

  return isMobile ? (
    <div className='bg-white text-[#888888] p-4 rounded-lg shadow-md border mb-2'>
      <p>
        <strong>Buyer:</strong> <span>{buyerName}</span>
      </p>
      <p>
        <strong>Product:</strong>{" "}
        <span className='text-[#69B645]'>{product}</span>
      </p>
      <p>
        <strong>Quantity:</strong>{" "}
        <span className='text-[#69B645]'>{quantity} kg</span>
      </p>
      <p>
        <strong>Price Offered:</strong>{" "}
        <span className='text-[#69B645]'>{formatCurrency(priceOffered)}</span>
      </p>
      <p>
        <strong>Total Value:</strong>{" "}
        <span className='text-[#69B645]'>{formatCurrency(totalValue)}</span>
      </p>
      <p>
        <strong>Date:</strong>{" "}
        <span className='text-[#69B645]'>{displayDate}</span>
      </p>
      <p
        className={`font-semibold ${
          status === "Accepted"
            ? "text-green-600"
            : status === "Rejected"
            ? "text-red-600"
            : "text-yellow-600"
        }`}
      >
        <strong>Status:</strong> <span>{status}</span>
      </p>
    </div>
  ) : (
    <tr className='bg-gray-50'>
      <td className='p-2'>{id}</td>
      <td className='p-2'>{buyerName}</td>
      <td className='p-2 text-[#69B645]'>{product}</td>
      <td className='p-2 text-[#69B645]'>{quantity} kg</td>
      <td className='p-2 text-[#69B645]'>{formatCurrency(priceOffered)}</td>
      <td className='p-2 text-[#69B645]'>{formatCurrency(totalValue)}</td>
      <td className='p-2 text-[#69B645]'>{displayDate}</td>
      <td className='p-2 text-[#69B645]'>
        <span
          className={`font-semibold ${
            status === "Accepted"
              ? "text-green-600"
              : status === "Rejected"
              ? "text-red-600"
              : "text-yellow-600"
          }`}
        >
          {status}
        </span>
      </td>
    </tr>
  );
};

export default FarmersHistoryTable;
