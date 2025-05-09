import React from "react";
import Border from "../util/Border";
import Cart from "../../../assets/img/overviewcart.png";
import Clock from "../../../assets/img/overviewclock.png";
import Mark from "../../../assets/img/overviewmark.png";
import Plus from "../../../assets/img/+.png";

const Dashboard = () => {
  return (
    <div>
      <section className='flex items-center justify-between mt-[23px]'>
        <div className='space-y-[20px]'>
          <h1 className='text-black font-inter text-6xl font-bold leading-none'>
            Welcome Grace!
          </h1>
          <h3 className='text-black font-inter text-base font-normal leading-normal'>
            Good to see you again, Grace! Let’s get started
          </h3>
        </div>
        <div className='flex w-40 h-40 p-[41px_38px] flex-col justify-center items-center gap-2 rounded-full bg-[#1D8338]'>
          <p className='text-black font-inter text-6xl font-bold leading-normal'>
            SG
          </p>
        </div>
      </section>
      <section>
        <h3 className='text-black/70 font-inter text-base  mb-[38px] font-normal leading-none'>
          General Overview
        </h3>
      </section>
      <section className='grid lg:grid-cols-2 gap-[50px] m-[10px]'>
        <Border
          overviewHeader={"Total Purchases"}
          overviewIcon={Cart}
          overviewDigits={`₦ ${10}`}
          overviewHistory={1.2}
        />
        <Border
          overviewHeader={"Accepted Offers"}
          overviewIcon={Mark}
          overviewDigits={` ${10}`}
          overviewHistory={2}
        />
        <Border
          overviewHeader={"Active Offers"}
          overviewIcon={Clock}
          overviewDigits={`${6}`}
          overviewHistory={1.2}
        />
        <Border
          overviewHeader={"Farmer Relation"}
          overviewIcon={Plus}
          overviewDigits={`${1}`}
          overviewHistory={0.2}
        />
      </section>
    </div>
  );
};

export default Dashboard;
