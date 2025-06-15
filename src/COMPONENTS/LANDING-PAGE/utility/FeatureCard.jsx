import React, { Children } from "react";
import { Icon } from "@iconify/react";

const FeatureCard = ({ Children, CardHeader, CardParagraph }) => {
  return (
    <main>
      <div className='border flex flex-col items-center justify-center  border-black/35 w-full max-lg:max-w-[209px] lg:w-[390px]  lg:h-[330px] px-[20px] rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] '>
        {Children}

        <h2 className='lg:text-[20px] text-center text-[14px] mt-[20px] lg:mt-[34px] mb-[13px] leading-[15.535px] poppins-medium text-black lg:leading-[24px]  '>
          {CardHeader}
        </h2>
        <div>
          <p className='text-[#858EAD]  poppins-regular max-lg:mb-[34px] text-[12px] lg:text-[16px] leading-normal '>
            {CardParagraph}
          </p>
        </div>
      </div>
    </main>
  );
};

export default FeatureCard;
