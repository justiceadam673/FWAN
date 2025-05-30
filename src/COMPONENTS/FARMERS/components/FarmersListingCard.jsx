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
  onRemove, // 👈 New prop
}) => {
  return (
    <div className='flex flex-col lg:flex-row bg-white w-full rounded-md shadow-sm mt-2 p-4 gap-4'>
      {/* Image */}
      <div className='flex-shrink-0'>
        <img
          src={image || "https://via.placeholder.com/91x72?text=No+Image"}
          className='w-[91px] h-[72px] rounded-[12px] object-cover'
        />
      </div>

      {/* Info Section */}
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 w-full'>
        <div>
          <h3 className='text-gray-500 text-sm font-[Poppins]'>{prodHeader}</h3>
          <p className='text-[#174582] text-base font-[Poppins]'>{prod}</p>
        </div>
        <div>
          <h3 className='text-gray-500 text-sm font-[Poppins]'>
            {quantityHeader}
          </h3>
          <p className='text-[#174582] text-base font-[Poppins]'>{quantity}</p>
        </div>
        <div>
          <h3 className='text-gray-500 text-sm font-[Poppins]'>
            {priceHeader}
          </h3>
          <p className='text-[#174582] text-base font-[Poppins]'>{price}</p>
        </div>
        <div>
          <h3 className='text-gray-500 text-sm font-[Poppins]'>
            {offersHeader}
          </h3>
          <p className='text-[#174582] text-base font-[Poppins]'>{offers}</p>
        </div>
        <div>
          <h3 className='text-gray-500 text-sm font-[Poppins]'>
            {statusHeader}
          </h3>
          <p className='text-[#69B645] text-base font-[Poppins]'>{status}</p>
        </div>
      </div>

      {/* Remove Button */}
      <div className='flex justify-end items-center'>
        <button
          onClick={onRemove} // 👈 Trigger parent callback
          className='bg-[#B65445] text-white flex items-center gap-2 px-3 py-2 rounded-md'
        >
          <span className='bg-[#E8E4E4]/20 p-[6px] rounded-[8px] flex items-center justify-center'>
            <Icon icon='line-md:minus' className='text-[#E8E4E4]' />
          </span>
          <span className='hidden lg:inline'>Remove</span>
        </button>
      </div>
    </div>
  );
};

export default FarmersListingCard;
