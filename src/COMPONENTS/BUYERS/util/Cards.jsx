import React from "react";
import Star from "../../../assets/img/star.png";

const Cards = ({ img, name, farmer, ratings, price, quantity }) => {
  return (
    <main className='max-w-[452px] w-full p-7 bg-white rounded-xl   outline-1 outline-offset-[-1px] outline-black/50 flex justify-center items-center gap-[10px] overflow-hidden'>
      <section className='w-96 inline-flex  flex-col justify-start items-start'>
        <div className='w-full h-fit relative mb-[20px] rounded-xl '>
          <img
            className='w-full h-64 object-cover rounded-xl'
            src={img}
            crossOrigin='anonymous'
          />
        </div>
        <section className='w-56 gap-[10px] flex flex-col items-start'>
          <h2 className="justify-start text-[32px] text-black text-3xl font-bold font-['Inter']">
            {name}
          </h2>
          <div className="justify-between flex text-black text-xl font-normal font-['Inter']">
            <p className='flex justify-between gap-[10px] items-center'>
              {farmer} <img src={Star} className='w-3.5 h-3  ' />{" "}
              <span>{ratings}</span>
            </p>
          </div>
        </section>
        <div className='flex flex-col justify-start w-full items-start'>
          <div className=' p-2.5 opacity-75 flex justify-between items-between w-full gap-2.5'>
            <p className="justify-start text-black text-xl font-normal font-['Inter']">
              Quantity
            </p>
            <p className="justify-start text-black text-xl font-normal font-['Inter']">
              Price per kg
            </p>
          </div>
          <div className='p-2.5 opacity-75 flex justify-between items-between w-full gap-2.5'>
            <p className="justify-start text-black text-xl font-normal font-['Inter']">
              {quantity}
            </p>
            <p className="justify-start text-black text-xl font-normal font-['Inter']">
              {price}
            </p>
          </div>
        </div>
        <div className='w-full flex gap-[15px] justify-between'>
          <button className='max-w-[180px] w-full max-h-[56px] p-[10px]  border-[1px]  rounded-[12px]  font-normal md:text-[15px] max-sm:text-[15px]  text-[20px] flex justify-center items-center'>
            {" "}
            View Details{" "}
          </button>
          <button className='max-w-[180px] w-full max-h-[56px] p-[10px]  bg-[#095C32] rounded-[12px] text-[#FFFFFF] font-normal md:text-[15px] max-sm:text-[15px] text-[20px] flex justify-center items-center'>
            Make an Offer
          </button>
        </div>
      </section>
    </main>
  );
};

export default Cards;
