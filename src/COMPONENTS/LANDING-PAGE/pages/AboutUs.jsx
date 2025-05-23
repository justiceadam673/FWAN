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
        className='w-full h-[217px] lg:h-full rounded-[8.225px] lg:rounded-[30px] mt-[24px]'
      />

      <div className='lg:pl-[224px] px-[36px] lg:pr-[192px]  lg:pb-[80px] mt-[36px] lg:mt-[50.59px] '>
        <p className=' text-[12px] lg:text-[20px] lg:mb-[40px] mb-[20px]'>
          Welcome to Fwan — where technology meets agriculture to create a
          smarter, fairer, and more efficient way to trade farm produce.
          <br />
          <br></br>
          We started Fwan with a simple but powerful vision: to empower farmers
          and streamline the fresh produce supply chain. For too long,
          small-scale farmers have faced challenges in getting fair prices,
          reaching the right buyers, and dealing with middlemen who reduce their
          earnings. At the same time, buyers — from individuals to small
          businesses — struggle to access fresh, affordable, and traceable
          produce directly from the source..
          <br />
          <br></br>
          We’ve built a digital platform where farmers can list their produce,
          set a flexible price range, and receive bids from interested buyers in
          real-time. Buyers, on the other hand, can explore a wide range of
          farm-fresh goods, place competitive bids, and negotiate directly with
          sellers — all from the convenience of their device.
        </p>

        <section className='flex flex-col gap-[20px] mb-[20px] lg:gap-[40px]'>
          <div className='flex flex-col gap-[5px] lg:gap-[10px]'>
            <h2 className='text-[#000] font-poppins text-2xl not-italic font-semibold leading-none  text-[14px] lg:text-[24px]'>
              Our Mission
            </h2>
            <p className='text-[12px] lg:text-[20px]'>
              Our mission is to build a trusted, inclusive, and transparent
              agricultural marketplace that benefits both farmers and buyers. We
              aim to:
            </p>
          </div>

          <div className='flex flex-col gap-[5px] lg:gap-[10px]'>
            <h3 className='text-[#000] font-poppins text-[12px] lg:text-[20px] not-italic font-medium leading-none  '>
              Empower Farmers
            </h3>
            <p className='text-[12px] lg:text-[20px]'>
              Give producers more control over pricing, visibility, and sales
              through digital tools.
            </p>
          </div>

          <div className='flex flex-col gap-[5px] lg:gap-[10px]'>
            <h3 className='text-[12px] lg:text-[20px] font-medium '>
              Enhance Access for Buyers
            </h3>
            <p className='text-[12px] lg:text-[20px]'>
              Make it easier for individuals, vendors, and retailers to find and
              buy quality produce at fair prices
            </p>
          </div>
          <div className='flex flex-col gap-[5px] lg:gap-[10px]'>
            <h3 className='font-medium text-[12px] lg:text-[20px] '>
              Promote Fair Trade and Reduce Waste
            </h3>
            <p className='text-[12px] lg:text-[20px]'>
              Ensure more of the profit goes to the farmer while reducing
              post-harvest losses through faster sales and better market access.
            </p>
          </div>

          <div className='flex flex-col gap-[5px] lg:gap-[10px]'>
            <h3 className='text-[12px] font-medium lg:text-[20px]'>
              Build Stronger Communities{" "}
            </h3>
            <p className='text-[12px] lg:text-[20px]'>
              Strengthen local food systems by fostering direct relationships
              between those who grow food and those who consume it.
            </p>
          </div>
        </section>
        <h2 className='text-[#000] mb-[20px] font-poppins text-[14px] lg:text-[24px] not-italic font-medium leading-[normal]'>
          Why Choose Fwan?
        </h2>
        <section className='text-[12px] flex flex-col gap-[20px] lg:gap-[40px] lg:text-[20px]'>
          <p> Transparent bidding system with no hidden charges</p>
          <p>Real-time communication between farmers and buyers</p>
          <p>
            Easy-to-use dashboards for listing, bidding, and tracking produce
          </p>
          <p>Mobile-friendly design for rural accessibility</p>
          <p> Secure and scalable infrastructure</p>
          <p>
            At Fwan, we’re not just building a platform — we’re building a
            movement. A movement toward more inclusive agricultural commerce,
            stronger farmer livelihoods, and better food for all.
          </p>
          <p>
            Join us in shaping the future of fresh produce trade. Fwan —
            Freshness, Fairness, and a New Way Forward.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
