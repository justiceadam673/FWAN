import React from "react";
import Farms from "../../../assets/img/farms.png";

const AboutUs = () => {
  return (
    <section className='px-6 py-12 md:py-20'>
      <div className='max-w-6xl mx-auto flex flex-col md:flex-row-reverse gap-10 items-center'>
        {/* Text side */}
        <div className='w-full'>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-6'>
            About Us
          </h2>
          <p className='text-gray-700 text-lg leading-relaxed mb-4'>
            We help smallholder farmers sell their produce faster, safely, and
            at fair prices.
          </p>
          <p className='text-gray-600 text-base leading-relaxed mb-4'>
            Our platform connects you directly with trusted buyers — using
            simple tools in your language, even on basic phones.
          </p>
          <ul className='list-disc pl-5 text-gray-600 space-y-2'>
            <li>No middlemen. No scams.</li>
            <li>Just honest trade and real offers.</li>
            <li>Mobile money payments for easy transactions.</li>
          </ul>
          <p className='mt-6 text-green-700 font-medium'>
            Grow smart. Sell fast. Earn more.
          </p>
        </div>

        {/* Image side */}
        <div className='relative w-full h-[300px] md:h-[400px]'>
          <img
            src={Farms}
            alt='Farm produce'
            className='object-cover w-full h-full rounded-2xl shadow-lg'
          />
          <div className='absolute inset-0 bg-black/10 rounded-2xl'></div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
