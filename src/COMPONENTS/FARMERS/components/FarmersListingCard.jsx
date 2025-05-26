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
}) => {
  return (
    <div className='flex flex-row  ml-[58px] bg-[#FFFFFF]  w-[982px] h-[72px] justify-between mt-[7px]   items-center p-[10px] '>
      <div>
        <img src={image} className=' w-[91px] h-[72px] rounded-[12px]' />
      </div>

      <div className=''>
        <h3 className='text-[#888] font-[Poppins] text-[14px] font-normal leading-normal w-[61px] h-[21px]'>
          {prodHeader}{" "}
        </h3>
        <p className='text-[#174582] font-[Poppins] text-[15px] font-normal leading-normal w-[61px] h-[23px]'>
          {prod}
        </p>
      </div>

      <div>
        <h3 className='text-[#888] font-[Poppins] text-[14px] font-normal leading-normal w-[60px] h-[21px]'>
          {quantityHeader}
        </h3>
        <p className='text-[#174582] font-[Poppins] text-[15px] font-normal leading-normal w-[60px] h-[23px]'>
          {quantity}
        </p>
      </div>
      <div>
        <h3 className='text-[#888] font-[Poppins] text-[14px] font-normal leading-normal w-[90px] h-[21px]'>
          {priceHeader}
        </h3>
        <p className='text-[#174582] font-[Poppins] text-[15px] font-normal leading-normal w-[90px] h-[23px]'>
          {price}
        </p>
      </div>
      <div>
        <h3 className='text-[#888] font-[Poppins] text-[14px] font-normal leading-normal w-[90px] h-[21px]'>
          {" "}
          {offersHeader}
        </h3>
        <p className='text-[#174582] font-[Poppins] text-[15px] font-normal leading-normal w-[90px] h-[23px]'>
          {offers}
        </p>
      </div>
      <div>
        <h3 className='text-[#888] font-[Poppins] text-[14px] font-normal leading-normal w-[90px] h-[21px]'>
          {statusHeader}
        </h3>
        <p className='text-[#69B645] font-[Poppins] text-[15px] font-normal leading-normal w-[90px] h-[23px] '>
          {status}
        </p>
      </div>

      <div className='mr-[15px] '>
        <button className='bg-[#B65445] max-w-[125px] max-h-[35px] gap-[10px]  w-full h-full rounded-[8px] text-white flex justify-center items-center p-[20px] pl-[10px]  '>
          <span className='bg-[#E8E4E4]/20 p-[6px] flex justify-center rounded-[8px] items-center '>
            <Icon icon='line-md:minus' className='text-[#E8E4E4]    ' />{" "}
          </span>
          Remove
        </button>
      </div>
    </div>
  );
};

export default FarmersListingCard;
