import React, { useState } from "react";
import Select from "react-select";
import TableData from "../util/TableData";

const Test = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { value: "Accepted", label: "Accepted" },
    { value: "Pending", label: "Pending" },
    { value: "Rejected", label: "Rejected" },
  ];

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  return (
    <div>
      <section className='flex h-full items-center mb-[68px] justify-between mt-[23px]'>
        <div className='space-y-[20px]'>
          <h1 className='text-black font-inter text-[24px] md:text-[34px] lg:text-[44px] xl:text-[54px] 2xl:text-[64px] font-bold leading-none'>
            Welcome Grace!
          </h1>
          <h3 className='text-black font-inter text-[14px] lg:text-[16px] font-normal leading-normal'>
            Good to see you again, Grace! Let’s get started
          </h3>
        </div>
        <div className='flex flex-col justify-center items-center gap-[clamp(6px,1.5vw,10px)] p-[clamp(10px,4vw,31px)] rounded-full bg-[#1D8338]'>
          <p className='text-black font-inter text-[clamp(24px,4vw,48px)] font-bold leading-normal'>
            SG
          </p>
        </div>
      </section>
      <section>
        <h3 className='text-black/70 font-inter text-[22px] mb-[38px] font-normal leading-none'>
          Offers
        </h3>
      </section>
      <section className='outline flex flex-col gap-[46px] rounded-[12px] outline-black/50 lg:mt-[80px] mt-[68px] md:mt-[68px] p-[30px]'>
        <div className='lg:flex justify-between'>
          <div className='mb-[10px] lg:mb-[0px]'>
            <h3 className='text-black font-black font-inter text-[20px] lg:text-[42px] md:text-[32px] mb-[20px] leading-none'>
              Browse Listings
            </h3>
            <p className='text-[14px] lg:text-[20px]'>View farm produce</p>
          </div>
          <div>
            <section className='w-full rounded-[12px] p-[10px]'>
              <Select
                value={selectedOption}
                onChange={handleChange}
                options={options}
                placeholder='Select Status'
                className='max-w-[200px] w-full md:w-[200px]    text-black font-medium py-2 px-4 rounded-[12px]  '
              />
            </section>
          </div>
        </div>
        <div>
          <TableData />
        </div>
      </section>
    </div>
  );
};

export default Test;
