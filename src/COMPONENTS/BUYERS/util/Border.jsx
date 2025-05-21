import React from "react";
import RisingArrow from "../../../assets/img/risingarrow.png";
import { Icon } from "@iconify/react";

const Border = ({
  overviewHeader,
  overviewIcon,
  overviewDigits,
  overviewHistory,
  color,
}) => {
  return (
    <section className='flex  w-full px-[17px] py-[10px] flex-col items-start gap-[10px] rounded-[12px] border border-black/50 bg-[#EAEAEA]'>
      <div className='flex w-full justify-between'>
        <h3 className='text-black font-inter text-[24px] not-italic font-normal leading-normal'>
          {overviewHeader}
        </h3>
        <Icon icon={overviewIcon} width='25' height='25' color={color} />
      </div>
      <div className='gap-[10px]'>
        <h2 className='text-black font-inter text-[40px] not-italic my-[10px]  mx-[10px] font-bold leading-normal'>
          {overviewDigits}
        </h2>
        <div className='flex items-center gap-[10px] self-stretch'>
          <img src={RisingArrow} />
          <p>
            <span className='text-[#095C32]'> + {overviewHistory}</span> from
            last week
          </p>
        </div>
      </div>
    </section>
  );
};

export default Border;
