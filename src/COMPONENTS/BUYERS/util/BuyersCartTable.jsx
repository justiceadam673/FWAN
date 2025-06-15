import React from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

const formatCurrency = (value) => {
  if (value == null || isNaN(value)) return "₦0.00";
  const num = parseFloat(value.toString().replace(/[^\d.]/g, ""));
  if (isNaN(num)) return "₦0.00";
  return `₦${num.toLocaleString("en-NG", { minimumFractionDigits: 2 })}`;
};

const BuyersCartTable = ({
  offer,
  status,
  onStatusChange,
  isMobile,
  onMakeOffer,
  onCompletePayment,
}) => {
  const navigate = useNavigate();

  const {
    id,
    image,
    product,
    quantity,
    offerPrice,
    totalValue,
    timestamp,
    paymentStatus,
  } = offer;

  const displayDate = timestamp?.toDate?.().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const renderActionButtons = () => {
    const isPaid = paymentStatus === "Paid" || status === "Paid";

    if (isPaid) {
      return (
        <button
          onClick={() =>
            navigate(`/buyerstracking/
            ${offer.docId}
            `)
          }
          className='bg-blue-600 hover:bg-blue-700 text-white w-fit px-3 py-1 rounded transition-colors'
        >
          Track Delivery
        </button>
      );
    }

    if (status === "Accepted") {
      return (
        <button
          onClick={onCompletePayment}
          className='bg-[#168B2B] hover:bg-[#126b22] text-white w-fit px-3 py-1 rounded transition-colors'
        >
          Complete Payment
        </button>
      );
    }

    if (status === "Rejected") {
      return (
        <button
          onClick={() => navigate(`/buyersoverview`)}
          className='border border-black hover:bg-gray-100 flex gap-2 items-center justify-center text-black px-3 py-1 rounded transition-colors'
        >
          <Icon icon='mdi-light:eye' />
          Make Offers
        </button>
      );
    }

    return (
      <div className='bg-gray-300 text-gray-500 w-fit px-3 py-1 rounded cursor-not-allowed'>
        Complete Payment
      </div>
    );
  };

  const getStatusColor = () => {
    if (status === "Paid") return "text-blue-600";
    if (status === "Accepted") return "text-green-500";
    if (status === "Rejected") return "text-red-500";
    return "text-yellow-500";
  };

  if (isMobile) {
    return (
      <div className='rounded-md bg-white px-3 py-4 shadow-md'>
        <div className='flex justify-between'>
          <span className='font-semibold text-lg'>{product}</span>
          <span className='text-gray-600'>{displayDate}</span>
        </div>
        <div className='flex gap-2 my-2'>
          {image && (
            <img
              src={image}
              alt={product}
              className='w-[70px] h-[70px] rounded-lg object-cover'
            />
          )}
          <div className='flex-1'>
            <p>
              Quantity: <strong>{quantity} kg</strong>
            </p>
            <p>
              Price Offered: <strong>{formatCurrency(offerPrice)}</strong>
            </p>
            <p>
              Total Value: <strong>{formatCurrency(totalValue)}</strong>
            </p>
            <p>
              Status: <strong className={getStatusColor()}>{status}</strong>
            </p>
          </div>
        </div>
        <div className='flex justify-end mt-2'>{renderActionButtons()}</div>
      </div>
    );
  }

  return (
    <tr className='hover:bg-gray-50'>
      <td className='p-3'>{id}</td>
      <td className='p-3'>
        {image && (
          <img
            src={image}
            alt={product}
            className='w-[70px] h-[70px] rounded-lg object-cover'
          />
        )}
      </td>
      <td className='p-3'>{product}</td>
      <td className='p-3'>{quantity} kg</td>
      <td className='p-3'>{formatCurrency(offerPrice)}</td>
      <td className='p-3'>{formatCurrency(totalValue)}</td>
      <td className='p-3'>{displayDate}</td>
      <td className={`p-3 ${getStatusColor()}`}>{status}</td>
      <td className='p-3'>{renderActionButtons()}</td>
    </tr>
  );
};

export default BuyersCartTable;
