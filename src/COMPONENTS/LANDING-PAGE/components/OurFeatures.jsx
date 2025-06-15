import React from "react";
import FeatureCard from "../utility/FeatureCard";
import { Icon } from "@iconify/react";

const OurFeatures = () => {
  return (
    <div>
      <div>
        <div className='lg:flex flex-col items-center max-w-[1242px] place-self-center justify-center py-[26px] lg:py-[100px] '>
          <h1 className='lg:text-[45px] max-lg:place-self-center text-[20px] mb-[28px] leading-normal kodchasan-semibold text-[#1E1E1E] '>
            Our Features
          </h1>

          <div className='flex max-md:flex-col gap-[19px] lg:gap-[35px] px-[20px] place-self-center items-center '>
            <FeatureCard
              Children={
                <Icon
                  icon={"uil:chart"}
                  width={70}
                  height={70}
                  className='max-lg:w-[45px] lg:mt-[30px] mt-[17px] max-lg:h-[45px] '
                />
              }
              CardHeader={"Smart Crate Tracking"}
              CardParagraph={
                "Follow your goods in real time from farm to delivery. Our GPS-enabled crates ensure transparency, safety, and temperature control every step of the way."
              }
            />
            <FeatureCard
              Children={
                <Icon
                  icon={"mi:filter"}
                  width={70}
                  height={70}
                  className='max-lg:w-[45px] lg:mt-[30px] mt-[17px] max-lg:h-[45px] '
                />
              }
              CardHeader={"Secure Payment with QC Assurance"}
              CardParagraph={
                "Buyers make payment immediately upon order, while funds are held safely in our pulling account. Farmers only receive payment after successful quality verification at our Central Hubs."
              }
            />
            <FeatureCard
              Children={
                <Icon
                  icon={"material-symbols:chat-outline-rounded"}
                  width={70}
                  height={70}
                  className='max-lg:w-[45px] lg:mt-[30px] mt-[17px] max-lg:h-[45px] '
                />
              }
              CardHeader={"Seamless Farmer-to-Buyer Flow"}
              CardParagraph={
                "Our platform connects farmers directly to bulk buyers, hotels, restaurants, and health-focused markets — with streamlined logistics and verified produce."
              }
            />
          </div>
          {/* <div className='flex place-self-end-safe justify-end lg:justify-end-safe max-lg:pr-[22px] w-full lg:place-self-end  mt-[10px] lg:mt-[16px] '>
            <button className='flex w-[119.751px] max-lg:text-[12.946px] lg:w-[185px] hover:border-[#3D8236] hover:text-[#3D8236] transition duration-[0.5s] h-[35.602px] max-lg:gap-[6.473px] lg:h-[55px] p-[10px] justify-center items-center rounded-[20px] text-[#585252] border border-[#585252] '>
              <span>Learn more</span>{" "}
              <Icon
                icon={"tabler:arrow-right"}
                width={24}
                height={24}
                className='max-lg:w-[12.946px] lg:w-[24px] max-lg:h-[12.946px] lg:h-[24px] '
              />
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default OurFeatures;
