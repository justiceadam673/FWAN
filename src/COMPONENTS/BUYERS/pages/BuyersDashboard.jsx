import { Icon } from "@iconify/react";
import React from "react";
import BuyersDashBoardCard from "../components/BuyersDashBoardCard";
// import RevenueChart from "../data/RevenueChart";
import { useLocation, useNavigate } from "react-router-dom";
// import RevenueDashboard from "../utils/REvenueDashboard";
import BuyersCollection from "../modals/BuyersCollection";

const BuyersDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate(); // correct usage

  const from = location.state?.from?.pathname || "/farmersoverview";

  navigate(from, { replace: true });

  return (
    <main className='lg:ml-[60px] px-[20px]  bg-[#F3FAF6] '>
      {/* <section className='flex my-[28px]  gap-[33px] '>
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
      </section> */}
      <section className='grid lg:grid-cols-4 grid-cols-2 my-[28px]  max-w-[880px] ml-[4px] mb-[36.5px] gap-[24px]'>
        <BuyersDashBoardCard
          cardNumber={13}
          cardText={"Active Bids"}
          icon={"rivet-icons:clipboard"}
        />
        <BuyersDashBoardCard
          cardNumber={`1,043`}
          cardText={"Pending Deliveries"}
          icon={"game-icons:sell-card"}
        />
        <BuyersDashBoardCard
          nairaSIgn={"₦"}
          cardNumber={`20,000`}
          cardText={"Pending Payment"}
          icon={"uiw:loading"}
        />
        <BuyersDashBoardCard
          nairaSIgn={"₦"}
          cardNumber={`400,000`}
          cardText={"Total Amount spent"}
          icon={"mingcute:wallet-fill"}
        />
      </section>
      <section className='flex'>
        <BuyersCollection />
      </section>
    </main>
  );
};

export default BuyersDashboard;
