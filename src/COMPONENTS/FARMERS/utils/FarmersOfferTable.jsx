import React from "react";
import { Icon } from "@iconify/react";

const formatCurrency = (value) => {
  const num = parseFloat(value.toString().replace(/[^\d.]/g, ""));
  if (isNaN(num)) return value;
  return `₦${num.toLocaleString("en-NG", { minimumFractionDigits: 2 })}`;
};

const FarmersOfferTable = ({
  offer,
  status,
  onStatusChange,
  isMobile,
  onMakeOffer,
}) => {
  const { id, buyerName, product, quantity, priceOffered, totalValue, date } =
    offer;

  const displayDate = date instanceof Date ? date.toLocaleDateString() : "N/A";

  const renderActionButtons = () => {
    if (status === "Accepted") {
      return (
        <div className='bg-[#168B2B] text-white w-fit px-3 py-1 rounded'>
          Proceed to Payment
        </div>
      );
    } else if (status === "Rejected") {
      return (
        <button
          onClick={onMakeOffer}
          className='border border-black flex gap-[8px] items-center justify-center text-black px-3 py-1 rounded'
        >
          <span>
            <Icon icon={"mdi-light:eye"} />
          </span>{" "}
          More Offers
        </button>
      );
    } else {
      return (
        <div className='flex gap-2 items-center flex-wrap'>
          <button
            onClick={() => onStatusChange(id, "Accepted")}
            className='border border-[#168B2B] text-[#168B2B] px-3 py-1 rounded flex gap-2 items-center'
          >
            <Icon icon='fluent-mdl2:accept' width='16' height='16' />
            Accept
          </button>
          <span className='text-gray-500'>or</span>
          <button
            onClick={() => onStatusChange(id, "Rejected")}
            className='border border-[#C71313] text-[#C71313] px-3 py-1 rounded flex gap-2 items-center'
          >
            <Icon icon='solar:trash-bin-2-linear' width='16' height='16' />
            Reject
          </button>
        </div>
      );
    }
  };

  if (isMobile) {
    return (
      <div className='bg-white text-[#888888] p-4 rounded-lg shadow-md border mb-2'>
        <p>
          <strong>Buyer:</strong> <span className=''>{buyerName}</span>
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
          <strong>Status:</strong>
          <span> {status}</span>
        </p>
        {renderActionButtons()}
      </div>
    );
  }

  return (
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
      <td className='p-2'>{renderActionButtons()}</td>
    </tr>
  );
};

export default FarmersOfferTable;
