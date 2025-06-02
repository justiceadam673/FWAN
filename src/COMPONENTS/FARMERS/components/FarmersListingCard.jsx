import React from "react";
import { Icon } from "@iconify/react";

const FarmersListingCard = ({
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
  onRemove, // <- required to pass delete handler
}) => {
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
      <div className='flex-1 grid grid-cols-2 md:grid-cols-3 gap-2 text-sm'>
        <div className='text-green-900/70'>
          <strong className='text-green-900'>{prodHeader}:</strong> {prod}
        </div>
        <div className='text-green-900/70'>
          <strong className='text-green-900'>{quantityHeader}:</strong>{" "}
          {quantity}
        </div>
        <div className='text-green-900/70'>
          <strong className='text-green-900'>{priceHeader}:</strong> ₦{price}
        </div>
        <div className='text-green-900/70'>
          <strong className='text-green-900'>{offersHeader}:</strong> {offers}
        </div>
        <div className='text-green-900/70'>
          <strong className='text-green-900'>{statusHeader}:</strong> {status}
        </div>
      </div>

      {/* Remove Button */}
      {onRemove && (
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
      )}
    </div>
  );
};

export default FarmersListingCard;
