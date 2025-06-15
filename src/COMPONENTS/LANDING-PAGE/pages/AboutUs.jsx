import React from "react";
import About from "../../../assets/img/about.png";

const AboutUs = () => {
  return (
    <div className=' flex flex-col w-full h-full items-center justify-center font-[Poppins] mb-[40px] mt-0 px-[16px] lg:px-[80px]  bg-[#FFFF] '>
      <h1 className=' text-[#1E1E1E] text-[20px] lg:text-[36px]  font-[Poppins]   '>
        About Fwan
      </h1>

      <img
        src={About}
        alt='Logo'
        className='w-full max-w-[300px] lg:max-w-[1250px] h-[217px] lg:h-full rounded-[8.225px] lg:rounded-[30px] mt-[24px]'
      />

      <div className='lg:pl-[224px] px-[36px] lg:pr-[192px]  lg:pb-[80px] mt-[36px] lg:mt-[50.59px] '>
        <p className=' text-[12px] lg:text-[20px] lg:mb-[40px] mb-[20px]'>
          Welcome to Fwan — where innovation meets agriculture to build a
          fresher, smarter, and more equitable food supply chain.
          <br />
          <br></br>
          Fwan was created to solve a long-standing problem: smallholder farmers
          are often underpaid and under-supported, while buyers struggle to
          access fresh, traceable produce directly from the source. Our platform
          bridges this gap — using smart logistics, central hubs, and quality
          verification to streamline how fresh food moves from farm to fork.
          <br />
          <br></br>
          Farmers list their produce, deliver it to our Central Hubs, and
          receive payment once quality checks are completed. Buyers — whether
          individuals, restaurants, markets, or retailers — order and pay
          through our platform, with full visibility and confidence that what
          they receive has been properly stored, verified, and tracked.
        </p>

        <section className='flex flex-col gap-[20px] mb-[20px] lg:gap-[40px]'>
          <div className='flex flex-col gap-[5px] lg:gap-[10px]'>
            <h2 className='text-[#000] font-poppins text-2xl not-italic font-semibold leading-none  text-[14px] lg:text-[24px]'>
              Our Mission
            </h2>
            <p className='text-[12px] lg:text-[20px]'>
              To build a trusted, inclusive, and transparent agricultural
              distribution system that empowers producers and serves buyers
              better.
            </p>
          </div>

          <div className='flex flex-col gap-[5px] lg:gap-[10px]'>
            <h3 className='text-[#000] font-poppins text-[12px] lg:text-[20px] not-italic font-medium leading-none  '>
              Empower Farmers
            </h3>
            <p className='text-[12px] lg:text-[20px]'>
              We ensure fairer pay, reduce post-harvest loss, and support
              farmers with logistics, training, and access to wider markets.
            </p>
          </div>

          <div className='flex flex-col gap-[5px] lg:gap-[10px]'>
            <h3 className='text-[12px] lg:text-[20px] font-medium '>
              Enhance Access for Buyers
            </h3>
            <p className='text-[12px] lg:text-[20px]'>
              Buyers receive fresh, verified produce with full tracking and
              delivery options — from warehouse pickup to doorstep drop-offs.
            </p>
          </div>
          <div className='flex flex-col gap-[5px] lg:gap-[10px]'>
            <h3 className='font-medium text-[12px] lg:text-[20px] '>
              Reducing Waste, Promoting Fair Trade
            </h3>
            <p className='text-[12px] lg:text-[20px]'>
              Our cold-chain storage and smart crates keep produce fresh, while
              verified quality ensures every product has a buyer.
            </p>
          </div>

          <div className='flex flex-col gap-[5px] lg:gap-[10px]'>
            <h3 className='text-[12px] font-medium lg:text-[20px]'>
              Strengthening Local Economies
            </h3>
            <p className='text-[12px] lg:text-[20px]'>
              We foster direct, traceable connections between food growers and
              food users — building stronger, healthier communities.
            </p>
          </div>
        </section>
        <h2 className='text-[#000] mb-[20px] font-poppins text-[14px] lg:text-[24px] not-italic font-medium leading-[normal]'>
          Why Choose Fwan?
        </h2>
        <section className='text-[12px] flex flex-col gap-[20px] lg:gap-[40px] lg:text-[20px]'>
          <p> Transparent pricing — no haggling or hidden charges</p>
          <p>Real-time logistics tracking via smart crates</p>
          <p>Centralized quality verification for buyer assurance</p>
          <p>Clean, mobile-first interface built for rural use</p>
          <p> Cold storage, secure handling, and scalable logistics</p>
          <p>
            At Fwan, we’re not just moving food — we’re rebuilding the food
            system for fairness, traceability, and better livelihoods
          </p>
          <p>Fwan — Fresh. Fast. Fair.</p>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
