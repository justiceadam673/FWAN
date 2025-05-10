import React from "react";
import Cards from "../util/Cards";
// import Border from "../util/Border";
// import Cart from "../../../assets/img/overviewcart.png";
// import Clock from "../../../assets/img/overviewclock.png";
// import Mark from "../../../assets/img/overviewmark.png";
// import Plus from "../../../assets/img/+.png";
import { farmData } from "../data/FarmData";
import { Icon } from "@iconify/react";

const Listing = () => {
  return (
    <div>
      <section className='flex h-full items-center justify-between mt-[23px]'>
        <div className='space-y-[20px]'>
          <h1 className='text-black font-inter text-[24px] md:text-[34px] lg:text-[44px] xl:text-[54px] 2xl:text-[64px]  font-bold leading-none'>
            General Listings
          </h1>
          <h3 className='text-black font-inter text-[14px] lg:text-[16px] font-normal leading-normal'>
            Get the best listings for you
          </h3>
        </div>
        <div className='flex flex-col justify-center items-center gap-[clamp(6px,1.5vw,10px)] p-[clamp(10px,4vw,31px)] rounded-full bg-[#1D8338]'>
          <p className='text-black font-inter text-[clamp(24px,4vw,48px)] font-bold leading-normal'>
            SG
          </p>
        </div>
      </section>
      <section>
        <section className='outline flex flex-col gap-[46px] rounded-[12px] outline-black/50 lg:mt-[80px] mt-[68px] md:mt-[68px] p-[30px]'>
          <div className='lg:flex justify-between '>
            <div className='mb-[10px] lg:mb-[0px]'>
              <h3 className='text-black font-black font-inter text-[20px] lg:text-[42px] md:text-[32px] mb-[20px]  leading-none'>
                Browse Listings
              </h3>
              <p className='text-[14px] lg:text-[20px] '>View farm produce </p>
            </div>
            <div className='relative max-w-[464px] w-full'>
              {/* Icon positioned inside the input */}
              <span className='absolute inset-0 top-[18px] left-[10px] lg:top-[40px] lg:left-[20px] -translate-y-1/2 text-black'>
                <Icon icon='mdi:search' width='28' height='28' />
              </span>

              {/* Input field with padding to avoid overlapping the icon */}
              <input
                type='text'
                placeholder='Search listings'
                className='border rounded-[12px] placeholder:text-[20px] placeholder:text-black pl-[60px] w-full h-[40px] lg:h-[56px] pr-4 text-sm focus:outline-none'
              />
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 mt-[46px] gap-[69px]'>
            {farmData.map((product) => (
              <Cards
                key={product.id}
                img={product.image}
                name={product.name}
                farmer={product.farmer}
                ratings={product.rating}
                quantity={product.quantity}
                price={product.price}
              />
            ))}
          </div>
        </section>
      </section>
    </div>
  );
};

export default Listing;
