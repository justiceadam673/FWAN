import React from "react";
import Border from "../util/Border";
import Cart from "../../../assets/img/overviewcart.png";
import Clock from "../../../assets/img/overviewclock.png";
import Mark from "../../../assets/img/overviewmark.png";
import Plus from "../../../assets/img/+.png";

const Dashboard = () => {
  return (
    <div>
      <section className='flex h-full items-center poppins-thin mb-[68px] justify-between mt-[23px]'>
        <div className='space-y-[20px]'>
          <h1 className='text-black font-poppins text-[24px] md:text-[34px] lg:text-[44px] xl:text-[54px] 2xl:text-[64px]  font-bold leading-none'>
            Welcome Grace!
          </h1>
          <h3 className='text-black font-poppins text-[14px] lg:text-[16px] font-normal leading-normal'>
            Good to see you again, Grace! Let’s get started
          </h3>
        </div>
        <div className='flex flex-col justify-center items-center gap-[clamp(6px,1.5vw,10px)] p-[clamp(10px,4vw,31px)] rounded-full bg-[#1D8338]'>
          <p className='text-black font-inter text-[clamp(24px,4vw,48px)] font-bold leading-normal'>
            SG
          </p>
        </div>
      </section>
      <section className='md:place-self-center'>
        <section>
          <h3 className='text-black/70 font-inter text-[22px]  mb-[38px] font-normal leading-none'>
            General Overview
          </h3>
        </section>
        <section className='grid lg:grid-cols-2 gap-[50px]  md:w-[400px] xl:w-[900px] 2xl:w-[1061px] m-[10px]'>
          <Border
            overviewHeader={"Total Purchases"}
            overviewIcon={"mdi-light:cart"}
            overviewDigits={`₦ ${10}`}
            overviewHistory={1.2}
          />
          <Border
            overviewHeader={"Accepted Offers"}
            overviewIcon={"fluent-mdl2:check-mark"}
            overviewDigits={` ${10}`}
            overviewHistory={2}
          />
          <Border
            overviewHeader={"Active Offers"}
            overviewIcon={"iconamoon-clock-thin"}
            overviewDigits={`${6}`}
            overviewHistory={1.2}
          />
          <Border
            overviewHeader={"Farmer Relation"}
            overviewIcon={"ic:sharp-plus"}
            color={"#1D8338"}
            overviewDigits={`${1}`}
            overviewHistory={0.2}
          />
        </section>
      </section>
    </div>
  );
};

export default Dashboard;
