import React from "react";

const ProductCard = ({ title, seller, rating, image }) => {
  return (
    <div className='bg-white rounded-xl max-w-[500px] aspect-square  shadow-md hover:shadow-lg transition duration-300 overflow-hidden'>
      <img
        src={image}
        alt={title}
        className='h-3/4 w-full  object-cover rounded-t-xl'
      />
      <div className='p-4 space-y-2 flex flex-col items-center justify-between '>
        <h2 className='xl:text-[30px]  font-semibold'>{title}</h2>
        <p className='xl:text-[15px] hidden lg:flex text-gray-600'>
          {seller} • ⭐ {rating}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
