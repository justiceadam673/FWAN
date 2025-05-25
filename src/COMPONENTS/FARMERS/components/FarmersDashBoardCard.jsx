import { Icon } from "@iconify/react";
import React from "react";

const FarmersDashBoardCard = ({ cardNumber, cardText, icon }) => {
  return (
    <main>
      <section className=' flex flex-col w-[200px] rounded-[12px] bg-white h-[138px]  shadow-[0px_4px_2.5px_rgba(0,0,0,0.25)] gap-[20px]'>
        <div className='flex items-center justify-between h-[100px] px-[27px] border-b'>
          <h1 className='text-[28px] font-[Kodchasan] font-bold text-[#174582] '>
            {cardNumber}
          </h1>
          <Icon icon={icon} className='text-[#69B645] w-[35px] h-[35px] ' />
        </div>
        <div className='h-[38px] text-[#888888] '>
          <p className='ml-[34px]'>{cardText}</p>
        </div>
      </section>
    </main>
  );
};

export default FarmersDashBoardCard;
