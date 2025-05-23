

import React from "react";
import { ArrowLeft } from "lucide-react";

export default function FarmersVerification() {
  return (
    <div className="min-h-screen bg-[#FFF] p-4 md:p-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-6">
          <ArrowLeft className="mr-2 cursor-pointer" />
          <h1 className="text-[#1E1E1E] font-medium text-[24px] font-[Kodchasan]">Farmer’s Verification</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left side: Form */}
          <div className="md:col-span-2 space-y-4">
            <div>
              <label className="block mb-1 text-[18px] font-normal leading-[29.03px] text-[#1E1E1E] font-[Poppins] gap-[4px] ">Full Name</label>
              <input
                type="text"
                placeholder="Full Name"
                defaultValue="Mundana Samadi"
                className=" rounded-[15px] p-[10px] w-[599px] h-[70px] border border-[#CFCFCF]  
"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm text-[#1E1E1E] font-[poppins] text-[18px] font-normal leading-[ 29.03px] mt-[8px]">NIN</label>
              <input
                type="text"
                placeholder="NIN"
                defaultValue="3452345234532345"
                className="border border-[#CFCFCF]  p-[10px]  w-[599px] h-[70px] rounded-[15px]"
              />
            </div>

            <div className="flex gap-4">
              <div className="w-full">
                <label className=" text-[18px] text-[#1E1E1E] w-[261px]  h-[70px] leading-[29.03px] font-[Poppins] font-normal">Date Of Birth</label>
                <input
                  type="text"
                  placeholder="MM/DD/YY"
                  className="border border-[#CFCFCF]  p-[10px] w-[261px] h-[70px] rounded-[15px] items-center justify-between self-stretch text-[#000]"
                />
              </div>
              <div className="w-full">
                <label className=" text-[18px] self-stretch text-[#1E1E1E] font-[Poppins] font-normal leading-[29.03px]">Farm Size</label>
                <input
                  type="text"
                  placeholder="Farm Size"
                  defaultValue="10 hectares"
                  className="border border-gray-300 rounded p-[10px] w-[302px] h-[70px]"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-700">Main Produce</label>
              <input
                type="text"
                placeholder="Main Produce"
                defaultValue="Maize"
                className="border border-gray-300 rounded px-4 py-2 w-full"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-700">WhatsApp Number</label>
              <input
                type="text"
                placeholder="WhatsApp Number"
                defaultValue="08045839254"
                className="border border-gray-300 rounded px-4 py-2 w-full"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-700">Account Number</label>
              <input
                type="text"
                placeholder="Account Number"
                defaultValue="78499657404"
                className="border border-gray-300 rounded px-4 py-2 w-full"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-700">Bank Name</label>
              <input
                type="text"
                placeholder="Bank Name"
                defaultValue="Zenith Bank"
                className="border border-gray-300 rounded px-4 py-2 w-full"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-700">Account Name (should match this account's name)</label>
              <input
                type="text"
                placeholder="Account Name"
                defaultValue="mundana Samadi"
                className="border border-gray-300 rounded px-4 py-2 w-full"
              />
            </div>
          </div>

          {/* Right side: Uploads */}
          <div className="flex flex-col gap-6">
            <div>
              <label className="block mb-1 text-sm text-gray-700">Passport Photo</label>
              <div className="border border-dashed border-gray-400 rounded-md h-40 flex items-center justify-center">
                <input type="file" className="hidden" id="passport" />
                <label htmlFor="passport" className="cursor-pointer text-gray-600">
                  <div className="text-center">
                    <div className="text-2xl mb-1">📁</div>
                    Choose a file
                  </div>
                </label>
              </div>
            </div>
            <div>
              <label className="block mb-1 text-sm text-gray-700">Farm Photo</label>
              <div className="border border-dashed border-gray-400 rounded-md h-40 flex items-center justify-center">
                <input type="file" className="hidden" id="farm" />
                <label htmlFor="farm" className="cursor-pointer text-gray-600">
                  <div className="text-center">
                    <div className="text-2xl mb-1">📁</div>
                    Choose a file
                  </div>
                </label>
              </div>
            </div>
            <div className="mt-auto">
              <button className="flex bg-[#3D8236] text-white px-[104.364px] py-[13.687px] rounded-[8px] w-[221px] gap-[8.554px] items-center justify-center">Submit</button>.
          
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
