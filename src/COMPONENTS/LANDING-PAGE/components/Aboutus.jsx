import React from "react";
// import Farms from "../../../assets/img/farms.png";
import Hero from "../../../assets/img/hero.png"
const AboutUs = () => {
  return (
    <section className='px-6 py-12 md:py-20'>
      <div className='max-w-6xl mx-auto flex flex-col md:flex-row-reverse gap-10 items-center'>
        {/* Text side */}
        <div className='w-full'>
          {/* <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-6  font-[ka]'>
            About Us
          </h2> */}

       <div class="self-stretch text-center justify-start text-stone-900 text-5xl font-semibold font-['Kodchasan']">About Us</div>




          <p className='text-gray-700 text-lg leading-relaxed mb-4'>
               Welcome to Fwan — where technology meets agriculture to create a smarter, fairer, and more efficient way to trade farm produce.
              We started Fwan with a simple but powerful vision: to empower farmers and streamline the fresh produce supply chain. For too long, small-scale farmers have faced challenges in getting fair prices, reaching the right buyers, and dealing with middlemen who reduce their earnings. At the same time, buyers — from individuals to small businesses — struggle to access fresh, affordable, and traceable produce directly from the source.
              Fwan is here to change that.... 
          </p>
         
        </div>

        {/* Image side */}
        <div className='relative w-full h-[300px] md:h-[400px]'>
          <img
            src={Hero}
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
