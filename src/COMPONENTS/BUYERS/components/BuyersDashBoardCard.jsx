import { Icon } from "@iconify/react";
import React from "react";

const BuyersDashBoardCard = ({ cardNumber, nairaSIgn, cardText, icon }) => {
  return (
    <main>
      <section className=' flex pt-[5px] flex-col w-full  lg:w-[200px] rounded-[12px] bg-white lg:h-[138px] h-[100px] shadow-[0px_4px_2.5px_rgba(0,0,0,0.25)] gap-[5px]'>
        <div className='flex justify-between flex-col h-[100px] gap-[2px] lg:gap-[20px] px-[27px] border-b'>
          <div className='w-full flex justify-end-safe'>
            <Icon
              icon={icon}
              className='text-[#69B645] lg:w-[35px] w-[25px] lg:h-[35px] h-[25px] '
            />
          </div>
          <h1 className='lg:text-[20px] text-[16.667px] font-[Kodchasan] font-bold text-green-900 '>
            <span className='font-[poppins]'>{nairaSIgn}</span>
            {cardNumber}
          </h1>
        </div>
        <div className='h-[38px]  text-green-900/50 '>
          <p className='ml-[34px] text-[10px] lg:text-[15px]'>{cardText}</p>
        </div>
      </section>
    </main>
  );
};

export default BuyersDashBoardCard;
