

import React from "react";
import Frame from '../../../assets/img/frame.png'

const ProductCard = ({ image, title, seller, rating, quantity, price }) => {
  return (
    <div className='bg-white rounded-xl max-w-[500px]   shadow-md hover:shadow-lg transition duration-300 overflow-hidden'>
      <img
        src={Frame}
        alt={title}
        className='h-40 w-full object-cover rounded-t-xl'
      />
      <div className='p-4 space-y-2 flex justify-between '>
        <h2 className='text-lg font-semibold'>{title}</h2>
        <p className='text-sm text-gray-600'>
          {seller} • ⭐ {rating}
        </p>
      
      </div>
    </div>
  );
};

export default ProductCard;
