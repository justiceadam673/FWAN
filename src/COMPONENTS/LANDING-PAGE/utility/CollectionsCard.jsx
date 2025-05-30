import React from "react";

const CollectionsCard = ({ image, title, seller, rating, quantity, price }) => {
  return (
    <div className=' md:max-w-full lg:max-w-[379px] max-w-[162px] w-full h-fit md:h-[669px] rounded-[12.823px] md:rounded-[30px] border bg-[#FFF]  p-[8px] md:p-[20px] border-[#8C8383] '>
      <img
        src={image}
        alt={title}
        className='md:h-1/2 h-[116.54px] w-full rounded-[12.823px] object-cover md:rounded-xl'
      />
      <div className='md:mt-[13px]'>
        <section className=' p-[6px] md:p-4 md:space-y-2 flex flex-col items-start mb-[6px] lg:mb-[16px] justify-between '>
          <h2 className=' text-[14px] md:text-[28px] poppins-semibold '>
            {title}
          </h2>
          <p className=' text-[10px] md:text-[20px] leading-normal poppins-regular flex '>
            {seller} • ⭐ {rating}
          </p>
        </section>
        <section className='flex mb-[6px] md:mb-[37px] justify-between items-center'>
          <div>
            <h2 className=' text-[12px] md:text-[20px] poppins-regular leading-normal text-[#645E5E] '>
              Quantity
            </h2>
            <p className=' text-[14px] md:text-[28px] poppins-semibold text-[#1E1E1E] '>
              {quantity}
            </p>
          </div>
          <div>
            <h2 className=' text-[12px] md:text-[20px] poppins-regular leading-normal text-[#645E5E] '>
              Price
            </h2>
            <p className=' text-[14px] md:text-[28px] poppins-semibold text-[#1E1E1E] '>
              {price}
            </p>
          </div>
        </section>
        <div className='w-full flex max-md:flex-col justify-center  gap-[10px] items-center md:mt-4'>
          <button className=' w-[86.343px] md:w-[202px]  h-[23.509px] md:h-[55px] p-[4.274px] lg:p-[10px] rounded-[20px] text-center    border border-[#1E1E1E]  text-[12px] md:text-[16px]  poppins-regular leading-normal text-[1E1E1E] hover:border-[#3D8236] hover:text-[#3D8236] transition duration-[0.5s]'>
            View Details
          </button>
          <button className=' w-[86.343px] md:w-[202px]  h-[23.509px] md:h-[55px] p-[4.274px] lg:p-[10px] rounded-[20px] text-center bg-black text-[12px] md:text-[16px] poppins-regular leading-normal text-white hover:bg-[#3D8236] transition duration-[0.5s]'>
            Make a Bid
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollectionsCard;
