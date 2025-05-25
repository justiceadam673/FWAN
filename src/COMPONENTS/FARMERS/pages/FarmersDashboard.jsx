import { Icon } from "@iconify/react";
import React from "react";
import FarmersDashBoardCard from "../components/FarmersDashBoardCard";
import RevenueChart from "../data/RevenueChart";

const FarmersDashboard = () => {
  return (
    <main className='ml-[60px] bg-[#F3FAF6] '>
      <section className='flex my-[28px]  gap-[33px] '>
        <button className='bg-[#69B645] rounded-[8px] text-white flex justify-center items-center gap-[19px] py-[8px] pr-[29px] '>
          <span className='bg-[#E8E4E4]/20 p-[6px] ml-[8px] flex justify-center rounded-[8px] items-center '>
            <Icon
              icon='line-md:plus'
              className='text-[#E8E4E4]  w-[24px] h-[24px]   '
            />
          </span>{" "}
          New Listing
        </button>
        <button className='bg-[#B65445] rounded-[8px] text-white flex justify-center items-center gap-[19px] py-[8px] pr-[29px] '>
          <span className='bg-[#E8E4E4]/20 p-[6px] ml-[8px] flex justify-center rounded-[8px] items-center '>
            <Icon
              icon='line-md:minus'
              className='text-[#E8E4E4]  w-[24px] h-[24px]  '
            />{" "}
          </span>
          Remove Listing
        </button>
      </section>
      <section className='flex ml-[4px] gap-[24px]'>
        <FarmersDashBoardCard
          cardNumber={"13"}
          cardText={"Listings"}
          icon={"rivet-icons:clipboard"}
        />
        <FarmersDashBoardCard
          cardNumber={"13"}
          cardText={"Listings"}
          icon={"rivet-icons:clipboard"}
        />
        <FarmersDashBoardCard
          cardNumber={"13"}
          cardText={"Listings"}
          icon={"rivet-icons:clipboard"}
        />
        <FarmersDashBoardCard
          cardNumber={"13"}
          cardText={"Listings"}
          icon={"rivet-icons:clipboard"}
        />
      </section>
      <section>
        <RevenueChart />
      </section>
    </main>
  );
};

export default FarmersDashboard;
