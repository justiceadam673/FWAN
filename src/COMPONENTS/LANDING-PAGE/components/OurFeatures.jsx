import React from "react";
import FeatureCard from "../utility/FeatureCard";
import { Icon } from "@iconify/react";

const OurFeatures = () => {
  return (
    <div>
      <div className='flex flex-col items-center  justify-center py-[100px] bg-[#EAEAEA]'>
        <h1 className='text-[45px] mb-[28px] leading-normal kodchasan-semibold text-[#1E1E1E] '>
          Our Features
        </h1>

        <div className='flex gap-[35px]  place-self-center items-center   '>
          <FeatureCard
            Children={
              <Icon
                icon={"uil:chart"}
                width={70}
                height={70}
                // className='w-[70px] m-[34px] h-[70px] '
              />
            }
            CardHeader={"Real-Time Bidding"}
            CardParagraph={
              "Continuously monitor your animals’ vital signs and movements. Get instant insights into their health status, ensuring ..."
            }
          />
          <FeatureCard
            Children={
              <Icon
                icon={"mi:filter"}
                width={70}
                height={70}
                // className='w-[70px] m-[34px] h-[70px] '
              />
            }
            CardHeader={"Smart Filters"}
            CardParagraph={
              "Connect with licensed veterinarians directly through the app whenever you need advice or emergency assistance ..."
            }
          />
          <FeatureCard
            Children={
              <Icon
                icon={"material-symbols:chat-outline-rounded"}
                width={70}
                height={70}
                // className='w-[70px] h-[70px] '
              />
            }
            CardHeader={"Direct Chat"}
            CardParagraph={
              "Receive timely notifications for vaccinations, medication schedules, and treatments. Our system ensures you never miss a critical health ..."
            }
          />
        </div>
      </div>
    </div>
  );
};

export default OurFeatures;
