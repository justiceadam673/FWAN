import { Icon } from "@iconify/react";
import React from "react";
import FarmersDashBoardCard from "../components/FarmersDashBoardCard";
import RevenueChart from "../data/RevenueChart";
import { useLocation, navigate } from "react-router-dom";
import RevenueDashboard from "../utils/REvenueDashboard";

const FarmersDashboard = () => {
  const location = useLocation();
  const from = location.state?.from?.pathname || "/farmersdashboard";

  navigate(from, { replace: true });

  return (
    <main className='lg:ml-[60px] px-[20px] max-w-[880px] bg-[#F3FAF6] '>
      <section className='flex my-[28px]  gap-[33px] '>
        <button className='bg-[#69B645] lg:text-[16px] text-[12px] rounded-[8px] text-white flex justify-center items-center gap-[5px] lg:gap-[19px] py-[8px] pr-[29px] '>
          <span className='bg-[#E8E4E4]/20 p-[6px] ml-[8px] flex justify-center rounded-[8px] items-center '>
            <Icon
              icon='line-md:plus'
              className='text-[#E8E4E4]  lg:w-[24px] w-[19.836px] lg:h-[24px] h-[19.836px]  '
            />
          </span>{" "}
          New Listing
        </button>
        <button className='bg-[#B65445] lg:text-[16px] text-[12px] rounded-[8px] text-white flex justify-center items-center gap-[5px] lg:gap-[19px] py-[8px] pr-[29px] '>
          <span className='bg-[#E8E4E4]/20 p-[6px] ml-[8px] flex justify-center rounded-[8px] items-center '>
            <Icon
              icon='line-md:minus'
              className='text-[#E8E4E4]  lg:w-[24px] w-[19.836px] lg:h-[24px] h-[19.836px]  '
            />{" "}
          </span>
          Remove Listing
        </button>
      </section>
      <section className='grid lg:grid-cols-4 grid-cols-2  ml-[4px] mb-[36.5px] gap-[24px]'>
        <FarmersDashBoardCard
          cardNumber={13}
          cardText={"Listings"}
          icon={"rivet-icons:clipboard"}
        />
        <FarmersDashBoardCard
          cardNumber={`1,043`}
          cardText={"Current Offers"}
          icon={"game-icons:sell-card"}
        />
        <FarmersDashBoardCard
          cardNumber={`₦20,000`}
          cardText={"Pending Payment"}
          icon={"uiw:loading"}
        />
        <FarmersDashBoardCard
          cardNumber={`₦400,000`}
          cardText={"Revenue"}
          icon={"mingcute:wallet-fill"}
        />
      </section>
      <section className=''>
        <RevenueChart />
        {/* <RevenueDashboard /> */}
      </section>
    </main>
  );
};

export default FarmersDashboard;
