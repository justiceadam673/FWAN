import React from "react";

const Test = () => {
  return (
    <div>
      <section className='flex h-full items-center justify-between mt-[23px]'>
        <div className='space-y-[20px]'>
          <h1 className='text-black font-inter text-[24px] md:text-[34px] lg:text-[44px] xl:text-[54px] 2xl:text-[64px]  font-bold leading-none'>
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
        <section className='2xl:w-1/2 flex flex-col gap-[46px] rounded-[12px] outline-black/50 lg:mt-[80px] mt-[68px] md:mt-[68px] p-[30px]'>
          <section className='md:flex gap-10 justify-between'>
            <div>
              <div>
                <label htmlFor='firstname'>First Name </label>
                <button>Edit</button>
              </div>
              <input
                type='text'
                id='firstname'
                className='max-w-[483px] xl:w-[400px] w-full p-[10px] rounded-[12px] border-black/70 border '
              />
            </div>
            <div>
              <div>
                <label htmlFor='lastname'>Last Name </label>
                <button>Edit</button>
              </div>
              <input
                type='text'
                id='lastname'
                className='max-w-[483px] xl:w-[400px] w-full p-[10px] rounded-[12px] border-black/70 border '
              />
            </div>
          </section>
          <section className='md:flex gap-10 justify-between'>
            <div>
              <div>
                <label htmlFor='email'>Email Address </label>
                <button>Edit</button>
              </div>
              <input
                type='email'
                id='email'
                className='max-w-[483px] xl:w-[400px] w-full p-[10px] rounded-[12px] border-black/70 border '
              />
            </div>
            <div>
              <div>
                <label htmlFor='phonenumber'>Phone Number </label>
                <button>Edit</button>
              </div>
              <input
                type='number'
                id='phonenumber'
                className='max-w-[483px] xl:w-[400px] w-full p-[10px] rounded-[12px] border-black/70 border '
              />
            </div>
          </section>
          <section>
            <div>
              <div>
                <label htmlFor='address'>Residential Address </label>
                <button>Edit</button>
              </div>
              <input
                type='text'
                id='address'
                className='max-w-[483px] xl:w-[400px] w-full p-[10px] rounded-[12px] border-black/70 border '
              />
            </div>
          </section>
        </section>
      </section>
    </div>
  );
};

export default Test;
