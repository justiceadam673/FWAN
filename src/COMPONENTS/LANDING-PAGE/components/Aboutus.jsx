import React from "react";

import AboutUsImage from "../../../assets/img/aboutus.png";
import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";

const AboutUs = () => {
  return (
    <main className='flex flex-col  lg:w-[1248px] place-self-center items-center justify-center  '>
      <h2 className=' text-[#1E1E1E] text-[20px] lg:text-[45px] leading-normal kodchasan-semibold '>
        About Us
      </h2>
      <section className='md:flex gap-[25px] px-[16px] lg:px-[95px] place-self-center lg:h-[497px] items-center justify-center '>
        <img
          src={AboutUsImage}
          className=' md:h-[455px] md:w-1/2 flex-1 bg-center bg-cover'
        />

        <div className=''>
          <p className=' flex-2 text-[#191D23] text-[12px] md:text-[17px] lg:text-[20px] poppins-regular leading-[150.203%] '>
            Welcome to Fwan — where technology meets agriculture to create a
            smarter, fairer, and more efficient way to trade farm produce. We
            started Fwan with a simple but powerful vision: to empower farmers
            and streamline the fresh produce supply chain. For too long,
            small-scale farmers have faced challenges in getting fair prices,
            reaching the right buyers, and dealing with middlemen who reduce
            their earnings. At the same time, buyers — from individuals to small
            businesses — struggle to access fresh, affordable, and traceable
            produce directly from the source. Fwan is here to change that....{" "}
          </p>
          <div className='flex place-self-end-safe justify-end lg:justify-end-safe max-lg:pr-[22px] w-full lg:place-self-end  mt-[10px] lg:mt-[16px] '>
            <NavLink to={"/aboutus"}>
              <button className='flex w-[119.751px] max-lg:text-[12.946px] lg:w-[185px] hover:border-[#3D8236] hover:text-[#3D8236] transition duration-[0.5s] h-[35.602px] max-lg:gap-[6.473px] lg:h-[55px] p-[10px] justify-center items-center rounded-[20px] text-[#585252] border border-[#585252] '>
                <span>Learn more</span>{" "}
                <Icon
                  icon={"tabler:arrow-right"}
                  width={24}
                  height={24}
                  className='max-lg:w-[12.946px] lg:w-[24px] max-lg:h-[12.946px] lg:h-[24px] '
                />
              </button>
            </NavLink>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutUs;
