import React from "react";
import InputField from "../modals/InputField";

const Test = () => {
  return (
    <div className='p-6'>
      {/* Welcome Header */}
      <section className='flex flex-col lg:flex-row justify-between items-center gap-4'>
        <div>
          <h1 className='text-3xl md:text-4xl font-bold'>Welcome Grace!</h1>
          <h3 className='text-sm md:text-base mt-1 text-gray-600'>
            Good to see you again, Grace! Let’s get started
          </h3>
        </div>
        <div className='w-[70px] h-[70px] flex items-center justify-center rounded-full bg-green-700 text-white font-bold text-xl'>
          SG
        </div>
      </section>

      {/* Profile Form */}
      <section className='max-w-4xl mt-12 space-y-8'>
        <div className='flex flex-col lg:flex-row gap-6 justify-between'>
          <InputField
            type='text'
            inputFor='firstname'
            inputId='firstname'
            fieldName='First Name'
            initialValue='Grace'
          />
          <InputField
            type='text'
            inputFor='lastname'
            inputId='lastname'
            fieldName='Last Name'
            initialValue='Sean'
          />
        </div>

        <div className='flex flex-col lg:flex-row gap-6 justify-between'>
          <InputField
            type='email'
            inputFor='email'
            inputId='email'
            fieldName='Email Address'
            initialValue='seangrace12@gmail.com'
          />
          <InputField
            type='text'
            inputFor='phonenumber'
            inputId='phonenumber'
            fieldName='Phone Number'
            initialValue='+234 8011222333'
          />
        </div>

        <InputField
          type='text'
          inputFor='address'
          inputId='address'
          fieldName='Residential Address'
          initialValue='Opposite shop city, old airport'
          className={"w-full lg:w-[380px]  xl:w-[440px]"}
        />

        {/* Action Buttons */}
        <div className='flex flex-col sm:flex-row md:justify-between gap-4 mt-8'>
          <button className='w-full sm:w-auto bg-green-700 hover:bg-green-800 text-white py-3 px-6 rounded-md text-lg font-semibold transition'>
            Save Changes
          </button>
          <button className='w-full sm:w-auto bg-[#5C0C09] hover:bg-red-800 text-white py-3 px-6 rounded-md text-lg font-semibold transition'>
            Delete Account
          </button>
        </div>
      </section>
    </div>
  );
};

export default Test;
