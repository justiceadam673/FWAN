import React, { Children } from "react";
import { Icon } from "@iconify/react";

const FeatureCard = ({ Children, CardHeader, CardParagraph }) => {
  return (
    <main>
      <div className='border flex flex-col items-center justify-center  border-black/35 w-[390px] h-[330px] px-[20px] rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] '>
        {Children}

        <h2 className='text-[24px] mt-[34px] mb-[13px] poppins-medium text-black leading-[24px]  '>
          {CardHeader}
        </h2>
        <div>
          <p className='text-[#858EAD]  poppins-regular text-[20px] leading-normal '>
            {CardParagraph}
          </p>
        </div>
      </div>
    </main>
  );
};

export default FeatureCard;
