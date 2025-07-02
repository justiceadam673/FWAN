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
                "Our platform connects farmers directly to buyers, hotels, restaurants, and health-focused markets — with streamlined logistics and verified produce."
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurFeatures;
