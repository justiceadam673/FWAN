import React from "react";
import Cards from "../util/Cards";
// import Border from "../util/Border";
// import Cart from "../../../assets/img/overviewcart.png";
// import Clock from "../../../assets/img/overviewclock.png";
// import Mark from "../../../assets/img/overviewmark.png";
// import Plus from "../../../assets/img/+.png";
import { farmData } from "../data/FarmData";

const Listing = () => {
  return (
    <div>
      <section className='flex items-center justify-between mt-[23px]'>
        <div className='space-y-[20px]'>
          <h1 className='text-black font-inter text-6xl font-bold leading-none'>
            General Listings
          </h1>
          <h3 className='text-black font-inter text-base font-normal leading-normal'>
            Get the best listings for you
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
          General Listings
        </h3>
        <div className='grid grid-cols-2  xl:grid-cols-3 gap-[69px]'>
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
    </div>
  );
};

export default Listing;
