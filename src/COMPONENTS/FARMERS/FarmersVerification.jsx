import React from "react";
import { ArrowLeft } from "lucide-react";

export default function FarmersVerification() {
  return (
    <div className=' flex flex-row bg-[#FFF] p-4 md:p-10 gap-[16px]  w-full h-full'>
      <div className='flex  items-start mb-6'>
        <ArrowLeft className='' />
      </div>
      <section className='flex justify-between gap-[89px] '>
        <div className='w-full   mx-auto'>
          <h1 className='text-[#1E1E1E] font-medium text-[24px] font-[Kodchasan] '>
            Farmer’s Verification
          </h1>

          <div className=' flex flex-col gap-8'>
            {/* Left side: Form */}
            <div className=' w-full space-y-4'>
              <label className='block mb-1 text-[#1E1E1E] font-[Poppins] text-[18px] font-normal leading-[29.03px] self-stretch mt-[16px]'>
                Full Name
                <input
                  type='text'
                  placeholder='Full Name'
                  defaultValue='Mundana Samadi'
                  className='text-[#000]  text-[20px] font-[Poppins] rounded-[15px] p-[10px] w-[599px] h-[70px] border border-[#CFCFCF]  leading-[29.03px] font-normal'
                />
              </label>

              <label className='block mb-1  text-[#1E1E1E] font-[poppins] text-[18px] font-normal leading-[ 29.03px] mt-[8px]'>
                NIN
                <input
                  type='text'
                  placeholder='NIN'
                  defaultValue='3452345234532345'
                  className='text-[#000]  text-[20px] font-[Poppins] rounded-[15px] p-[10px] w-[599px] h-[70px] border border-[#CFCFCF]  leading-[29.03px] font-normal '
                />
              </label>

              <div className=' w-full flex justify-between '>
                <label className=' text-[18px] text-[#1E1E1E]   h-[70px] leading-[29.03px] font-[Poppins] font-normal mt-[8px]'>
                  Date Of Birth
                  <input
                    type='text'
                    placeholder='MM/DD/YY'
                    className=' flex border border-[#CFCFCF] rounded-[15px] p-[10px] max-w-[594px] h-[70px] bg-[#FFF] gap-[10px] self-stretch items-center text-[20px] text-[#000] font-normal leading-[29.03px] font-[Poppins] pl-[10px] pt-[24px] '
                  />
                </label>
                <label className=' text-[18px] self-stretch text-[#1E1E1E] font-[Poppins] font-normal leading-[29.03px] mt-[8px]'>
                  Farm Size
                  <input
                    type='text'
                    placeholder='Farm Size'
                    defaultValue='10 hectares'
                    className='   flex border border-[#CFCFCF] rounded-[15px] p-[10px] max-w-[594px] h-[70px] bg-[#FFF] gap-[10px] self-stretch items-center text-[20px] text-[#000] font-normal leading-[29.03px] font-[Poppins] pl-[10px] pt-[24px]  '
                  />
                </label>
              </div>

              <label className='block mb-1 text-sm text-[#1E1E1E] font-[Poppins] text-[18px] font-normal leading-[29.03px] self-stretch mt-[8px]'>
                Main Produce
                <input
                  type='text'
                  placeholder='Main Produce'
                  defaultValue='Maize'
                  className=' flex border border-[#CFCFCF] rounded-[15px] p-[10px] w-[594px] h-[70px] bg-[#FFF] gap-[10px] self-stretch items-center text-[20px] text-[#000] font-normal leading-[29.03px] font-[Poppins] pl-[10px] pt-[24px]'
                />
              </label>

              <label className='  text-[#1E1E1E] font-[Poppins] text-[18px] font-normal leading-[29.03px] self-stretch mt-[8px]'>
                WhatsApp Number
                <input
                  type='text'
                  placeholder='WhatsApp Number'
                  defaultValue='08045839254'
                  className=' flex border border-[#CFCFCF] rounded-[15px] p-[10px] w-[594px] h-[70px] bg-[#FFF] gap-[10px] self-stretch items-center text-[#000] text-[20px] font-normal not-italic leading-[29.03px] font-[Poppins] pl-[10px] pt-[24px]'
                />
              </label>

              <label className='text-[#1E1E1E] font-[Poppins] text-[18px] font-normal leading-[29.03px] self-stretch mt-[15px]'>
                Account Number
                <input
                  type='text'
                  placeholder='Account Number'
                  defaultValue='78499657404'
                  className='flex border border-[#CFCFCF] rounded-[15px] p-[10px] w-[594px] h-[70px] bg-[#FFF] gap-[10px] self-stretch items-center  text-[#000] text-[20px] font-normal not-italic leading-[29.03px] font-[Poppins] pl-[10px] pt-[24px]'
                />
              </label>

              <label className='text-[#1E1E1E] font-[Poppins] text-[18px] font-normal leading-[29.03px] self-stretch mt-[14px]'>
                Bank Name
                <input
                  type='text'
                  placeholder='Bank Name'
                  defaultValue='Zenith Bank'
                  className='flex border border-[#CFCFCF] rounded-[15px] p-[10px] w-[594px] h-[70px] bg-[#FFF] gap-[10px] self-stretch items-center  text-[#000] text-[20px] font-normal not-italic leading-[29.03px] font-[Poppins] pl-[10px] pt-[24px]'
                />
              </label>

              <label className='text-[#1E1E1E] font-[Poppins] text-[18px] font-normal leading-[29.03px] self-stretch mt-[14px]'>
                Account Name (should match this account's name)
                <input
                  type='text'
                  placeholder='Account Name'
                  defaultValue='mundana Samadi'
                  className='flex border border-[#CFCFCF] rounded-[15px] p-[10px] w-[594px] h-[70px] bg-[#FFF] gap-[10px] self-stretch items-center  text-[#000] text-[20px] font-normal not-italic leading-[29.03px] font-[Poppins] pl-[10px] pt-[24px]'
                />
              </label>
            </div>

            {/* Right side: Uploads */}
          </div>
        </div>
        <div className='flex w-full justify-center  flex-col gap-[41px]'>
          <div className=''>
            {/* <label className='block mb-1 text-sm text-[#000]  text-[18px] font-normal leading-[29.03px] pl-[84px]'>
            Passport Photo
            <div className=' border border-dashed '>
              {" "}
              <input type='file' className='flex' id='passport' />
            </div>
          </label> */}
            Passport Photo
            <div className='border border-dashed border-[#888] rounded-md h-[256px] aspect-[1/1] flex items-center justify-center gap-[13px]'>
              <label
                htmlFor='passport'
                className='cursor-pointer text-gray-600'
              >
                <div className='text-center'>
                  <div className='text-2xl mb-1'>📁</div>
                  Choose a file
                </div>
              </label>
            </div>
          </div>
          <div>
            <label className='  text-sm text-[#000] fonts-[Poppins] text-[18px] font-normal leading-[29.03px] self-stretch'>
              Farm Photo
            </label>
            <div className='border border-dashed border-gray-400 rounded-md h-[256px] aspect-[1/1] flex items-center justify-center'>
              <input type='file' className='hidden' id='farm' />
              <label htmlFor='farm' className='cursor-pointer text-gray-600'>
                <div className='text-center'>
                  <div className='text-2xl mb-1'>📁</div>
                  Choose a file
                </div>
              </label>
            </div>
          </div>
          <div className='w-full flex max-w-[162px] justify-end place-self-center ml-[-20px]  '>
            <button className='flex bg-[#3D8236] text-white px-[104.364px] py-[13.687px] rounded-[8px] w-[221px] gap-[8.554px] items-center justify-center'>
              Submit
            </button>
            .
          </div>
        </div>
      </section>
    </div>
  );
}
