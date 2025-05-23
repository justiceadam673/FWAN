import React from "react";

const CollectionsCard = ({ image, title, seller, rating, quantity, price }) => {
  return (
    <div className=' max-w-[379px] w-full h-[669px] rounded-[30px] border bg-[#FFF] shadow-[0px_4px_2px_0px_rgba(0,0,0,0.25)] p-[20px] border-[#8C8383] '>
      <img
        src={image}
        alt={title}
        className='h-1/2 w-full  object-cover rounded-xl'
      />
      <div className='mt-[13px]'>
        <section className='p-4 space-y-2 flex flex-col items-start mb-[16px] justify-between '>
          <h2 className='text-[28px] poppins-semibold '>{title}</h2>
          <p className='text-[20px] leading-normal poppins-regular hidden lg:flex '>
            {seller} • ⭐ {rating}
          </p>
        </section>
        <section className='flex mb-[37px] justify-between items-center'>
          <div>
            <h2 className='text-[20px] poppins-regular leading-normal text-[#645E5E] '>
              Quantity
            </h2>
            <p className='text-[28px] poppins-semibold text-[#1E1E1E] '>
              {quantity}
            </p>
          </div>
          <div>
            <h2 className='text-[20px] poppins-regular leading-normal text-[#645E5E] '>
              Price
            </h2>
            <p className='text-[28px] poppins-semibold text-[#1E1E1E] '>
              {price}
            </p>
          </div>
        </section>
        <div className='w-full flex justify-center gap-[10px] items-center mt-4'>
          <button className='  w-full h-[55px] p-[10px] rounded-[20px] border border-[#1E1E1E] text-center 2xl:text-[20px] text-[15px] poppins-regular leading-normal text-[1E1E1E] hover:border-[#3D8236] hover:text-[#3D8236] transition duration-[0.5s]'>
            View Details
          </button>
          <button className=' w-full h-[55px] p-[10px] rounded-[20px] text-center bg-black text-[15px] 2xl:text-[20px] poppins-regular leading-normal text-white hover:bg-[#3D8236] transition duration-[0.5s]'>
            Make Offer
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollectionsCard;
