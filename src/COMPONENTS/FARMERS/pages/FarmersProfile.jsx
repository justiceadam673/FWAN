import React from "react";
// import { Icon } from "@iconify/react";

const FarmersProfile = () => {
  return (
    <div className='flex flex-col items-center py-[20px] '>
      {/* Main Container */}
      <div className='flex w-[689px] h-[685px] items-center justify-center pt-[44px] pr-[51px] pb-[78px] pl-[51px] mt-[41px] bg-[#EBE9E9] rounded-[12px] '>
        <div className=''>
          <h2 className='text-[#1E1E1E] font-[Kodchasan] text-[24px] not-italic leading-normal font-semibold w-[587px] h-[31px] mb-[26px]'>
            Personal Information
          </h2>

          <div className='grid grid-cols-2 gap-4 mb-4'>
            <div>
              <label className='text-[#1E1E1E] font-[Poppins] text-[18px] font-normal leading-[29.03px]'>
                First Name
              </label>
              <input
                type='text'
                value='Muhamed  '
                className='flex w-[261px] h-[70px] p-[10px] gap-[10px] self-stretch rounded-[15px] border border-[#CFCFCF] bg-[#FFF] text-[#000] fonts-[Poppins] text-[20px] font-normal leading-[229.03px] text-w-[103px] text-h[30px]'
                readOnly
              />
            </div>
            <div>
              <label className='text-[#1E1E1E] font-[Poppins] text-[18px] font-normal leading-[29.03px]'>
                Last Name
              </label>
              <input
                type='text'
                value='Muhamed'
                className='flex w-[261px] h-[70px] p-[10px] gap-[10px] self-stretch rounded-[15px] border border-[#CFCFCF] bg-[#FFF] text-[#000] fonts-[Poppins] text-[20px] font-normal leading-[229.03px] text-w-[103px] text-h[30px]'
                readOnly
              />
            </div>
          </div>

          <div className='mb-4'>
            <div className=''>
              <label className='text-[#1E1E1E] w-[136px] h-[30px] font-[Poppins] text-[18px] font-normal not-italic leading-[29.03px] shrink-0'>
                Email Address
              </label>
              <button className='text-[#1E1E1E] w-[33px] h-[30px] font-[Poppins] text-[18px] font-normal not-italic leading-[29.03px]'>
                ✏️ Edit
              </button>
            </div>
            <input
              type='email'
              value='Muhamedali@gmail.com'
              className='flex w-[568px] h-[70px] p-[10px] items-center gap-[10px] self-stretch rounded-[15px] border border-[#CFCFCF] bg-[#FFF]  text-[#000] font-[Poppins] text-[20px] not-italic font-normal leading-[29.03px]  '
              readOnly
            />
          </div>

          <div className='mb-4'>
            <div className='flex items-center justify-between'>
              <label className='text-[#1E1E1E] font-[Poppins] text-[18px] font-normal not-italic leading-[29.03px]'>
                Phone Number
              </label>
              <button className='text-[#1E1E1E] text-[18px] leading-[29.03px] font-normal font-[Poppins] not-italic'>
                ✏️ Edit
              </button>
            </div>
            <input
              type='text'
              value='0801233456789'
              className='flex w-[471px] h-[70px] p-[10px] items-center gap-[10px] rounded-[15px] border border-[#CFCFCF] bg-[#FFF]
              text-[#000] font-[Poppins] text-[20px] not-italic font-normal leading-[29.03px]  '
              readOnly
            />
          </div>

          <div className='mb-6'>
            <div className='flex items-center justify-between'>
              <label className='text-[#1E1E1E] font-[Poppins] text-[18px] font-normal not-italic leading-[29.03px]'>
                Residential Address
              </label>
              <button className='text-[#1E1E1E] text-[18px] leading-[29.03px] font-normal font-[Poppins] not-italic'>
                ✏️ Edit
              </button>
            </div>
            <input
              type='text'
              value='Opposite shop city, Old airport'
              className='flex w-[568px] h-[70px] p-[10px] items-center gap-[10px] self-stretch rounded-[15px] border border-[#CFCFCF] bg-[#FFF]
               text-[#000] font-[Poppins] text-[20px] not-italic font-normal leading-[29.03px]'
              readOnly
            />
          </div>
        </div>
      </div>

      {/* New Button Section */}
      <div className='mt-6  ml-[369px]'>
        <button className='flex w-[194px]  h-full p-[10px] items-center justify-center gap-[10px] rounded-[12px] border border-[#CFCFCF] bg-[#F3FAF6]  m-auto '>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default FarmersProfile;
