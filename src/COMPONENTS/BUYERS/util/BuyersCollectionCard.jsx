import React from "react";

const BuyersCollectionCard = ({
  image,
  title,
  seller,
  rating,
  quantity,
  price,
}) => {
  return (
    <div className='bg-white border border-gray-300 rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col justify-between  h-fit'>
      <img
        src={image}
        alt={title}
        className='w-full h-40 md:h-52 object-cover rounded-lg mb-4'
      />
      <div className='flex flex-col gap-2 flex-grow'>
        <div>
          <h3 className='text-lg md:text-xl font-semibold text-[#1E1E1E]'>
            {title}
          </h3>
          <p className='text-sm text-gray-600'>
            {seller} • ⭐ {rating}
          </p>
        </div>
        <div className='flex justify-between text-sm text-gray-700'>
          <div>
            <p className='text-gray-500'>Quantity</p>
            <p className='font-medium'>{quantity}</p>
          </div>
          <div>
            <p className='text-gray-500'>Price</p>
            <p className='font-medium'>{price}</p>
          </div>
        </div>
      </div>
      <div className='mt-4 flex flex-col gap-2'>
        <button className='flex-1 border border-[#3D8236] text-[#3D8236] rounded-full py-2 text-sm hover:bg-[#3D8236] hover:cursor-pointer hover:text-white transition'>
          View Details
        </button>
        <button className='flex-1 bg-[#3D8236] text-white rounded-full py-2 text-sm hover:bg-[#2f6a2a] hover:cursor-pointer transition'>
          Make Offer
        </button>
      </div>
    </div>
  );
};

export default BuyersCollectionCard;
