import React from "react";
import Star from "../../../assets/img/star.png";
import { Icon } from "@iconify/react";
import Logo from "../../../assets/img/fwan.png";

const AddListingModal = ({ onOff }) => {
  return (
    <main className='fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50'>
      <section className=' w-full md:w-fit h-full  md:h-fit bg-white p-[16px]  md:rounded-xl 2xl:text-[24px] xl:text-[20px] lg:text-[18px] text-[15px] shadow-xl relative'>
        <div className='flex justify-end '>
          <button
            className=' gap-[20px]  hover:cursor-pointer hover:bg-gray-100 p-[10px] rounded-[10px] text-black text-xl font-bold'
            onClick={onOff}
          >
            <Icon
              icon='carbon:close'
              width='28'
              height='28'
              className='text-[#1D8338]'
            />
          </button>
        </div>
        <form action='#' method='post' className='flex flex-col gap-5'>
          <div className='md:flex gap-[20px] items-center'>
            <div className='flex flex-col '>
              <label htmlFor='quantity'>Quantity</label>
              <input
                type='text'
                id='quantity'
                className='border focus:outline-none rounded-[12px] max-w-[313px] p-[10px]'
                placeholder='e.g 50 kg'
              />
            </div>
            <div className='flex flex-col '>
              <label htmlFor='price'>Price per Unit</label>
              <input
                type='text'
                id='price'
                className='border focus:outline-none rounded-[12px] max-w-[313px] p-[10px]'
                placeholder='e.g. ₦20,00 per kg'
              />
            </div>
          </div>
          <div className='flex flex-col gap-5'>
            <div className='flex flex-col '>
              <label htmlFor='deliverylocation'>Delivery Location</label>
              <input
                type='text'
                id='deliverylocation'
                className='border focus:outline-none rounded-[12px]  p-[10px]'
                placeholder='e.g. Ahmadu Bello way'
              />
            </div>
            <div className='flex flex-col '>
              <label htmlFor='deliverydate'>Preferred Delivery Date </label>
              <input
                type='date'
                id='deliverydate'
                className='border focus:outline-none rounded-[12px]  p-[10px]'
              />
            </div>
            <div className='flex flex-col '>
              <label htmlFor='message'>Message to Farmer </label>
              <textarea
                name='message'
                id='message'
                className='border focus:outline-none text-black rounded-[12px] h-[120px] p-[10px]'
                placeholder='Includes details of pickup/delivery, preferences e.t.c.'
              ></textarea>
            </div>
          </div>
          <div className='flex gap-10 justify-end'>
            <button className='border p-[10px] rounded-[12px] border-black/25 '>
              Cancel
            </button>
            <button className='bg-[#095C32] rounded-[12px] p-[10px] text-white '>
              Submit Offer
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default AddListingModal;
