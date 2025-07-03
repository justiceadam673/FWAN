import React from "react";
import { Icon } from "@iconify/react";

const FarmersListingCard = ({
  id,
  image,
  prodHeader,
  prod,
  quantityHeader,
  quantity,
  priceHeader,
  price,
  offersHeader,
  offers,
  statusHeader,
  status,
  onRemove,
}) => {
  const [quantityValue, unit] = quantity.split(" ");
  const isSoldOut = parseFloat(quantityValue) <= 0;

  return (
    <div className='flex flex-col lg:flex-row bg-white w-full rounded-md shadow-sm mt-2 p-4 gap-4'>
      {/* Image */}
      <div className='flex-shrink-0 w-[100px] h-[100px] overflow-hidden rounded bg-gray-100 flex items-center justify-center'>
        {image ? (
          <img
            src={image}
            alt={prod}
            className='w-full h-full object-cover rounded'
          />
        ) : (
          <div className='text-center text-sm text-gray-500'>
            No image available
          </div>
        )}
      </div>

      {/* Content */}
      <div className='flex-1 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm'>
        <div className='text-green-900/70'>
          <strong className='text-green-900'>{prodHeader}:</strong> {prod}
        </div>
        <div className='text-green-900/70'>
          <strong className='text-green-900'>{quantityHeader}:</strong>{" "}
          {quantityValue} {unit}
        </div>
        <div className='text-green-900/70'>
          <strong className='text-green-900'>{priceHeader}:</strong> ₦{price}
        </div>
        <div className='text-green-900/70'>
          <strong className='text-green-900'>{offersHeader}:</strong> {offers}
        </div>
        <div className='text-green-900/70'>
          <strong className='text-green-900'>{statusHeader}:</strong>
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              isSoldOut
                ? "bg-red-100 text-red-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {isSoldOut ? "Sold Out" : status}
          </span>
        </div>
      </div>

      {/* Remove Button */}
      <div className='flex items-center justify-end'>
        <button
          onClick={() => {
            if (
              window.confirm("Are you sure you want to remove this listing?")
            ) {
              onRemove();
            }
          }}
          className='text-green-500 border border-green-500 rounded-[20px] px-[20px] py-[5px] hover:text-red-500 hover:border-red-500 transition duration-[.3s] text-sm'
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default FarmersListingCard;
